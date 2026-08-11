"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 12,
        minHeight: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
        Loading PDF viewer…
      </p>
    </div>
  ),
});

const resources = [
  {
    id: 1,
    title: "Pre-Med Starter Guide",
    description: "Everything you need to know about beginning your journey toward medical school — free MCAT prep resources, shadowing tips, and a realistic timeline for high school and college students.",
    category: "Medicine",
    level: "Exploring",
    time: "Self-paced",
    tags: ["MCAT", "Shadowing", "Volunteering"],
    featured: true,
    pdf: "/library/01_PreMed_Starter_Guide.pdf",
  },
  {
    id: 2,
    title: "Free MCAT Resources Compilation",
    description: "A curated list of completely free MCAT prep materials including Khan Academy, Anki decks, and community-sourced study guides.",
    category: "Medicine",
    level: "Committed",
    time: "3–6 months",
    tags: ["MCAT", "Study guides"],
    featured: false,
    pdf: "/library/02_Free_MCAT_Resources.pdf",
  },
  {
    id: 3,
    title: "Public Health 101",
    description: "An introduction to the field of public health — what it is, what careers exist within it, and how to get your first experience without needing a degree or connections.",
    category: "Public Health",
    level: "Exploring",
    time: "1–2 hours",
    tags: ["Community health", "Epidemiology"],
    featured: true,
  },
  {
    id: 4,
    title: "Finding Community Health Internships",
    description: "A step-by-step guide to finding paid and unpaid internships at community health centers, nonprofits, and government agencies — including tips for applicants with no prior experience.",
    category: "Public Health",
    level: "Applying",
    time: "1 hour",
    tags: ["Internships", "Community health"],
    featured: false,
    pdf: "/library/03_Community_Health_Internships.pdf",
  },
  {
    id: 5,
    title: "Health Policy Careers Explained",
    description: "From legislative advocacy to think tanks to health system consulting — a breakdown of how to blend healthcare knowledge with economics and policy work.",
    category: "Policy",
    level: "Exploring",
    time: "45 min",
    tags: ["Policy", "Economics", "Advocacy"],
    featured: true,
    pdf: "/library/04_Health_Policy_Careers.pdf",
  },
  {
    id: 6,
    title: "Health Economics Crash Course",
    description: "An overview of the economic principles that shape healthcare systems, insurance markets, and health policy. Ideal for students interested in the business side of health.",
    category: "Policy",
    level: "Exploring",
    time: "2–3 hours",
    tags: ["Economics", "Health systems"],
    featured: false,
    pdf: "/library/05_Health_Economics_Crash_Course.pdf",
  },
  {
    id: 7,
    title: "Nursing Career Pathway Overview",
    description: "Everything from CNA certification to becoming an RN or NP — a clear breakdown of the different nursing career tracks and what it takes to pursue each one.",
    category: "Nursing",
    level: "Exploring",
    time: "1 hour",
    tags: ["RN", "NP", "CNA"],
    featured: true,
    pdf: "/library/06_Nursing_Career_Pathway.pdf",
  },
  {
    id: 8,
    title: "Free Healthcare Volunteering Programs",
    description: "A list of structured volunteer programs at hospitals, clinics, and community health organizations that don't require prior healthcare experience to apply.",
    category: "All Paths",
    level: "Exploring",
    time: "Ongoing",
    tags: ["Volunteering", "Clinical experience"],
    featured: false,
    pdf: "/library/07_Free_Healthcare_Volunteering.pdf",
  },
  {
    id: 9,
    title: "Scholarships for Pre-Health Students",
    description: "A compiled list of scholarships and financial aid resources specifically for low-income students pursuing healthcare careers. Updated regularly.",
    category: "All Paths",
    level: "Applying",
    time: "Varies",
    tags: ["Financial aid", "Scholarships"],
    featured: true,
    pdf: "/library/08_Scholarships_for_PreHealth.pdf",
  },
  {
    id: 10,
    title: "Writing a Personal Statement That Stands Out",
    description: "Practical advice on crafting a genuine, compelling personal statement for medical school, nursing school, or public health programs — especially when your background is non-traditional.",
    category: "All Paths",
    level: "Applying",
    time: "2–4 hours",
    tags: ["Personal statement", "Applications"],
    featured: false,
    pdf: "/library/09_Personal_Statement_Guide.pdf",
  },
];

