import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import { ShoppingCart, ChevronRight, Laptop, Smartphone, Shirt, Home, ShoppingBag, Coffee, Heart, Dumbbell, Baby, Package, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { getDiscount, getOriginalPrice, getRating } from "@/lib/jumia-mock";

const categoryIcons: Record<string, any> = {
  "Computing": Laptop,
  "Phones & Tablets": Smartphone,
  "Fashion": Shirt,
  "Home & Office": Home,
  "Supermarket": ShoppingBag,
  "Kitchen & Dining": Coffee,
  "Health & Beauty": Heart,
  "Sporting Goods": Dumbbell,
  "Baby Products": Baby,
  "Electronics": Laptop
};

// Promo ends 2 days after the store launched (July 21 2026 00:00 UTC + 48 h)
const PROMO_END = new Date("2026-07-23T23:59:59Z").getTime();

function FlashSaleTimer() {
  const [parts, setParts] = useState<{ d: string; h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    function tick() {
      const diff = PROMO_END - Date.now();
      if (diff <= 0) {
        setParts({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setParts({
        d: d.toString().padStart(2, '0'),
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0'),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const seg = (v: string, label: string) => (
    <div className="flex flex-col items-center">
      <span className="bg-[#E53935] text-white px-2 py-0.5 rounded shadow-sm leading-tight font-bold tabular-nums">{v}</span>
      <span className="text-white/70 text-[9px] mt-0.5 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-1 font-bold text-lg">
      <span className="text-white text-sm mr-2 hidden sm:inline font-medium tracking-wide">Ends in:</span>
      <div className="flex items-center gap-1.5">
        {parts ? (
          <>
            {seg(parts.d, "days")}
            <span className="text-white/80 mb-2">:</span>
            {seg(parts.h, "hrs")}
            <span className="text-white/80 mb-2">:</span>
            {seg(parts.m, "min")}
            <span className="text-white/80 mb-2">:</span>
            {seg(parts.s, "sec")}
          </>
        ) : (
          <span className="bg-[#E53935] text-white px-2 py-0.5 rounded shadow-sm leading-tight">--:--:--:--</span>
        )}
      </div>
    </div>
  );
}

export default function Catalog() {
  const [loc] = useLocation();
  const searchString = useSearch();          // reacts to query-string changes
  const searchParams = new URLSearchParams(searchString);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: products, isLoading: isLoadingProducts } = useListProducts({ 
    search: search || undefined, 
    category: category || undefined 
  });
  const { data: categories, isLoading: isLoadingCategories } = useListCategories();
  const { addItem } = useCart();
  const { toast } = useToast();

  const isHome = !search && !category;

  return (
    <div className="space-y-4 pb-8">
      {isHome && (
        <>
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Category Menu */}
            <div className="hidden md:block w-56 shrink-0 bg-white rounded shadow-sm border border-gray-100 py-2">
              <Link href="/" className="flex items-center justify-between px-3 py-1.5 text-xs text-gray-700 hover:text-[#F68B1E] font-medium group">
                <span className="flex items-center gap-2"><ShoppingCart className="w-4 h-4"/> All Categories</span>
              </Link>
              {categories?.map((c) => (
                <Link key={c} href={`/?category=${encodeURIComponent(c)}`} className="flex items-center justify-between px-3 py-1.5 text-xs text-gray-700 hover:text-[#F68B1E] group">
                  <span className="flex items-center gap-2 capitalize">
                    {categoryIcons[c] ? React.createElement(categoryIcons[c], { className: "w-4 h-4" }) : <Package className="w-4 h-4" />}
                    {c}
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-[#F68B1E]" />
                </Link>
              ))}
            </div>

            {/* Center Banner */}
            <div className="flex-1 rounded overflow-hidden relative bg-gradient-to-br from-[#F68B1E] to-[#FF8C00] h-[280px] shadow-sm flex flex-col items-center justify-center text-center px-4 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-[0.03] rounded-full -translate-x-1/4 translate-y-1/4" />
              
              <h2 className="text-white text-5xl md:text-6xl font-black mb-2 relative z-10 drop-shadow-md">Up to 80% OFF</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-6 relative z-10">2-Day Flash Promo — Limited time only!</p>
              <button className="bg-white text-[#F68B1E] px-8 py-3 rounded text-sm font-bold shadow-lg hover:bg-gray-50 transition-colors relative z-10 uppercase">
                Shop Now
              </button>
            </div>

            {/* Right Mini Banners */}
            <div className="hidden lg:flex w-48 shrink-0 flex-col gap-4">
              <div className="flex-1 rounded shadow-sm bg-gradient-to-br from-[#3CB64A] to-[#2E7D32] flex flex-col p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
                <span className="text-white font-black text-xl leading-tight">Free<br/>Delivery</span>
                <span className="text-white/80 text-xs mt-1">On select items</span>
                <Package className="absolute bottom-[-10px] right-[-10px] w-20 h-20 text-white opacity-20" />
              </div>
              <div className="flex-1 rounded shadow-sm bg-gradient-to-br from-[#1565C0] to-[#0D47A1] flex flex-col p-4 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 translate-y-1/2" />
                <span className="text-white font-black text-xl leading-tight">New<br/>Arrivals</span>
                <span className="text-white/80 text-xs mt-1">Discover latest</span>
                <Star className="absolute top-[-10px] right-[-10px] w-20 h-20 text-white opacity-20" />
              </div>
            </div>
          </div>

          {/* Flash Sales Section */}
          <div className="bg-white rounded shadow-sm overflow-hidden mt-4 border border-gray-100">
            <div className="bg-[#E53935] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
                  <span className="bg-[#FFCF00] text-black w-6 h-6 rounded flex items-center justify-center text-sm">⚡</span>
                  Flash Sales
                </h3>
                <FlashSaleTimer />
              </div>
              <Link href="/" className="text-white text-sm font-medium hover:underline hidden sm:block">See All &gt;</Link>
            </div>
            
            <div className="p-2 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 min-w-max pb-2">
                {isLoadingProducts ? (
                  [1,2,3,4,5].map(i => (
                    <div key={i} className="w-[180px] shrink-0 p-2 space-y-2">
                      <div className="aspect-square bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                    </div>
                  ))
                ) : products?.slice(0, 6).map(product => {
                  const origPrice = getOriginalPrice(product.priceKobo, product.id);
                  const discount = getDiscount(product.id);
                  const rating = getRating(product.id);
                  
                  return (
                    <Link key={product.id} href={`/products/${product.id}`} className="w-[180px] shrink-0 p-2 hover:shadow-md transition-shadow rounded group relative bg-white flex flex-col border border-transparent hover:border-gray-100">
                      <div className="absolute top-2 right-2 bg-[#E53935] text-white text-xs font-bold px-1.5 py-0.5 rounded z-10">
                        -{discount}%
                      </div>
                      <div className="aspect-square relative mb-2">
                        {(product.images?.[0] || product.imageUrl) ? (
                          <img src={product.images?.[0] || product.imageUrl!} alt={product.name} className="w-full h-full object-cover rounded mix-blend-multiply" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                            <Package className="w-10 h-10 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="text-[13px] text-gray-800 line-clamp-2 leading-snug group-hover:text-[#F68B1E] mb-1">{product.name}</h4>
                        <div className="mt-auto">
                          <div className="font-bold text-[#F68B1E] text-[15px]">{formatNaira(product.priceKobo)}</div>
                          <div className="text-[11px] text-gray-400 line-through decoration-gray-400">{formatNaira(origPrice)}</div>
                          <div className="flex items-center text-[#3CB64A] text-[11px] font-medium mt-1">FREE Delivery</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </>
      )}

      {/* Main Product Grid */}
      <div className="bg-white rounded shadow-sm p-4 mt-4 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
          {search ? `Search results for "${search}"` : category ? `${category}` : "Top Deals"}
        </h3>
        
        {isLoadingProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="p-3 border border-transparent rounded bg-white space-y-3">
                <div className="aspect-square bg-gray-100 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2 bg-[#F68B1E] text-white font-medium rounded shadow-sm hover:bg-[#E07B10] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {products?.map((product) => {
              const origPrice = getOriginalPrice(product.priceKobo, product.id);
              const discount = getDiscount(product.id);
              const rating = getRating(product.id);

              return (
                <div key={product.id} className="group relative flex flex-col p-3 border border-transparent hover:border-gray-200 hover:shadow-lg rounded transition-all duration-300 bg-white cursor-pointer h-full">
                  <div className="absolute top-3 right-3 bg-red-100 text-[#E53935] text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                    -{discount}%
                  </div>
                  <Link href={`/products/${product.id}`} className="block flex-1 flex flex-col">
                    <div className="aspect-square relative mb-3">
                      {(product.images?.[0] || product.imageUrl) ? (
                        <img 
                          src={product.images?.[0] || product.imageUrl!} 
                          alt={product.name} 
                          className="object-cover w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 rounded">
                          <Package className="w-10 h-10 opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="text-[13px] text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-[#F68B1E] transition-colors">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-[#F5A623]">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-3 h-3 ${star <= Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-400">({rating})</span>
                      </div>
                      <div className="mt-auto">
                        <div className="text-[15px] font-bold text-[#F68B1E] leading-none mb-1">
                          {formatNaira(product.priceKobo)}
                        </div>
                        <div className="text-xs text-gray-400 line-through decoration-gray-400 mb-2">
                          {formatNaira(origPrice)}
                        </div>
                        <div className="flex items-center text-[#3CB64A] text-[10px] font-medium uppercase tracking-wide">
                          FREE Delivery
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        productId: product.id,
                        productName: product.name,
                        quantity: 1,
                        unitPriceKobo: product.priceKobo,
                        imageUrl: product.imageUrl,
                      });
                      toast({
                        title: "Item added to cart",
                        description: `${product.name} added.`,
                      });
                    }}
                    className="mt-3 w-full py-2 bg-[#F68B1E] text-white rounded font-medium text-xs sm:text-sm transition-colors hover:bg-[#E07B10] disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 shadow-md translate-y-2 group-hover:translate-y-0 hidden sm:block duration-200 uppercase"
                  >
                    ADD TO CART
                  </button>
                  {/* Mobile always visible add button */}
                  <button
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        productId: product.id,
                        productName: product.name,
                        quantity: 1,
                        unitPriceKobo: product.priceKobo,
                        imageUrl: product.imageUrl,
                      });
                      toast({
                        title: "Item added to cart",
                        description: `${product.name} added.`,
                      });
                    }}
                    className="mt-3 w-full py-2 bg-[#F68B1E] text-white rounded font-medium text-xs transition-colors hover:bg-[#E07B10] disabled:opacity-50 disabled:cursor-not-allowed sm:hidden shadow-sm uppercase"
                  >
                    ADD TO CART
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}