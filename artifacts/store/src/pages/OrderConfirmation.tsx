import { useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { useVerifyPayment, getGetOrderByReferenceQueryKey } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { CheckCircle2, Package, Loader2, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function OrderConfirmation() {
  const { reference } = useParams<{ reference: string }>();
  const { clearCart } = useCart();
  const queryClient = useQueryClient();
  const clearedRef = useRef(false);

  const { data: order, isLoading, error } = useVerifyPayment(reference || "", {
    query: {
      enabled: !!reference,
      queryKey: getGetOrderByReferenceQueryKey(reference || "")
    }
  });

  useEffect(() => {
    if (order && order.status === "paid" && !clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [order, clearCart]);

  if (!reference) {
    return <div>Invalid Order Reference</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold mb-2">Verifying your payment...</h2>
        <p className="text-muted-foreground">Please wait while we confirm your order with Paystack.</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center p-8 bg-destructive/10 border border-destructive/20 rounded-2xl animate-in zoom-in-95">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-destructive mb-2">Payment Verification Failed</h2>
        <p className="text-muted-foreground mb-8">We couldn't verify your payment. If you were charged, please contact support with reference: <code className="bg-background px-2 py-1 rounded">{reference}</code></p>
        <Link href="/cart" className="px-6 py-3 bg-background border font-medium rounded-xl hover:bg-muted transition-colors">
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 pt-8">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">Thank you for your purchase, {order.customerName.split(' ')[0]}.</p>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b bg-muted/20">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Order Reference</p>
              <p className="font-mono font-medium">{order.paystackReference}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Status</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize bg-green-100 text-green-700">
                {order.status}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> Order Items
          </h3>
          
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                    {item.quantity}x
                  </div>
                  <div>
                    <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                      {item.productName}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-0.5">{formatNaira(item.unitPriceKobo)} each</div>
                  </div>
                </div>
                <div className="font-semibold text-right pl-4">
                  {formatNaira(item.unitPriceKobo * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold">Total Paid</span>
              <span className="font-bold tracking-tight text-primary text-2xl">{formatNaira(order.totalKobo)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-right">Receipt sent to {order.customerEmail}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/dashboard" className="px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors border">
          Track Order
        </Link>
        <Link href="/" className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
