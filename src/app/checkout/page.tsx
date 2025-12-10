'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImage from '@/components/ProductImage';
import { FiLoader, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = getTotalPrice();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout using the session URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                      className="relative flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <ProductImage
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          fallbackText={item.product.name}
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between pr-8">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="block"
                            >
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {item.product.name}
                              </h3>
                            </Link>
                            {(item.selectedColor || item.selectedSize) && (
                              <div className="mt-1 text-xs text-gray-600">
                                {item.selectedColor && (
                                  <span>Color: {item.selectedColor}</span>
                                )}
                                {item.selectedColor && item.selectedSize && (
                                  <span className="mx-2">•</span>
                                )}
                                {item.selectedSize && (
                                  <span>Size: {item.selectedSize}</span>
                                )}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="absolute top-0 right-0 p-1.5 hover:bg-red-50 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Payment Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  className="w-full rounded-lg bg-gray-900 px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>

                <p className="mt-4 text-xs text-center text-gray-500">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

