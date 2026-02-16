import Link from 'next/link';
import { FileQuestion, ChevronLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2 font-helonik">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Page Not Found</h2>

            <p className="text-gray-500 max-w-xs sm:max-w-md mb-6 sm:mb-8 text-sm sm:text-base">
                This page could not be found.
            </p>

            <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#F05137] text-white rounded-full font-medium text-sm sm:text-base hover:bg-[#d94830] transition-colors shadow-sm hover:shadow-md active:scale-[0.98]"
            >
                <ChevronLeft size={18} />
                Return Home
            </Link>
        </div>
    );
}
