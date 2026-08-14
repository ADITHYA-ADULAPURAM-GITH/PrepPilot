import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2, Settings } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { mentorApi } from "@/api/endpoints/mentor";
import { useAuth } from "@/context/AuthContext";
import MentorIdentityModal from "@/features/mentor/components/MentorIdentityModal";
import mentorMale from "@/assets/mentors/mentor-male.png";
import mentorFemale from "@/assets/mentors/mentor-female.png";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-2 mt-1 font-display text-[15px] font-semibold text-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-1.5 mt-1 font-display text-[14px] font-semibold text-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 mt-1 text-[13.5px] font-semibold text-text">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="text-[13px] leading-relaxed">{children}</li>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[12px]">{children}</code>
    ) : (
      <code className="block font-mono text-[12px] leading-relaxed">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="mb-2 overflow-x-auto rounded-lg bg-black/30 p-3 last:mb-0">{children}</pre>
  ),
};

function MentorAvatar({ thinking = false, avatarSrc }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex size-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent ${
          thinking ? "animate-pulse" : ""
        }`}
      >
        {avatarSrc ? (
          <img src={avatarSrc} alt="Mentor" className="size-full object-cover" />
        ) : (
          <Sparkles className="size-3.5 text-white" />
        )}
      </div>
      {thinking && (
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 blur-md" />
      )}
    </div>
  );
}

// How close to the bottom (in px) counts as "already at the bottom" —
// below this, new messages auto-scroll into view. Above it, the user
// is treated as deliberately reading older messages and isn't
// interrupted.
const AUTO_SCROLL_THRESHOLD = 80;

export default function MentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const shouldAutoScroll = useRef(true);

  const mentorAvatarSrc = user?.mentor?.avatar === "female" ? mentorFemale : mentorMale; // male is default
  const mentorName = user?.mentor?.name;

  useEffect(() => {
    let cancelled = false;

    async function loadConversation() {
      try {
        const res = await mentorApi.getConversation();
        const conversation = res.data?.data ?? {};
        const loaded = conversation.messages ?? conversation.conversation?.messages ?? [];
        if (!cancelled) setMessages(loaded);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || "Couldn't load your conversation.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadConversation();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (shouldAutoScroll.current) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isSending]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldAutoScroll.current = distanceFromBottom < AUTO_SCROLL_THRESHOLD;
  }

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setInput("");
    setError(null);
    shouldAutoScroll.current = true;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsSending(true);

    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });

    try {
      const res = await mentorApi.sendMessage(trimmed);
      const reply = res.data?.data?.reply;
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch (err) {
      // err.response?.data?.message is the clean ApiError text the
      // backend already produces (e.g. "Mentor AI couldn't generate a
      // response. Please try again.") — never the raw Gemini error body
      // or a stack trace, since geminiClient.js never sends those to
      // the client in the first place.
      setError(err.response?.data?.message || "Mentor AI couldn't respond. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent">
          <img src={mentorAvatarSrc} alt="Mentor" className="size-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[15px] font-semibold text-text">
            {mentorName || "PrepPilot AI"}
          </h1>
          <p className="truncate text-[13px] text-text-muted">Your mentor, wired into your actual progress.</p>
        </div>
        <button
          onClick={() => setShowIdentityModal(true)}
          className="shrink-0 rounded-lg p-2 text-text-faint hover:bg-white/5 hover:text-text"
          aria-label="Customize mentor"
        >
          <Settings className="size-4" />
        </button>
      </div>

      <div className="glass flex flex-1 flex-col overflow-hidden rounded-2xl">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6"
        >
          {messages.length === 0 && (
            <p className="text-center text-[13px] text-text-faint">
              Ask about your DSA progress, mock interviews, or resume — your mentor knows where you stand.
            </p>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "model" && <MentorAvatar avatarSrc={mentorAvatarSrc} />}
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13px] leading-relaxed sm:max-w-[75%] ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-primary to-accent text-white"
                      : "bg-white/5 text-text"
                  }`}
                >
                  {m.role === "model" ? (
                    <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isSending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end gap-2"
            >
              <MentorAvatar thinking avatarSrc={mentorAvatarSrc} />
              <div className="flex items-center gap-1.5 rounded-xl bg-white/5 px-4 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-text-faint [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-text-faint" />
              </div>
            </motion.div>
          )}
        </div>

        {error && <p className="px-4 pb-2 text-[12px] text-red-400 sm:px-6">{error}</p>}

        <div className="flex items-end gap-2 border-t border-white/5 p-3 sm:p-4">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask PrepPilot AI..."
            disabled={isSending}
            rows={1}
            className="max-h-[120px] flex-1 resize-none rounded-xl bg-white/5 px-4 py-2.5 text-[13px] text-text placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button onClick={handleSend} disabled={isSending || !input.trim()} className="shrink-0">
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>

      {showIdentityModal && <MentorIdentityModal onClose={() => setShowIdentityModal(false)} />}
    </div>
  );
}