import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useGetProduct, useListProducts } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ShoppingCart, Package, Plus, Minus, Star, Truck, ShieldCheck, ZoomIn } from "lucide-react";
import { getDiscount, getOriginalPrice, getRating, getReviewCount } from "@/lib/jumia-mock";
import React from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const [, setLocation] = useLocation();
  const { data: product, isLoading, error } = useGetProduct(productId, {
    query: { enabled: !isNaN(productId), queryKey: ["/api/products", productId] }
  });

  const { data: relatedProducts } = useListProducts(
    { category: product?.category },
    { query: { enabled: !!product?.category, queryKey: ["/api/products", { category: product?.category }] } }
  );

  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

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
      <div className="flex items-center text-xs text-gray-500 mb-4 gap-2 whitespace-nowrap overflow-hidden">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-800 capitalize truncate">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="text-gray-800 truncate">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Left: Image gallery */}
        <div className="w-full md:w-[400px] lg:w-[480px] shrink-0 space-y-2">
          {/* Main image */}
          <div className="bg-white rounded shadow-sm border border-gray-100 p-4 flex items-center justify-center min-h-[300px] md:min-h-[380px] relative group overflow-hidden">
            {mainImage ? (
              <>
                <img
                  key={mainImage}
                  src={mainImage}
                  alt={`${product.name} — view ${selectedImageIdx + 1}`}
                  className="w-full max-w-[380px] aspect-square object-contain mix-blend-multiply transition-all duration-300"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full p-1.5">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 left-3 bg-black/30 text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                    {selectedImageIdx + 1} / {allImages.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-square flex flex-col items-center justify-center text-gray-300">
                <Package className="w-24 h-24 mb-4 opacity-50" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-[80px] h-[80px] shrink-0 rounded border-2 overflow-hidden bg-white flex items-center justify-center transition-all duration-150 ${
                    selectedImageIdx === idx
                      ? "border-[#F68B1E] shadow-sm"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply p-1"
                  />
                </button>
              ))}
            </div>
          )}
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
            <div className="flex items-center text-[#3CB64A] text-sm font-medium uppercase tracking-wide gap-1.5 mt-2">
              <Truck className="w-4 h-4" /> FREE Delivery
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

          <div className="flex flex-col sm:flex-row gap-3 mb-8 pb-8 border-b border-gray-100 mt-auto">
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
              <span className="font-bold text-gray-800 text-lg">Jumia</span>
              <span className="border border-[#F68B1E] text-[#F68B1E] text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> JUMIA VERIFIED
              </span>
            </div>
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">92%</span>
                <span className="text-gray-500 text-xs">Seller Score</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">100k+</span>
                <span className="text-gray-500 text-xs">Followers</span>
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

      {/* You May Also Like */}
      {relatedProducts && relatedProducts.length > 1 && (
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="bg-white text-gray-800 font-medium px-4 py-3 border-b border-gray-100 text-lg">You May Also Like</h3>
          <div className="p-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max pb-2">
              {relatedProducts.filter(p => p.id !== product.id).map(rp => {
                const rpOrigPrice = getOriginalPrice(rp.priceKobo, rp.id);
                const rpDiscount = getDiscount(rp.id);
                const rpRating = getRating(rp.id);
                const rpImg = (rp.images && rp.images.length > 0) ? rp.images[0] : rp.imageUrl;

                return (
                  <Link key={rp.id} href={`/products/${rp.id}`} className="w-[180px] shrink-0 p-2 hover:shadow-md transition-shadow rounded group bg-white flex flex-col border border-transparent hover:border-gray-200 relative">
                    <div className="absolute top-2 right-2 bg-red-100 text-[#E53935] text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                      -{rpDiscount}%
                    </div>
                    <div className="aspect-square relative mb-2">
                      {rpImg ? (
                        <img src={rpImg} alt={rp.name} className="w-full h-full object-cover rounded mix-blend-multiply" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                          <Package className="w-8 h-8 opacity-50" />
                        </div>
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
    </div>
  );
}
