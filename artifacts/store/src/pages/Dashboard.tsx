import { useState } from "react";
import { useListOrders, useGetStoreSummary } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import { Link } from "wouter";
import { Search, Package, CheckCircle2, Truck, XCircle, ArrowRight, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { data: orders, isLoading } = useListOrders(
    { email: submittedEmail },
    { query: { enabled: !!submittedEmail, queryKey: ["/api/orders", { email: submittedEmail }] } }
  );

  const { data: summary } = useGetStoreSummary();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmittedEmail(email.trim());
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3.5 h-3.5" />;
      case 'paid': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'shipped': return <Truck className="w-3.5 h-3.5" />;
      case 'delivered': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'cancelled': return <XCircle className="w-3.5 h-3.5" />;
      default: return <Package className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 mt-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#F68B1E] to-[#FF8C00] rounded shadow-sm p-8 text-center text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full -translate-x-1/4 translate-y-1/4" />
        
        <MapPin className="w-12 h-12 mx-auto mb-3 opacity-90 drop-shadow-sm" />
        <h1 className="text-2xl md:text-3xl font-black mb-2 relative z-10 drop-shadow-md">Track Your Order</h1>
        <p className="text-white/90 text-sm max-w-lg mx-auto relative z-10 font-medium">
          Enter the email address you used during checkout to view your order history, tracking status, and delivery updates.
        </p>
        {summary && summary.totalProducts > 0 && (
          <p className="text-white/80 text-xs mt-4 relative z-10 font-medium tracking-wide">
            Join thousands of customers shopping from our {summary.totalProducts}+ products.
          </p>
        )}
      </div>

      {/* Search Box */}
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#F68B1E] text-sm"
              required
            />
          </div>
          <button 
            type="submit"
            className="px-8 py-3 bg-[#F68B1E] text-white font-bold uppercase text-sm rounded hover:bg-[#E07B10] shadow-md transition-colors whitespace-nowrap"
          >
            Track Orders
          </button>
        </form>
      </div>

      {/* Results */}
      {submittedEmail && (
        <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800 text-sm uppercase">Orders for {submittedEmail}</h2>
            {orders && <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">{orders.length}</span>}
          </div>

          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse rounded border border-gray-200" />
              ))}
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900 text-sm">Order {order.paystackReference}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        Placed on {format(new Date(order.createdAt), 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm font-bold text-[#F68B1E]">
                        {formatNaira(order.totalKobo)}
                      </div>
                    </div>
                    <div className="flex items-center sm:items-start justify-between sm:flex-col sm:justify-center">
                      <span className="text-xs text-gray-500 sm:hidden">View order</span>
                      <Link 
                        href={`/orders/${order.paystackReference}`}
                        className="text-[#F68B1E] text-sm font-bold flex items-center gap-1 hover:underline uppercase"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800">No orders found</h3>
              <p className="text-sm text-gray-500 mt-1">We couldn't find any orders matching this email.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}