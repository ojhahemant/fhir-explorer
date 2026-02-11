import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <AlertCircle size={24} />
      <div className="error-content">
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            <RefreshCw size={16} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
