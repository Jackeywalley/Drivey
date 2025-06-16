'use client';

import { Button } from '@drivemate/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Something went wrong!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We apologize for the inconvenience. Please try again later.
            </p>
            <div className="space-x-4">
              <Button onClick={() => reset()}>Try again</Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Go back home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 