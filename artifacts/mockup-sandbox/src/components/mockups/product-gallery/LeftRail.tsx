import React, { useState } from "react";
import { ZoomIn } from "lucide-react";

export function LeftRail() {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const images = [
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-row gap-8 items-start">
          
          {/* Left Rail - Thumbnails */}
          <div className="w-20 shrink-0 flex flex-col gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white ${
                  selectedImageIdx === idx 
                    ? "border-[#F68B1E] shadow-sm ring-4 ring-[#F68B1E]/10" 
                    : "border-gray-100 hover:border-[#F68B1E]/60 hover:shadow-sm"
                }`}
                aria-label={`Select image ${idx + 1}`}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover p-1.5"
                />
              </button>
            ))}
          </div>

          {/* Main Image Area */}
          <div className="flex-1 relative rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden group aspect-[4/3] flex items-center justify-center">
            
            {/* Counter Badge */}
            <div className="absolute top-5 right-5 z-10 bg-[#111111] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
              {selectedImageIdx + 1} / {images.length}
            </div>

            {/* Main Image */}
            <div className="absolute inset-0 p-12 flex items-center justify-center bg-gray-50/30">
              <img 
                src={images[selectedImageIdx]} 
                alt="200L Haier Thermocool Deep Freezer"
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Zoom Icon Overlay */}
            <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/[0.03] transition-colors duration-300 flex items-center justify-center cursor-zoom-in pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-4 rounded-full shadow-xl text-[#111111]">
                <ZoomIn className="w-6 h-6 stroke-[1.5]" />
              </div>
            </div>

            {/* Product Name Badge Overlay */}
            <div className="absolute bottom-5 left-5 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-[#111111] uppercase tracking-widest">HDF-200HS</span>
            </div>
            
          </div>
        </div>

        {/* Product Context */}
        <div className="px-4 flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold text-[#111111] leading-tight max-w-2xl">
            200L Haier Thermocool Deep Freezer — HDF-200HS
          </h1>
          <div className="text-4xl font-black text-[#F68B1E] tracking-tight">
            ₦80,000
          </div>
        </div>

      </div>
    </div>
  );
}
