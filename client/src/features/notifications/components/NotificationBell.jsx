import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useUnreadCount } from "@/features/notifications/hooks/useUnreadCount";
import { NotificationPanel } from "@/features/notifications/components/NotificationPanel";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { data: unreadCount } = useUnreadCount();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const hasUnread = typeof unreadCount === "number" && unreadCount > 0;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/[0.05] hover:text-text"
        aria-label="Notifications"
      >
        <Bell className="size-[17px]" />

        {hasUnread && (
          <span className="absolute right-1 top-1 flex size-2 items-center justify-center rounded-full bg-primary ring-2 ring-base" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 top-16 z-20 sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:inset-x-auto">
          <NotificationPanel />
        </div>
      )}
    </div>
  );
}