import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, User, ArrowRight, Menu } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "200L Deep Freezer", category: "Home & Office", priceKobo: 19500000, imageUrl: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg" },
  { id: 2, name: "219L LG Double Door Fridge", category: "Home & Office", priceKobo: 34500000, imageUrl: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg" },
  { id: 3, name: "Hisense 8KG Washing Machine", category: "Home & Office", priceKobo: 28000000, imageUrl: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500&q=80" },
  { id: 4, name: "Firman 3KVA Generator", category: "Home & Office", priceKobo: 24500000, imageUrl: "https://firmanpowerequipment.com/cdn/shop/products/W03082_200_900x900.png" },
  { id: 5, name: "43″ Smart LED TV", category: "Electronics", priceKobo: 18000000, imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80" },
  { id: 6, name: "Hisense 55″ Smart TV", category: "Electronics", priceKobo: 32000000, imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80" },
  { id: 7, name: "Soundcore Motion Boom Speaker", category: "Electronics", priceKobo: 8500000, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80" },
  { id: 8, name: "Tecno Camon 40 Pro 5G", category: "Phones & Tablets", priceKobo: 22000000, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80" },
  { id: 9, name: "Samsung Galaxy A55 5G", category: "Phones & Tablets", priceKobo: 31500000, imageUrl: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&q=80" },
  { id: 10, name: "Infinix Hot 50 Pro", category: "Phones & Tablets", priceKobo: 12500000, imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&q=80" },
  { id: 11, name: "Apple iPad 10th Gen", category: "Phones & Tablets", priceKobo: 68000000, imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi_FMT_WHH" },
  { id: 12, name: "HP 15s Laptop — Ryzen 5", category: "Computing", priceKobo: 48000000, imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" },
  { id: 13, name: "Lenovo IdeaPad Slim 3", category: "Computing", priceKobo: 55000000, imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80" },
  { id: 14, name: "Logitech MX Master 3S", category: "Computing", priceKobo: 4200000, imageUrl: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png" },
  { id: 15, name: "Men's Polo Ralph Lauren Shirt", category: "Fashion", priceKobo: 6500000, imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80" },
  { id: 16, name: "Women's Ankara Wrap Midi Dress", category: "Fashion", priceKobo: 4800000, imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" },
  { id: 17, name: "Nike Air Force 1 '07", category: "Fashion", priceKobo: 5500000, imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png" },
  { id: 18, name: "Ladies' Leather Tote Bag", category: "Fashion", priceKobo: 3200000, imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { id: 19, name: "Dangote Sugar 50kg", category: "Supermarket", priceKobo: 8500000, imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80" },
  { id: 20, name: "Milo Energy Drink 400g × 3", category: "Supermarket", priceKobo: 1800000, imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80" },
  { id: 21, name: "Indomie Noodles Chicken 40pk", category: "Supermarket", priceKobo: 1400000, imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&q=80" },
  { id: 22, name: "Scanfrost 5-Burner Gas Cooker", category: "Kitchen & Dining", priceKobo: 22000000, imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" },
  { id: 23, name: "Stainless Steel Cookware Set 8pc", category: "Kitchen & Dining", priceKobo: 7500000, imageUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80" },
  { id: 24, name: "Binatone Table Blender", category: "Kitchen & Dining", priceKobo: 1800000, imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&q=80" },
  { id: 25, name: "Neutrogena Hydro Boost Moisturiser", category: "Health & Beauty", priceKobo: 850000, imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80" },
  { id: 26, name: "ORS Olive Oil Relaxer Kit", category: "Health & Beauty", priceKobo: 450000, imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80" },
  { id: 27, name: "Philips BRE245 Epilator", category: "Health & Beauty", priceKobo: 3200000, imageUrl: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&q=80" },
  { id: 28, name: "Decathlon 20kg Dumbbell Set", category: "Sports", priceKobo: 3800000, imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80" },
  { id: 29, name: "Nike Phantom GX Football Boots", category: "Sports", priceKobo: 2800000, imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3cb66f21-dae0-4e34-9f54-c4e71c5b4d81/phantom-gx-academy-fg-mg-football-boots-pslL3R.png" },
  { id: 30, name: "Pampers Premium Care Diapers S4", category: "Baby", priceKobo: 2200000, imageUrl: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=500&q=80" },
  { id: 31, name: "Baby Trend Expedition Stroller", category: "Baby", priceKobo: 14500000, imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80" },
  { id: 32, name: "Fisher-Price Kick & Play Piano Gym", category: "Baby", priceKobo: 1900000, imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80" },
  { id: 33, name: "Morning Glory Orthopedic Mattress", category: "Home & Office", priceKobo: 18500000, imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80" },
];

function formatNaira(kobo: number): string {
  return "₦" + (kobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function Catalog() {
  const [timeLeft, setTimeLeft] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filteredProducts = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  // Use the Firman Generator as the hero feature
  const featuredProduct = PRODUCTS.find(p => p.id === 4) || PRODUCTS[0];

  useEffect(() => {
    const target = new Date("Aug 10, 2026 00:00:00").getTime();
    const update = () => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        setTimeLeft("Sale Ended");
        return;
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${d}D ${h.toString().padStart(2, '0')}H ${m.toString().padStart(2, '0')}M ${s.toString().padStart(2, '0')}S`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F3F3F3] font-sans selection:bg-[#C9933B] selection:text-black">
      {/* Top Banner */}
      <div className="w-full bg-[#C9933B] text-black text-xs md:text-sm font-bold tracking-[0.2em] uppercase py-2.5 px-4 text-center flex items-center justify-center gap-4">
        <span>The Grand Premiere Sale</span>
        <span className="hidden md:inline-block w-1 h-1 rounded-full bg-black/50" />
        <span>Ends In: {timeLeft}</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5 py-5 px-6 lg:px-12 transition-all">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 lg:hidden">
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
            <a href="#" className="text-white">Shop</a>
            <a href="#" className="hover:text-white transition-colors">Collections</a>
            <a href="#" className="hover:text-white transition-colors">Editorial</a>
          </nav>

          <div className="text-2xl md:text-3xl font-['Playfair_Display'] font-black tracking-widest text-white text-center absolute left-1/2 -translate-x-1/2">
            BIGDEALS<span className="text-[#C9933B]">.</span>
          </div>

          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hidden sm:block" />
            <User className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hidden sm:block" />
            <div className="relative cursor-pointer group flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-[#C9933B] transition-colors" />
              <span className="hidden sm:block text-xs font-medium uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">Cart</span>
              <span className="absolute -top-1.5 -right-2 sm:-right-4 bg-[#C9933B] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A] via-[#0D0D0D] to-[#0D0D0D] z-0" />
        <div className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#C9933B]/10 rounded-full blur-[140px] top-1/2 right-0 -translate-y-1/2 translate-x-1/4 z-0 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-20 lg:py-0">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 text-[#C9933B] text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-10 h-[2px] bg-[#C9933B]" />
              New Arrivals
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8">
              The Art of <br />
              <span className="text-[#C9933B] italic font-normal">Living Well.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light">
              Curated excellence for the aspirational Nigerian. Discover world-class appliances, tech, and fashion.
            </p>
            <button className="group bg-[#C9933B] text-black px-10 py-5 font-bold tracking-[0.15em] uppercase text-xs flex items-center gap-4 hover:bg-white transition-all duration-300">
              Explore Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative hidden lg:flex items-center justify-center h-full">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9933B]/20 to-transparent rounded-full blur-3xl transform rotate-12" />
              <img
                src={featuredProduct.imageUrl}
                alt={featuredProduct.name}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-1000 ease-out p-8"
              />
              <div className="absolute bottom-4 -left-12 bg-[#111111]/80 backdrop-blur-xl p-8 border border-white/10 shadow-2xl z-20 group cursor-pointer hover:border-[#C9933B]/50 transition-colors max-w-xs">
                <p className="font-['Playfair_Display'] text-2xl mb-2 text-white leading-tight">{featuredProduct.name}</p>
                <div className="flex items-center justify-between mt-6">
                  <p className="text-[#C9933B] font-semibold text-xl tracking-wide">{formatNaira(featuredProduct.priceKobo)}</p>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C9933B] group-hover:text-black transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-[72px] sm:top-[76px] z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/5 py-5 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-4">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`whitespace-nowrap px-8 py-3 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === c
                    ? "bg-[#C9933B] text-black border border-[#C9933B]"
                    : "bg-transparent text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">{activeCategory === "All" ? "The Collection" : activeCategory}</h2>
            <p className="text-gray-400 text-sm tracking-wider uppercase">{filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          {filteredProducts.map(product => {
            const isLifestyle = product.imageUrl.includes('unsplash.com');
            
            return (
              <div key={product.id} className="group flex flex-col cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#F8F5F0] mb-6 overflow-hidden rounded-sm flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out ${
                      isLifestyle 
                        ? 'object-cover' 
                        : 'object-contain mix-blend-multiply p-10'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-black/90 via-black/50 to-transparent flex justify-center">
                    <button className="w-full bg-[#C9933B] text-black py-4 font-bold uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 hover:bg-white transition-colors transform translate-y-4 group-hover:translate-y-0 delay-75 duration-300">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">{product.category}</p>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-['Playfair_Display'] text-xl text-white leading-tight group-hover:text-[#C9933B] transition-colors pr-2">
                      {product.name}
                    </h3>
                    <p className="font-semibold text-[#C9933B] whitespace-nowrap text-lg mt-0.5 tracking-wide">
                      {formatNaira(product.priceKobo)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Minimal Footer */}
      <footer className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-3xl font-['Playfair_Display'] font-black tracking-widest text-white">
          BIGDEALS<span className="text-[#C9933B]">.</span>
        </div>
        <div className="flex gap-8 text-xs font-semibold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
        <p className="text-gray-600 text-xs uppercase tracking-widest">
          © 2026 BigDeals Nigeria.
        </p>
      </footer>
    </div>
  );
}
