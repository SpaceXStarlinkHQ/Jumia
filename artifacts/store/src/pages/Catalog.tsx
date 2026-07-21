import { useState } from "react";
import { Link } from "wouter";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import { Search, Filter, ShoppingCart, Package } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  
  // Use debounced search to avoid too many requests
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const { data: products, isLoading: isLoadingProducts } = useListProducts({ 
    search: debouncedSearch || undefined, 
    category: category || undefined 
  });
  
  const { data: categories, isLoading: isLoadingCategories } = useListCategories();
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(search);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/30 p-6 rounded-xl border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Our Collection</h1>
          <p className="text-muted-foreground mt-1">Discover our curated selection of premium products.</p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Search
          </button>
        </form>
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-48 shrink-0">
          <div className="sticky top-24 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" /> Categories
            </h3>
            {isLoadingCategories ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setCategory("")}
                  className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    category === "" ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
                  }`}
                >
                  All Products
                </button>
                {categories?.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                      category === c ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-square bg-muted rounded-xl animate-pulse" />
                  <div className="h-5 bg-muted rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : products?.length === 0 ? (
            <div className="text-center py-20 border rounded-xl bg-muted/10">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters or search query.</p>
              {(category || debouncedSearch) && (
                <button 
                  onClick={() => { setCategory(""); setSearch(""); setDebouncedSearch(""); }}
                  className="mt-4 px-4 py-2 text-sm border bg-background rounded-lg hover:bg-muted transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <div key={product.id} className="group flex flex-col border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
                  <Link href={`/products/${product.id}`} className="aspect-square bg-muted relative overflow-hidden block">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Package className="w-10 h-10 opacity-20" />
                      </div>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
                        Only {product.stock} left
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute top-2 left-2 bg-muted-foreground text-white text-xs font-bold px-2 py-1 rounded-md">
                        Out of stock
                      </span>
                    )}
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs text-muted-foreground capitalize mb-1">{product.category}</div>
                    <Link href={`/products/${product.id}`} className="font-semibold text-lg line-clamp-1 hover:underline">
                      {product.name}
                    </Link>
                    <div className="mt-2 text-lg font-bold text-primary mt-auto">
                      {formatNaira(product.priceKobo)}
                    </div>
                    <button
                      disabled={product.stock === 0}
                      onClick={() => {
                        addItem({
                          productId: product.id,
                          productName: product.name,
                          quantity: 1,
                          unitPriceKobo: product.priceKobo,
                          imageUrl: product.imageUrl,
                        });
                        toast({
                          title: "Added to cart",
                          description: `${product.name} has been added to your cart.`,
                        });
                      }}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors border border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
