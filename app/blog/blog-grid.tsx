"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/database";
import Link from "next/link";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [search, setSearch] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar articulos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:border-brand-purple-500/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/40 via-gray-900 to-brand-cyan-900/40 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gradient">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-white group-hover:text-gradient transition-all duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
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

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No se encontraron articulos</p>
        </div>
      )}
    </>
  );
}
