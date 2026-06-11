import React from 'react';
import { getErrorInfo } from '../../utils/errorMessages';
import { Button } from './Button';
import { Shield } from '../../utils/icons';
import type { ApiError } from '../../types/github';

interface ErrorMessageProps {
  error: ApiError | Error;
  onRetry?: () => void;
}

/**
 * Visually distinct error card with icon, title, description, and retry button.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const code = 'code' in error ? (error as ApiError).code : 'UNKNOWN_ERROR';
  const { title, description } = getErrorInfo(code);

  return (
    <div className="animate-errorShake card-base p-6 sm:p-8 text-center max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 rounded-full bg-[var(--danger)]/10 flex items-center justify-center">
          <Shield className="text-[var(--danger)]" size={28} />
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
        {title}
      </h3>

      <p className="font-body text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
        {description}
      </p>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
