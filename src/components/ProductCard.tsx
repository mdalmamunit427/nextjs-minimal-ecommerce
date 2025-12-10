import Link from 'next/link';
import { Product } from '@/types/product';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <ProductImage
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          fallbackText={product.name}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-900">
          ${product.price.toFixed(2)} {product.currency}
        </p>
      </div>
    </Link>
  );
}

