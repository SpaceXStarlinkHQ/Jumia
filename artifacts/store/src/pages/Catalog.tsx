import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import {
  ShoppingCart, ChevronRight, Star, Truck, Shield,
  HeadphonesIcon, RotateCcw, Package, Flame, Tag, Zap,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { getDiscount, getOriginalPrice, getRating, getReviewCount } from "@/lib/jumia-mock";
import { proxyImage } from "@/lib/imageProxy";

// Promo ends Aug 10 2026 23:59 UTC
const PROMO_END = new Date("2026-08-10T23:59:59Z").getTime();

const FLASH_BADGES = ["🔥 HOT", "⚡ FLASH", "🏷️ DEAL", "⭐ TOP", "🔥 HOT", "🆕 NEW"];

const CATEGORIES = [
  { name: "Electronics",       emoji: "📺" },
  { name: "Phones & Tablets",  emoji: "📱" },
  { name: "Home & Office",     emoji: "🏠" },
  { name: "Fashion",           emoji: "👗" },
  { name: "Computing",         emoji: "💻" },
  { name: "Supermarket",       emoji: "🛒" },
  { name: "Kitchen & Dining",  emoji: "🍳" },
  { name: "Health & Beauty",   emoji: "💄" },
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

  const labels = ["d", "h", "m", "s"];
  return (
    <div className="flex items-center gap-1">
      {parts.map((v, i, a) => (
        <span key={i} className="flex items-center gap-1">
          <span className="flex flex-col items-center">
            <span className="bg-[#0E0D0C] text-white text-sm font-black w-8 py-0.5 rounded text-center tabular-nums shadow-inner border border-white/10">{v}</span>
            <span className="text-[8px] text-white/40 font-bold mt-0.5 uppercase">{labels[i]}</span>
          </span>
          {i < a.length - 1 && <span className="text-white/40 font-black mb-3">:</span>}
        </span>
      ))}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.floor(rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-200 fill-gray-200"}`} />
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
          {/* ── Hero ────────────────────────────────────────────────────────── */}
          <div className="flex gap-3">
            {/* Category sidebar */}
            <div className="hidden lg:block w-52 shrink-0 bg-white rounded-2xl shadow-sm border border-card-border overflow-hidden">
              {CATEGORIES.map(({ name, emoji }) => (
                <Link
                  key={name}
                  href={`/?category=${encodeURIComponent(name)}`}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] text-gray-700 hover:bg-orange-50 hover:text-[#F05A28] border-b border-gray-50 last:border-0 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{emoji}</span>
                    {name}
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#F05A28] transition-colors" />
                </Link>
              ))}
            </div>

            {/* Main hero banner */}
            <div className="flex-1 relative rounded-2xl overflow-hidden min-h-[240px] shadow-xl" style={{ background: "linear-gradient(135deg, #0E0D0C 0%, #1F100A 50%, #3D1A0A 100%)" }}>
              {/* Diagonal orange slash */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: "radial-gradient(ellipse 60% 80% at 75% 50%, #F05A28 0%, transparent 70%)",
                }}
              />
              {/* Dot texture */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />

              {/* Copy */}
              <div className="relative z-10 p-6 md:p-10 max-w-sm">
                <span className="inline-flex items-center gap-1.5 bg-[#FFCF00] text-[#0E0D0C] text-[10px] font-black px-3 py-1 rounded-full mb-4 animate-badge-pop uppercase tracking-wider shadow-lg">
                  <Flame className="w-3 h-3" /> Flash Promo — Ends Aug 10
                </span>
                <div className="mb-2">
                  <span className="text-white/60 font-bold text-sm uppercase tracking-widest block mb-1">Up to</span>
                  <span className="font-black leading-none block" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", lineHeight: 1, background: "linear-gradient(135deg, #FF9A5C 0%, #FFCF00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>80%</span>
                  <span className="text-white font-black text-4xl md:text-5xl leading-none block -mt-1">OFF</span>
                </div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Appliances, phones, TVs &amp; more.<br />
                  Limited stock — gone when it's gone.
                </p>
                <Link
                  href="/?category=Electronics"
                  className="inline-flex items-center gap-2 font-black px-7 py-3 rounded-xl text-[#0E0D0C] text-sm uppercase tracking-wide shadow-xl hover:scale-105 transition-transform duration-200"
                  style={{ background: "linear-gradient(135deg, #FFCF00 0%, #FF9A3C 100%)" }}
                >
                  <Zap className="w-4 h-4" /> Shop Flash Deals
                </Link>
              </div>

              {/* Floating product image */}
              <div className="absolute right-4 md:right-8 bottom-0 hidden md:block">
                <img
                  src="https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314"
                  alt=""
                  className="h-52 object-contain drop-shadow-2xl animate-float"
                  style={{ filter: "drop-shadow(0 16px 32px rgba(240,90,40,0.4))" }}
                />
              </div>

              {/* Bottom edge glow */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F05A28]/50 to-transparent" />
            </div>

            {/* Side banners */}
            <div className="hidden xl:flex w-44 shrink-0 flex-col gap-3">
              <div className="flex-1 rounded-2xl p-4 flex flex-col justify-between shadow-md overflow-hidden relative" style={{ background: "linear-gradient(135deg, #1B6B2F 0%, #3FC75A 100%)" }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
                <Truck className="w-7 h-7 text-white/80 relative z-10" />
                <div className="relative z-10">
                  <div className="text-white font-black text-lg leading-tight">Free<br />Delivery</div>
                  <div className="text-white/60 text-[11px] mt-1">Orders above ₦50k</div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 flex flex-col justify-between shadow-md overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)" }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
                <Shield className="w-7 h-7 text-white/80 relative z-10" />
                <div className="relative z-10">
                  <div className="text-white font-black text-lg leading-tight">100%<br />Secure</div>
                  <div className="text-white/60 text-[11px] mt-1">Paystack protected</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Trust bar ───────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Shield,          label: "Paystack Secured", sub: "Every transaction protected",  color: "#1976D2" },
              { icon: Truck,           label: "Free Delivery",     sub: "On orders above ₦50,000",      color: "#3FC75A" },
              { icon: HeadphonesIcon,  label: "24/7 Support",      sub: "Chat, call & WhatsApp",        color: "#F05A28" },
              { icon: RotateCcw,       label: "Easy Returns",      sub: "15-day hassle-free return",    color: "#8B5CF6" },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-card-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <div className="text-[12px] font-black text-gray-800">{label}</div>
                  <div className="text-[10px] text-gray-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Category strip ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-card-border p-4 lg:hidden">
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(({ name, emoji }) => (
                <Link
                  key={name}
                  href={`/?category=${encodeURIComponent(name)}`}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-orange-50 hover:text-[#F05A28] transition-colors group"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[10px] text-gray-600 font-semibold text-center group-hover:text-[#F05A28] leading-tight">{name.split(" ")[0]}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Flash Sales ─────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm border border-card-border overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #C41C1C 0%, #E53935 40%, #FF6B35 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FFCF00] w-8 h-8 rounded-lg flex items-center justify-center shadow-md animate-glow-pulse">
                    <Zap className="w-4 h-4 text-[#0E0D0C] fill-[#0E0D0C]" />
                  </div>
                  <span className="text-white font-black text-xl tracking-tight drop-shadow">Flash Sales</span>
                </div>
                <FlashTimer />
              </div>
              <Link href="/" className="text-white/80 hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
                See All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4">
              {isLoading ? (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="rounded-xl border border-card-border p-2.5 space-y-2">
                      <div className="aspect-square bg-muted animate-pulse rounded-xl" />
                      <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
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
                        className="group relative rounded-xl border border-card-border card-hover bg-white p-2.5 flex flex-col"
                      >
                        {/* Discount badge */}
                        <div className="absolute top-2 left-2 z-10 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm" style={{ background: "linear-gradient(135deg, #C41C1C, #FF6B35)" }}>
                          -{discount}%
                        </div>
                        {/* Flash badge */}
                        <div className="absolute top-2 right-2 z-10 text-[10px] bg-[#0E0D0C]/75 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md whitespace-nowrap">
                          {badge}
                        </div>

                        <div className="aspect-square mb-2 rounded-xl overflow-hidden bg-gray-50">
                          {img ? (
                            <img src={proxyImage(img)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-400" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package className="w-8 h-8 opacity-50" />
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug mb-1.5 group-hover:text-[#F05A28] transition-colors font-medium">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                          <Stars rating={rating} />
                          <span className="text-[10px] text-gray-400">({reviews})</span>
                        </div>
                        <div className="font-black text-[#F05A28] text-[14px] leading-none">
                          {formatNaira(product.priceKobo)}
                        </div>
                        <div className="text-[10px] text-gray-400 line-through">
                          {formatNaira(origPrice)}
                        </div>
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="mt-1.5">
                            <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                              <span>Selling fast</span>
                              <span className="text-[#E8321A] font-bold">Only {product.stock} left!</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${100 - (product.stock / 20 * 100)}%`, background: "linear-gradient(90deg, #C41C1C, #FF6B35)" }} />
                            </div>
                          </div>
                        )}
                        <div className="text-[#3FC75A] text-[10px] font-bold mt-1">✓ Free Delivery</div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Product Grid ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-card-border p-5">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-card-border">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: "linear-gradient(180deg, #F05A28, #FFCF00)" }} />
            {search ? `Results for "${search}"` : category ? category : "Top Deals"}
          </h2>
          {isHome && (
            <Link href="/" className="text-[#F05A28] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-xl border border-card-border p-3 space-y-2">
                <div className="aspect-square bg-muted animate-pulse rounded-xl" />
                <div className="h-3 bg-muted animate-pulse rounded w-full" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-black text-gray-800">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2.5 text-white font-black rounded-xl shadow-sm hover:scale-105 transition-transform text-sm" style={{ background: "linear-gradient(135deg, #F05A28, #FFCF00 200%)" }}>
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
                  className="group relative rounded-xl border border-card-border card-hover bg-white p-3 flex flex-col"
                >
                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md z-10 shadow-sm" style={{ background: "linear-gradient(135deg, #F05A28, #FFCF00)" }}>
                    -{discount}%
                  </div>

                  <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
                    <div className="aspect-square mb-3 rounded-xl overflow-hidden bg-gray-50">
                      {img ? (
                        <img src={proxyImage(img)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package className="w-8 h-8 opacity-50" />
                        </div>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-700 line-clamp-2 leading-snug mb-2 flex-1 group-hover:text-[#F05A28] transition-colors font-medium">
                      {product.name}
                    </p>
                    <Stars rating={rating} />
                    <div className="mt-2">
                      <div className="font-black text-[#F05A28] text-base leading-none">
                        {formatNaira(product.priceKobo)}
                      </div>
                      <div className="text-[11px] text-gray-400 line-through mb-1">
                        {formatNaira(origPrice)}
                      </div>
                      <div className="text-[#3FC75A] text-[10px] font-bold">✓ Free Delivery</div>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="mt-3 w-full text-white rounded-xl py-2 text-[11px] font-black opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 uppercase tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed hidden sm:block"
                    style={{ background: "linear-gradient(135deg, #F05A28, #FF9A3C)" }}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  {/* Mobile: always visible */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="mt-2 w-full text-white rounded-xl py-1.5 text-[11px] font-black uppercase shadow-sm disabled:opacity-50 sm:hidden"
                    style={{ background: "linear-gradient(135deg, #F05A28, #FF9A3C)" }}
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
