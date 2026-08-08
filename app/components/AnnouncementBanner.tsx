"use client";

import { useEffect, useState } from "react";
import { announcement } from "../announcement";

export default function AnnouncementBanner() {
  const { message, linkLabel, linkHref } = announcement;
  // Start hidden so the server render and first client render match (no
  // hydration flash); the effect reveals it once we know it isn't dismissed.
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!message) return;
    const key = "wskw-ann:" + message;
    setDismissed(localStorage.getItem(key) === "1");
  }, [message]);

  if (!message || dismissed) return null;

  const close = () => {
    try {
      localStorage.setItem("wskw-ann:" + message, "1");
    } catch {}
    setDismissed(true);
  };

  return (
    <div className="announce" role="region" aria-label="Conference announcement">
      <p>
        <strong>Announcement:</strong> {message}
        {linkLabel && linkHref ? (
          <>
            {" "}
            <a href={linkHref} target="_blank" rel="noreferrer">
              {linkLabel}
            </a>
          </>
        ) : null}
      </p>
      <button type="button" className="announce-close" aria-label="Dismiss announcement" onClick={close}>
        ×
      </button>
    </div>
  );
}
