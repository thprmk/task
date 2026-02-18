import { FileQuestion } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <div className="min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2 font-helonik">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">This page could not be found.</h2>
    </div>
  );
}
