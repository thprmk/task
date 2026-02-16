'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';

const fieldLabelClass =
  'block text-sm font-medium text-gray-700 mb-1.5';
const fieldErrorClass = 'mt-1.5 text-sm text-red-600';
const fieldHelperClass = 'mt-1.5 text-sm text-gray-500';

const textareaBaseClass =
  'flex min-h-[100px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F05137]/30 focus:ring-offset-0 focus:border-[#F05137] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 resize-y';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id ?? `textarea-${React.useId()}`;
    return (
      <div className="w-full space-y-0">
        {label && (
          <label htmlFor={textareaId} className={fieldLabelClass}>
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textareaBaseClass,
            error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className={fieldErrorClass} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className={fieldHelperClass}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export default Textarea;
