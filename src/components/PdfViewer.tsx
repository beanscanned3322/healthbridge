"use client";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const iconPrev = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const iconNext = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const iconMinus = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const iconPlus = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const iconDownload = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const iconOpen = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M6 3H3v10h10v-3M8 8l5-5M9 3h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.25;

export default function PdfViewer({
  src,
  title,
  accent,
}: {
  src: string;
  title: string;
  accent: string;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err: Error) => {
    console.error("Failed to load PDF:", err);
    setError("Failed to load this PDF.");
    setLoading(false);
  }, []);

  const zoomIn = () => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE));
  const zoomOut = () => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE));

  const toolbarBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    background: "none",
    border: "none",
    borderRadius: 6,
    color: "var(--text-muted)",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
  };

  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "10px 14px",
          borderBottom: "1px solid var(--border)",
          background: "var(--cream-dark)",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          📄 {title}.pdf
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Page nav */}
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            style={{ ...toolbarBtn, opacity: pageNumber <= 1 ? 0.35 : 1, cursor: pageNumber <= 1 ? "default" : "pointer" }}
            aria-label="Previous page"
          >
            {iconPrev}
          </button>
          <span
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 12,
              color: "var(--text-muted)",
              padding: "0 4px",
              whiteSpace: "nowrap",
              minWidth: 64,
              textAlign: "center",
            }}
          >
            {loading && !error ? "…" : `${pageNumber} / ${numPages ?? "…"}`}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages ?? p))}
            disabled={numPages !== null && pageNumber >= numPages}
            style={{ ...toolbarBtn, opacity: numPages !== null && pageNumber >= numPages ? 0.35 : 1, cursor: numPages !== null && pageNumber >= numPages ? "default" : "pointer" }}
            aria-label="Next page"
          >
            {iconNext}
          </button>

          <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 6px" }} />

          {/* Zoom */}
          <button onClick={zoomOut} style={toolbarBtn} aria-label="Zoom out">{iconMinus}</button>
          <span
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 12,
              color: "var(--text-muted)",
              minWidth: 36,
              textAlign: "center",
            }}
          >
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} style={toolbarBtn} aria-label="Zoom in">{iconPlus}</button>

          <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 6px" }} />

          {/* Actions */}
          <a
            href={src}
            download={`${title}.pdf`}
            style={{
              ...toolbarBtn,
              width: "auto",
              padding: "0 10px",
              gap: 6,
              textDecoration: "none",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
            title="Download"
          >
            {iconDownload}
            Download
          </a>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...toolbarBtn,
              width: "auto",
              padding: "0 10px",
              gap: 6,
              textDecoration: "none",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
            title="Open in new tab"
          >
            {iconOpen}
            Open
          </a>
        </div>
      </div>

      {/* Page area */}
      <div
        style={{
          background: "#E8E6E1",
          minHeight: 500,
          maxHeight: 1000,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 16px",
        }}
      >
        {error ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontSize: 36, marginBottom: 16 }}>⚠️</p>
            <p
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              {error}
            </p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: accent,
                color: "white",
                padding: "10px 20px",
                borderRadius: 6,
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {iconOpen}
              Open PDF directly
            </a>
          </div>
        ) : (
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div style={{ padding: "80px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
                  Loading PDF…
                </p>
              </div>
            }
            noData={
              <div style={{ padding: "80px 24px", textAlign: "center" }}>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
                  No PDF provided.
                </p>
              </div>
            }
          >
            {numPages !== null && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                width={undefined}
                renderTextLayer
                renderAnnotationLayer
              />
            )}
          </Document>
        )}
      </div>
    </div>
  );
}
