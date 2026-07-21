import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useInitiateCheckout } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { ChevronRight, CheckCircle2, Lock, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
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
    const baseUrl = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    const callbackUrl = `${baseUrl}/orders/`; 
    
    initiateCheckout.mutate({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
        callbackUrl,
      }
    }, {
      onSuccess: (res) => {
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
    <div className="pb-10 max-w-[1000px] mx-auto mt-4">
      <div className="flex items-center text-xs text-gray-500 mb-6 font-medium uppercase tracking-wide">
        <span className="text-[#3CB64A] flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Cart</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-800">Checkout</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-400">Payment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 p-4 border-b border-gray-100 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#3CB64A]" /> 1. Delivery Information
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-5">
              <div>
                <label htmlFor="customerName" className="block text-xs font-bold text-gray-700 mb-1.5">First &amp; Last Name*</label>
                <input
                  id="customerName"
                  {...register("customerName")}
                  className={`w-full px-3 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#F68B1E] text-sm transition-colors ${errors.customerName ? "border-red-500" : ""}`}
                  placeholder="e.g. John Doe"
                />
                {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-xs font-bold text-gray-700 mb-1.5">Email Address*</label>
                <input
                  id="customerEmail"
                  type="email"
                  {...register("customerEmail")}
                  className={`w-full px-3 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#F68B1E] text-sm transition-colors ${errors.customerEmail ? "border-red-500" : ""}`}
                  placeholder="e.g. john@example.com"
                />
                {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
                <p className="text-xs text-gray-500 mt-1.5">Your receipt will be sent to this email.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={initiateCheckout.isPending}
                  className="bg-[#F68B1E] text-white px-8 py-3 rounded font-bold uppercase text-sm hover:bg-[#E07B10] shadow-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  {initiateCheckout.isPending ? "Processing..." : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden opacity-50 pointer-events-none">
            <h2 className="text-sm font-bold text-gray-800 p-4 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-400">2</span> Payment Method
            </h2>
          </div>
        </div>

        {/* Right Column Summary */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-4 h-fit">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-3 uppercase">Order Summary</h2>
          
          <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 shrink-0 flex items-center justify-center relative">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.productName} className="w-10 h-10 object-contain mix-blend-multiply" /> : <ShoppingCart className="w-6 h-6 text-gray-300" />}
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#F68B1E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-xs text-gray-800 line-clamp-1 font-medium">{item.productName}</div>
                  <div className="text-xs font-bold text-[#F68B1E] mt-0.5">{formatNaira(item.unitPriceKobo)}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-3 text-sm space-y-2 mb-3">
            <div className="flex justify-between items-center text-gray-600">
              <span>Item's total ({itemCount})</span>
              <span className="font-bold text-gray-900">{formatNaira(totalKobo)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery fees</span>
              <span className="text-[#3CB64A] font-bold">FREE</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-gray-900 text-sm">Total</span>
              <span className="font-bold text-xl text-[#F68B1E]">{formatNaira(totalKobo)}</span>
            </div>
            <div className="flex justify-end text-xs text-gray-500 mb-4">VAT included</div>
            
            <button
              type="submit"
              form="checkout-form"
              disabled={initiateCheckout.isPending}
              className="w-full py-3 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm shadow-[#F68B1E]/20 mb-3 flex justify-center gap-2 items-center"
            >
              {initiateCheckout.isPending ? "Please wait..." : "Confirm Order"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 py-2 rounded">
              <Lock className="w-3 h-3" /> Secure payment by Paystack
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}