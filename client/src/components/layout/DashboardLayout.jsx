import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { LiveBackground } from "@/components/common/LiveBackground";
import { ROUTES } from "@/lib/constants";

const PAGE_TITLES = [
  { path: ROUTES.DASHBOARD, title: "Dashboard" },
  { path: ROUTES.DSA_TRACKER, title: "DSA Tracker" },
  { path: ROUTES.CS_SUBJECTS, title: "CS Subjects" },
  { path: ROUTES.COMPANIES, title: "Companies" },
  { path: ROUTES.RESUME, title: "Resume" },
  { path: ROUTES.STUDY_PLANNER, title: "Study Planner" },
  { path: ROUTES.MOCK_TESTS, title: "Mock Tests" },
  { path: ROUTES.MENTOR, title: "Mentor" },
  { path: ROUTES.PROFILE, title: "Profile" },
];

function getPageTitle(pathname) {
  const match = PAGE_TITLES.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );
  return match ? match.title : "Dashboard";
}

export function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex h-screen">
      <LiveBackground />
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={pageTitle} onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}