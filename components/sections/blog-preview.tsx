"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/database";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (posts.length === 0) return null;

  return (
    <section id="blog" ref={ref} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm text-brand-purple-400 font-medium tracking-wider uppercase"
            >
              Blog
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl font-display font-bold text-white"
            >
              Ultimas{" "}
              <span className="text-gradient">Publicaciones</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
            >
              Ver todo el blog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i }}
              className="h-full"
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/40 via-gray-900 to-brand-cyan-900/40 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="gradient">{post.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-display font-semibold text-white group-hover:text-gradient transition-all duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 mt-auto pt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.reading_time} min
                      </span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
