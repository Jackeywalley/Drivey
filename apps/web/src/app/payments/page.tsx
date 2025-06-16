import { Metadata } from 'next';
import { Card, Button, Input } from '@drivemate/ui';
import { usePayments } from '@/hooks/usePayments';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useState } from 'react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Payments - DriveMate',
  description: 'Manage your DriveMate payments and payment methods',
};

export default function PaymentsPage() {
  const { payments, isLoading } = usePayments();
  const { user } = useAuthContext();
  const { showNotification } = useNotification();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle adding card
      setIsAddingCard(false);
      showNotification('Payment method added successfully', 'success');
    } catch (error) {
      showNotification('Failed to add payment method', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Button onClick={() => setIsAddingCard(true)}>Add Card</Button>
              </div>

              {isAddingCard ? (
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <Input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name on Card
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit">Save Card</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingCard(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {user?.paymentMethods?.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          **** **** **** {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Handle remove card
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment History</h2>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {payment.booking?.pickupLocation} to{' '}
                        {payment.booking?.dropoffLocation}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(payment.createdAt), 'PPP')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${payment.amount.toFixed(2)}</p>
                      <p
                        className={`text-sm ${
                          payment.status === 'completed'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 