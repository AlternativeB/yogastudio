import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Simple Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session);
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthenticated(!!session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => {
  // Log environment check on startup
  useEffect(() => {
    console.log("=== App Starting ===");
    console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL ? "✓ Loaded" : "✗ Missing");
    console.log(
      "Supabase Key:",
      import.meta.env.VITE_SUPABASE_ANON_KEY ? "✓ Loaded" : "✗ Missing"
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/clients/:id"
                element={
                  <ProtectedRoute>
                    <ClientDetail />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/schedule"
                element={
                  <ProtectedRoute>
                    <Schedule />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <Subscriptions />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/instructors"
                element={
                  <ProtectedRoute>
                    <Instructors />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/trials"
                element={
                  <ProtectedRoute>
                    <Trials />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/aggregators"
                element={
                  <ProtectedRoute>
                    <Aggregators />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
