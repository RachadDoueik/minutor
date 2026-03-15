import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import Spinner from "./components/common/Spinner/Spinner";
import { DashboardLayout } from "@org/ui";
import type { NavItem } from "@org/ui";
import { UserProfile } from "@org/ui";
import logoImage from "./assets/images/logo-white-bg.png";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Calendar = lazy(() => import("./pages/CalendarPage"));
const MeetingsPage = lazy(() => import("./pages/MeetingsPage"));
const AssignmentsPage = lazy(() => import("./pages/AssignmentsPage"));

const navItems: NavItem[] = [
  { icon: <VideocamOutlinedIcon />, path: "/home/meetings", label: "Meetings" },
  { icon: <AssignmentTurnedInOutlinedIcon />, path: "/home/assignments", label: "Assignments" },
  { icon: <CalendarMonthOutlinedIcon />, path: "/home/calendar", label: "Calendar" },
];

const DashboardWrapper = () => (
  <DashboardLayout
    navItems={navItems}
    logoSrc={logoImage}
    logoAlt="Minutor"
    homePath="/home"
    displayName="Username"
    renderProfile={() => (
      <UserProfile
        username="Username"
        onClick={() => console.log("Profile clicked")}
      />
    )}
  />
);

const App = () => {
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
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
