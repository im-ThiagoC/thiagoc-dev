import { notFound } from "next/navigation";

// Catch-all for unknown routes inside a valid locale — renders the
// localized not-found page from the [locale] layout.
export default function CatchAllPage() {
  notFound();
}
