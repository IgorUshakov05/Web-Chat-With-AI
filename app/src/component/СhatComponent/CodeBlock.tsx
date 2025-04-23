import { useRef } from "react";
import hljs from "highlight.js";

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  const codeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
        // Можно добавить уведомление "Скопировано"
        console.log("Скопировано!");
      });
    }
  };

  return (
    <pre>
      <div className="message__header">
        <div className="Code">{language}</div>
        <img
          onClick={copyToClipboard}
          src="/copy.svg"
          alt="Copy"
          className="message__copy-icon"
          style={{ cursor: "pointer" }}
        />
      </div>
      <code
        ref={codeRef}
        className={`hljs language-${language}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(value, { language }).value,
        }}
      />
    </pre>
  );
}
