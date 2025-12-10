'use client';

import { useState } from 'react';
import ProductImage from './ProductImage';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Use the first image as default if no images provided
  const displayImages = images.length > 0 ? images : [];
  const selectedImage = displayImages[selectedImageIndex] || '';

  if (displayImages.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200">
        <div
          key={selectedImageIndex}
          className="h-full w-full animate-fade-in"
        >
          <ProductImage
            src={selectedImage}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            width={800}
            height={800}
            className="h-full w-full object-cover object-center transition-opacity duration-300"
            fallbackText={productName}
          />
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square w-full overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                selectedImageIndex === index
                  ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2 scale-105 shadow-md'
                  : 'border-gray-200 hover:border-gray-400 hover:scale-105'
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-pressed={selectedImageIndex === index}
            >
              <ProductImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={200}
                height={200}
                className={`h-full w-full object-cover object-center transition-opacity ${
                  selectedImageIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                fallbackText={`${productName} ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

