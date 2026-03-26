"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  text,
  className = "",
  speed = 30,
  as: Tag = "span",
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState("");
  const scramble = useCallback(() => {
    let iteration = 0;
    const length = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (isInView) {
      const cleanup = scramble();
      return cleanup;
    }
  }, [isInView, scramble]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLParagraphElement & HTMLSpanElement & HTMLHeadingElement>}
      className={`font-mono ${className}`}
    >
      {displayText || "\u00A0"}
    </Tag>
  );
}
