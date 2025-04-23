import Message from "../../types/ChatMessages";
import hljs from "highlight.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/default.css";
import CodeBlock from "./CodeBlock"; // путь укажите, если отличается

export default function MessageTemplate({ data }: { data: Message }) {
  if (data.sender === "Bot") {
    return (
      <div className="message received">
        <div className="message__body">
          <div className="message__avatar">
            <img
              src="/ЛогоЧата.svg"
              alt="Bot"
              className="message__avatar-img"
            />
          </div>
          <div className="message__wrapper">
            <div className="beflex">
              <h1 className="message__sender">HuntAI</h1>
              <p className="message__header">
                <button
                  className="message__copy-button"
                  title="Копировать"
                  type="button"
                >
                  <img
                    src="/copy.svg"
                    alt="Copy"
                    className="message__copy-icon"
                  />
                </button>
              </p>
            </div>
            <div className="message__content markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <CodeBlock
                        language={match[1]}
                        value={String(children).trim()}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {data.text}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message sent">
        <div className="message__content">
          <p className="message__text">
            Привет! Всё отлично, спасибо! Как ты? 🙌
          </p>
        </div>
      </div>
    );
  }
}
