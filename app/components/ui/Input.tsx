'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';

const fieldLabelClass =
  'block text-sm font-medium text-gray-700 mb-1.5';
const fieldErrorClass = 'mt-1.5 text-sm text-red-600';
const fieldHelperClass = 'mt-1.5 text-sm text-gray-500';

const inputBaseClass =
  'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F05137]/30 focus:ring-offset-0 focus:border-[#F05137] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${React.useId()}`;
    return (
      <div className="w-full space-y-0">
        {label && (
          <label htmlFor={inputId} className={fieldLabelClass}>
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            inputBaseClass,
            error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className={fieldErrorClass} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className={fieldHelperClass}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
