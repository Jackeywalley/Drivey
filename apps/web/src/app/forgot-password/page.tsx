import { Metadata } from 'next';
import { Card, Button, Input } from '@drivemate/ui';
import { useNotification } from '@/contexts/NotificationContext';
import { useState } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forgot Password - DriveMate',
  description: 'Reset your DriveMate password',
};

export default function ForgotPasswordPage() {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle password reset request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setIsSubmitted(true);
      showNotification(
        'Password reset instructions sent to your email',
        'success'
      );
    } catch (error) {
      showNotification('Failed to send reset instructions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <Card>
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Check your email
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  We've sent password reset instructions to {email}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                >
                  Try another email
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Sending instructions...'
                      : 'Send reset instructions'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
} 