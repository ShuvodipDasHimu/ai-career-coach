import { Fragment } from "react";

/** Minimal, XSS-safe markdown renderer for chat: paragraphs, "-"/"*" bullets, **bold**. */
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function ChatText({ text }: { text: string }) {
  const blocks: Array<{ type: "p" | "ul"; lines: string[] }> = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      blocks.push({ type: "p", lines: [] }); // paragraph break marker
      continue;
    }
    const bullet = /^[-*•]\s+(.*)$/.exec(line) ?? /^\d+[.)]\s+(.*)$/.exec(line);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.type === "ul") last.lines.push(bullet[1]);
      else blocks.push({ type: "ul", lines: [bullet[1]] });
    } else if (last?.type === "p" && last.lines.length > 0) {
      last.lines.push(line);
    } else {
      blocks.push({ type: "p", lines: [line] });
    }
  }

  return (
    <div className="prose-chat text-sm leading-relaxed">
      {blocks
        .filter((b) => b.lines.length > 0)
        .map((b, i) =>
          b.type === "ul" ? (
            <ul key={i}>
              {b.lines.map((l, j) => (
                <li key={j}>{inline(l)}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{inline(b.lines.join(" "))}</p>
          ),
        )}
    </div>
  );
}
