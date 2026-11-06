"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { Cube3DIcon } from "./icons";

const MODEL_VIEWER_SCRIPT_ID = "google-model-viewer-script";
const MODEL_VIEWER_SRC =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";

function ensureModelViewerScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(MODEL_VIEWER_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = MODEL_VIEWER_SCRIPT_ID;
  script.type = "module";
  script.src = MODEL_VIEWER_SRC;
  script.async = true;
  document.head.appendChild(script);
}

export default function ModelViewer3D({
  src,
  poster,
  alt,
}: {
  src: string;
  poster?: string;
  alt: string;
}) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    ensureModelViewerScript();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(false);
    setError(false);
    const el = viewerRef.current;
    if (!el) return;

    const onLoad = () => setLoaded(true);
    const onError = () => setError(true);

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full select-none bg-gradient-to-b from-[#0b2358] via-[#071940] to-[#041029]">
      {/* Subtle radial studio spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-65"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 166, 168, 0.32) 0%, rgba(7, 59, 136, 0.12) 55%, transparent 80%)",
        }}
      />

      {createElement("model-viewer", {
        ref: viewerRef,
        dir: "ltr",
        src,
        poster,
        alt,
        "camera-controls": true,
        "auto-rotate": true,
        "auto-rotate-delay": "0",
        "rotation-per-second": "32deg",
        "shadow-intensity": "1.1",
        "shadow-softness": "0.85",
        exposure: "1.08",
        "environment-image": "neutral",
        "touch-action": "pan-y",
        "interaction-prompt": "none",
        crossorigin: "anonymous",
        style: {
          width: "100%",
          height: "100%",
          direction: "ltr",
          backgroundColor: "transparent",
          "--poster-color": "transparent",
        } as React.CSSProperties,
      })}

      {/* Minimal Loading Spinner */}
      {!loaded && !error && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-[#061844]/40 backdrop-blur-[2px] z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#061844]/85 border border-white/20 px-3.5 py-1.5 text-xs font-black text-white shadow-lg">
            <Cube3DIcon className="w-4 h-4 text-honey animate-spin" />
            <span>جاري التحميل…</span>
          </div>
        </div>
      )}
    </div>
  );
}
