"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  splitBy = "word",
  tag: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={cn("flex flex-wrap", className)} ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement & HTMLDivElement>}>
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.77, 0, 0.175, 1],
              delay: delay + i * (splitBy === "word" ? 0.08 : 0.03),
            }}
          >
            {item}
            {splitBy === "word" && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
