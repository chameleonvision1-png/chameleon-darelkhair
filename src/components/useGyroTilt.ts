"use client";

import { useEffect, type RefObject } from "react";

/**
 * Drives a subtle 3D tilt for a hero block.
 *  - Desktop / mouse: follows the pointer while hovering the element.
 *  - Mobile: follows the device gyroscope (DeviceOrientation). On iOS the
 *    permission prompt is requested on the first tap inside the element.
 *
 * Writes CSS custom properties on the element (no React re-renders):
 *   --tx, --ty   normalized tilt in [-1, 1]
 *   --gx, --gy   glare position in %
 *   --glare      glare strength in [0, 1]
 */

type OrientationPermission = {
  requestPermission?: () => Promise<PermissionState>;
};

interface Options {
  /** Device tilt (deg) that maps to a full ±1 swing. */
  gyroRange?: number;
  /** Play a short settle-in animation on mount. */
  intro?: boolean;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function useGyroTilt(ref: RefObject<HTMLElement | null>, { gyroRange = 22, intro = true }: Options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const glare = { p: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    let visible = true;
    let gyroActive = false;
    let base: { b: number; g: number } | null = null;
    let lastGyroT = 0;

    const write = () => {
      const s = el.style;
      s.setProperty("--tx", x.p.toFixed(4));
      s.setProperty("--ty", y.p.toFixed(4));
      s.setProperty("--gx", `${((x.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--gy", `${((y.p + 1) * 50).toFixed(2)}%`);
      s.setProperty("--glare", glare.p.toFixed(4));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      // Gyro input is noisy, so it gets a softer spring than the mouse.
      const stiffness = slow ? 22 : gyroActive ? 70 : 120;
      const damping = slow ? 8 : gyroActive ? 15 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const a of [x, y]) {
          a.v += (stiffness * (a.target - a.p) - damping * a.v) * h;
          a.p += a.v * h;
        }
      }
      const tau = glare.target > glare.p ? 0.18 : slow ? 0.9 : 0.45;
      glare.p += (glare.target - glare.p) * (1 - Math.exp(-dt / tau));
      write();

      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(glare.target - glare.p) > 0.002;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        x.p = x.target;
        y.p = y.target;
        glare.p = glare.target;
        write();
        raf = 0;
      }
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const aim = (nx: number, ny: number, glareOn: number) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      glare.target = clamp(glareOn, 0, 1);
      slowUntil = 0;
      wake();
    };

    /* ---------------- Mouse (desktop) ---------------- */
    const aimAt = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1, 1);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !gyroActive) aimAt(e);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && !gyroActive) aim(0, 0, 0);
    };

    /* ---------------- Gyroscope (mobile) ---------------- */
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null || !visible) return;
      gyroActive = true;

      // Map device axes to screen axes depending on screen rotation.
      const angle = (screen.orientation?.angle ?? (window.orientation as number | undefined) ?? 0) as number;
      let b = e.beta;
      let g = e.gamma;
      if (angle === 90) [b, g] = [-g, b];
      else if (angle === -90 || angle === 270) [b, g] = [g, -b];

      // Neutral pose = how the user is holding the phone. It slowly drifts
      // toward the current pose so the hero re-centres on its own.
      const now = performance.now();
      if (!base || now - lastGyroT > 1500) base = { b, g };
      const k = 1 - Math.exp(-Math.min(0.1, (now - lastGyroT) / 1000) / 3.5);
      base.b += (b - base.b) * k;
      base.g += (g - base.g) * k;
      lastGyroT = now;

      const nx = (g - base.g) / gyroRange;
      const ny = (b - base.b) / gyroRange;
      aim(nx, ny, 0.35 + Math.min(0.65, Math.hypot(nx, ny) * 1.3));
    };

    let listening = false;
    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("deviceorientation", onOrientation);
    };

    const Motion = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as
      | OrientationPermission
      | undefined;
    const needsPermission = !!Motion && typeof Motion.requestPermission === "function";

    const askPermission = () => {
      el.removeEventListener("touchend", askPermission);
      el.removeEventListener("click", askPermission);
      Motion?.requestPermission?.()
        .then((state) => {
          if (state === "granted") listen();
        })
        .catch(() => {});
    };

    if (Motion) {
      if (needsPermission) {
        // iOS 13+: must be requested from a user gesture.
        el.addEventListener("touchend", askPermission, { passive: true });
        el.addEventListener("click", askPermission);
      } else {
        listen();
      }
    }

    // Don't animate while the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && gyroActive) aim(0, 0, 0);
    });
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    if (intro) {
      x.p = 0.55;
      y.p = -0.45;
      glare.p = 1;
      slowUntil = performance.now() + 1400;
      write();
      wake();
    } else {
      write();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchend", askPermission);
      el.removeEventListener("click", askPermission);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [ref, gyroRange, intro]);
}
