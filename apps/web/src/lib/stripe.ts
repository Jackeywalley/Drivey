import Stripe from 'stripe';
import { prisma } from './db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function handleWebhook(
  signature: string,
  payload: Buffer
): Promise<{ success: boolean; error?: any }> {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
    }

    return { success: true };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return { success: false, error };
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await prisma.$transaction([
    prisma.payment.update({
      where: { bookingId },
      data: {
        status: 'COMPLETED',
        transactionId: paymentIntent.id,
      },
    }),
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    }),
  ]);
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await prisma.payment.update({
    where: { bookingId },
    data: {
      status: 'FAILED',
      transactionId: paymentIntent.id,
    },
  });
}

export async function createCustomer(email: string, name: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    return {
      success: true,
      customerId: customer.id,
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function createSetupIntent(customerId: string) {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });

    return {
      success: true,
      clientSecret: setupIntent.client_secret,
    };
  } catch (error) {
    console.error('Error creating setup intent:', error);
    return {
      success: false,
      error,
    };
  }
} 