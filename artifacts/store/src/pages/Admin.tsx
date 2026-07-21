import { useState, useRef } from "react";
import {
  useGetStoreSummary,
  useListOrders,
  useListProducts,
  useUpdateOrderStatus,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  getListProductsQueryKey,
  getListOrdersQueryKey,
  getGetStoreSummaryQueryKey
} from "@workspace/api-client-react";
import { formatNaira } from "@/lib/utils";
import { format } from "date-fns";
import { Package, ShoppingBag, DollarSign, Activity, Pencil, Trash2, Plus, RefreshCw, Eye } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderStatusUpdateStatus } from "@workspace/api-client-react";

const productSchema = z.object({
  name: z.string().min(1, "Name required"),
  description: z.string().optional().default(""),
  priceKobo: z.coerce.number().min(100, "Price must be at least 1 NGN (100 kobo)"),
  imageUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  stock: z.coerce.number().min(0),
  category: z.string().min(1, "Category required")
});

type ProductForm = z.infer<typeof productSchema>;

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: summary, isLoading: isLoadingSummary } = useGetStoreSummary();
  const { data: products, isLoading: isLoadingProducts } = useListProducts();
  const { data: orders, isLoading: isLoadingOrders } = useListOrders();

  const updateOrderStatus = useUpdateOrderStatus();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema)
  });

  const handleEdit = (product: any) => {
    setEditingProduct(product.id);
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("priceKobo", product.priceKobo);
    setValue("imageUrl", product.imageUrl || "");
    setValue("stock", product.stock);
    setValue("category", product.category);
    setShowProductForm(true);
  };

  const handleCreateNew = () => {
    setEditingProduct(null);
    reset({
      name: "", description: "", priceKobo: 100000, imageUrl: "", stock: 10, category: "general"
    });
    setShowProductForm(true);
  };

  const onSubmitProduct = (data: ProductForm) => {
    const payload = {
      ...data,
      imageUrl: data.imageUrl || undefined
    };

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct, data: payload }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
          toast({ title: "Product updated successfully" });
          setShowProductForm(false);
        }
      });
    } else {
      createProduct.mutate({ data: payload }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
          toast({ title: "Product created successfully" });
          setShowProductForm(false);
        }
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
          toast({ title: "Product deleted" });
        }
      });
    }
  };

  const handleStatusChange = (orderId: number, status: OrderStatusUpdateStatus) => {
    updateOrderStatus.mutate({ id: orderId, data: { status } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStoreSummaryQueryKey() });
        toast({ title: "Order status updated" });
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
        <div className="flex gap-2">
          {(["overview", "products", "orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 border rounded-xl bg-card shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Total Revenue</h3>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold">{summary ? formatNaira(summary.totalRevenueKobo) : "..."}</div>
            </div>
            <div className="p-6 border rounded-xl bg-card shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Total Orders</h3>
                <ShoppingBag className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold">{summary?.totalOrders ?? "..."}</div>
            </div>
            <div className="p-6 border rounded-xl bg-card shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Pending Orders</h3>
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold">{summary?.pendingOrders ?? "..."}</div>
            </div>
            <div className="p-6 border rounded-xl bg-card shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">Products</h3>
                <Package className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold">{summary?.totalProducts ?? "..."}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Manage Products</h2>
            <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">
              <Plus className="w-4 h-4" /> New Product
            </button>
          </div>

          {showProductForm && (
            <form onSubmit={handleSubmit(onSubmitProduct)} className="p-6 border rounded-xl bg-muted/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex justify-between items-center mb-2 border-b pb-2">
                <h3 className="font-bold">{editingProduct ? "Edit Product" : "Create Product"}</h3>
                <button type="button" onClick={() => setShowProductForm(false)} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input {...register("name")} className="w-full px-3 py-2 border rounded-md" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input {...register("category")} className="w-full px-3 py-2 border rounded-md" />
                {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price (Kobo)</label>
                <input type="number" {...register("priceKobo")} className="w-full px-3 py-2 border rounded-md" />
                {errors.priceKobo && <p className="text-xs text-destructive mt-1">{errors.priceKobo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input type="number" {...register("stock")} className="w-full px-3 py-2 border rounded-md" />
                {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
                <input {...register("imageUrl")} className="w-full px-3 py-2 border rounded-md" />
                {errors.imageUrl && <p className="text-xs text-destructive mt-1">{errors.imageUrl.message}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea {...register("description")} rows={3} className="w-full px-3 py-2 border rounded-md" />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={createProduct.isPending || updateProduct.isPending} className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg">
                  Save Product
                </button>
              </div>
            </form>
          )}

          <div className="border rounded-xl overflow-hidden bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium">ID / Product</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products?.map(product => (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category} • ID: {product.id}</div>
                    </td>
                    <td className="p-4">{formatNaira(product.priceKobo)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Manage Orders</h2>
            <button onClick={() => queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() })} className="p-2 border rounded-md hover:bg-muted text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="border rounded-xl overflow-hidden bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium">Ref / Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders?.map(order => (
                  <tr key={order.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <div className="font-mono text-xs mb-1">{order.paystackReference}</div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">{format(new Date(order.createdAt), "MMM d, yyyy")}</td>
                    <td className="p-4 font-medium">{formatNaira(order.totalKobo)}</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatusUpdateStatus)}
                        disabled={updateOrderStatus.isPending}
                        className="bg-background border rounded px-2 py-1 text-xs font-semibold capitalize focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                       {/* Ideally an order details modal, but using simple view for now */}
                       <span className="text-xs text-muted-foreground flex justify-end gap-1 items-center">
                         ID: {order.id}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
