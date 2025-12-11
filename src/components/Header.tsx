'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import CartSidebar from './CartSidebar';

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderProps {
  /** Brand name or logo to display */
  brand?: ReactNode;
  /** URL for the brand link (default: "/") */
  brandHref?: string;
  /** Navigation items to display */
  navItems?: NavItem[];
  /** Whether to show the shopping cart button */
  showCart?: boolean;
}

export default function Header({
  brand = 'Acme Store',
  brandHref = '/',
  navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/shipping', label: 'Shipping & Return Policy' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/faq', label: 'FAQ' },
  ],
  showCart = true,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = showCart ? getTotalItems() : 0;

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={brandHref} className="text-xl font-bold text-gray-900">
            {brand}
          </Link>

          {navItems.length > 0 && (
            <nav className="hidden gap-6 sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            {/* Cart Button */}
            {showCart && (
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
            )}
            
            {/* Mobile Menu Button */}
            {navItems.length > 0 && (
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
            )}
          </div>
        </div>
        {mobileMenuOpen && navItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white sm:hidden">
            <nav className="flex flex-col gap-4 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      {showCart && (
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}

