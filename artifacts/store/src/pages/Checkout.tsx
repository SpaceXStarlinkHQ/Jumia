import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useInitiateCheckout } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { ChevronRight, CheckCircle2, Lock, ShoppingCart, MapPin, Phone } from "lucide-react";
import { proxyImage } from "@/lib/imageProxy";
import { NoImage } from "@/components/ui/no-image";
import { useToast } from "@/hooks/use-toast";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT – Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Valid phone number is required").max(15),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  deliveryCity: z.string().min(2, "City is required"),
  deliveryState: z.string().min(1, "Please select your state"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

function Field({
  label, error, hint, children,
}: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full px-3 py-2.5 bg-white border rounded focus:outline-none focus:border-[#F68B1E] text-sm transition-colors ${err ? "border-red-400" : "border-gray-300"}`;

export default function Checkout() {
  const { items, totalKobo, itemCount } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Update page title
  useEffect(() => {
    document.title = "Checkout — BigDeals Nigeria";
  }, []);

  const initiateCheckout = useInitiateCheckout();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    const baseUrl = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "");
    const callbackUrl = `${baseUrl}/orders`;

    initiateCheckout.mutate({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        deliveryAddress: data.deliveryAddress,
        deliveryCity: data.deliveryCity,
        deliveryState: data.deliveryState,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
        callbackUrl,
      }
    }, {
      onSuccess: (res) => { window.location.href = res.paystackUrl; },
      onError: (error) => {
        // ApiError message format: "HTTP {status} {statusText}: {detail}"
        // Strip the HTTP prefix so users see a plain, actionable message.
        const rawMsg = error instanceof Error ? error.message : "";
        const userMsg =
          rawMsg.replace(/^HTTP \d+ [^:]+:\s*/i, "").trim() ||
          "Could not initiate payment. Please try again.";
        toast({
          variant: "destructive",
          title: "Payment could not be started",
          description: userMsg,
        });
      }
    });
  };

  return (
    <div className="pb-10 max-w-[1000px] mx-auto mt-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500 mb-6 font-medium uppercase tracking-wide">
        <span className="text-[#3CB64A] flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Cart</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-800">Checkout</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-400">Payment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
        {/* Left */}
        <div className="space-y-4">
          {/* Delivery Info */}
          <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 p-4 border-b border-gray-100 uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F68B1E]" /> 1. Delivery Information
            </h2>

            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4">
              {/* Row: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name*" error={errors.customerName?.message}>
                  <input
                    {...register("customerName")}
                    className={inputCls(errors.customerName?.message)}
                    placeholder="e.g. Chidi Okonkwo"
                  />
                </Field>
                <Field label="Phone Number*" error={errors.customerPhone?.message} hint="We'll call/WhatsApp for delivery">
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      {...register("customerPhone")}
                      type="tel"
                      className={`${inputCls(errors.customerPhone?.message)} pl-9`}
                      placeholder="080XXXXXXXX"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Email Address*" error={errors.customerEmail?.message} hint="Your receipt will be sent here">
                <input
                  {...register("customerEmail")}
                  type="email"
                  className={inputCls(errors.customerEmail?.message)}
                  placeholder="e.g. chidi@example.com"
                />
              </Field>

              <Field label="Delivery Address*" error={errors.deliveryAddress?.message}>
                <input
                  {...register("deliveryAddress")}
                  className={inputCls(errors.deliveryAddress?.message)}
                  placeholder="House number, street name, landmark"
                />
              </Field>

              {/* Row: City + State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="City / Town*" error={errors.deliveryCity?.message}>
                  <input
                    {...register("deliveryCity")}
                    className={inputCls(errors.deliveryCity?.message)}
                    placeholder="e.g. Ikeja"
                  />
                </Field>
                <Field label="State*" error={errors.deliveryState?.message}>
                  <select
                    {...register("deliveryState")}
                    className={inputCls(errors.deliveryState?.message)}
                  >
                    <option value="">— Select State —</option>
                    {NIGERIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="pt-2 flex justify-end">
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

          {/* Payment Method */}
          <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 p-4 border-b border-gray-100 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border-2 border-[#F68B1E] flex items-center justify-center text-xs text-[#F68B1E]">2</span>
              Payment Method
            </h2>
            <div className="p-4 flex items-center gap-3 text-sm text-gray-600">
              <Lock className="w-4 h-4 text-[#F68B1E] shrink-0" />
              <span>You'll be securely redirected to <strong>Paystack</strong> to complete your payment — card, bank transfer, or USSD accepted.</span>
            </div>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-4 h-fit">
          <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3 mb-3 uppercase">Order Summary</h2>

          <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 shrink-0 flex items-center justify-center relative overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={proxyImage(item.imageUrl)}
                      alt={item.productName}
                      loading="lazy"
                      className="w-10 h-10 object-contain mix-blend-multiply"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.removeAttribute("hidden");
                      }}
                    />
                  ) : null}
                  <div hidden={!!item.imageUrl} className="w-full h-full">
                    <NoImage iconSize={16} label="" />
                  </div>
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
              <span>Items ({itemCount})</span>
              <span className="font-bold text-gray-900">{formatNaira(totalKobo)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery</span>
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
              className="w-full py-3 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm mb-3 flex justify-center gap-2 items-center"
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
