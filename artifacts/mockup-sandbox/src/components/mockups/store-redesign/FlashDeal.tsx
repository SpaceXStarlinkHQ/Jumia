import { useState, useEffect } from "react";
import { ShoppingCart, Star, Zap, Users, TrendingUp, ChevronRight, Bell } from "lucide-react";

const PROMO_END = new Date("2026-07-31T23:59:59Z").getTime();

const products = [
  { id: 1, name: "200L Haier Deep Freezer", price: 80000, was: 133333, discount: 40, rating: 4.7, reviews: 284, sold: 76, total: 100, viewers: 18, image: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg", hot: true },
  { id: 2, name: "LG Double Door Refrigerator 219L", price: 75000, was: 125000, discount: 40, rating: 4.6, reviews: 193, sold: 71, total: 100, viewers: 11, image: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg", hot: false },
  { id: 3, name: "Hisense 8KG Top Load Washer", price: 50000, was: 83333, discount: 40, rating: 4.5, reviews: 127, sold: 62, total: 100, viewers: 9, image: "https://media.us.lg.com/transform/ecomm-PDPGalleryThumbnail-350x350/ce0e6aa5-9e5b-489e-817e-d1602759c826/Washers_WT7150CW_gallery-01_5000x5000?io=transform:fill,width:600", hot: false },
  { id: 4, name: "Firman 3KVA Generator", price: 70000, was: 116667, discount: 40, rating: 4.8, reviews: 352, sold: 89, total: 100, viewers: 34, image: "https://firmanpowerequipment.com/cdn/shop/products/P03601_200_900x900.png?v=1630521314", hot: true },
  { id: 5, name: '43" LG UHD Smart TV', price: 70000, was: 116667, discount: 40, rating: 4.6, reviews: 218, sold: 58, total: 100, viewers: 22, image: "https://www.lg.com/content/dam/channel/wcms/uk/images/tvs/43UP75006LF_AEK_EEUK_UK_C/gallery/43UP75006LF-1600-1-03042021.jpg?w=800", hot: false },
  { id: 6, name: "Tecno Camon 40 Pro 5G", price: 140000, was: 175000, discount: 20, rating: 4.9, reviews: 89, sold: 35, total: 100, viewers: 47, image: "https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E5%AD%94%E9%9B%80%E7%9F%B3%E7%BB%BF.png", hot: true },
];

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-700 text-gray-700"}`}/>
      ))}
    </div>
  );
}

function Countdown() {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const diff = PROMO_END - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const block = (v: string, label: string) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#E53935] text-white font-black text-4xl md:text-5xl w-20 h-20 rounded-2xl flex items-center justify-center tabular-nums shadow-lg shadow-red-900/40 border border-red-700">
        {v}
      </div>
      <span className="text-gray-400 text-[11px] uppercase tracking-widest mt-2 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="flex items-end gap-3">
      {block(t.d, "days")}
      <div className="text-[#E53935] font-black text-4xl mb-8">:</div>
      {block(t.h, "hrs")}
      <div className="text-[#E53935] font-black text-4xl mb-8">:</div>
      {block(t.m, "min")}
      <div className="text-[#E53935] font-black text-4xl mb-8">:</div>
      {block(t.s, "sec")}
    </div>
  );
}

export function FlashDeal() {
  return (
    <div className="min-h-screen bg-[#111111] font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl bg-[#111111]/90">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-4">
          <div className="font-black text-xl text-white tracking-tight">
            jumia<span className="text-[#F68B1E]">.ng</span>
          </div>
          <div className="flex-1 flex bg-white/10 border border-white/10 rounded-xl px-4 h-9 items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input className="flex-1 bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-600" placeholder="Search deals…" readOnly />
          </div>
          <button className="relative ml-2">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#E53935] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
        </div>
      </header>

      {/* Hero Countdown */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/20 via-transparent to-[#F68B1E]/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E53935]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 py-14 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#E53935]/20 border border-[#E53935]/40 text-[#E53935] text-xs font-black px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5"/> Flash Sale · Ends July 31
          </div>
          <h1 className="text-white font-black text-6xl md:text-7xl leading-none mb-3">
            Up to <span className="text-[#F68B1E]">80%</span> Off
          </h1>
          <p className="text-gray-400 text-lg mb-10">These prices disappear when the timer hits zero</p>
          <Countdown />
          <div className="flex items-center justify-center gap-2 mt-8">
            <Bell className="w-4 h-4 text-[#F68B1E]"/>
            <p className="text-gray-400 text-sm"><span className="text-white font-semibold">1,247 people</span> are shopping these deals right now</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-black text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#F68B1E]"/> Deals Selling Fast
          </h2>
          <button className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1">
            All deals <ChevronRight className="w-4 h-4"/>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map(p => (
            <div key={p.id} className="group bg-[#1C1C1C] border border-white/5 hover:border-[#F68B1E]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-1 cursor-pointer flex flex-col">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-[#252525]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300 group-hover:scale-105" />
                </div>
                <div className="absolute top-2 left-2 bg-[#E53935] text-white text-[11px] font-black px-2 py-0.5 rounded-lg">-{p.discount}%</div>
                {p.hot && (
                  <div className="absolute top-2 right-2 bg-[#F68B1E] text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5"/>HOT
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <p className="text-gray-300 text-[12px] font-semibold line-clamp-2 leading-snug mb-2 group-hover:text-white transition-colors">{p.name}</p>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
                  <Stars rating={p.rating}/>
                  <span className="text-gray-600 text-[10px]">({p.reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="text-[#F68B1E] font-black text-lg leading-none">{fmt(p.price)}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-600 text-[11px] line-through">{fmt(p.was)}</span>
                    <span className="text-[#3CB64A] text-[10px] font-bold">Save {fmt(p.was - p.price)}</span>
                  </div>
                </div>

                {/* Stock bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-500 font-medium">{p.sold}% sold</span>
                    <span className="text-[10px] text-[#E53935] font-bold">{100 - p.sold} left!</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${p.sold}%`, background: p.sold > 80 ? "#E53935" : p.sold > 60 ? "#F68B1E" : "#3CB64A" }}
                    />
                  </div>
                </div>

                {/* Viewers */}
                <div className="flex items-center gap-1 mb-3">
                  <Users className="w-3 h-3 text-gray-600"/>
                  <span className="text-[10px] text-gray-500"><span className="text-white font-semibold">{p.viewers}</span> viewing now</span>
                </div>

                <button className="mt-auto w-full bg-[#F68B1E] hover:bg-[#E07B10] text-white font-bold py-2 rounded-xl text-[11px] uppercase tracking-wide transition-all shadow-lg shadow-orange-900/30 hover:shadow-orange-900/50 hover:scale-[1.02] duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#E53935] to-[#F68B1E] p-px">
          <div className="bg-[#1C1C1C] rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[#FFCF00] text-xs font-black uppercase tracking-widest mb-1">Don't miss out</p>
              <h3 className="text-white font-black text-2xl">Sale ends in <span className="text-[#E53935]">8 days, 12 hours</span></h3>
              <p className="text-gray-500 text-sm mt-1">Prices go back to normal when the timer hits zero — no exceptions.</p>
            </div>
            <button className="shrink-0 bg-gradient-to-r from-[#E53935] to-[#F68B1E] text-white font-black px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-sm uppercase tracking-wider shadow-xl">
              Shop All Flash Deals →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
