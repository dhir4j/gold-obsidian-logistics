"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  start?: number;
  className?: string;
}

export default function AnimatedCounter({ start = 5000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial delay before starting the animation
    const initialDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 2000); // Increment every 2 seconds
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span className={`tabular-nums ${className}`}>
      {count.toLocaleString()}
    </span>
  );
}
