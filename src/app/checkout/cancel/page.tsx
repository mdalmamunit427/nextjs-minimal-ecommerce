'use client';

import Link from 'next/link';
import { FiXCircle } from 'react-icons/fi';

export default function CheckoutCancelPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full mx-auto px-4 py-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <FiXCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. No charges have been made. You can
          continue shopping or try again.
        </p>
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

