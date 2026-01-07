"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loader" aria-hidden="true">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Logo - 5x bigger than navbar (navbar is h-12, so 5x = h-60) */}
        <div className="loader-logo">
          <Image
            src="/new_gold_logo.png"
            alt="Waynex Logistics"
            width={900}
            height={300}
            className="h-60 w-auto"
            priority
          />
        </div>

        {/* Text below logo */}
        <div className="loader-brand-text">
          Waynex Logistics
        </div>
      </div>
    </div>
  );
}
