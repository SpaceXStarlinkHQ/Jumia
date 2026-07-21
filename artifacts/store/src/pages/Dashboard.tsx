import { useState } from "react";
import { useListOrders } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import { Link } from "wouter";
import { Search, Package, Clock, CheckCircle2, Truck, XCircle, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const { data: orders, isLoading } = useListOrders(
    { email: submittedEmail },
    { query: { enabled: !!submittedEmail } }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmittedEmail(email.trim());
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'paid': return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'paid': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'shipped': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'delivered': return "bg-green-100 text-green-800 border-green-200";
      case 'cancelled': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Track Your Orders</h1>
        <p className="text-muted-foreground mb-8">
          Enter the email address you used during checkout to view your order history and tracking status.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto relative">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            required
          />
          <button 
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            Lookup <Search className="w-4 h-4 hidden sm:block" />
          </button>
        </form>
      </div>

      {submittedEmail && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-bold text-xl flex items-center justify-between border-b pb-4">
            Orders for {submittedEmail}
            {orders && <span className="text-sm font-normal text-muted-foreground px-3 py-1 bg-muted rounded-full">{orders.length} found</span>}
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-card border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow group">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-medium bg-muted px-2 py-0.5 rounded">
                          {order.paystackReference}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl">{formatNaira(order.totalKobo)}</h3>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize border ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t flex justify-between items-center">
                    <span className="text-sm text-muted-foreground line-clamp-1 max-w-[70%]">
                      {order.customerName}
                    </span>
                    <Link 
                      href={`/orders/${order.paystackReference}`}
                      className="text-primary text-sm font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      View Receipt <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 border rounded-2xl">
              <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mt-1">We couldn't find any orders matching this email.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
