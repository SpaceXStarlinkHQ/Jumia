import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalKobo, itemCount } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Discover our collection of premium products.
        </p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart ({itemCount})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 p-4 border rounded-xl bg-card">
              <Link href={`/products/${item.productId}`} className="w-24 h-24 shrink-0 bg-muted rounded-lg overflow-hidden border">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                )}
              </Link>
              
              <div className="flex flex-col flex-1 py-1">
                <div className="flex justify-between items-start">
                  <Link href={`/products/${item.productId}`} className="font-semibold text-lg hover:underline line-clamp-1">
                    {item.productName}
                  </Link>
                  <div className="font-bold text-lg whitespace-nowrap ml-4">
                    {formatNaira(item.unitPriceKobo * item.quantity)}
                  </div>
                </div>
                
                <div className="text-muted-foreground text-sm mt-1">
                  {formatNaira(item.unitPriceKobo)} each
                </div>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <div className="flex items-center border rounded-lg h-9 bg-background">
                    <button 
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-9 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="border rounded-xl p-6 bg-card sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">{formatNaira(totalKobo)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl tracking-tight text-primary">{formatNaira(totalKobo)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">Taxes included if applicable</p>
            </div>

            <button
              onClick={() => setLocation("/checkout")}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            
            <Link href="/" className="mt-4 block text-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
