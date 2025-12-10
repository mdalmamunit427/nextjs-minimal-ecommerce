'use client';

import { useCart } from '@/contexts/CartContext';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import ProductImage from './ProductImage';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const total = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Start adding items to your cart
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={onClose}
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
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={onClose}
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
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between">
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
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
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
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

