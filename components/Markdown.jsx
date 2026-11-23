import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Markdown({ children }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ alt, src }) => (
            <img src={src} alt={alt || ""} loading="lazy" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
