import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export function MosaicSplit() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const images = [
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        
        {/* Gallery Grid */}
        <div className="flex gap-4" style={{ height: '480px' }}>
          
          {/* Main Image (Left Column, ~65%) */}
          <div 
            className="w-2/3 bg-gray-50 rounded-xl relative group flex items-center justify-center p-3 shadow-inner cursor-zoom-in"
            onClick={() => setSelectedIdx(0)}
          >
            <img 
              src={images[selectedIdx]} 
              alt="Main Product" 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
            
            {/* Hover Zoom Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
              <ZoomIn className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Tap to zoom</span>
            </div>
          </div>

          {/* Thumbnails (Right Column, ~35%) */}
          <div className="w-1/3 flex flex-col gap-2">
            
            {/* Thumbnail 2 */}
            <div 
              className={`relative flex-1 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedIdx === 1 ? 'opacity-100 shadow-sm' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setSelectedIdx(1)}
            >
              {selectedIdx === 1 && (
                <div className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ backgroundColor: '#F68B1E' }} />
              )}
              <img 
                src={images[1]} 
                alt="Thumbnail 2" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Thumbnail 3 */}
            <div 
              className={`relative flex-1 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedIdx === 2 ? 'opacity-100 shadow-sm' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setSelectedIdx(2)}
            >
              {selectedIdx === 2 && (
                <div className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ backgroundColor: '#F68B1E' }} />
              )}
              <img 
                src={images[2]} 
                alt="Thumbnail 3" 
                className="w-full h-full object-cover" 
              />
            </div>

          </div>
        </div>

        {/* Product Context */}
        <div className="mt-6 flex flex-col">
          <div className="h-px bg-gray-100 w-full mb-4" />
          
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-xl font-bold" style={{ color: '#111' }}>
              200L Haier Thermocool Deep Freezer — HDF-200HS
            </h1>
            <div className="flex flex-col items-end gap-1">
              <div className="text-2xl font-bold whitespace-nowrap" style={{ color: '#F68B1E' }}>
                ₦80,000
              </div>
              <button 
                className="text-sm font-medium hover:underline flex items-center gap-1" 
                style={{ color: '#F68B1E' }}
              >
                View all photos
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
