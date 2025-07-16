
"use client";

import React, { useState } from "react";
import { Star, ExternalLink, GripVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { EditToolDialog } from './edit-tool-dialog';
import { DeleteToolDialog } from './delete-tool-dialog';

interface ToolCardProps {
  tool: Tool;
  isFavorited: boolean;
  onToggleFavorite: (toolName: string) => void;
  isAdmin?: boolean;
}

export function ToolCard({ tool, isFavorited, onToggleFavorite, isAdmin = false }: ToolCardProps) {
  const Icon = tool.icon;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
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
              <div className="flex items-center">
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => setIsEditOpen(true)}>
                                  <Edit className="size-4 text-muted-foreground" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Edit Tool</p></TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                   <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => setIsDeleteOpen(true)}>
                                <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Delete Tool</p></TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow pt-0 flex flex-col justify-between">
          <div>
            <Badge variant="secondary" className="capitalize self-start">{tool.categoryName?.replace('-', ' ')}</Badge>
          </div>
          <Button asChild size="sm" variant="outline" className="w-full mt-4">
            <a href={tool.link} target="_blank" rel="noopener noreferrer">
              Visit Tool <ExternalLink className="ml-2 size-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>
      {isAdmin && (
        <>
          <EditToolDialog 
            isOpen={isEditOpen} 
            onOpenChange={setIsEditOpen} 
            tool={tool}
          />
          <DeleteToolDialog
            isOpen={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            tool={tool}
           />
        </>
      )}
    </>
  );
}
