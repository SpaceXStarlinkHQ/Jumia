import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
  "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
  "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg"
];

const productName = "200L Haier Thermocool Deep Freezer — HDF-200HS";
const productPrice = "₦80,000";

export function MagazineHero() {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const nextImage = () => setSelectedImageIdx((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="bg-white rounded-b-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden">
        
        {/* Top: Full-width main image */}
        <div className="relative aspect-4/3 w-full bg-white group select-none">
          {/* Main Image */}
          <img 
            src={images[selectedImageIdx]} 
            alt={productName} 
            className="w-full h-full object-contain"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 pointer-events-none" />
          
          {/* "1 / 3" pill */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest border border-white/30">
            {selectedImageIdx + 1} / {images.length}
          </div>

          {/* Product Name over Gradient */}
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
              {productName}
            </h1>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Below image: Thumbnail filmstrip */}
        <div className="px-6 py-4 bg-gray-50 flex justify-center gap-3 border-b border-gray-100">
          {images.map((img, idx) => {
            const isSelected = selectedImageIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`
                  relative aspect-square w-20 overflow-hidden rounded-md transition-all duration-300 ease-out bg-white border border-gray-200
                  ${isSelected ? 'scale-100 ring-2 ring-[#F68B1E] ring-offset-2' : 'scale-95 opacity-70 hover:opacity-100'}
                `}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover mix-blend-multiply" 
                />
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F68B1E]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Details Row */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-b-2xl">
          <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">BigDeals Direct</p>
            <h2 className="text-gray-900 font-semibold text-lg line-clamp-1">{productName}</h2>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[#F68B1E] font-bold text-3xl">{productPrice}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
