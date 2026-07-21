import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { CartProvider } from '@/lib/cart';
import { PageWrapper } from '@/components/layout';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Dashboard from '@/pages/Dashboard';

const queryClient = new QueryClient();

// Handles the Paystack redirect: /orders?reference=xxx → /orders/:reference
function PaystackReturn() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const reference = params.get('reference') || params.get('trxref');
  if (reference) {
    navigate(`/orders/${reference}`, { replace: true });
    return null;
  }
  navigate('/', { replace: true });
  return null;
}

function Router() {
  return (
    <PageWrapper>
      <Switch>
        <Route path="/" component={Catalog} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        {/* Paystack redirect lands here with ?reference=xxx */}
        <Route path="/orders" component={PaystackReturn} />
        <Route path="/orders/:reference" component={OrderConfirmation} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </PageWrapper>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
