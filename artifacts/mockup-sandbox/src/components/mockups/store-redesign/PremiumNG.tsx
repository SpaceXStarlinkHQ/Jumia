import { ShoppingBag, Star, ChevronRight, Check, ArrowRight } from "lucide-react";

const products = [
  { id: 1, name: "Haier Thermocool Deep Freezer", sub: "200L Chest | Energy Class A+", price: "₦80,000", was: "₦133,333", discount: 40, rating: 4.7, reviews: 284, label: "Best Seller", image: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg" },
  { id: 2, name: "LG Double Door Refrigerator", sub: "219L | Smart Inverter Compressor", price: "₦75,000", was: "₦125,000", discount: 40, rating: 4.6, reviews: 193, label: "Editor's Pick", image: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg" },
  { id: 3, name: "Hisense Washing Machine", sub: "8KG Top Load | Auto-Wash", price: "₦50,000", was: "₦83,333", discount: 40, rating: 4.5, reviews: 127, label: "Top Rated", image: "https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/ce0e6aa5-9e5b-489e-817e-d1602759c826/Washers_WT7150CW_gallery-01_5000x5000?io=transform:fill,width:600" },
  { id: 4, name: "Sumec Firman Generator", sub: "3KVA | Recoil & Electric Start", price: "₦70,000", was: "₦116,667", discount: 40, rating: 4.8, reviews: 352, label: "Most Loved", image: "https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314" },
  { id: 5, name: "LG UHD Smart Television", sub: '43" | ThinQ AI | WebOS', price: "₦70,000", was: "₦116,667", discount: 40, rating: 4.6, reviews: 218, label: "Staff Pick", image: "https://www.lg.com/content/dam/channel/wcms/uk/images/tvs/43UP75006LF_AEK_EEUK_UK_C/gallery/43UP75006LF-1600-1-03042021.jpg?w=800" },
  { id: 6, name: "Tecno Camon 40 Pro 5G", sub: "256GB | 50MP AI Camera | 5G", price: "₦140,000", was: "₦175,000", discount: 20, rating: 4.9, reviews: 89, label: "New Arrival", image: "https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E5%AD%94%E9%9B%80%E7%9F%B3%E7%BB%BF.png" },
];

const categories = [
  { name: "Electronics", emoji: "🖥️" },
  { name: "Phones & Tablets", emoji: "📱" },
  { name: "Home & Office", emoji: "🏠" },
  { name: "Fashion", emoji: "👗" },
  { name: "Kitchen & Dining", emoji: "🍳" },
  { name: "Health & Beauty", emoji: "💆" },
];

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
  const cls = size === "xs" ? "w-2.5 h-2.5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`${cls} ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
      ))}
    </div>
  );
}

