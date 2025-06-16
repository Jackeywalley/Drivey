interface ErrorProps {
  message: string;
  className?: string;
}

export function Error({ message, className = '' }: ErrorProps) {
  return (
    <div
      className={`rounded-lg bg-red-50 p-4 text-red-700 ${className}`}
      role="alert"
    >
      <p className="font-medium">Error</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
} 