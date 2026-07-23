import { ShoppingCart, Star, Zap, Shield, Truck, HeadphonesIcon, RotateCcw, ChevronRight, Flame, Tag } from "lucide-react";

const ORANGE = "#F68B1E";
const GREEN = "#3CB64A";
const RED = "#E53935";

const products = [
  { id: 1, name: "200L Haier Thermocool Deep Freezer", price: "₦80,000", was: "₦133,333", discount: 40, rating: 4.7, reviews: 284, badge: "🔥 HOT", stock: 8, image: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg", tag: "Free Delivery" },
  { id: 2, name: "219L LG Double Door Refrigerator", price: "₦75,000", was: "₦125,000", discount: 40, rating: 4.6, reviews: 193, badge: "⚡ FLASH", stock: 5, image: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg", tag: "Free Delivery" },
  { id: 3, name: "Hisense 8KG Top Load Washing Machine", price: "₦50,000", was: "₦83,333", discount: 40, rating: 4.5, reviews: 127, badge: "🏷️ DEAL", stock: 12, image: "https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/ce0e6aa5-9e5b-489e-817e-d1602759c826/Washers_WT7150CW_gallery-01_5000x5000?io=transform:fill,width:600", tag: "Free Delivery" },
  { id: 4, name: "Sumec Firman 3KVA Generator", price: "₦70,000", was: "₦116,667", discount: 40, rating: 4.8, reviews: 352, badge: "⭐ TOP", stock: 3, image: "https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314", tag: "Free Delivery" },
  { id: 5, name: '43" LG UHD Smart Television', price: "₦70,000", was: "₦116,667", discount: 40, rating: 4.6, reviews: 218, badge: "🔥 HOT", stock: 7, image: "https://www.lg.com/content/dam/channel/wcms/uk/images/tvs/43UP75006LF_AEK_EEUK_UK_C/gallery/43UP75006LF-1600-1-03042021.jpg?w=800", tag: "Free Delivery" },
  { id: 6, name: "Tecno Camon 40 Pro 5G", price: "₦140,000", was: "₦175,000", discount: 20, rating: 4.9, reviews: 89, badge: "🆕 NEW", stock: 15, image: "https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E5%AD%94%E9%9B%80%E7%9F%B3%E7%BB%BF.png", tag: "Express" },
];

const categories = ["Electronics", "Phones & Tablets", "Home & Office", "Fashion", "Computing", "Supermarket", "Kitchen & Dining", "Health & Beauty"];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.floor(rating) ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-300 fill-gray-300"}`} />
      ))}
    </div>
  );
}

