import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Acme Store</h3>
            <p className="mt-4 text-sm text-gray-600">
              Your one-stop shop for quality products.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=shirts"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=stickers"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Stickers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © 2023-2025 ACME, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

