'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    if (session) {
      setSessionId(session);
      // Clear cart after successful payment
      clearCart();
    } else {
      // Redirect to home if no session ID
      router.push('/');
    }
  }, [searchParams, clearCart, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full mx-auto px-4 py-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and you
          will receive an email confirmation shortly.
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500 mb-8">
            Order ID: {sessionId}
          </p>
        )}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="block w-full rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-50"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full mx-auto px-4 py-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Loading order details...
          </p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

