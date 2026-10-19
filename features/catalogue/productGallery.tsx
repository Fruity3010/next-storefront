'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  images: string[];
  title: string;
}

const ProductGallery = ({ images, title }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-card bg-grey-50">
        <Image
          src={images[activeIndex]}
          alt={title}
          width={600}
          height={600}
          preload={activeIndex === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 flex gap-3">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === activeIndex}
                className="size-20 overflow-hidden rounded-card border-2 border-transparent bg-grey-50 aria-pressed:border-primary-600"
              >
                <Image
                  src={src}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductGallery;
