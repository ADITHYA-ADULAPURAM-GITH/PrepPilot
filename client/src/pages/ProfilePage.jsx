import { useAuth } from "@/context/AuthContext";

function formatMemberSince(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const memberSince = formatMemberSince(user.createdAt);
  const hasMentor = Boolean(user.mentor?.name);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 p-6">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-xl font-semibold text-white">
          {initials(user.name) || "U"}
        </div>
        <div className="min-w-0">
          <h2 className="truncate font-display text-lg font-semibold text-text">{user.name}</h2>
          <p className="truncate text-[13.5px] text-text-muted">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface/50 p-6">
        <h3 className="mb-4 font-display text-[13.5px] font-semibold text-text">Account Details</h3>
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-[13px] text-text-muted">Role</dt>
            <dd className="text-[13.5px] font-medium capitalize text-text">{user.role || "—"}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-[13px] text-text-muted">Email verification</dt>
            <dd
              className={
                user.isEmailVerified
                  ? "text-[13.5px] font-medium text-emerald-400"
                  : "text-[13.5px] font-medium text-amber-400"
              }
            >
              {user.isEmailVerified ? "Verified" : "Not verified"}
            </dd>
          </div>

          {memberSince && (
            <div className="flex items-center justify-between">
              <dt className="text-[13px] text-text-muted">Member since</dt>
              <dd className="text-[13.5px] font-medium text-text">{memberSince}</dd>
            </div>
          )}
        </dl>
      </div>

      {hasMentor && (
        <div className="mt-6 rounded-xl border border-border bg-surface/50 p-6">
          <h3 className="mb-4 font-display text-[13.5px] font-semibold text-text">Mentor</h3>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-text-muted">Name</span>
            <span className="text-[13.5px] font-medium text-text">{user.mentor.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}