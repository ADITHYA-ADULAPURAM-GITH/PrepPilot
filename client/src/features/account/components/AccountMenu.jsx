import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AccountMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleViewProfile = () => {
    setIsOpen(false);
    navigate(ROUTES.PROFILE);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition-colors hover:bg-white/[0.05]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-[11.5px] font-semibold text-white">
          {initials(user?.name) || "U"}
        </div>
        <span className="hidden text-[13.5px] font-medium text-text sm:inline">{user?.name}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-surface py-1.5 shadow-lg"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="truncate text-[13.5px] font-medium text-text">{user?.name}</p>
            <p className="truncate text-[12px] text-text-muted">{user?.email}</p>
          </div>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] font-medium text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
            onClick={handleViewProfile}
          >
            <UserIcon className="size-[15px]" />
            View Profile
          </button>

          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] font-medium text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
            onClick={handleLogout}
          >
            <LogOut className="size-[15px]" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}