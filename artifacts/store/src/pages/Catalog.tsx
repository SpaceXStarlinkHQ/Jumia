import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import {
  ShoppingCart, ChevronRight, Star, Truck, Shield,
  HeadphonesIcon, RotateCcw, Package, Flame, Tag,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { getDiscount, getOriginalPrice, getRating, getReviewCount } from "@/lib/jumia-mock";
import { proxyImage } from "@/lib/imageProxy";

// Promo ends July 31 2026 23:59 UTC
const PROMO_END = new Date("2026-07-31T23:59:59Z").getTime();

const FLASH_BADGES = ["🔥 HOT", "⚡ FLASH", "🏷️ DEAL", "⭐ TOP", "🔥 HOT", "🆕 NEW"];

const CATEGORIES = [
  "Electronics", "Phones & Tablets", "Home & Office", "Fashion",
  "Computing", "Supermarket", "Kitchen & Dining", "Health & Beauty",
];

function FlashTimer() {
  const [parts, setParts] = useState<[string, string, string, string] | null>(null);

  useEffect(() => {
    function tick() {
      const diff = PROMO_END - Date.now();
      if (diff <= 0) { setParts(["00", "00", "00", "00"]); return; }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      setParts([
        d.toString().padStart(2, "0"),
        (h % 24).toString().padStart(2, "0"),
        m.toString().padStart(2, "0"),
        s.toString().padStart(2, "0"),
      ]);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) return null;
  return (
    <div className="flex items-center gap-1.5">
      {parts.map((v, i, a) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="bg-white/20 backdrop-blur text-white text-sm font-black px-2.5 py-1 rounded-lg tabular-nums">{v}</span>
          {i < a.length - 1 && <span className="text-white/60 font-bold">:</span>}
        </span>
      ))}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.floor(rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-300 fill-gray-300"}`} />
      ))}
    </div>
  );
}

