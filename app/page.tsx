import Countdown from "./components/Countdown";
import { PROGRAM_DOWNLOAD } from "../program";

// Render on every request (not statically at build time) so the PayPal link
// below is resolved against the real current time — see currentPaypal().
export const dynamic = "force-dynamic";

// The "updated" date shown next to the program link is read from Google Drive
// at request time, so uploading a new version of the PDF updates the site with
// no code change. Drive's download endpoint reports the stored file's
// Last-Modified header without requiring an API key.
async function programUpdated(): Promise<string | null> {
  try {
    const res = await fetch(PROGRAM_DOWNLOAD, {
      method: "HEAD",
      // Don't let a slow Drive response hold up the whole page.
      signal: AbortSignal.timeout(4000),
      // Re-check at most every 5 minutes rather than on every page view.
      next: { revalidate: 300 },
    });
    const modified = res.headers.get("last-modified");
    if (!modified) return null;
    const date = new Date(modified);
    if (Number.isNaN(date.getTime())) return null;
    // Pacific time, with the zone spelled out — attendees are reading this from
    // several time zones and need to know how fresh the file actually is.
    return date.toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
      timeZone: "America/Los_Angeles", timeZoneName: "short",
    });
  } catch {
    // If Drive is unreachable, show the program without a date rather than
    // breaking the page or displaying something that might be wrong.
    return null;
  }
}

// External destinations used by the conference registration actions.
const registrationForm = "https://forms.gle/pWB5ZqfUeD6SRSXW8";

// The registration PayPal link changes at midnight Pacific on 2026-09-02.
// Resolve it per request so the switch happens automatically at that instant,
// with no scheduled task or manual redeploy needed.
const PAYPAL_OLD = "https://www.paypal.com/ncp/payment/A7HGUAZ97UVQS";
const PAYPAL_NEW = "https://www.paypal.com/ncp/payment/Q2GESRQKJXZTQ";
const PAYPAL_SWITCH_AT = Date.parse("2026-09-02T00:00:00-07:00"); // 00:00 PDT
function currentPaypal() {
  return Date.now() >= PAYPAL_SWITCH_AT ? PAYPAL_NEW : PAYPAL_OLD;
}

