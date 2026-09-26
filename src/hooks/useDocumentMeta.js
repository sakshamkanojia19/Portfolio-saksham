import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../constants";

const setMeta = (selector, value) => {
  const tag = document.head.querySelector(selector);
  if (tag) tag.setAttribute("content", value);
};

/**
 * Per-route <title>, description and canonical URL.
 *
 * The canonical is the important addition: every route previously inherited
 * the single static canonical pointing at `/`, which told crawlers that eight
 * distinct pages were all copies of the homepage.
 */
const useDocumentMeta = (title, description) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[name="twitter:title"]', title);
    }

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
    setMeta('meta[property="og:url"]', url);
  }, [title, description, pathname]);
};

export default useDocumentMeta;
