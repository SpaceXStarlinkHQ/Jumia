import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, Link } from "wouter";
import { useInitiateCheckout } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, totalKobo, itemCount } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const initiateCheckout = useInitiateCheckout();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    // Generate callback URL dynamically based on where we are hosted
    const baseUrl = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    
    // Pass a placeholder that Paystack won't break on, but we redirect explicitly on success anyway.
    // The instruction says "redirect to paystackUrl directly after mutation success"
    const callbackUrl = `${baseUrl}/orders/pending`; 
    
    initiateCheckout.mutate({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
        callbackUrl,
      }
    }, {
      onSuccess: (res) => {
        // Redirect completely to Paystack
        window.location.href = res.paystackUrl;
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Checkout failed",
          description: "Could not initiate payment. Please try again.",
        });
        console.error(err);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>
          <p className="text-muted-foreground mb-8">Enter your details to complete the purchase.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  id="customerName"
                  {...register("customerName")}
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.customerName ? "border-destructive" : ""}`}
                  placeholder="Jane Doe"
                />
                {errors.customerName && (
                  <p className="text-destructive text-sm mt-1">{errors.customerName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  id="customerEmail"
                  type="email"
                  {...register("customerEmail")}
                  className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.customerEmail ? "border-destructive" : ""}`}
                  placeholder="jane@example.com"
                />
                {errors.customerEmail && (
                  <p className="text-destructive text-sm mt-1">{errors.customerEmail.message}</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={initiateCheckout.isPending}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {initiateCheckout.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Pay {formatNaira(totalKobo)} securely
                  </>
                )}
              </button>
              <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                Secured by <span className="font-semibold text-foreground">Paystack</span>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-muted/30 p-8 rounded-2xl border">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>
          
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-start">
                <div className="relative w-16 h-16 bg-background rounded-md border shrink-0 overflow-hidden">
                  {item.imageUrl && <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-medium line-clamp-2">{item.productName}</div>
                  <div className="text-muted-foreground mt-1">{formatNaira(item.unitPriceKobo)}</div>
                </div>
                <div className="font-semibold text-sm">
                  {formatNaira(item.unitPriceKobo * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({itemCount} items)</span>
              <span className="text-foreground">{formatNaira(totalKobo)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">{formatNaira(totalKobo)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
