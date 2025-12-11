import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductActions from '@/components/ProductActions';
import ProductDetailsTabs from '@/components/ProductDetailsTabs';
import RelatedProducts from '@/components/RelatedProducts';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href={`/?category=${product.category}`}
              className="hover:text-gray-900 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="grid gap-12 lg:grid-cols-2 mb-16">
          {/* Product Images */}
          <div className="sticky top-8 self-start">
            <ProductImageGallery
              images={product.images || [product.image]}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Product Title & Price */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-lg font-normal text-gray-500">
                  {product.currency}
                </span>
              </div>
            </div>

            {/* Rating Placeholder */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-green-600 font-medium">
                In Stock
              </span>
            </div>

            {/* Short Description */}
            <div className="mb-8">
              <p className="text-base leading-7 text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Product Actions (Options, Add to Cart, Highlights) */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetailsTabs description={product.description} />

        {/* Related Products */}
        <RelatedProducts
          currentProduct={product}
          allProducts={products}
        />
      </div>
    </>
  );
}

