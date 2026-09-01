import Countdown from "./components/Countdown";

// Render on every request (not statically at build time) so the PayPal link
// below is resolved against the real current time — see currentPaypal().
export const dynamic = "force-dynamic";

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

export default function Home() {
  const paypal = currentPaypal();
  return <>
    <section className="hero"><div className="hero-inner">
      <img className="logo" src="https://wskw.org/wp-content/uploads/2026/02/2026-conf-logo.png" alt="WSKW and SHAPE Idaho 2026 Conference" />
      <p className="eyebrow">September 30 – October 2, 2026 · Boise State University</p><h1>Connected in Motion</h1>
      <p>The 2026 Annual Conference of the Western Society for Kinesiology &amp; Wellness, in collaboration with SHAPE Idaho.</p>
      <a className="button" href={registrationForm} target="_blank" rel="noreferrer">Register for the Conference</a>
      <Countdown />
    </div></section>
    <div className="container">
      <section className="grid two"><article className="card"><h2>Conference Overview</h2><p>Join us at Boise State University for three days of learning, collaboration, and connection. We are expanding our depth of learning with our colleagues at SHAPE Idaho as we all work to help the world move.</p><p><strong>Bring your scholarly hat and your tennis shoes!</strong></p></article><article className="card tint"><h2>Location</h2><p><strong>Boise State University</strong><br />Boise, Idaho</p><p className="eyebrow" style={{color:"#1265b0"}}>Conference Theme</p><p><strong>Connected in Motion</strong></p></article></section>
      <section className="section" id="speakers"><h2 className="section-title">Featured Speakers</h2><p className="lead">Three days of ideas from leaders moving physical education, kinesiology, and sport forward.</p>
        <div className="speakers-list">
          <article className="card speaker-feature">
            <img className="speaker-photo" src="/speakers/chris-meyer.jpg" alt="Chris Meyer, 2026 keynote speaker" />
            <div>
              <p className="eyebrow" style={{color:"#1265b0"}}>Keynote Speaker</p>
              <h3 className="speaker-name">Chris Meyer</h3>
              <p className="speaker-title">30+ years in physical education · Education Consultant · PLT4M Professional Learning Lead · Host, <em>Move With Purpose</em> podcast</p>
              <p className="speaker-bio">For over 30 years, Chris Meyer has treated physical education as something worth rebuilding, not maintaining. As Department Chair at Lewiston High School, she secured $200,000 in grant funding to bring heart rate technology, innovative curriculum, and an outdoor fitness facility into her program. She also helped launch an after-school prevention initiative that changed how students showed up to school — not just to physical education class. As an independent consultant and Professional Learning Lead for PLT4M, Chris helps schools across the country move PE from an afterthought to a priority, and as a student intern supervisor for the University of Idaho and Lewis-Clark State College she shapes how the next generation of educators teach. She is also creator and host of the <em>Move With Purpose</em> podcast. An Idaho Master Educator and award-winning teacher educator, she isn&rsquo;t talking about the future of fitness and wellness — she&rsquo;s already building it.</p>
              <ul className="speaker-links">
                <li><strong>Website:</strong> <a href="https://chrismeyerconsulting.com" target="_blank" rel="noreferrer">chrismeyerconsulting.com</a></li>
                <li><strong>Contact:</strong> <a href="mailto:chrismeyerconsulting@gmail.com">chrismeyerconsulting@gmail.com</a></li>
                <li><strong>Podcast:</strong> <a href="https://podcasts.apple.com/us/podcast/move-with-purpose/id1854529866" target="_blank" rel="noreferrer">Move With Purpose</a> — everywhere you listen</li>
                <li><strong>Newsletter:</strong> <a href="https://substack.com/@thechrismeyer" target="_blank" rel="noreferrer">Move With Purpose</a></li>
              </ul>
              <div className="talk"><p className="talk-label">Keynote Address</p><p><strong><em>Born to Move. Build to Connect</em></strong><br />Thursday, October 1 · 11:15</p></div>
            </div>
          </article>
          <div className="speaker-duo">
            <article className="card speaker-card">
              <img className="speaker-photo duo" src="/speakers/tyler-johnson.jpg" alt="Tyler G. Johnson, PhD" />
              <p className="eyebrow" style={{color:"#1265b0"}}>E.C. Davis Lecturer</p>
              <h3 className="speaker-name">Tyler G. Johnson, PhD</h3>
              <p className="speaker-title">Professor, Boise State University</p>
              <p className="speaker-bio">Tyler Johnson is a professor in the School of Kinesiology at Boise State University and program coordinator of K-12 Physical Education &amp; Health. His teaching and research center on the philosophical foundations of kinesiology and physical education, with work published in <em>Quest</em>, <em>JOPERD</em>, the <em>Journal of Teaching in Physical Education</em>, and <em>Kinesiology Review</em>. His favorite debate: whether physical activity requirements (PARs) belong in kinesiology curricula.</p>
              <div className="talk"><p className="talk-label">E.C. Davis Lecture</p><p><strong><em>Friendship and Kinesiology</em></strong><br />Wednesday, September 30 · 1:20</p></div>
            </article>
            <article className="card speaker-card">
              <img className="speaker-photo duo" src="/speakers/melody-alanis.jpg" alt="Melody Alanis, PhD" />
              <p className="eyebrow" style={{color:"#1265b0"}}>Broten Young Scholar</p>
              <h3 className="speaker-name">Melody Alanis, PhD</h3>
              <p className="speaker-title">Assistant Professor, University of Idaho</p>
              <p className="speaker-bio">Dr. Melody Alanis is an Assistant Professor of Sport Management at the University of Idaho. Originally from Texas, her love for sport and community shapes her teaching and research, which spans sport consumer behavior, Latine representation in sport, and cultural issues in sport. She is passionate about sharing the stories of sport communities often overlooked in traditional research. Off the clock, you&rsquo;ll find her in the boxing ring or cheering on her favorite Mexican club teams and the Texas A&amp;M Aggies.</p>
              <div className="talk"><p className="talk-label">Broten Young Scholar Lecture</p><p><strong><em>Born in the Rodeo Arena: Lived Experiences of Identity and Belonging Among Competitive U.S. Rodeo Athletes</em></strong><br />Wednesday, September 30 · 2:00</p></div>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="registration"><h2 className="section-title">Registration</h2><p className="lead">Register in advance using the conference form. Once complete, submit your payment using the individual or group method below.</p><div className="grid two" style={{marginTop:24}}><article className="card"><h2>Individual registration</h2><p>Start with the online registration form, then use the secure PayPal link. A PayPal account is not required.</p><a className="button primary" href={registrationForm} target="_blank" rel="noreferrer">Open registration form</a> <a className="button" href={paypal} target="_blank" rel="noreferrer">Pay registration fee</a><div className="rates"><div className="rate"><h4>Early Bird — before September 1</h4><p>Professional / Faculty <strong>$150</strong></p><p>Student <strong>$50</strong></p></div><div className="rate"><h4>Regular — after September 1</h4><p>Professional / Faculty <strong>$175</strong></p><p>Student <strong>$75</strong></p></div></div></article><article className="card"><h2>Group registration</h2><p>Email the Treasurer to request a payment invoice for your group.</p><a className="button primary" href="mailto:treasurer@wskw.org">Email the Treasurer</a><p className="notice">Check payments must be post-marked by September 1. All payments after September 1 must be made online.</p><p><strong>Mailing address for the Treasurer</strong><br />Jafra Thomas<br />Dpt. Kinesiology &amp; Public Health<br />Cal Poly, 1 Grand Ave<br />San Luis Obispo, CA 93407</p></article></div></section>
      <section className="section"><h2 className="section-title">Present at the Conference</h2><p className="lead">Find submission requirements, examples, forms, and award information for your presenter type.</p><div className="grid two" style={{marginTop:24}}><a className="card present-card" href="/student-submissions"><strong>STUDENTS</strong><h2>Posters, grants &amp; awards</h2><p>Poster categories, sample posters, grant eligibility, required materials, and student presentation awards.</p><strong>View student guidelines →</strong></a><a className="card present-card" href="/faculty-submissions"><strong>FACULTY &amp; PROFESSIONALS</strong><h2>Presentations &amp; Young Scholar Award</h2><p>Oral and poster options, submission forms, templates, and the G. Arthur Broten Young Scholar Presentation.</p><strong>View faculty guidelines →</strong></a></div></section>
      <section className="section split" id="hotel"><article className="card"><h2>Conference Hotel</h2><h3>TownePlace Suites by Marriott Boise Downtown/University</h3><p>A short walk to Boise State University, with easy access to key amenities.</p><p><strong>Special group rate: $179 USD per night</strong><br />Available for the Western Society for Kinesiology &amp; Wellness Conference 2026.</p><p className="notice"><strong>Last day to book:</strong> Friday, September 11, 2026</p><a className="button primary" href="https://urldefense.com/v3/__https://app.marriott.com/resview2?id=1785338582508&amp;key=GRP&amp;app=resvlink__;!!FOfmI8qiWcWBHqypJtzENF0!xlKzX4jFrYFVp-oln_jAs2mKiLjT6VTO5ogFtUaDnCmeK-ILa-zyM_wFHHQ8r7NMp-4T3DEom7FHVPFzMgn9qfmKG57v6fHQ$" target="_blank" rel="noreferrer">Book the conference group rate</a><p><a href="https://maps.app.goo.gl/cpCZrF8N6Npwhb8TA" target="_blank" rel="noreferrer">View on Google Maps →</a></p></article><article className="card coordinator"><img className="portrait" src="https://wskw.org/wp-content/uploads/2026/02/Elaine-Foster_3167-scaled-e1770179247361.jpg" alt="Elaine Foster, 2026 Conference Coordinator" /><h2>Elaine Foster</h2><p><strong>2026 Conference Coordinator</strong></p><p>Have a question or want to connect about the conference? Elaine is happy to help.</p><p><a href="mailto:PresElect@wskw.org">Registration: PresElect@wskw.org</a><br /><a href="mailto:Treasurer@wskw.org">Payment: Treasurer@wskw.org</a></p></article></section>
      <section className="section" id="travel"><h2 className="section-title">Travel &amp; Arrival</h2><p className="lead">Getting to Boise is easy. Here&rsquo;s how to reach campus and the conference hotel.</p><div className="grid three" style={{marginTop:24}}><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>By Air</p><h3>Boise Airport (BOI)</h3><p>Fly into Boise Airport, just <strong>about 8 miles</strong> (a <strong>15-minute drive</strong>) from Boise State University. Rideshare and taxis are available right at the terminal.</p></article><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>Where to Stay</p><h3>Walk to campus</h3><p>The conference hotel, <strong>TownePlace Suites Boise Downtown/University</strong>, is a short walk to Boise State &mdash; no car needed once you arrive.</p><p><a href="/#hotel">See hotel &amp; group rate →</a></p></article><article className="card"><p className="eyebrow" style={{color:"#1265b0"}}>Getting Around</p><h3>Boise is walkable</h3><p>Downtown Boise and the campus area are compact and easy to explore on foot, including the scenic Boise River Greenbelt. If you drive, plan for campus visitor parking.</p><p><a href="https://www.boisestate.edu/transportation/" target="_blank" rel="noreferrer">Boise State parking &amp; transportation →</a></p></article></div></section>
      <section className="section" id="know"><h2 className="section-title">Know Before You Go</h2><p className="lead">A few tips so you arrive ready for three days in motion.</p><div className="grid three" style={{marginTop:24}}><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>Weather</p><h3>Early fall in Boise</h3><p>Expect daytime highs in the <strong>mid-60s to mid-70s&nbsp;&deg;F</strong> and cooler evenings dipping into the <strong>40s&ndash;50s&nbsp;&deg;F</strong>. Pack layers and a light jacket for the evenings.</p></article><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>What to Bring</p><h3>Scholarly hat &amp; tennis shoes</h3><p>Sessions include active, on-your-feet components. Bring <strong>athletic shoes and activewear</strong> alongside your conference attire &mdash; and a reusable water bottle for Boise&rsquo;s dry climate.</p></article><article className="card tint"><p className="eyebrow" style={{color:"#1265b0"}}>Good to Know</p><h3>Time zone &amp; essentials</h3><p>Boise runs on <strong>Mountain Time (MT)</strong>. The high-desert sun is strong, so pack sunglasses and sunscreen for outdoor sessions and walks.</p></article></div></section>
    </div>
  </>;
}
