"use client";

import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    // Initial check
    const checkMobile = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobile(mobile);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDeviceType = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  return deviceType;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
}
