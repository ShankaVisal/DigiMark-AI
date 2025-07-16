"use client";

import React from "react";
import { Star, ExternalLink, GripVertical } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Tool;
  isFavorited: boolean;
  onToggleFavorite: (toolName: string) => void;
  isAdmin?: boolean;
}

export function ToolCard({ tool, isFavorited, onToggleFavorite, isAdmin = false }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Card className="flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1.5 bg-card/50 backdrop-blur-sm">
       <CardHeader className="flex-row items-start gap-4 space-y-0 pb-4">
        <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{tool.name}</CardTitle>
          <CardDescription className="text-xs mt-1 line-clamp-2">{tool.description}</CardDescription>
        </div>
        {!isAdmin && (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 shrink-0"
                            onClick={(e) => {
                                e.preventDefault();
                                onToggleFavorite(tool.name)
                            }}
                            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Star
                            className={cn(
                                "size-4 transition-all duration-300",
                                isFavorited
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground hover:text-yellow-400"
                            )}
                            />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )}
        {isAdmin && (
            <Button variant="ghost" size="icon" className="size-7 shrink-0 cursor-move">
                <GripVertical className="size-4 text-muted-foreground" />
            </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-0 flex flex-col justify-between">
        <Badge variant="secondary" className="capitalize self-start">{tool.category.replace('-', ' ')}</Badge>
        <Button asChild size="sm" variant="outline" className="w-full mt-4">
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            Visit Tool <ExternalLink className="ml-2 size-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