export function PremiumNG() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Slim announcement */}
      <div className="bg-[#1A1A1A] text-center py-2">
        <p className="text-white text-[12px] tracking-wider">
          <span className="text-[#F68B1E] font-semibold">FLASH PROMO</span> — Up to 40% off all appliances. Ends July 31.&nbsp;
          <span className="underline cursor-pointer hover:text-[#F68B1E] transition-colors">Shop now →</span>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="font-black text-2xl tracking-tight text-[#1A1A1A]">
            jumia<span className="text-[#F68B1E]">.ng</span>
          </div>

          <div className="flex-1 max-w-lg mx-auto hidden md:block">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 gap-2 h-10 focus-within:border-[#F68B1E] focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" placeholder="Search for anything…" readOnly />
            </div>
          </div>

          <nav className="flex items-center gap-6 text-[13px] text-gray-600">
            <span className="hidden md:block hover:text-[#F68B1E] cursor-pointer transition-colors">Account</span>
            <span className="hidden md:block hover:text-[#F68B1E] cursor-pointer transition-colors">Orders</span>
            <button className="relative">
              <ShoppingBag className="w-6 h-6 text-[#1A1A1A]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#F68B1E] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
          </nav>
        </div>

        {/* Category Nav */}
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 overflow-x-auto no-scrollbar pb-0">
          {categories.map(c => (
            <button key={c.name} className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] text-gray-600 hover:text-[#F68B1E] whitespace-nowrap border-b-2 border-transparent hover:border-[#F68B1E] transition-all font-medium">
              <span>{c.emoji}</span>{c.name}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* Hero */}
        <div className="grid lg:grid-cols-5 gap-4 items-stretch">
          {/* Main hero */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF8F0] to-[#FEE8CC] border border-orange-100 p-10 flex flex-col justify-between min-h-[320px] relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F68B1E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div>
              <span className="text-[#F68B1E] text-xs font-bold tracking-[0.15em] uppercase">Limited Time Offer</span>
              <h1 className="text-[#1A1A1A] font-black text-5xl leading-none mt-3 mb-4">
                Up to <span className="text-[#F68B1E]">80%</span><br/>Off This Week
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-xs">
                Appliances, phones, TVs and more. Authentic products, certified sellers, and free delivery on qualifying orders.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <button className="bg-[#1A1A1A] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#F68B1E] transition-all duration-300 text-sm tracking-wide shadow-lg hover:shadow-orange-300/40 hover:scale-105">
                Explore Deals
              </button>
              <button className="flex items-center gap-2 text-[#F68B1E] font-semibold text-sm hover:gap-3 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side cards */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-4">
            {[
              { bg: "from-[#1A237E] to-[#3949AB]", img: products[5].image, name: "Tecno Camon 40 Pro 5G", sub: "5G Ready · 50MP Camera", price: "₦140,000", badge: "New Arrival" },
              { bg: "from-[#1B5E20] to-[#388E3C]", img: products[3].image, name: "Firman 3KVA Generator", sub: "Reliable backup power", price: "₦70,000", badge: "Best Seller" },
            ].map(item => (
              <div key={item.name} className={`bg-gradient-to-br ${item.bg} rounded-2xl p-5 flex items-center gap-4 cursor-pointer group overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <img src={item.img} alt={item.name} className="w-24 h-24 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <div className="relative z-10">
                  <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">{item.badge}</span>
                  <p className="text-white font-bold text-[14px] leading-snug mt-0.5">{item.name}</p>
                  <p className="text-white/60 text-[11px]">{item.sub}</p>
                  <p className="text-[#FFCF00] font-black text-xl mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Check, color: "text-[#3CB64A]", bg: "bg-green-50", label: "Authenticity Guaranteed", sub: "Every product verified by our team" },
            { icon: Check, color: "text-[#1565C0]", bg: "bg-blue-50", label: "Secure Payment", sub: "Paystack-protected checkout" },
            { icon: Check, color: "text-[#F68B1E]", bg: "bg-orange-50", label: "15-Day Returns", sub: "Hassle-free, no questions asked" },
          ].map(({ icon: Icon, color, bg, label, sub }) => (
            <div key={label} className={`${bg} rounded-xl p-4 flex items-start gap-3 border border-white`}>
              <div className={`${color} mt-0.5`}><Icon className="w-5 h-5" /></div>
              <div>
                <p className="text-[13px] font-bold text-gray-800">{label}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#F68B1E] text-xs font-bold tracking-widest uppercase mb-1">Curated Selection</p>
              <h2 className="text-2xl font-black text-[#1A1A1A]">Top Deals This Week</h2>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#F68B1E] transition-colors font-medium">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map(p => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 p-4 cursor-pointer flex flex-col">
                <div className="relative mb-3">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] font-black bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full">{p.label}</span>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-[11px] text-gray-400 mb-0.5">{p.sub}</p>
                  <p className="text-[13px] font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-[#F68B1E] transition-colors">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Stars rating={p.rating} size="xs" />
                    <span className="text-[10px] text-gray-400">{p.reviews}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="text-[#F68B1E] font-black text-lg leading-none">{p.price}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-400 line-through">{p.was}</span>
                      <span className="text-[10px] text-[#3CB64A] font-bold bg-green-50 px-1.5 py-0.5 rounded-full">-{p.discount}%</span>
                    </div>
                    <p className="text-[10px] text-[#3CB64A] font-semibold mt-1.5">✓ Free Delivery</p>
                  </div>
                </div>
                <button className="mt-3 w-full border-2 border-[#F68B1E] text-[#F68B1E] rounded-xl py-2 text-[11px] font-bold opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 hover:bg-[#F68B1E] hover:text-white">
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer CTA */}
      <div className="bg-[#1A1A1A] mt-10 py-12 px-6 text-center">
        <p className="text-[#F68B1E] text-xs font-bold tracking-widest uppercase mb-2">Satisfaction Guaranteed</p>
        <h3 className="text-white font-black text-3xl mb-3">Shop with confidence.</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">Authentic products, fast delivery across Nigeria, and a team ready to help you 24/7.</p>
        <button className="mt-6 bg-[#F68B1E] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#E07B10] transition-colors shadow-xl shadow-orange-900/30">
          Start Shopping
        </button>
      </div>
    </div>
  );
}
