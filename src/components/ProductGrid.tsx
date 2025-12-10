'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { categories } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
}

export default function ProductGrid({
  products,
  initialCategory = 'all',
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || initialCategory
  );

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setSelectedCategory(category);
  }, [searchParams]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-200 pb-4">
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)}
            className={`text-sm font-medium transition-colors ${
              selectedCategory === category.slug
                ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

