import { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useGetProduct, useListProducts } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ShoppingCart, Package, Plus, Minus, Star, Truck, ShieldCheck, ZoomIn, RotateCcw, Clock } from "lucide-react";
import { NoImage } from "@/components/ui/no-image";
import { getDiscount, getOriginalPrice, getRating, getReviewCount } from "@/lib/jumia-mock";
import { proxyImage } from "@/lib/imageProxy";
import React from "react";

// ── Delivery estimate ─────────────────────────────────────────────────────────
// Dynamically calculates 3–4 business days from now (skips weekends).
// Orders placed before 3:00 PM dispatch same day (+3 business days);
// orders after 3:00 PM dispatch next working day (+4 business days).
function getDeliveryEstimate(): string {
  const now = new Date();
  const hourNow = now.getHours();
  const daysToAdd = hourNow < 15 ? 3 : 4;
  const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const est = new Date(now);
  let added = 0;
  while (added < daysToAdd) {
    est.setDate(est.getDate() + 1);
    const dow = est.getDay();
    if (dow !== 0 && dow !== 6) added++; // skip weekends
  }
  return `${days[est.getDay()]}, ${months[est.getMonth()]} ${est.getDate()}`;
}

// ── Brand extraction ─────────────────────────────────────────────────────────
// Derives the brand name from the product title for affinity-based sorting.
const KNOWN_BRANDS = [
  "Polo Ralph Lauren", "Ralph Lauren",     // longest first — greedy match
  "LG", "Samsung", "Hisense", "Haier", "Thermocool", "Firman", "Sumec", "Scanfrost",
  "HP", "Lenovo", "Logitech", "Apple", "Tecno", "Infinix", "Anker", "Soundcore",
  "Nike", "Decathlon", "Domyos",
  "Dangote", "Milo", "Nestlé", "Nestle", "Indomie",
  "Binatone", "Fisher-Price", "Pampers", "Philips", "Neutrogena", "ORS",
  "Baby Trend", "Morning Glory",
] as const;

function extractBrand(productName: string): string {
  const lower = productName.toLowerCase();
  for (const brand of KNOWN_BRANDS) {
    if (lower.includes(brand.toLowerCase())) return brand;
  }
  return "";
}

