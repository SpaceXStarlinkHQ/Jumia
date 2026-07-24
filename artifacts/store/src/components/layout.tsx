import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Truck, Shield, Phone, Mail } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get("search") || "");
  }, [location]);

  const categories = [
    "Electronics", "Phones & Tablets", "Home & Office", "Fashion", "Computing",
    "Supermarket", "Kitchen & Dining", "Health & Beauty",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      setLocation(`/`);
    }
  };

  const currentCategory = new URLSearchParams(window.location.search).get("category") || "";

  return (
    <header className="w-full flex flex-col sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-[#1A1A1A] text-white text-[11px] py-1.5 px-4 flex justify-between items-center">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#F68B1E]" />
            Free delivery on orders ₦50k+
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#3CB64A]" />
            Paystack Secured Checkout
          </span>
        </span>
        <span className="hidden md:flex items-center gap-3 text-gray-300">
          <Link href="/dashboard" className="hover:text-white transition-colors">Track Order</Link>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> 09012345678
          </span>
        </span>
      </div>

      {/* Main nav */}
      <div className="bg-[#F68B1E]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 mr-2 flex flex-col leading-none">
            <span className="text-white font-black text-xl tracking-tight leading-none">BigDeals</span>
            <span className="text-[#FFCF00] text-[10px] font-bold tracking-widest uppercase">Nigeria</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white rounded overflow-hidden shadow-inner h-10">
            <select
              className="hidden md:block border-r border-gray-200 text-xs text-gray-600 h-full px-2 bg-white outline-none"
              value={currentCategory}
              onChange={(e) => {
                if (e.target.value) {
                  setLocation(`/?category=${encodeURIComponent(e.target.value)}`);
                } else {
                  setLocation(`/`);
                }
              }}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="text"
              placeholder="Search products, brands and categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-full px-3 text-sm text-gray-700 outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-[#F68B1E] text-white h-full px-5 text-sm font-bold hover:bg-[#E07B10] transition-colors shrink-0"
            >
              SEARCH
            </button>
          </form>

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-1.5 text-white ml-2 relative shrink-0">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E53935] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="font-semibold text-sm hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={`text-[12px] px-3 py-2 whitespace-nowrap transition-colors shrink-0 ${
                currentCategory === cat
                  ? "text-[#F68B1E] font-medium"
                  : "text-gray-300 hover:text-[#F68B1E]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5F5F5] text-[#1A1A1A]">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4">
        {children}
      </main>
      <footer className="bg-[#1B1B2C] text-[#CCCCCC] mt-auto text-sm">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <div className="text-white font-black text-2xl leading-none">BigDeals</div>
              <div className="text-[#F68B1E] text-[10px] font-bold tracking-widest uppercase">Nigeria</div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Your trusted online marketplace for electronics, appliances, fashion, and everyday essentials — delivered nationwide.
            </p>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Return &amp; Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Shop</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/?category=Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/?category=Phones+%26+Tablets" className="hover:text-white transition-colors">Phones &amp; Tablets</Link></li>
              <li><Link href="/?category=Home+%26+Office" className="hover:text-white transition-colors">Home &amp; Office</Link></li>
              <li><Link href="/?category=Fashion" className="hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="/?category=Supermarket" className="hover:text-white transition-colors">Supermarket</Link></li>
              <li><Link href="/?category=Health+%26+Beauty" className="hover:text-white transition-colors">Health &amp; Beauty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Customer Help</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Track My Order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">How to Order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F68B1E] shrink-0" />
                <span className="text-white font-medium">09012345678</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3CB64A] shrink-0" />
                <span className="text-white font-medium">WhatsApp: 09012345678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F68B1E] shrink-0 mt-0.5" />
                <span className="text-white font-medium">support@bigdealsnigeria.shop</span>
              </li>
              <li className="text-gray-400 pt-1">Mon – Sat: 8am – 8pm</li>
              <li className="flex gap-4 text-white pt-1">
                <span className="hover:text-[#F68B1E] cursor-pointer">Facebook</span>
                <span className="hover:text-[#F68B1E] cursor-pointer">Instagram</span>
                <span className="hover:text-[#F68B1E] cursor-pointer">X</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Secure Payment Methods</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: "VISA", bg: "bg-[#1A1F71]", text: "text-white", style: "italic font-black" },
                  { label: "MASTERCARD", bg: "bg-[#252525]", text: "text-[#EB001B]", style: "font-black text-[10px]" },
                  { label: "VERVE", bg: "bg-[#003087]", text: "text-white", style: "font-bold text-[10px]" },
                  { label: "PAYSTACK", bg: "bg-[#00C3F7]", text: "text-white", style: "font-bold text-[10px]" },
                  { label: "BANK TRANSFER", bg: "bg-gray-700", text: "text-white", style: "font-bold text-[9px]" },
                ].map(({ label, bg, text, style }) => (
                  <span key={label} className={`${bg} ${text} px-2.5 py-1.5 rounded text-[10px] ${style} tracking-tight whitespace-nowrap`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">We Deliver Nationwide</p>
              <p className="text-xs text-gray-400">Lagos · Abuja · Port Harcourt · Kano · Ibadan · and more</p>
            </div>
          </div>
        </div>

        <div className="bg-[#12121e] py-4 text-center text-xs text-gray-500 border-t border-gray-800">
          <p>© {new Date().getFullYear()} BigDeals Nigeria. All rights reserved. | RC 1234567</p>
        </div>
      </footer>
    </div>
  );
}
