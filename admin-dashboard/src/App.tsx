import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Avatar } from "@mui/material";
import { DashboardLayout } from "@org/ui";
import type { NavItem } from "@org/ui";
import logoImage from "./assets/logo-white-bg.png";

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
const AdminAssignmentsPage = lazy(() => import("./pages/AdminAssignmentsPage"));
const AdminMeetingsPage = lazy(() => import("./pages/AdminMeetingsPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const AdminSettingsPage = lazy(() => import("./pages/AdminSettingsPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));

const navItems: NavItem[] = [
  { icon: <DashboardOutlinedIcon />, path: "/", label: "Dashboard" },
  { icon: <PeopleOutlinedIcon />, path: "/users", label: "Users" },
  { icon: <AssignmentOutlinedIcon />, path: "/assignments", label: "Assignments" },
  { icon: <EventOutlinedIcon />, path: "/meetings", label: "Meetings" },
  { icon: <BarChartOutlinedIcon />, path: "/analytics", label: "Analytics" },
];

const bottomNavItems: NavItem[] = [
  { icon: <SettingsOutlinedIcon />, path: "/settings", label: "Settings" },
];

const AdminLayoutWrapper = () => (
  <DashboardLayout
    navItems={navItems}
    bottomNavItems={bottomNavItems}
    logoSrc={logoImage}
    logoAlt="Minutor Admin"
    homePath="/"
    displayName="Admin"
    mainClassName="p-6"
    renderProfile={() => (
      <button
        onClick={() => console.log("Profile clicked")}
        className="focus:outline-none"
        title="Admin"
      >
        <Avatar sx={{ width: 36, height: 36, cursor: "pointer" }}>A</Avatar>
      </button>
    )}
  />
);

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-lg">Loading...</div>}>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<AdminLayoutWrapper />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<AdminUsersPage />} />
          <Route path="/dashboard/assignments" element={<AdminAssignmentsPage />} />
          <Route path="/dashboard/meetings" element={<AdminMeetingsPage />} />
          <Route path="/dashboard/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/dashboard/settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