// ── Product image validation ──────────────────────────────────────────────────
// Returns true if all required fields are present and internally consistent.
function isProductConsistent(product: {
  name: string;
  imageUrl: string | null | undefined;
  images: string[];
  description: string;
  priceKobo: number;
}): { ok: boolean; warnings: string[] } {
  const warnings: string[] = [];
  if (!product.name || product.name.trim().length < 3) warnings.push("Product name is missing or too short.");
  if (!product.description || product.description.trim().length < 20) warnings.push("Description is missing.");
  if (product.priceKobo <= 0) warnings.push("Price is zero or negative.");
  if (!product.images || product.images.length === 0) warnings.push("No product images available.");
  else if (product.imageUrl && product.images[0] !== product.imageUrl) warnings.push("Primary image mismatch.");
  return { ok: warnings.length === 0, warnings };
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const [, setLocation] = useLocation();
  const { data: product, isLoading, error } = useGetProduct(productId, {
    query: { enabled: !isNaN(productId), queryKey: ["/api/products", productId] }
  });

  // Fetch related products by category; also fetch same-brand products across all categories
  const { data: relatedProducts } = useListProducts(
    { category: product?.category },
    { query: { enabled: !!product?.category, queryKey: ["/api/products", { category: product?.category }] } }
  );

  // Compute sorted, deduplicated, brand-affinity related product list
  const sortedRelated = React.useMemo(() => {
    if (!relatedProducts || !product) return [];

    const currentBrand = extractBrand(product.name);
    const seen = new Set<number>();
    seen.add(product.id); // exclude current product

    // De-duplicate and split into same-brand vs other
    const sameBrand: typeof relatedProducts = [];
    const otherBrand: typeof relatedProducts = [];

    for (const rp of relatedProducts) {
      if (seen.has(rp.id)) continue;
      seen.add(rp.id);
      const rpBrand = extractBrand(rp.name);
      if (currentBrand && rpBrand === currentBrand) {
        sameBrand.push(rp);
      } else {
        otherBrand.push(rp);
      }
    }

    // Same brand first, then others — cap total at 10
    return [...sameBrand, ...otherBrand].slice(0, 10);
  }, [relatedProducts, product]);

  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 w-1/3 rounded" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[480px] space-y-2">
            <div className="aspect-square bg-gray-200 rounded border border-gray-100" />
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="w-20 h-20 bg-gray-200 rounded" />)}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4 pt-2">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-1/2 mt-4" />
            <div className="h-32 bg-gray-200 rounded w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white p-12 text-center rounded shadow-sm border border-gray-100">
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link href="/" className="bg-[#F68B1E] text-white px-6 py-2.5 rounded font-bold uppercase text-sm inline-block hover:bg-[#E07B10]">Return to Home</Link>
      </div>
    );
  }

  const origPrice = getOriginalPrice(product.priceKobo, product.id);
  const discount = getDiscount(product.id);
  const rating = getRating(product.id);
  const reviewCount = getReviewCount(product.id);

  // Build full image list: prefer images array, fall back to imageUrl
  const allImages: string[] = (product.images && product.images.length > 0)
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : [];

  const mainImage = allImages[selectedImageIdx] ?? null;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPriceKobo: product.priceKobo,
      imageUrl: allImages[0] ?? product.imageUrl,
    });
    toast({ title: "Added to cart", description: `${quantity}x ${product.name} added.` });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPriceKobo: product.priceKobo,
      imageUrl: allImages[0] ?? product.imageUrl,
    });
    setLocation("/cart");
  };

  return (
    <div className="pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500 mb-4 gap-1.5 min-w-0">
        <Link href="/" className="hover:text-gray-800 shrink-0">Home</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-800 capitalize shrink-0">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-gray-800 font-medium truncate min-w-0">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Left: Image gallery — Left Rail layout */}
        <div className="w-full md:w-[400px] lg:w-[480px] shrink-0">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-row gap-3 items-start">

            {/* Vertical thumbnail rail (only when multiple images) */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-2.5 shrink-0">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-[68px] h-[68px] rounded-xl overflow-hidden border-2 bg-white transition-all duration-200 flex items-center justify-center ${
                      selectedImageIdx === idx
                        ? "border-[#F68B1E] shadow-sm ring-4 ring-[#F68B1E]/10"
                        : "border-gray-100 hover:border-[#F68B1E]/50"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={proxyImage(img)}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-multiply p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fb) fb.hidden = false;
                      }}
                    />
                    <div hidden className="absolute inset-0"><NoImage iconSize={20} label="" /></div>
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative rounded-xl bg-gray-50/60 overflow-hidden group aspect-square flex items-center justify-center min-h-[280px] md:min-h-[340px]">
              {mainImage ? (
                <>
                  {/* Counter badge */}
                  {allImages.length > 1 && (
                    <div className="absolute top-3 right-3 z-10 bg-[#111] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {selectedImageIdx + 1} / {allImages.length}
                    </div>
                  )}

                  {/* Image */}
                  <img
                    key={mainImage}
                    src={proxyImage(mainImage) ?? ""}
                    alt={`${product.name} — view ${selectedImageIdx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain mix-blend-multiply p-6 transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fb = document.getElementById("main-img-fallback");
                      if (fb) fb.hidden = false;
                    }}
                  />
                  <div id="main-img-fallback" hidden className="absolute inset-0">
                    <NoImage iconSize={48} label="Image not available" />
                  </div>

                  {/* Zoom overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-3 rounded-full shadow-lg">
                      <ZoomIn className="w-5 h-5 text-[#111] stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Model badge bottom-left */}
                  <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                    <span className="text-[10px] font-bold text-[#111] uppercase tracking-widest">
                      {product.name.split("—")[1]?.trim() || product.category}
                    </span>
                  </div>
                </>
              ) : (
                <NoImage iconSize={64} label="No Image Available" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 bg-white p-4 sm:p-6 rounded shadow-sm border border-gray-100 flex flex-col">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-800 leading-snug mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <div className="flex text-[#F5A623]">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className={`w-4 h-4 ${star <= Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">({reviewCount} verified ratings)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-3xl font-bold text-gray-900 leading-none">{formatNaira(product.priceKobo)}</span>
              <span className="text-gray-400 line-through text-lg">{formatNaira(origPrice)}</span>
              <span className="bg-red-100 text-[#E53935] text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Few units left</div>
            <div className="flex flex-col gap-1.5 mt-3">
              <div className="flex items-center text-[#3CB64A] text-sm font-medium gap-1.5">
                <Truck className="w-4 h-4 shrink-0" />
                <span>FREE Delivery</span>
                <span className="text-gray-400 font-normal normal-case text-xs">· Est. arrival: <strong className="text-gray-700">{getDeliveryEstimate()}</strong></span>
              </div>
              <div className="flex items-center text-gray-500 text-xs gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0 text-[#F68B1E]" />
                Order before <strong className="text-gray-700">3:00 PM</strong> for faster dispatch
              </div>
              <div className="flex items-center text-gray-500 text-xs gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 shrink-0 text-[#3CB64A]" />
                15-day free returns · No questions asked
              </div>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-sm font-medium text-gray-800 mb-2 block">Quantity</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded h-10 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-[#F68B1E] transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm font-medium text-[#3CB64A]">In Stock ({product.stock} units)</span>
            </div>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mb-8 pb-8 border-b border-gray-100 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 py-3 px-6 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm uppercase"
            >
              <ShoppingCart className="w-5 h-5 fill-current" /> ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 py-3 px-6 bg-[#FFCF00] text-black font-bold rounded shadow-md hover:bg-[#E5BA00] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm uppercase"
            >
              BUY NOW
            </button>
          </div>

          <div className="bg-gray-50 rounded border border-gray-100 p-4">
            <div className="text-xs text-gray-500 uppercase font-bold mb-2">Sold by</div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 text-lg">BigDeals Nigeria</span>
              <span className="border border-[#3CB64A] text-[#3CB64A] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED SELLER
              </span>
            </div>
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">98%</span>
                <span className="text-gray-500 text-xs">Seller Score</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">50k+</span>
                <span className="text-gray-500 text-xs">Happy Buyers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">4 yrs</span>
                <span className="text-gray-500 text-xs">On Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-white rounded shadow-sm border border-gray-100 mb-4 overflow-hidden">
        <h3 className="bg-white text-gray-800 font-medium px-4 py-3 border-b border-gray-100 text-lg">Product Details</h3>
        <div className="p-4 sm:p-6 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description || "No description provided for this product. Check back later for more details from the seller."}
        </div>
      </div>

      {/* You May Also Like — sorted by brand affinity, deduplicated, max 10 */}
      {sortedRelated.length > 0 && (
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="bg-white text-gray-800 font-medium px-4 py-3 border-b border-gray-100 text-lg">You May Also Like</h3>
          <div className="p-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max pb-2">
              {sortedRelated.map(rp => {
                const rpOrigPrice = getOriginalPrice(rp.priceKobo, rp.id);
                const rpDiscount = getDiscount(rp.id);
                const rpRating = getRating(rp.id);
                const rpImg = (rp.images && rp.images.length > 0) ? rp.images[0] : rp.imageUrl;
                const rpBrand = extractBrand(rp.name);
                const currentBrand = extractBrand(product.name);
                const isSameBrand = currentBrand && rpBrand === currentBrand;

                return (
                  <Link key={rp.id} href={`/products/${rp.id}`} className="w-[180px] shrink-0 p-2 hover:shadow-md transition-shadow rounded group bg-white flex flex-col border border-transparent hover:border-gray-200 relative">
                    <div className="absolute top-2 right-2 bg-red-100 text-[#E53935] text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                      -{rpDiscount}%
                    </div>
                    {isSameBrand && (
                      <div className="absolute top-2 left-2 bg-[#F68B1E]/10 text-[#F68B1E] text-[9px] font-bold px-1.5 py-0.5 rounded z-10 uppercase tracking-wide">
                        {rpBrand}
                      </div>
                    )}
                    <div className="aspect-square relative mb-2 overflow-hidden rounded">
                      {rpImg ? (
                        <>
                          <img
                            src={proxyImage(rpImg)}
                            alt={rp.name}
                            loading="lazy"
                            className="w-full h-full object-contain mix-blend-multiply p-1"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                              if (fb) fb.hidden = false;
                            }}
                          />
                          <div hidden className="absolute inset-0"><NoImage iconSize={24} label="" /></div>
                        </>
                      ) : (
                        <NoImage iconSize={24} label="" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="text-[13px] text-gray-800 line-clamp-2 leading-tight group-hover:text-[#F68B1E] mb-1">{rp.name}</h4>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-[#F5A623]">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className={`w-2.5 h-2.5 ${star <= Math.floor(rpRating) ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="font-bold text-[#F68B1E] text-[15px] leading-none mb-1">{formatNaira(rp.priceKobo)}</div>
                        <div className="text-xs text-gray-400 line-through decoration-gray-400">{formatNaira(rpOrigPrice)}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sticky purchase bar — slides in when CTAs scroll out of view */}
      {product && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
            stickyVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 py-3 flex items-center gap-4 max-w-screen-xl mx-auto">
            {/* Thumbnail */}
            {product.images?.[0] && (
              <img
                src={proxyImage(product.images[0])}
                alt=""
                className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-100 shrink-0 mix-blend-multiply p-0.5"
              />
            )}
            {/* Name + price */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight">{product.name}</p>
              <p className="text-base font-bold text-[#F68B1E] leading-tight">{formatNaira(product.priceKobo)}</p>
            </div>
            {/* CTA */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="shrink-0 flex items-center gap-2 bg-[#F68B1E] hover:bg-[#E07B10] active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 fill-current" />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
