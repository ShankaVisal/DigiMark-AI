
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tool, ToolCategory, initialTools, getIconForTool, initialCategories } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { useToast } from "@/hooks/use-toast";
import { fetchTools, fetchCategories } from "@/services/tool-service";

interface ToolGridProps {
  isAdmin?: boolean;
}

export function ToolGrid({ isAdmin = false }: ToolGridProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    async function loadData() {
        try {
            const [fetchedTools, fetchedCategories] = await Promise.all([fetchTools(), fetchCategories()]);
            
            const toolsWithCategoryNames = fetchedTools.map(tool => ({
                ...tool,
                categoryName: fetchedCategories.find(c => c.id === tool.category)?.name || 'Uncategorized'
            }));

            setTools(toolsWithCategoryNames);
            setCategories(fetchedCategories);

        } catch (error) {
            console.error("Failed to fetch data:", error);
            const toolsWithCategoryNames = initialTools.map(tool => ({
                ...tool,
                categoryName: initialCategories.find(c => c.id === tool.category)?.name || 'Uncategorized'
            }));
            setTools(toolsWithCategoryNames);
            setCategories(initialCategories);

            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not load data from the server. Displaying default data.",
            });
        }
    }
    loadData();

    try {
      const storedFavorites = localStorage.getItem("digimark-favorites");
      if (storedFavorites) {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Could not parse favorites from localStorage", error);
    }
  }, [toast]);

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
    [favorites, tools]
  );

  const categorizedTools = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        tools: tools.filter((tool) => tool.category === category.id),
      }))
      .filter(cat => cat.tools.length > 0)
      .sort((a, b) => a.category.name.localeCompare(b.category.name));
  }, [tools, categories]);


  if (!isClient) {
      return null;
  }

  return (
    <div className="space-y-8">
      {isClient && !isAdmin && favoriteTools.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="size-5 text-yellow-400" />
            <h2 className="text-2xl font-bold tracking-tight">Favorites</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorited={favorites.has(tool.name)}
                onToggleFavorite={handleToggleFavorite}
                isAdmin={isAdmin}
              />
            ))}
          </div>
          <Separator className="my-8" />
        </section>
      )}
      {categorizedTools.map(({ category, tools }) => (
        <section key={category.id}>
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            {category.name}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorited={isClient && favorites.has(tool.name)}
                onToggleFavorite={handleToggleFavorite}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
