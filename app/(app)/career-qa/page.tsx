"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BiBot, BiRefresh, BiUser } from "react-icons/bi";
import { FaBriefcase, FaChartLine, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { MdOutlineAssessment, MdSend } from "react-icons/md";
import { AiError } from "@/components/AiKeyNotice";
import { ChatText } from "@/components/ChatText";
import { Button, PageHeader, cx } from "@/components/ui";
import { useAppData, type ChatMessage } from "@/lib/app-data";

const suggestions = [
  { category: "Career Path", icon: FaGraduationCap, questions: ["What career path fits my skills?", "How do I switch into tech from another field?"] },
  { category: "Skills", icon: FaLightbulb, questions: ["Which skills should I learn next for my target role?", "Which certifications are worth it?"] },
  { category: "Job Search", icon: FaBriefcase, questions: ["How do I make my resume stand out?", "How should I prepare for technical interviews?"] },
  { category: "Growth", icon: FaChartLine, questions: ["How do I negotiate salary?", "How do I move into a leadership role?"] },
];

const uid = () => crypto.randomUUID();

export default function CareerQAPage() {
  const { chat, setChat, newChat, profile, upsertHistory } = useAppData();
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.messages, streaming]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;
    setError("");
    setInput("");

    const sessionId = chat.id === "initial" ? uid() : chat.id;
    const userMsg: ChatMessage = { id: uid(), role: "user", content, createdAt: new Date().toISOString() };
    const assistantId = uid();
    const history = [...chat.messages, userMsg];

    setChat({
      id: sessionId,
      messages: [...history, { id: assistantId, role: "assistant", content: "", createdAt: new Date().toISOString() }],
    });
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          profile,
        }),
      });

      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        const snapshot = reply;
        setChat((prev) => ({
          ...prev,
          messages: prev.messages.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m)),
        }));
      }

      const first = history[0]?.content ?? content;
      upsertHistory({
        id: `chat-${sessionId}`,
        type: "chat",
        title: first.length > 60 ? `${first.slice(0, 57)}…` : first,
        summary: `${history.length + 1} messages`,
      });
    } catch (e) {
      if (controller.signal.aborted) return;
      setError(e instanceof Error ? e.message : "Something went wrong.");
      // Drop the empty assistant bubble if nothing streamed in.
      if (!reply) {
        setChat((prev) => ({ ...prev, messages: prev.messages.filter((m) => m.id !== assistantId) }));
        setInput(content);
      }
    } finally {
      setStreaming(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  function clear() {
    abortRef.current?.abort();
    setStreaming(false);
    setError("");
    setInput("");
    newChat();
  }

  const empty = chat.messages.length === 0;

  return (
    <>
      <PageHeader
        icon={MdOutlineAssessment}
        title="Career Q&A"
        subtitle="Ask anything. Answers use your profile for context."
        actions={
          <Button variant="ghost" className="border border-gray-700 bg-gray-800" onClick={clear} disabled={empty && !input}>
            <BiRefresh size={18} /> New chat
          </Button>
        }
      />

      <div className="mx-auto flex h-[calc(100vh-15rem)] min-h-[460px] max-w-4xl flex-col rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
          {empty && (
            <>
              <Bubble role="assistant">
                <p className="text-sm leading-relaxed">
                  Hi{profile.name ? ` ${profile.name.split(" ")[0]}` : ""}! I&apos;m your AI Career Coach. Ask me about career paths,
                  skills, resumes, interviews or salary. Try one of these:
                </p>
              </Bubble>
              <div className="grid gap-3 pl-11 sm:grid-cols-2">
                {suggestions.map(({ category, icon: Icon, questions }) => (
                  <div key={category} className="rounded-lg border border-gray-700 p-3">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-500">
                      <Icon /> {category}
                    </p>
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => void send(q)}
                        className="block w-full rounded px-2 py-1.5 text-left text-sm text-gray-300 transition hover:bg-gray-700 hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {chat.messages.map((m) => (
            <Bubble key={m.id} role={m.role}>
              {m.content ? (
                m.role === "assistant" ? (
                  <ChatText text={m.content} />
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                )
              ) : (
                <div className="flex gap-1 py-1" aria-label="Coach is typing">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
            </Bubble>
          ))}
          <div ref={endRef} />
        </div>

        {error && (
          <div className="px-4 pb-2 sm:px-6">
            <AiError message={error} />
          </div>
        )}

        <div className="border-t border-gray-700 p-4 sm:p-6">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={4000}
              rows={2}
              aria-label="Your question"
              placeholder="Ask me anything about your career… (Enter to send, Shift+Enter for a new line)"
              className="flex-1 resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={() => void send(input)}
              disabled={!input.trim() || streaming}
              aria-label="Send message"
              className="flex items-center justify-center rounded-lg bg-indigo-500 px-4 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const user = role === "user";
  return (
    <div className={cx("flex", user ? "justify-end" : "justify-start")}>
      <div className={cx("flex max-w-[90%] gap-3 sm:max-w-[80%]", user && "flex-row-reverse")}>
        <div
          className={cx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            user ? "bg-indigo-500 text-white" : "border border-indigo-500 bg-gray-700 text-indigo-500",
          )}
        >
          {user ? <BiUser size={16} /> : <BiBot size={16} />}
        </div>
        <div className={cx("rounded-lg p-4", user ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-100")}>{children}</div>
      </div>
    </div>
  );
}
