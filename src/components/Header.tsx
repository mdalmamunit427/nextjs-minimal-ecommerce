'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Acme Store
          </Link>
          <nav className="hidden gap-6 sm:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/shipping"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Shipping & Return Policy
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Open shopping cart"
            >
              <FiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white sm:hidden">
            <nav className="flex flex-col gap-4 px-4 py-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/terms"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/shipping"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shipping & Return Policy
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </header>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

