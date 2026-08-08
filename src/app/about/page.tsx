import Link from "next/link";

const values = [
  { title: "Accessibility", desc: "Everything we create is free, always.", emoji: "🔓" },
  { title: "Equity", desc: "Understanding healthcare is a right, not a privilege.", emoji: "⚖️" },
  { title: "Curiosity", desc: "We ask the hard questions so you don't have to.", emoji: "🔍" },
  { title: "Community", desc: "Students helping students, because we know what it's like to feel lost.", emoji: "🤝" },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 100 }}>

      {/* ── HEADER ── */}
      <section style={{ background: "var(--forest)", padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Playfair Display, serif", marginBottom: 16 }}>
            About HealthBridge
          </p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20, maxWidth: 640, letterSpacing: "-0.02em" }}>
            Healthcare affects every<br />
            <span style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontWeight: 400 }}>single one of us.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.75, maxWidth: 520 }}>
            Yet most people have no idea how it actually works. HealthBridge exists to change that.
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px 0" }}>
        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(16px, 2vw, 19px)", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 28 }}>
          Why does insulin cost hundreds of dollars? How does health insurance really work? Who decides what Medicaid covers? These questions shape real lives, yet they&apos;re rarely taught in school.
        </p>
        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(16px, 2vw, 19px)", color: "var(--text-muted)", lineHeight: 1.85, fontStyle: "italic" }}>
          HealthBridge exists to change that.
        </p>
      </section>

      {/* ── STORY ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }} className="about-grid">

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 120 }}>
            <div style={{
              width: "100%", aspectRatio: "4/5",
              background: "linear-gradient(135deg, var(--mint) 0%, var(--cream-dark) 100%)",
              borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", border: "1px solid var(--border)",
            }}>
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--forest)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 6C20 6 10 12 10 21C10 27.075 14.477 32 20 32C25.523 32 30 27.075 30 21C30 12 20 6 20 6Z" fill="white" opacity="0.9"/>
                    <path d="M16 21H24M20 17V25" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* end sidebar */}

          {/* Main content */}
          <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "clamp(16px, 2vw, 18px)", color: "var(--text-muted)", lineHeight: 1.85 }}>

            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 20 }}>
              Our Story
            </p>
            <div className="flex flex-col items-center mb-8">
   <img 
    src="/cindy-zheng.jpg" 
    alt="Cindy Zheng - Founder of HealthBridge" 
    className="rounded-full w-48 h-48 object-cover shadow-lg"
  />
  <p className="text-sm text-gray-600 mt-2">Cindy Zheng, Founder</p>
</div>
            

            <p style={{ marginBottom: 28 }}>
              HealthBridge was founded by Cindy Zheng, who spent a summer at a rehabilitation center in Brooklyn. There, she watched elderly Chinese patients struggle to communicate their needs — not just because of language, but because the system wasn&apos;t built for them.
            </p>

            <p style={{ marginBottom: 28 }}>
              Growing up in a low-income neighborhood in New York City, Cindy saw how limited access to resources and opportunities shaped the lives of people around her. Networking, professional guidance, and quality education felt out of reach.
            </p>

            <p style={{ marginBottom: 40 }}>
              As a student interested in economics and healthcare, she realized there was no accessible resource helping students understand the business, policy, and technology behind healthcare. So she built one.
            </p>

            {/* Pull quote */}
            <div style={{ background: "var(--forest)", borderRadius: 20, padding: "32px 36px", marginBottom: 48, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <p style={{ fontFamily: "DM Serif Display, serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, color: "white", lineHeight: 1.45, fontStyle: "italic", position: "relative" }}>
                &ldquo;Students from under-resourced communities often lack the structured pathways that make healthcare careers feel possible. HealthBridge is the answer to that gap.&rdquo;
              </p>
            </div>

            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 26, color: "var(--ink)", marginBottom: 16, letterSpacing: "-0.01em" }}>What We Do</h2>
            <p style={{ marginBottom: 16 }}>
              HealthBridge is a free toolkit for students who want to fix healthcare — starting with their own career path.
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 40 }}>
              {[
                "Discover their healthcare career path (Policy, Administration, Biotech, or Health Economics)",
                "Access weekly opportunities and networking events",
                "Learn the economics, policy, and tech behind the system",
              ].map(item => (
                <li key={item} style={{ marginBottom: 10, lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>

            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 26, color: "var(--ink)", marginBottom: 16, letterSpacing: "-0.01em" }}>Our Mission</h2>
            <p style={{ marginBottom: 48, fontSize: "clamp(17px, 2vw, 20px)", color: "var(--ink)", fontStyle: "italic", fontFamily: "DM Serif Display, serif", lineHeight: 1.5 }}>
              To bridge the gap between students and the systems that affect us all — by making healthcare careers accessible, free, and easy to understand.
            </p>

            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 26, color: "var(--ink)", marginBottom: 28, letterSpacing: "-0.01em" }}>Our Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 48 }}>
              {values.map(v => (
                <div key={v.title} style={{ background: "var(--cream-dark)", borderRadius: 14, padding: "20px 22px", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 22, display: "block", marginBottom: 10 }}>{v.emoji}</span>
                  <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 16, color: "var(--forest)", marginBottom: 6 }}>{v.title}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-secondary">Get In Touch</Link>

          </div>
          {/* end main content */}

        </div>
        {/* end grid */}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          div[style*="position: sticky"] { position: static !important; }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
