import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
}

export default function Card({ children, className = '', title, footer }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {title && (
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
}






