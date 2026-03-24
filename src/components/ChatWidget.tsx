"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Markdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS_SEPARATOR = "---SUGGESTIONS---";

function parseSuggestions(content: string): {
  body: string;
  suggestions: string[];
} {
  const idx = content.indexOf(SUGGESTIONS_SEPARATOR);
  if (idx === -1) return { body: content, suggestions: [] };

  const body = content.slice(0, idx).trim();
  const jsonPart = content.slice(idx + SUGGESTIONS_SEPARATOR.length).trim();
  try {
    const suggestions = JSON.parse(jsonPart) as string[];
    if (Array.isArray(suggestions)) return { body, suggestions };
  } catch {
    // パース失敗時は候補なし
  }
  return { body, suggestions: [] };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, suggestions, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessages = useCallback(
    async (msgs: Message[]) => {
      setIsLoading(true);
      setSuggestions([]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: msgs }),
        });

        if (!res.ok) throw new Error("送信に失敗しました");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("ストリーム取得に失敗しました");

        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          // ストリーミング中はSUGGESTIONS部分を非表示にする
          const { body } = parseSuggestions(assistantContent);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: body,
            };
            return updated;
          });
        }

        // 完了後にsuggestionsをパースして表示
        const { body, suggestions: newSuggestions } =
          parseSuggestions(assistantContent);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: body,
          };
          return updated;
        });
        setSuggestions(newSuggestions);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "申し訳ございません。エラーが発生しました。しばらくしてからもう一度お試しください。",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    await sendMessages(newMessages);
  }, [input, isLoading, messages, sendMessages]);

  const handleSuggestionClick = useCallback(
    async (question: string) => {
      if (isLoading) return;
      const userMessage: Message = { role: "user", content: question };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setSuggestions([]);
      await sendMessages(newMessages);
    },
    [isLoading, messages, sendMessages],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* チャットパネル */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[min(600px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-brand px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold">
                  AIチャットサポート
                </p>
                <p className="text-white/70 text-xs">
                  お気軽にご質問ください
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="チャットを閉じる"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-muted text-sm leading-relaxed">
                  足立区の中小企業向け
                  <br />
                  人材確保支援について
                  <br />
                  お気軽にご質問ください。
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    "どんな支援が受けられますか？",
                    "費用はかかりますか？",
                    "使える助成金はありますか？",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestionClick(q)}
                      className="block w-full text-left text-sm text-brand bg-brand-bg hover:bg-brand-pale px-3 py-2 rounded-lg transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand text-white rounded-br-md whitespace-pre-wrap"
                      : "bg-bg-section text-text rounded-bl-md chat-markdown"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : msg.content === "" && isLoading ? (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  ) : (
                    <Markdown>{msg.content}</Markdown>
                  )}
                </div>
              </div>
            ))}

            {/* フォローアップ質問候補 */}
            {suggestions.length > 0 && !isLoading && (
              <div className="space-y-2 pt-1">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="block w-full text-left text-sm text-brand bg-brand-bg hover:bg-brand-pale px-3 py-2 rounded-lg transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="border-t border-border-light px-4 py-3 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                rows={1}
                className="flex-1 resize-none border border-border rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors max-h-24 overflow-y-auto"
                style={{ minHeight: "38px" }}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className="shrink-0 w-9 h-9 rounded-full bg-brand hover:bg-brand-dark disabled:bg-border disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                aria-label="送信"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19V5m0 0l-7 7m7-7l7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* トグルボタン */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-brand hover:bg-brand-dark text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label={isOpen ? "チャットを閉じる" : "チャットを開く"}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
