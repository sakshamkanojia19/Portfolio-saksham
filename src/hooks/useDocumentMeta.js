import { useEffect } from "react";

const setMeta = (selector, attr, value) => {
  const tag = document.head.querySelector(selector);
  if (tag) tag.setAttribute(attr, value);
};

/**
 * SPA-friendly per-route <title> and description. The static tags in index.html
 * cover crawlers that don't run JS; this keeps the browser tab and any
 * JS-executing crawler in sync as the user navigates.
 */
const useDocumentMeta = (title, description) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
  }, [title, description]);
};

export default useDocumentMeta;
