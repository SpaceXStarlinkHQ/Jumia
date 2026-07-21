import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  // Sync search input with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("search")) {
      setSearchQuery(params.get("search") || "");
    }
  }, [location]);

  const categories = [
    "Electronics", "Phones & Tablets", "Fashion", "Computing", 
    "Home & Office", "Supermarket", "Kitchen & Dining", 
    "Health & Beauty", "Sporting Goods", "Baby Products"
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
    <header className="w-full flex flex-col">
      {/* Layer 1 */}
      <div className="bg-[#F68B1E] text-white h-8 flex items-center justify-center sm:justify-between px-4 text-xs font-medium w-full">
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          <div className="hidden sm:flex items-center gap-4 opacity-90">
            <Link href="/" className="hover:underline">Sell on Jumia</Link>
            <span className="opacity-50">|</span>
            <Link href="/" className="hover:underline">Jumia Business</Link>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <Link href="/" className="hover:underline">Help</Link>
            <span className="opacity-50">|</span>
            <Link href="/dashboard" className="hover:underline">Track My Order</Link>
          </div>
        </div>
      </div>

      {/* Layer 2 */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-4 md:gap-8 justify-between">
          <Link href="/" className="flex items-start shrink-0">
            <span className="text-[28px] font-black text-[#F68B1E] leading-none tracking-tighter">Jumia</span>
            <span className="text-gray-400 text-[10px] leading-none mt-1 ml-0.5">.com.ng</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 items-center h-10 border rounded border-gray-300 overflow-hidden focus-within:border-[#F68B1E] transition-colors bg-white">
            <select 
              className="h-full px-3 text-sm border-r bg-gray-50 focus:outline-none text-gray-600 hidden md:block"
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
            <div className="flex-1 relative h-full flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products, brands and categories" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-9 pr-3 text-sm focus:outline-none text-gray-800"
              />
            </div>
            <button type="submit" className="h-full px-6 bg-[#F68B1E] text-white font-medium text-sm hover:bg-[#E07B10] transition-colors shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
              SEARCH
            </button>
          </form>

          <div className="flex items-center shrink-0">
            <Link href="/cart" className="flex items-center gap-2 hover:text-[#F68B1E] transition-colors relative py-2 text-gray-800">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F68B1E] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="font-semibold hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3 max-w-screen-xl mx-auto">
          <form onSubmit={handleSearch} className="flex h-10 border rounded border-gray-300 overflow-hidden bg-white">
            <div className="flex-1 relative h-full flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-9 pr-3 text-sm focus:outline-none text-gray-800"
              />
            </div>
            <button type="submit" className="h-full px-4 bg-[#F68B1E] text-white font-medium text-sm">
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {/* Layer 3 */}
      <div className="bg-white border-b hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4 h-10 flex items-center overflow-x-auto no-scrollbar gap-1 text-sm text-gray-700">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <Link 
                key={cat} 
                href={`/?category=${encodeURIComponent(cat)}`}
                className={cn(
                  "whitespace-nowrap px-3 h-full flex items-center transition-colors border-b-2",
                  isActive ? "text-[#F68B1E] border-[#F68B1E] font-medium" : "border-transparent hover:text-[#F68B1E]"
                )}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5F5F5] text-[#1A1A1A] font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-4 sm:py-6">
        {children}
      </main>
      <footer className="bg-[#1B1B2C] text-[#CCCCCC] mt-auto text-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">About Jumia</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Jumia careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Jumia express</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Notice</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Make Money with Jumia</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Sell on Jumia</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Vendor hub</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Become an affiliate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Let Us Help You</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Help centre</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Track my order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">How to buy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-white font-medium">customerservice@jumia.com.ng</li>
              <li className="text-white font-medium">+234 (0) 1 888 1100</li>
              <li className="pt-2 flex gap-4 text-white">
                <span className="hover:text-[#F68B1E] cursor-pointer">Facebook</span>
                <span className="hover:text-[#F68B1E] cursor-pointer">Twitter</span>
                <span className="hover:text-[#F68B1E] cursor-pointer">Instagram</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-[#12121e] py-4 text-center text-xs text-gray-500 border-t border-gray-800">
          <p>© {new Date().getFullYear()} Jumia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}