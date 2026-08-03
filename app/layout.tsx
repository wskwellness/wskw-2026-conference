import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 WSKW Conference | Connected in Motion",
  description: "2026 WSKW Annual Conference at Boise State University.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/">WSKW <span>2026 Conference</span></a>
          <nav aria-label="Conference navigation">
            <a href="/#registration">Registration</a>
            <a href="/#hotel">Hotel</a>
          </nav>
          <a className="back-to-wskw" href="https://wskw.org" target="_blank" rel="noreferrer">
            Back to WSKW.org ↗
          </a>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 Western Society for Kinesiology &amp; Wellness</p>
          <a href="https://wskw.org" target="_blank" rel="noreferrer">Visit WSKW.org</a>
        </footer>
      </body>
    </html>
  );
}
