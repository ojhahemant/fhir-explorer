import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner">
      <Loader2 className="spinner-icon" size={32} />
      <p>{message}</p>
    </div>
  );
}

export function InlineSpinner() {
  return <Loader2 className="inline-spinner" size={16} />;
}