export default async function Home() {
  const paypal = currentPaypal();
  const updated = await programUpdated();
  return <>
    <section className="hero"><div className="hero-inner">
      <img className="logo" src="https://wskw.org/wp-content/uploads/2026/02/2026-conf-logo.png" alt="WSKW and SHAPE Idaho 2026 Conference" />
      <p className="eyebrow">September 30 – October 2, 2026 · Boise State University</p><h1>Connected in Motion</h1>
      <p>The 2026 Annual Conference of the Western Society for Kinesiology &amp; Wellness, in collaboration with SHAPE Idaho.</p>
      <div className="hero-actions">
        <a className="button" href={registrationForm} target="_blank" rel="noreferrer">Register for the Conference</a>
        <a className="button ghost" href="/#program">View the Program</a>
      </div>
      <Countdown />
    </div></section>
    <div className="container">
      <section className="grid two"><article className="card"><h2>Conference Overview</h2><p>Join us at Boise State University for three days of learning, collaboration, and connection. We are expanding our depth of learning with our colleagues at SHAPE Idaho as we all work to help the world move.</p><p><strong>Bring your scholarly hat and your tennis shoes!</strong></p></article><article className="card tint"><h2>Location</h2><p><strong>Boise State University</strong><br />Boise, Idaho</p><p className="eyebrow" style={{color:"#1265b0"}}>Conference Theme</p><p><strong>Connected in Motion</strong></p></article></section>
      <section className="section" id="program"><h2 className="section-title">Conference Program</h2><p className="lead">The full schedule &mdash; sessions, times, speakers, and rooms for all three days.</p>
        <article className="card program-card">
          <div className="program-copy">
            <p className="eyebrow" style={{color:"#1265b0"}}>Now Available</p>
            <h3 className="program-heading">The 2026 program is ready</h3>
            <p>Browse the complete schedule for September 30 &ndash; October 2, including the keynote, the E.C. Davis Lecture, the Broten Young Scholar Lecture, and all concurrent sessions and poster presentations.</p>
            <p className="program-meta">{updated ? <>Updated {updated} &middot; </> : null}PDF, opens in Google Drive in a new tab</p>
            <a className="button primary" href="/program" target="_blank" rel="noreferrer">Open the program</a>
          </div>
          <aside className="program-note">
            <p><strong>Always check here for the latest version.</strong></p>
            <p>The program is kept up to date as details change, and the date above is read straight from the file &mdash; so it always reflects the current version. If you downloaded or printed a copy earlier, check that date against your copy.</p>
          </aside>
        </article>
      </section>
      <section className="section" id="speakers"><h2 className="section-title">Featured Speakers</h2><p className="lead">Three days of ideas from leaders moving physical education, kinesiology, and sport forward.</p>
        <div className="speakers-list">
          <article className="card speaker-card keynote">
            <div className="speaker-figure">
              <img className="speaker-photo" src="/speakers/chris-meyer.jpg" alt="Chris Meyer, 2026 keynote speaker" />
              <span className="speaker-role">Keynote Speaker</span>
            </div>
            <div className="speaker-body">
              <h3 className="speaker-name">Chris Meyer</h3>
              <p className="speaker-affil">Education consultant &middot; PLT4M Professional Learning Lead &middot; Host, <em>Move With Purpose</em></p>
              <div className="session">
                <p className="session-label">Keynote Address</p>
                <p className="session-title"><em>Born to Move. Built to Connect</em></p>
                <p className="session-when">Thursday, October 1 &middot; 11:15 AM</p>
              </div>
              <p className="speaker-bio">For over 30 years, Chris Meyer has treated physical education as something worth rebuilding, not maintaining.</p>
              <details className="speaker-more">
                <summary>Read full bio</summary>
                <p className="speaker-bio">As Department Chair at Lewiston High School, she secured $200,000 in grant funding to bring heart rate technology, innovative curriculum, and an outdoor fitness facility into her program. She also helped launch an after-school prevention initiative that changed how students showed up to school &mdash; not just to physical education class. As an independent consultant and Professional Learning Lead for PLT4M, Chris helps schools across the country move PE from an afterthought to a priority, and as a student intern supervisor for the University of Idaho and Lewis-Clark State College she shapes how the next generation of educators teach. An Idaho Master Educator and award-winning teacher educator, she isn&rsquo;t talking about the future of fitness and wellness &mdash; she&rsquo;s already building it.</p>
                <ul className="speaker-links">
                  <li><span>Website</span><a href="https://chrismeyerconsulting.com" target="_blank" rel="noreferrer">chrismeyerconsulting.com</a></li>
                  <li><span>Email</span><a href="mailto:chrismeyerconsulting@gmail.com">chrismeyerconsulting@gmail.com</a></li>
                  <li><span>Podcast</span><a href="https://podcasts.apple.com/us/podcast/move-with-purpose/id1854529866" target="_blank" rel="noreferrer">Move With Purpose</a></li>
                  <li><span>Newsletter</span><a href="https://substack.com/@thechrismeyer" target="_blank" rel="noreferrer">Move With Purpose</a></li>
                </ul>
              </details>
            </div>
          </article>
          <article className="card speaker-card">
            <div className="speaker-figure">
              <img className="speaker-photo" src="/speakers/tyler-johnson.jpg" alt="Tyler G. Johnson, PhD" />
              <span className="speaker-role">E.C. Davis Lecturer</span>
            </div>
            <div className="speaker-body">
              <h3 className="speaker-name">Tyler G. Johnson, PhD</h3>
              <p className="speaker-affil">Professor, Boise State University</p>
              <div className="session">
                <p className="session-label">E.C. Davis Lecture</p>
                <p className="session-title"><em>To Move or Not to Move? A Defense of Physical Activity Requirements in Kinesiology</em></p>
                <p className="session-when">Wednesday, September 30 &middot; 1:20 PM</p>
              </div>
              <p className="speaker-bio">Program coordinator of K-12 Physical Education &amp; Health in the School of Kinesiology.</p>
              <details className="speaker-more">
                <summary>Read full bio</summary>
                <p className="speaker-bio">His teaching and research center on the philosophical foundations of kinesiology and physical education, with work published in <em>Quest</em>, <em>JOPERD</em>, the <em>Journal of Teaching in Physical Education</em>, and <em>Kinesiology Review</em>. His favorite debate: whether physical activity requirements (PARs) belong in kinesiology curricula.</p>
              </details>
            </div>
          </article>
          <article className="card speaker-card">
            <div className="speaker-figure">
              <img className="speaker-photo" src="/speakers/melody-alanis.jpg" alt="Melody Alanis, PhD" />
              <span className="speaker-role">Broten Young Scholar</span>
            </div>
            <div className="speaker-body">
              <h3 className="speaker-name">Melody Alanis, PhD</h3>
              <p className="speaker-affil">Assistant Professor of Sport Management, University of Idaho</p>
              <div className="session">
                <p className="session-label">Broten Young Scholar Lecture</p>
                <p className="session-title"><em>Born in the Rodeo Arena: Lived Experiences of Identity and Belonging Among Competitive U.S. Rodeo Athletes</em></p>
                <p className="session-when">Wednesday, September 30 &middot; 2:00 PM</p>
              </div>
              <p className="speaker-bio">Her research spans sport consumer behavior, Latine representation in sport, and cultural issues in sport.</p>
              <details className="speaker-more">
                <summary>Read full bio</summary>
                <p className="speaker-bio">Originally from Texas, her love for sport and community shapes her teaching and research. She is passionate about sharing the stories of sport communities often overlooked in traditional research. Off the clock, you&rsquo;ll find her in the boxing ring or cheering on her favorite Mexican club teams and the Texas A&amp;M Aggies.</p>
              </details>
            </div>
          </article>
        </div>
      </section>
      <section className="section" id="registration"><h2 className="section-title">Registration</h2><p className="lead">Register in advance using the conference form. Once complete, submit your payment using the individual or group method below.</p><div className="grid two" style={{marginTop:24}}><article className="card"><h2>Individual registration</h2><p>Start with the online registration form, then use the secure PayPal link. A PayPal account is not required.</p><a className="button primary" href={registrationForm} target="_blank" rel="noreferrer">Open registration form</a> <a className="button" href={paypal} target="_blank" rel="noreferrer">Pay registration fee</a><div className="rates"><div className="rate"><h4>Early Bird — before September 1</h4><p>Professional / Faculty <strong>$150</strong></p><p>Student <strong>$50</strong></p></div><div className="rate"><h4>Regular — after September 1</h4><p>Professional / Faculty <strong>$175</strong></p><p>Student <strong>$75</strong></p></div></div></article><article className="card"><h2>Group registration</h2><p>Email the Treasurer to request a payment invoice for your group.</p><a className="button primary" href="mailto:treasurer@wskw.org">Email the Treasurer</a><p className="notice">Check payments must be post-marked by September 1. All payments after September 1 must be made online.</p><p><strong>Mailing address for the Treasurer</strong><br />Jafra Thomas<br />Dpt. Kinesiology &amp; Public Health<br />Cal Poly, 1 Grand Ave<br />San Luis Obispo, CA 93407</p></article></div></section>
      <section className="section"><h2 className="section-title">Present at the Conference</h2><p className="lead">Find submission requirements, examples, forms, and award information for your presenter type.</p><div className="grid two" style={{marginTop:24}}><a className="card present-card" href="/student-submissions"><strong>STUDENTS</strong><h2>Posters, grants &amp; awards</h2><p>Poster categories, sample posters, grant eligibility, required materials, and student presentation awards.</p><strong>View student guidelines →</strong></a><a className="card present-card" href="/faculty-submissions"><strong>FACULTY &amp; PROFESSIONALS</strong><h2>Presentations &amp; Young Scholar Award</h2><p>Oral and poster options, submission forms, templates, and the G. Arthur Broten Young Scholar Presentation.</p><strong>View faculty guidelines →</strong></a></div></section>
      <section className="section split" id="hotel"><article className="card"><h2>Conference Hotel</h2><h3>TownePlace Suites by Marriott Boise Downtown/University</h3><p>A short walk to Boise State University, with easy access to key amenities.</p><p><strong>Special group rate: $179 USD per night</strong><br />Available for the Western Society for Kinesiology &amp; Wellness Conference 2026.</p><p className="notice"><strong>Last day to book:</strong> Friday, September 11, 2026</p><a className="button primary" href="https://urldefense.com/v3/__https://app.marriott.com/resview2?id=1785338582508&amp;key=GRP&amp;app=resvlink__;!!FOfmI8qiWcWBHqypJtzENF0!xlKzX4jFrYFVp-oln_jAs2mKiLjT6VTO5ogFtUaDnCmeK-ILa-zyM_wFHHQ8r7NMp-4T3DEom7FHVPFzMgn9qfmKG57v6fHQ$" target="_blank" rel="noreferrer">Book the conference group rate</a><p><a href="https://maps.app.goo.gl/cpCZrF8N6Npwhb8TA" target="_blank" rel="noreferrer">View on Google Maps →</a></p></article><article className="card coordinator"><img className="portrait" src="https://wskw.org/wp-content/uploads/2026/02/Elaine-Foster_3167-scaled-e1770179247361.jpg" alt="Elaine Foster, 2026 Conference Coordinator" /><h2>Elaine Foster</h2><p><strong>2026 Conference Coordinator</strong></p><p>Have a question or want to connect about the conference? Elaine is happy to help.</p><p><a href="mailto:PresElect@wskw.org">Registration: PresElect@wskw.org</a><br /><a href="mailto:Treasurer@wskw.org">Payment: Treasurer@wskw.org</a></p></article></section>
      <section className="section" id="travel"><h2 className="section-title">Travel &amp; Arrival</h2><p className="lead">Getting to Boise is easy. Here&rsquo;s how to reach campus and the conference hotel.</p><div className="grid three" style={{marginTop:24}}><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>By Air</p><h3>Boise Airport (BOI)</h3><p>Fly into Boise Airport, just <strong>about 8 miles</strong> (a <strong>15-minute drive</strong>) from Boise State University. Rideshare and taxis are available right at the terminal.</p></article><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>Where to Stay</p><h3>Walk to campus</h3><p>The conference hotel, <strong>TownePlace Suites Boise Downtown/University</strong>, is a short walk to Boise State &mdash; no car needed once you arrive.</p><p><a href="/#hotel">See hotel &amp; group rate →</a></p></article><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>Getting Around</p><h3>Boise is walkable</h3><p>Downtown Boise and the campus area are compact and easy to explore on foot, including the scenic Boise River Greenbelt. If you drive, plan for campus visitor parking.</p><p><a href="/#venue">Parking, shuttle &amp; campus WiFi →</a></p></article></div></section>
      <section className="section" id="venue"><h2 className="section-title">Venues, Parking &amp; WiFi</h2><p className="lead">The conference runs out of two buildings on the Boise State campus, a short walk apart. Here&rsquo;s where to be, where to park, and how to get online.</p>
        <div className="grid two" style={{marginTop:24}}>
          <article className="card venue-card">
            <p className="eyebrow" style={{color:"#1265b0"}}>Venue One</p>
            <h3 className="venue-name">The SPACE &mdash; Incubator (Room 202)</h3>
            <p className="venue-where">Second floor, Albertsons Library</p>
            <ul className="venue-days">
              <li><span className="day">Wed, Sep 30</span><span>All sessions</span></li>
              <li><span className="day">Thu, Oct 1</span><span>Keynote address, lunch, and student posters</span></li>
              <li><span className="day">Fri, Oct 2</span><span>Awards presentation</span></li>
            </ul>
          </article>
          <article className="card venue-card">
            <p className="eyebrow" style={{color:"#1265b0"}}>Venue Two</p>
            <h3 className="venue-name">Recreation Center</h3>
            <p className="venue-where">Everything else on the program</p>
            <ul className="venue-days">
              <li><span className="day">Walk</span><span><strong>0.4 miles</strong> from Albertsons Library &mdash; about a 7-minute walk (see Figure 1)</span></li>
              <li><span className="day">Tip</span><span>Sessions here include active, on-your-feet components &mdash; bring your tennis shoes</span></li>
            </ul>
          </article>
        </div>
        <div className="map-grid">
          <figure className="card map-figure">
            <a href="/maps/campus-walk.jpg" target="_blank" rel="noreferrer"><img src="/maps/campus-walk.jpg" alt="Boise State campus map showing the walking route from the Recreation Center, marked A, to Albertsons Library, marked B" /></a>
            <figcaption><strong>Figure 1 &mdash; Between the two venues.</strong> Recreation Center (A) to Albertsons Library (B): 0.4 miles, about 7 minutes on foot. <a href="/maps/campus-walk.jpg" target="_blank" rel="noreferrer">View full size &rarr;</a></figcaption>
          </figure>
          <figure className="card map-figure">
            <a href="/maps/the-space-floorplan.jpg" target="_blank" rel="noreferrer"><img src="/maps/the-space-floorplan.jpg" alt="Floor plan of The SPACE on the second floor of Albertsons Library, showing the Incubator room 202" /></a>
            <figcaption><strong>Figure 2 &mdash; The SPACE, second floor.</strong> Our sessions are in the <strong>Incubator (202)</strong>, past the elevators and stairs from the Entrance Lobby. <a href="/maps/the-space-floorplan.jpg" target="_blank" rel="noreferrer">View full size &rarr;</a></figcaption>
          </figure>
        </div>
        <div className="grid two" style={{marginTop:24}}>
          <article className="card">
            <p className="eyebrow" style={{color:"#1265b0"}}>Getting to Campus</p>
            <h3 className="venue-name">Parking</h3>
            <p>Our conference falls during a busy stretch at Boise State, so parking will likely be tight &mdash; and campus parking charges a fee. If you can, leave the car and take one of the easier options below.</p>
            <ul className="option-list">
              <li><strong>Walk from the conference hotel.</strong> About 15&ndash;20 minutes to campus. <a href="https://maps.app.goo.gl/LUo5idXSahKYjKkb8" target="_blank" rel="noreferrer">See the walking route &rarr;</a></li>
              <li><strong>Ride the Bronco Shuttle.</strong> Free campus shuttle with several lines. <a href="https://www.boisestate.edu/publicsafety-transportation/bronco-shuttle/" target="_blank" rel="noreferrer">Schedule &amp; routes &rarr;</a></li>
              <li><strong>Driving and parking on campus.</strong> Daily and hourly permits are required. <a href="https://www.boisestate.edu/publicsafety-transportation/parking-and-permits/daily-and-hourly-parking/" target="_blank" rel="noreferrer">Current rates &rarr;</a></li>
            </ul>
          </article>
          <article className="card">
            <p className="eyebrow" style={{color:"#1265b0"}}>Staying Connected</p>
            <h3 className="venue-name">Campus WiFi</h3>
            <p>Boise State offers free guest wireless. Connect to:</p>
            <p className="netname">Bronco-Guest</p>
            <ol className="wifi-steps">
              <li>Turn on WiFi and choose <strong>Bronco-Guest</strong> from the list of networks.</li>
              <li>On the login screen, select <strong>Click Here to Self Register for Account</strong> &mdash; or enter credentials you already have.</li>
              <li>Enter your name, email, and phone number, then select <strong>Register</strong>.</li>
              <li>Choose <strong>Email Me</strong> or <strong>Text Me</strong> to receive your guest username and password.</li>
              <li>Select <strong>Sign On</strong>, accept the terms, and enter your credentials.</li>
            </ol>
            <p className="notice">Guest registration is valid for <strong>7 days</strong>. After that, simply register again.</p>
            <details className="howto">
              <summary>Connecting on Windows, Mac, or mobile</summary>
              <p><strong>Windows:</strong> Click the network icon in the System Tray at the lower right of your desktop, select <strong>Bronco-Guest</strong>, then click <strong>Connect</strong>.</p>
              <p><strong>Mac:</strong> Click the WiFi icon at the top right of the screen and choose <strong>Bronco-Guest</strong>.</p>
              <p><strong>Phones &amp; tablets:</strong> Open your wireless settings and choose <strong>Bronco-Guest</strong>.</p>
              <p><a href="https://www.boisestate.edu/oit/network/bronco-guest-wireless-network-registration-process/" target="_blank" rel="noreferrer">Full Bronco-Guest instructions from Boise State &rarr;</a></p>
            </details>
          </article>
        </div>
      </section>
      <section className="section" id="know"><h2 className="section-title">Know Before You Go</h2><p className="lead">A few tips so you arrive ready for three days in motion.</p><div className="grid three" style={{marginTop:24}}><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>Weather</p><h3>Early fall in Boise</h3><p>Expect daytime highs in the <strong>mid-60s to mid-70s&nbsp;&deg;F</strong> and cooler evenings dipping into the <strong>40s&ndash;50s&nbsp;&deg;F</strong>. Pack layers and a light jacket for the evenings.</p></article><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>What to Bring</p><h3>Scholarly hat &amp; tennis shoes</h3><p>Sessions include active, on-your-feet components. Bring <strong>athletic shoes and activewear</strong> alongside your conference attire &mdash; and a reusable water bottle for Boise&rsquo;s dry climate.</p></article><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>Good to Know</p><h3>Time zone &amp; essentials</h3><p>Boise runs on <strong>Mountain Time (MT)</strong>. The high-desert sun is strong, so pack sunglasses and sunscreen for outdoor sessions and walks.</p></article></div></section>
    </div>
  </>;
}
