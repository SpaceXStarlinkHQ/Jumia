import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingCart, ShieldCheck } from "lucide-react";
import { getOriginalPrice } from "@/lib/jumia-mock";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalKobo, itemCount } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center py-20 text-center mt-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-[#F68B1E]" />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty!</h2>
        <p className="text-sm text-gray-500 mb-8">Browse our categories and discover our best deals!</p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
        {/* Left Column */}
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <h1 className="text-lg font-medium text-gray-800 p-4 border-b border-gray-100">
            Cart ({itemCount})
          </h1>
          
          <div className="divide-y divide-gray-100">
            {items.map((item) => {
              const origPrice = getOriginalPrice(item.unitPriceKobo, item.productId);
              
              return (
                <div key={item.productId} className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-4 flex-1">
                    <Link href={`/products/${item.productId}`} className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-50 rounded border border-gray-100 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply p-1" />
                      ) : (
                        <ShoppingCart className="w-8 h-8 text-gray-300" />
                      )}
                    </Link>
                    
                    <div className="flex flex-col flex-1">
                      <Link href={`/products/${item.productId}`} className="text-sm sm:text-base text-gray-800 font-medium line-clamp-2 hover:text-[#F68B1E] mb-1">
                        {item.productName}
                      </Link>
                      <div className="text-xs text-gray-500 mb-1">Seller: Jumia</div>
                      <div className="text-xs text-[#3CB64A] font-medium mb-2">In Stock</div>
                      
                      <div className="mt-auto hidden sm:flex items-center gap-4">
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="flex items-center gap-1.5 text-[#E53935] hover:bg-red-50 px-2 py-1 rounded text-sm font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col justify-between items-end sm:w-32 border-t sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <div className="font-bold text-lg text-gray-900">{formatNaira(item.unitPriceKobo)}</div>
                      <div className="text-xs text-gray-400 line-through mb-2">{formatNaira(origPrice)}</div>
                      <div className="text-xs text-gray-500 mb-2 sm:mb-4">{formatNaira(item.unitPriceKobo * item.quantity)} subtotal</div>
                    </div>
                    
                    <div className="flex items-center border border-gray-300 rounded h-8 w-24 bg-white">
                      <button 
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-full flex items-center justify-center hover:bg-[#F68B1E] hover:border-[#F68B1E] hover:text-white text-[#F68B1E] transition-colors rounded-l"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="flex-1 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center hover:bg-[#F68B1E] hover:border-[#F68B1E] hover:text-white text-[#F68B1E] transition-colors rounded-r"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="sm:hidden mt-2 flex">
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="flex items-center gap-1.5 text-[#E53935] hover:bg-red-50 px-2 py-1 rounded text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> REMOVE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-3 uppercase">Cart Summary</h2>
            
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-gray-900">{formatNaira(totalKobo)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-gray-600">Delivery</span>
              <span className="text-[#3CB64A] font-bold">FREE</span>
            </div>
            
            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <span className="font-bold text-xl text-gray-900">{formatNaira(totalKobo)}</span>
              </div>
              <p className="text-xs text-[#3CB64A] text-right font-medium">✓ Free delivery included</p>
            </div>

            <button
              onClick={() => setLocation("/checkout")}
              className="w-full py-3 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm shadow-[#F68B1E]/20 mb-3"
            >
              Checkout ({formatNaira(totalKobo)})
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              Returns are easy
            </div>
          </div>
          
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase">Returns are easy</h3>
            <p className="text-xs text-gray-600 mb-2">Free return within 15 days for Official Store items and 7 days for other eligible items.</p>
            <Link href="/" className="text-[#F68B1E] text-xs font-bold hover:underline">Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
}