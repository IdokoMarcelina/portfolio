import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#050505",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#8a8a8a", textTransform: "uppercase", letterSpacing: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#c6f432" }} />
          {profile.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 700, lineHeight: 0.85, letterSpacing: -8 }}>
          <span>{profile.first}</span>
          <span>{profile.last}</span>
        </div>
      </div>
    ),
    size,
  );
}
