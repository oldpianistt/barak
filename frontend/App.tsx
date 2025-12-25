import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./src/i18n/i18n";

import { Header } from "./src/components/Header";
import { Footer } from "./src/components/Footer";
import { ScrollToTop } from "./src/components/ScrollToTop";
import { HomePage } from "./src/pages/HomePage";
import { GalleryPage } from "./src/pages/GalleryPage";
import { MarbleDetailPage } from "./src/pages/MarbleDetailPage";
import { AboutPage } from "./src/pages/AboutPage";
import { ContactPage } from "./src/pages/ContactPage";
import { LoginPage } from "./src/pages/LoginPage";
import { AdminDashboard } from "./src/pages/admin/AdminDashboard";
import { AdminMarbleList } from "./src/pages/admin/AdminMarbleList";
import { AdminMarbleForm } from "./src/pages/admin/AdminMarbleForm";
import { AdminHeroSlidesList } from "./src/pages/admin/AdminHeroSlidesList";
import { AdminHeroSlidesForm } from "./src/pages/admin/AdminHeroSlidesForm";
import { ProtectedRoute } from "./src/components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/yonetim');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<GalleryPage />} />
          <Route path="/products/:id" element={<MarbleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes - /yonetim */}
          <Route
            path="/yonetim"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yonetim/marbles"
            element={
              <ProtectedRoute>
                <AdminMarbleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yonetim/marbles/new"
            element={
              <ProtectedRoute>
                <AdminMarbleForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yonetim/marbles/:id/edit"
            element={
              <ProtectedRoute>
                <AdminMarbleForm />
              </ProtectedRoute>
            }
          />

          {/* Hero Slides Routes */}
          <Route
            path="/yonetim/hero-slides"
            element={
              <ProtectedRoute>
                <AdminHeroSlidesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yonetim/hero-slides/new"
            element={
              <ProtectedRoute>
                <AdminHeroSlidesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yonetim/hero-slides/:id/edit"
            element={
              <ProtectedRoute>
                <AdminHeroSlidesForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}