const categoryMeta: Record<string, { color: string; light: string; dim: string; icon: string }> = {
  "Medicine":      { color: "#2596BE", light: "#EBF5FB", dim: "#D0E8F5", icon: "🩺" },
  "Public Health": { color: "#C06030", light: "#FBF0E8", dim: "#F0D5C0", icon: "🌍" },
  "Policy":        { color: "#6E48A0", light: "#F3EEFF", dim: "#E0D0F5", icon: "⚖️" },
  "Nursing":       { color: "#B03070", light: "#FEF0F5", dim: "#F5C8DE", icon: "💙" },
  "All Paths":     { color: "#1E6B38", light: "#EBF5EE", dim: "#C5E8D0", icon: "🌱" },
};

const levelMeta: Record<string, { label: string; color: string; desc: string }> = {
  "Exploring": { label: "Exploring",  color: "#2596BE", desc: "Just getting started" },
  "Committed": { label: "Committed",  color: "#C06030", desc: "Building your path" },
  "Applying":  { label: "Applying",   color: "#6E48A0", desc: "Ready to apply" },
};

export default function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const [resource, setResource] = useState<typeof resources[0] | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const loadResource = async () => {
      const { id } = await params;
      const resourceId = parseInt(id);
      const foundResource = resources.find(r => r.id === resourceId);
      
      if (foundResource) {
        setResource(foundResource);
        // Mark this resource as visited in cookies
        const visitedResources = Cookies.get('visitedResources');
        const visited = visitedResources ? JSON.parse(visitedResources) : [];
        if (!visited.includes(resourceId)) {
          visited.push(resourceId);
          Cookies.set('visitedResources', JSON.stringify(visited), { expires: 365 });
        }
      } else {
        setNotFoundState(true);
      }
    };
    
    loadResource();
  }, [params]);

  if (notFoundState) {
    return (
      <div style={{ padding: "68px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 32, marginBottom: 16 }}>Resource Not Found</h1>
        <Link href="/resources" style={{ color: "var(--forest)", textDecoration: "underline" }}>Back to Resources</Link>
      </div>
    );
  }

  if (!resource) {
    return <div style={{ padding: "68px 40px", textAlign: "center" }}>Loading...</div>;
  }

  const meta = categoryMeta[resource.category];
  const lvl = levelMeta[resource.level];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "var(--cream)" }}>
      {/* Header */}
      <div style={{
        background: "var(--ink)",
        padding: "48px 40px 56px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <Link 
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 13,
              textDecoration: "none",
              marginBottom: 24,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Resources
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>{meta.icon}</span>
            <span style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: meta.color,
            }}>
              {resource.category}
            </span>
          </div>

          <h1 style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "-0.02em",
            color: "white",
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            {resource.title}
          </h1>

          <p style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.75,
            maxWidth: 640,
          }}>
            {resource.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 40px" }}>
        {/* Meta info */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "20px",
          }}>
            <p style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 12,
              color: "var(--text-light)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Level
            </p>
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: 18,
              color: lvl.color,
            }}>
              {resource.level}
            </p>
            <p style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 4,
            }}>
              {lvl.desc}
            </p>
          </div>

          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "20px",
          }}>
            <p style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 12,
              color: "var(--text-light)",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Time Commitment
            </p>
            <p style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--ink)",
            }}>
              {resource.time}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 12,
            color: "var(--text-light)",
            marginBottom: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            Topics Covered
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {resource.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: meta.color,
                background: meta.light,
                padding: "6px 12px",
                borderRadius: 4,
                border: `1px solid ${meta.dim}`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* PDF viewer */}
        {resource.pdf ? (
          <PdfViewer key={resource.pdf} src={resource.pdf} title={resource.title} accent={meta.color} />
        ) : (
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "40px",
            textAlign: "center",
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: meta.light,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 32,
            }}>
              📄
            </div>
            <h2 style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: 24,
              color: "var(--ink)",
              marginBottom: 12,
            }}>
              Resource Content Coming Soon
            </h2>
            <p style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 15,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: 480,
              margin: "0 auto 24px",
            }}>
              This resource page is a placeholder. The full content for {resource.title} will be added here soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}