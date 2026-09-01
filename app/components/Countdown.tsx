"use client";

import { useEffect, useState } from "react";

// Conference opens the morning of Sept 30, 2026. Boise is Mountain Time,
// which is MDT (UTC-6) in late September.
const TARGET = new Date("2026-09-30T08:00:00-06:00").getTime();

// Google Calendar template link (all-day, end date is exclusive → Oct 3).
const GCAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("2026 WSKW Conference — Connected in Motion") +
  "&dates=20260930/20261003" +
  "&location=" + encodeURIComponent("Boise State University, Boise, ID") +
  "&details=" + encodeURIComponent(
    "2026 Annual Conference of the Western Society for Kinesiology & Wellness, in collaboration with SHAPE Idaho. https://wskw.org",
  );

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function remaining(): Parts {
  let ms = TARGET - Date.now();
  const done = ms <= 0;
  if (ms < 0) ms = 0;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds, done };
}

export default function Countdown() {
  // null until mounted so server and client first render agree (Date.now()
  // would otherwise differ between them and break hydration).
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    setT(remaining());
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [number, string][] = t
    ? [
        [t.days, "Days"],
        [t.hours, "Hours"],
        [t.minutes, "Minutes"],
        [t.seconds, "Seconds"],
      ]
    : [];

  return (
    <div className="countdown-wrap">
      {t?.done ? (
        <p className="countdown-live">The conference is here — welcome to Boise!</p>
      ) : (
        <div className="countdown" role="timer" aria-label="Time until the conference begins">
          {units.map(([value, label]) => (
            <div className="cd-unit" key={label}>
              <span className="cd-value">{t ? String(value).padStart(2, "0") : "--"}</span>
              <span className="cd-label">{label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="cal-actions">
        <a className="button" href={GCAL} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <a className="button" href="/wskw-2026.ics" download>
          Download .ics (Apple / Outlook)
        </a>
      </div>
    </div>
  );
}