export function MarketPulse() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar */}
      <div className="bg-[#1A1A1A] text-white text-[11px] py-1.5 px-4 flex justify-between items-center">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-[#F68B1E]"/> Free delivery on orders ₦50k+</span>
          <span className="text-gray-500">|</span>
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#3CB64A]"/> Paystack Secured Checkout</span>
        </span>
        <span className="hidden md:flex items-center gap-3">
          <span>Sell on Jumia</span>
          <span className="text-gray-500">|</span>
          <span>Track Order</span>
        </span>
      </div>

      {/* Nav */}
      <header className="bg-[#F68B1E] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <div className="text-white font-black text-2xl mr-4 tracking-tight">jumia<span className="text-[#FFCF00]">.com.ng</span></div>
          <div className="flex-1 flex items-center bg-white rounded overflow-hidden shadow-inner">
            <select className="border-r border-gray-200 text-xs text-gray-600 h-10 px-2 bg-white outline-none hidden md:block">
              <option>All Categories</option>
            </select>
            <input className="flex-1 h-10 px-3 text-sm text-gray-700 outline-none" placeholder="Search products, brands and categories" readOnly />
            <button className="bg-[#F68B1E] text-white h-10 px-5 text-sm font-bold hover:bg-[#E07B10] transition-colors">SEARCH</button>
          </div>
          <button className="flex items-center gap-2 text-white ml-4 relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-[#E53935] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
          </button>
        </div>

        {/* Category Nav */}
        <div className="bg-[#1A1A1A] max-w-full">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-0 overflow-x-auto no-scrollbar">
            {categories.map(c => (
              <button key={c} className="text-gray-300 text-[12px] px-3 py-2 hover:text-[#F68B1E] hover:bg-white/5 whitespace-nowrap transition-colors">{c}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-5">

        {/* Hero */}
        <div className="flex gap-3">
          {/* Sidebar */}
          <div className="hidden lg:block w-52 shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {categories.map(c => (
              <button key={c} className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] text-gray-700 hover:bg-orange-50 hover:text-[#F68B1E] border-b border-gray-50 last:border-0 transition-colors text-left">
                {c}
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Main Banner */}
          <div className="flex-1 relative rounded-xl overflow-hidden min-h-[240px] bg-gradient-to-r from-[#1A1A1A] via-[#2D1810] to-[#F68B1E] flex items-center p-8 shadow-xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-40" />
            <div className="relative z-10 max-w-xs">
              <span className="inline-flex items-center gap-1.5 bg-[#FFCF00] text-[#1A1A1A] text-[11px] font-black px-3 py-1 rounded-full mb-3">
                <Flame className="w-3 h-3"/> FLASH PROMO — ENDS JULY 31
              </span>
              <h1 className="text-white font-black text-5xl leading-none mb-2">Up to<br/><span className="text-[#FFCF00]">80% OFF</span></h1>
              <p className="text-white/70 text-sm mb-5">Appliances, phones, TVs & more.<br/>Limited stock — shop now before it's gone.</p>
              <button className="bg-[#F68B1E] text-white font-bold px-7 py-3 rounded-lg hover:bg-[#E07B10] transition-all shadow-xl hover:shadow-orange-500/30 hover:scale-105 duration-200 uppercase text-sm tracking-wide">
                Shop Flash Deals →
              </button>
            </div>
            <div className="absolute right-8 bottom-0 hidden md:block opacity-90">
              <img src="https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314" alt="" className="h-52 object-contain drop-shadow-2xl" />
            </div>
          </div>

          {/* Side Banners */}
          <div className="hidden xl:flex w-44 shrink-0 flex-col gap-3">
            <div className="flex-1 rounded-xl bg-gradient-to-br from-[#3CB64A] to-[#1B5E20] p-4 flex flex-col justify-between shadow-md">
              <Truck className="w-7 h-7 text-white/70" />
              <div>
                <div className="text-white font-black text-lg leading-tight">Free<br/>Delivery</div>
                <div className="text-white/70 text-[11px] mt-1">Orders above ₦50k</div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-gradient-to-br from-[#1565C0] to-[#0D47A1] p-4 flex flex-col justify-between shadow-md">
              <Shield className="w-7 h-7 text-white/70" />
              <div>
                <div className="text-white font-black text-lg leading-tight">100%<br/>Secure</div>
                <div className="text-white/70 text-[11px] mt-1">Paystack protected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Shield, label: "Paystack Secured", sub: "Every transaction protected" },
            { icon: Truck, label: "Free Delivery", sub: "On orders above ₦50,000" },
            { icon: HeadphonesIcon, label: "24/7 Support", sub: "Chat, call & WhatsApp" },
            { icon: RotateCcw, label: "Easy Returns", sub: "15-day hassle-free return" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#F68B1E]" />
              </div>
              <div>
                <div className="text-[12px] font-bold text-gray-800">{label}</div>
                <div className="text-[10px] text-gray-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Flash Sales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#E53935] to-[#C62828] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-white font-black text-xl">
                <span className="bg-[#FFCF00] text-black w-7 h-7 rounded flex items-center justify-center text-base">⚡</span>
                Flash Sales
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                {["09","12","17","34"].map((v, i, a) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="bg-white/20 backdrop-blur text-white text-sm font-black px-2.5 py-1 rounded-lg tabular-nums">{v}</span>
                    {i < a.length - 1 && <span className="text-white/60 font-bold">:</span>}
                  </span>
                ))}
              </div>
            </div>
            <button className="text-white text-sm font-semibold hover:underline flex items-center gap-1">See All <ChevronRight className="w-4 h-4"/></button>
          </div>

          <div className="p-4 grid grid-cols-3 md:grid-cols-6 gap-3">
            {products.map(p => (
              <div key={p.id} className="group relative rounded-xl border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-200 bg-white p-2.5 cursor-pointer">
                <div className="absolute top-2 left-2 z-10 bg-[#E53935] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">-{p.discount}%</div>
                <div className="absolute top-2 right-2 z-10 text-[10px] bg-gray-900/80 text-white px-1.5 py-0.5 rounded-md">{p.badge}</div>
                <div className="aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug mb-1.5 group-hover:text-[#F68B1E] transition-colors">{p.name}</p>
                <div className="flex items-center gap-1 mb-1">
                  <Stars rating={p.rating}/>
                  <span className="text-[10px] text-gray-400">({p.reviews})</span>
                </div>
                <div className="font-black text-[#F68B1E] text-[14px] leading-none">{p.price}</div>
                <div className="text-[10px] text-gray-400 line-through">{p.was}</div>
                {p.stock <= 5 && (
                  <div className="mt-1.5">
                    <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                      <span>Selling fast</span>
                      <span className="text-[#E53935] font-bold">Only {p.stock} left!</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E53935] rounded-full" style={{ width: `${100 - (p.stock / 20 * 100)}%` }}/>
                    </div>
                  </div>
                )}
                <div className="text-[#3CB64A] text-[10px] font-semibold mt-1">✓ {p.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2"><Tag className="w-5 h-5 text-[#F68B1E]"/> Top Deals</h2>
            <button className="text-[#F68B1E] text-sm font-semibold flex items-center gap-1">View All <ChevronRight className="w-4 h-4"/></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {products.map(p => (
              <div key={p.id} className="group relative rounded-xl border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 bg-white p-3 cursor-pointer flex flex-col">
                <div className="absolute top-3 right-3 bg-[#FFF3E0] text-[#F68B1E] text-[10px] font-black px-1.5 py-0.5 rounded-md">-{p.discount}%</div>
                <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <p className="text-[12px] text-gray-700 line-clamp-2 leading-snug mb-2 flex-1 group-hover:text-[#F68B1E] transition-colors">{p.name}</p>
                <Stars rating={p.rating}/>
                <div className="mt-2">
                  <div className="font-black text-[#F68B1E] text-base leading-none">{p.price}</div>
                  <div className="text-[11px] text-gray-400 line-through mb-1">{p.was}</div>
                  <div className="text-[#3CB64A] text-[10px] font-semibold">✓ {p.tag}</div>
                </div>
                <button className="mt-3 w-full bg-[#F68B1E] text-white rounded-lg py-2 text-[11px] font-bold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 uppercase tracking-wide shadow-md">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
