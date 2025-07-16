"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { tools, Tool, ToolCategory } from "@/lib/tools";
import { ToolCard } from "./tool-card";

export function ToolGrid() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedFavorites = localStorage.getItem("digimark-favorites");
      if (storedFavorites) {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Could not parse favorites from localStorage", error);
    }
  }, []);

  const handleToggleFavorite = (toolName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(toolName)) {
      newFavorites.delete(toolName);
    } else {
      newFavorites.add(toolName);
    }
    setFavorites(newFavorites);
    try {
      localStorage.setItem(
        "digimark-favorites",
        JSON.stringify(Array.from(newFavorites))
      );
    } catch (error) {
      console.error("Could not save favorites to localStorage", error);
    }
  };

  const favoriteTools = useMemo(
    () => tools.filter((tool) => favorites.has(tool.name)),
    [favorites]
  );

  const categorizedTools = useMemo(() => {
    return Object.values(ToolCategory).map((category) => ({
      category,
      tools: tools.filter((tool) => tool.category === category),
    }));
  }, []);

  const categoryHeadings: Record<ToolCategory, string> = {
    [ToolCategory.Creation]: "Post & Image Creation",
    [ToolCategory.Caption]: "Caption Generation",
    [ToolCategory.Trends]: "Trend Analysis",
    [ToolCategory.Hashtags]: "Hashtag Tools",
    [ToolCategory.Voiceover]: "Voiceover Tools",
    [ToolCategory.Scheduling]: "Content Scheduling",
    [ToolCategory.Video]: "Video Tools",
  };

  return (
    <div className="space-y-8">
      {isClient && favoriteTools.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="size-5 text-yellow-400" />
            <h2 className="text-2xl font-bold tracking-tight">Favorites</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteTools.map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                isFavorited={favorites.has(tool.name)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
          <Separator className="my-8" />
        </section>
      )}
      {categorizedTools.map(({ category, tools }) => (
        <section key={category}>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            {categoryHeadings[category]}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                isFavorited={isClient && favorites.has(tool.name)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
