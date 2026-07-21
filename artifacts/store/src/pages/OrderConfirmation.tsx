import { useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { useVerifyPayment, useGetOrderByReference } from "@workspace/api-client-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/utils";
import { CheckCircle2, Package, AlertCircle, ShoppingBag, Truck } from "lucide-react";

export default function OrderConfirmation() {
  const { reference } = useParams<{ reference: string }>();
  const { clearCart } = useCart();
  const clearedRef = useRef(false);

  // Trigger payment verification in the background
  const { data: verificationResult } = useVerifyPayment(reference || "", {
    query: { enabled: !!reference }
  });

  // Always use getOrderByReference for display
  const { data: order, isLoading, error } = useGetOrderByReference(reference || "", {
    query: { enabled: !!reference }
  });

  // Clear cart if paid
  useEffect(() => {
    if (order && order.status !== "pending" && order.status !== "cancelled" && !clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [order, clearCart]);

  if (!reference) {
    return <div>Invalid Order Reference</div>;
  }

  if (isLoading && !order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#F68B1E] rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-medium text-gray-800">Loading order details...</h2>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white rounded shadow-sm border border-gray-100 p-8 text-center max-w-lg mx-auto mt-10">
        <AlertCircle className="w-16 h-16 text-[#E53935] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6 text-sm">We couldn't find an order with this reference: <code className="bg-gray-100 px-2 py-1 rounded">{reference}</code></p>
        <Link href="/" className="bg-[#F68B1E] text-white px-6 py-2.5 rounded font-bold uppercase text-sm shadow-md hover:bg-[#E07B10] inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return "bg-[#FFF3E0] text-[#E65100]";
      case 'paid': return "bg-[#E8F5E9] text-[#2E7D32]";
      case 'shipped': return "bg-[#E3F2FD] text-[#1565C0]";
      case 'delivered': return "bg-[#E8F5E9] text-[#2E7D32]";
      case 'cancelled': return "bg-[#FFEBEE] text-[#C62828]";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-10 mt-4">
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="p-8 text-center border-b border-gray-100 bg-[#F5F5F5]/50">
          <div className="w-16 h-16 bg-[#E8F5E9] text-[#3CB64A] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#3CB64A]/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Order Confirmed!</h1>
          <p className="text-gray-600 text-sm">Hi {order.customerName.split(' ')[0]}, thank you for shopping with Jumia.</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded border border-gray-100">
              <div className="text-xs text-gray-500 uppercase font-bold mb-1">Order Number</div>
              <div className="font-bold text-lg text-gray-900">{order.paystackReference}</div>
              <div className="mt-3 text-xs text-gray-500 uppercase font-bold mb-1">Payment Status</div>
              <div className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-100">
              <div className="text-xs text-gray-500 uppercase font-bold mb-1">Delivery Method</div>
              <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#F68B1E]"/> Standard Delivery</div>
              <div className="mt-3 text-xs text-gray-500 uppercase font-bold mb-1">Customer Email</div>
              <div className="text-sm font-medium text-gray-800">{order.customerEmail}</div>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2 uppercase text-sm">
            <Package className="w-5 h-5 text-[#F68B1E]" /> Items in your order
          </h3>
          
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded bg-white">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="font-medium text-sm text-gray-800 line-clamp-1">{item.productName}</div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">Qty: {item.quantity}</div>
                  <div className="text-sm font-bold text-[#F68B1E] mt-1">{formatNaira(item.unitPriceKobo)}</div>
                </div>
                <div className="font-bold text-sm text-gray-900 flex items-center pr-2">
                  {formatNaira(item.unitPriceKobo * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-100">
              <span className="font-bold text-gray-800 uppercase text-sm">Total Paid</span>
              <span className="font-bold text-xl text-[#F68B1E]">{formatNaira(order.totalKobo)}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/dashboard" className="flex-1 py-3 text-center border border-[#F68B1E] text-[#F68B1E] font-bold rounded uppercase text-sm hover:bg-orange-50 transition-colors">
              Track Order
            </Link>
            <Link href="/" className="flex-1 py-3 text-center bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}