import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Product Not Found</h1>
        <p className="mt-4 text-gray-600">
          The product you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}

