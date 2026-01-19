import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Schedule from "./pages/Schedule";
import Subscriptions from "./pages/Subscriptions";
import Attendance from "./pages/Attendance";
import Instructors from "./pages/Instructors";
import Trials from "./pages/Trials";
import Aggregators from "./pages/Aggregators";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// AUTH SYSTEM - Work in Progress
// Adding authentication to protect routes

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/aggregators" element={<Aggregators />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
