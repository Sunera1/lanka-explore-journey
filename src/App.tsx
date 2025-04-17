
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Accommodations from "./pages/Accommodations";
import Transport from "./pages/Transport";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import DestinationDetail from "./pages/DestinationDetail";
import AccommodationDetail from "./pages/AccommodationDetail";
import MapNavigation from "./pages/MapNavigation";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/maps" element={<MapNavigation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
