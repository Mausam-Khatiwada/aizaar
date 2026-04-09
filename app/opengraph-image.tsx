import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #080B14 0%, #111827 45%, #1D4ED8 100%)",
          color: "#F1F5F9",
          padding: "56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(124,58,237,0.45), transparent 32%), radial-gradient(circle at 82% 22%, rgba(6,182,212,0.35), transparent 28%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "14px 24px",
              fontSize: "24px",
            }}
          >
            Premium AI Tools Directory
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "860px" }}>
            <div style={{ fontSize: "86px", lineHeight: 0.95, fontWeight: 800 }}>{siteConfig.name}</div>
            <div style={{ fontSize: "34px", lineHeight: 1.3, color: "#CBD5E1" }}>{siteConfig.tagline}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
