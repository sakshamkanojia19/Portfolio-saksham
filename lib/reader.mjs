// Remembers a reader's name/email and liked posts in their own browser only,
// so they don't retype details. Storage can be unavailable (private mode,
// blocked site data); every access is guarded and the UI works without it.
const READER = "portfolio-reader";
const LIKED = "portfolio-liked";
const read = (key, fallback) => {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Not persisted; the action itself already succeeded. */
  }
};
export function savedReader() {
  const reader = read(READER, null);
  return reader &&
    typeof reader.name === "string" &&
    typeof reader.email === "string"
    ? reader
    : null;
}
export function saveReader({ name, email }) {
  write(READER, { name, email });
}
export function hasLiked(id) {
  const liked = read(LIKED, []);
  return Array.isArray(liked) && liked.includes(id);
}
export function rememberLike(id) {
  const liked = read(LIKED, []);
  const list = Array.isArray(liked) ? liked : [];
  if (!list.includes(id)) write(LIKED, [...list, id].slice(-500));
}
