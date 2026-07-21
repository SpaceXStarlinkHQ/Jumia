import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useGetProduct } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart, Package, Plus, Minus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id, 10);
  const [, setLocation] = useLocation();
  const { data: product, isLoading, error } = useGetProduct(productId, {
    query: { enabled: !isNaN(productId), queryKey: ["/api/products", productId] }
  });
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 aspect-square bg-muted rounded-2xl" />
        <div className="w-full md:w-1/2 space-y-4 pt-4">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-10 bg-muted rounded w-3/4" />
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-32 bg-muted rounded w-full mt-8" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="text-primary font-medium hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPriceKobo: product.priceKobo,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity,
      unitPriceKobo: product.priceKobo,
      imageUrl: product.imageUrl,
    });
    setLocation("/cart");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square bg-muted rounded-2xl overflow-hidden border">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50">
              <Package className="w-16 h-16 mb-2" />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        <div className="flex flex-col pt-2 lg:pt-8">
          <div className="text-sm font-medium text-primary mb-2 capitalize tracking-wide">{product.category}</div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
          <div className="text-3xl font-semibold mb-6">{formatNaira(product.priceKobo)}</div>
          
          <div className="prose prose-sm md:prose-base text-muted-foreground mb-8">
            <p>{product.description || "No description provided for this product."}</p>
          </div>

          <div className="mt-auto border-t pt-8">
            {product.stock > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border rounded-lg h-10">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors border"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    Buy it Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-muted rounded-xl text-center">
                <h3 className="font-semibold text-foreground">Out of Stock</h3>
                <p className="text-sm text-muted-foreground mt-1">Check back later for restocks.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
