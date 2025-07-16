
"use client";

import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ToolGrid } from "@/components/tool-grid";
import { DigiMarkLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Advertisement } from "@/lib/ads";
import { fetchAds } from "@/services/ad-service";

export default function DashboardPage() {
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [isLoadingAds, setIsLoadingAds] = useState(true);

    useEffect(() => {
        const loadAds = async () => {
            try {
                const fetchedAds = await fetchAds();
                setAds(fetchedAds);
            } catch (error) {
                console.error("Failed to load ads:", error);
            } finally {
                setIsLoadingAds(false);
            }
        };
        loadAds();
    }, []);

  return (
    <div className="relative flex min-h-screen w-full">
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-r border-sidebar-border bg-sidebar"
      >
        <SidebarHeader className="h-14">
          <div className="flex items-center gap-2.5">
            <DigiMarkLogo className="size-6" />
            <h2 className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              DigiMark AI
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
            <div className="group-data-[collapsible=icon]:hidden">
                {!isLoadingAds && ads.length > 0 && (
                     <Carousel 
                        className="w-full"
                        opts={{
                            loop: true,
                        }}
                     >
                        <CarouselContent>
                            {ads.map((ad) => (
                                <CarouselItem key={ad.id}>
                                    <Card className="overflow-hidden bg-background/50">
                                        <CardContent className="p-2">
                                            <div className="aspect-video relative">
                                                <Image 
                                                    src={ad.imageUrl}
                                                    alt={ad.title}
                                                    fill
                                                    className="rounded-md object-cover"
                                                />
                                            </div>
                                            <div className="p-2">
                                                <h3 className="text-sm font-semibold">{ad.title}</h3>
                                                <p className="text-xs text-muted-foreground mt-1 mb-3">{ad.description}</p>
                                                <Button size="sm" className="w-full" asChild>
                                                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                                        Learn More <ArrowRight className="ml-2 size-3.5"/>
                                                    </a>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {ads.length > 1 && (
                            <>
                                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                            </>
                        )}
                    </Carousel>
                )}
            </div>
        </SidebarContent>
        <div className="p-2 mt-auto">
          <UserAvatar />
        </div>
      </Sidebar>
      <SidebarInset>
        <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Digital Marketing Toolkit
                </h1>
                <p className="text-xs text-muted-foreground">
                  Your AI-powered hub for top-tier marketing tools.
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          </header>
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <ToolGrid />
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
