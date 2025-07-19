import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignupPage from './pages/Signup';
import LoginPage from './pages/LoginPage';
import DashboardPage from "./pages/DashboardPage";
import PlansPage from "./pages/PlansPage";
import ReferralsPage from "./pages/ReferralsPage";
import SettingsPage from "./pages/SettingsPage";
import EarningsPage from "./pages/EarningsPage";
import SurveysPage from "./pages/SurveysPage";
import NotFound from "./pages/NotFound";

const SurveyDetailPage = lazy(() => import('./pages/SurveyDetailPage'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
            <Route path="/surveys" element={<SurveysPage />} />
            <Route path="/survey/:surveyId" element={<SurveyDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