export default function Catalog() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: products, isLoading } = useListProducts({
    search: search || undefined,
    category: category || undefined,
  });
  const { addItem } = useCart();
  const { toast } = useToast();

  const isHome = !search && !category;

  const handleAddToCart = (e: React.MouseEvent, product: NonNullable<typeof products>[0]) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPriceKobo: product.priceKobo,
      imageUrl: product.images?.[0] ?? product.imageUrl ?? undefined,
    });
    toast({ title: "Added to cart", description: `${product.name} added.` });
  };

  return (
    <div className="space-y-4 pb-8">
      {isHome && (
        <>
          {/* Hero */}
          <div className="flex gap-3">
            {/* Category sidebar */}
            <div className="hidden lg:block w-52 shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {CATEGORIES.map(c => (
                <Link
                  key={c}
                  href={`/?category=${encodeURIComponent(c)}`}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] text-gray-700 hover:bg-orange-50 hover:text-[#F68B1E] border-b border-gray-50 last:border-0 transition-colors"
                >
                  {c}
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </Link>
              ))}
            </div>

            {/* Main banner */}
            <div className="flex-1 relative rounded-xl overflow-hidden min-h-[220px] bg-gradient-to-r from-[#1A1A1A] via-[#2D1810] to-[#F68B1E] flex items-center p-6 md:p-8 shadow-xl">
              <div
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E\")" }}
              />
              <div className="relative z-10 max-w-xs">
                <span className="inline-flex items-center gap-1.5 bg-[#FFCF00] text-[#1A1A1A] text-[11px] font-black px-3 py-1 rounded-full mb-3">
                  <Flame className="w-3 h-3" /> FLASH PROMO — ENDS JULY 31
                </span>
                <h1 className="text-white font-black text-4xl md:text-5xl leading-none mb-2">
                  Up to<br /><span className="text-[#FFCF00]">80% OFF</span>
                </h1>
                <p className="text-white/70 text-sm mb-5">
                  Appliances, phones, TVs &amp; more.<br />
                  Limited stock — shop now before it's gone.
                </p>
                <Link
                  href="/?category=Home+%26+Office"
                  className="inline-block bg-[#F68B1E] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#E07B10] transition-all shadow-xl hover:scale-105 duration-200 uppercase text-sm tracking-wide"
                >
                  Shop Flash Deals →
                </Link>
              </div>
              <div className="absolute right-6 bottom-0 hidden md:block opacity-90">
                <img
                  src="https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314"
                  alt=""
                  className="h-48 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Side banners */}
            <div className="hidden xl:flex w-44 shrink-0 flex-col gap-3">
              <div className="flex-1 rounded-xl bg-gradient-to-br from-[#3CB64A] to-[#1B5E20] p-4 flex flex-col justify-between shadow-md">
                <Truck className="w-7 h-7 text-white/70" />
                <div>
                  <div className="text-white font-black text-lg leading-tight">Free<br />Delivery</div>
                  <div className="text-white/70 text-[11px] mt-1">Orders above ₦50k</div>
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#0D47A1] p-4 flex flex-col justify-between shadow-md">
                <Shield className="w-7 h-7 text-white/70" />
                <div>
                  <div className="text-white font-black text-lg leading-tight">100%<br />Secure</div>
                  <div className="text-white/70 text-[11px] mt-1">Paystack protected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Shield, label: "Paystack Secured", sub: "Every transaction protected" },
              { icon: Truck, label: "Free Delivery", sub: "On orders above ₦50,000" },
              { icon: HeadphonesIcon, label: "24/7 Support", sub: "Chat, call & WhatsApp" },
              { icon: RotateCcw, label: "Easy Returns", sub: "15-day hassle-free return" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#F68B1E]" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-gray-800">{label}</div>
                  <div className="text-[10px] text-gray-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Flash Sales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#E53935] to-[#C62828] px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 text-white font-black text-xl">
                  <span className="bg-[#FFCF00] text-black w-7 h-7 rounded flex items-center justify-center text-base">⚡</span>
                  Flash Sales
                </span>
                <FlashTimer />
              </div>
              <Link href="/" className="text-white text-sm font-semibold hover:underline flex items-center gap-1">
                See All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4">
              {isLoading ? (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="rounded-xl border border-gray-100 p-2.5 space-y-2">
                      <div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
                      <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {(products ?? []).slice(0, 6).map((product, idx) => {
                    const origPrice = getOriginalPrice(product.priceKobo, product.id);
                    const discount = getDiscount(product.id);
                    const rating = getRating(product.id);
                    const reviews = getReviewCount(product.id);
                    const img = product.images?.[0] ?? product.imageUrl;
                    const badge = FLASH_BADGES[idx] ?? "🔥 HOT";

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group relative rounded-xl border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-200 bg-white p-2.5 flex flex-col"
                      >
                        <div className="absolute top-2 left-2 z-10 bg-[#E53935] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">
                          -{discount}%
                        </div>
                        <div className="absolute top-2 right-2 z-10 text-[10px] bg-gray-900/80 text-white px-1.5 py-0.5 rounded-md whitespace-nowrap">
                          {badge}
                        </div>
                        <div className="aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                          {img ? (
                            <img src={proxyImage(img)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package className="w-8 h-8 opacity-50" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug mb-1.5 group-hover:text-[#F68B1E] transition-colors">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                          <Stars rating={rating} />
                          <span className="text-[10px] text-gray-400">({reviews})</span>
                        </div>
                        <div className="font-black text-[#F68B1E] text-[14px] leading-none">
                          {formatNaira(product.priceKobo)}
                        </div>
                        <div className="text-[10px] text-gray-400 line-through">
                          {formatNaira(origPrice)}
                        </div>
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="mt-1.5">
                            <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                              <span>Selling fast</span>
                              <span className="text-[#E53935] font-bold">Only {product.stock} left!</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#E53935] rounded-full" style={{ width: `${100 - (product.stock / 20 * 100)}%` }} />
                            </div>
                          </div>
                        )}
                        <div className="text-[#3CB64A] text-[10px] font-semibold mt-1">✓ Free Delivery</div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Product grid — Top Deals / Search / Category results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#F68B1E]" />
            {search ? `Results for "${search}"` : category ? category : "Top Deals"}
          </h2>
          {isHome && (
            <Link href="/" className="text-[#F68B1E] text-sm font-semibold flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-xl border border-gray-100 p-3 space-y-2">
                <div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {products?.map(product => {
              const origPrice = getOriginalPrice(product.priceKobo, product.id);
              const discount = getDiscount(product.id);
              const rating = getRating(product.id);
              const img = product.images?.[0] ?? product.imageUrl;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-xl border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 bg-white p-3 flex flex-col"
                >
                  <div className="absolute top-3 right-3 bg-[#FFF3E0] text-[#F68B1E] text-[10px] font-black px-1.5 py-0.5 rounded-md z-10">
                    -{discount}%
                  </div>
                  <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                      {img ? (
                        <img src={proxyImage(img)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package className="w-8 h-8 opacity-50" />
                        </div>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-700 line-clamp-2 leading-snug mb-2 flex-1 group-hover:text-[#F68B1E] transition-colors">
                      {product.name}
                    </p>
                    <Stars rating={rating} />
                    <div className="mt-2">
                      <div className="font-black text-[#F68B1E] text-base leading-none">
                        {formatNaira(product.priceKobo)}
                      </div>
                      <div className="text-[11px] text-gray-400 line-through mb-1">
                        {formatNaira(origPrice)}
                      </div>
                      <div className="text-[#3CB64A] text-[10px] font-semibold">✓ Free Delivery</div>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="mt-3 w-full bg-[#F68B1E] text-white rounded-lg py-2 text-[11px] font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 uppercase tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  {/* Mobile: always visible */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="mt-2 w-full bg-[#F68B1E] text-white rounded-lg py-1.5 text-[11px] font-bold uppercase shadow-sm disabled:opacity-50 sm:hidden"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
