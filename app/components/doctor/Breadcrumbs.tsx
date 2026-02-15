'use client';

import Link from 'next/link';

interface BreadcrumbsProps {
    doctorName: string;
}

export default function Breadcrumbs({ doctorName }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8 px-4 sm:px-0">
            <Link href="/" className="hover:text-[#F05137] transition-colors">Home</Link>
            <span className="text-gray-400">»</span>
            <Link href="/booking" className="hover:text-[#F05137] transition-colors">Doctors</Link>
            <span className="text-gray-400">»</span>
            <span className="text-[#F05137] font-medium">{doctorName}</span>
        </nav>
    );
}
