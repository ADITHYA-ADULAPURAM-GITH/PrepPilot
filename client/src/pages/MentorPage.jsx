import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { mentorApi } from "@/api/endpoints/mentor";

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="text-[13px] leading-relaxed">{children}</li>,
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1 py-0.5 text-[12px]">{children}</code>
  ),
};

export default function MentorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

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
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsSending(true);

    try {
      const res = await mentorApi.sendMessage(trimmed);
      const reply = res.data?.data?.reply;
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch (err) {
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
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
          <Sparkles className="size-[18px] text-white" />
        </div>
        <div>
          <h1 className="font-display text-[15px] font-semibold text-text">PrepPilot AI</h1>
          <p className="text-[13px] text-text-muted">Your mentor, wired into your actual progress.</p>
        </div>
      </div>

      <div className="glass flex flex-1 flex-col overflow-hidden rounded-2xl">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <p className="text-center text-[13px] text-text-faint">
              Ask about your DSA progress, mock interviews, or resume — your mentor knows where you stand.
            </p>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-xl px-4 py-2.5 text-[13px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-primary to-accent text-white"
                    : "bg-white/5 text-text"
                }`}
              >
                {m.role === "model" ? (
                  <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-[13px] text-text-muted">
                <Loader2 className="size-3.5 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        {error && <p className="px-6 pb-2 text-[12px] text-red-400">{error}</p>}

        <div className="flex items-center gap-2 border-t border-white/5 p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask PrepPilot AI..."
            disabled={isSending}
            className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-[13px] text-text placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button onClick={handleSend} disabled={isSending || !input.trim()}>
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}