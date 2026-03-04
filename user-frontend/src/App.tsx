import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/common/Spinner/Spinner";
import { DashboardLayout } from "./components/dashboard";

// Lazy load admin components
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminUsersPage = lazy(() => import("./admin/pages/AdminUsersPage"));
const AdminAssignmentsPage = lazy(() => import("./admin/pages/AdminAssignmentsPage"));
const AdminMeetingsPage = lazy(() => import("./admin/pages/AdminMeetingsPage"));
const AdminAnalyticsPage = lazy(() => import("./admin/pages/AdminAnalyticsPage"));
const AdminSettingsPage = lazy(() => import("./admin/pages/AdminSettingsPage"));
const AdminLoginPage = lazy(() => import("./admin/pages/AdminLoginPage"));

const App = () => {
  const LandingPage = lazy(() => import("./pages/LandingPage"));
  const SignInPage = lazy(() => import("./pages/SignInPage"));
  const SignUpPage = lazy(() => import("./pages/SignUpPage"));
  const HomePage = lazy(() => import("./pages/HomePage"));
  const Calendar = lazy(() => import("./pages/CalendarPage"));

  // Wrapper for DashboardLayout without needing to pass props each time
  const DashboardWrapper = () => (
    <DashboardLayout username="Username" onProfileClick={() => console.log("Profile clicked")} />
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Dashboard routes with shared sidebar */}
          <Route path="/home" element={<DashboardWrapper />}>
            <Route index element={<HomePage />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="meetings" element={<AdminMeetingsPage />} />
            <Route path="assignments" element={<AdminAssignmentsPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="assignments" element={<AdminAssignmentsPage />} />
            <Route path="meetings" element={<AdminMeetingsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
