import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mentorApi } from "@/api/endpoints/mentor";
import { useAuth } from "@/context/AuthContext";
import mentorMale from "@/assets/mentors/mentor-male.png";
import mentorFemale from "@/assets/mentors/mentor-female.png";

export default function MentorIdentityModal({ onClose }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.mentor?.name || "");
  const [avatar, setAvatar] = useState(user?.mentor?.avatar || "male");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a name.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const res = await mentorApi.updateIdentity({ name: trimmed, avatar });
      updateUser({ mentor: res.data?.data?.user?.mentor });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="glass w-full max-w-sm rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-text">Customize Your Mentor</h2>
          <button onClick={onClose} className="text-text-faint hover:text-text">
            <X className="size-4" />
          </button>
        </div>

        <div className="mb-4 flex justify-center gap-4">
          {[
            { key: "male", src: mentorMale, label: "Male" },
            { key: "female", src: mentorFemale, label: "Female" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setAvatar(opt.key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl p-2 ${
                avatar === opt.key ? "ring-2 ring-primary" : "opacity-60"
              }`}
            >
              <img src={opt.src} alt={opt.label} className="size-16 rounded-full object-cover" />
              <span className="text-[12px] text-text-muted">{opt.label}</span>
            </button>
          ))}
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="Mentor name"
          className="mb-1 w-full rounded-xl bg-white/5 px-4 py-2.5 text-[13px] text-text placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {error && <p className="mb-2 text-[12px] text-red-400">{error}</p>}

        <Button onClick={handleSave} disabled={isSaving} className="mt-3 w-full">
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}