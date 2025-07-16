"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  isFavorited: boolean;
  onToggleFavorite: (toolName: string) => void;
}

export function ToolCard({ tool, isFavorited, onToggleFavorite }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{tool.name}</CardTitle>
          <CardDescription className="text-xs mt-1">{tool.description}</CardDescription>
        </div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0"
                        onClick={() => onToggleFavorite(tool.name)}
                        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Star
                        className={cn(
                            "size-4 transition-all",
                            isFavorited
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <div className="p-4 pt-0">
        <Button asChild size="sm" variant="outline" className="w-full">
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit Tool <ExternalLink className="ml-2 size-3.5" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
