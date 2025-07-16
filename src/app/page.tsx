
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
import Autoplay from "embla-carousel-autoplay";

export default function DashboardPage() {
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [isLoadingAds, setIsLoadingAds] = useState(true);

    useEffect(() => {
        const loadAds = async () => {
            setIsLoadingAds(true);
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
        <div className="flex h-full flex-col">
          <SidebarHeader className="h-14">
            <div className="flex items-center gap-2.5">
              <DigiMarkLogo className="size-6" />
              <h2 className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                DigiMark AI
              </h2>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex-1 p-0 group-data-[collapsible=icon]:p-0">
            <div className="h-full w-full group-data-[collapsible=icon]:hidden">
              {isLoadingAds ? (
                <div className="p-4 space-y-2">
                    <div className="aspect-video w-full rounded-lg bg-muted animate-pulse"></div>
                     <div className="space-y-1">
                        <div className="w-3/4 h-5 rounded bg-muted animate-pulse"></div>
                        <div className="w-full h-8 rounded bg-muted animate-pulse"></div>
                    </div>
                </div>
              ) : ads.length > 0 && (
                <Carousel
                  className="w-full h-full"
                  opts={{
                      loop: true,
                  }}
                  orientation="horizontal"
                  plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnInteraction: false,
                    })
                  ]}
                >
                  <CarouselContent className="h-full">
                      {ads.map((ad) => (
                          <CarouselItem key={ad.id} className="h-full p-0">
                              <div className="relative h-full w-full">
                                  <Image
                                      src={ad.imageUrl}
                                      alt={ad.title}
                                      fill
                                      className="object-cover"
                                      priority
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                      <h3 className="text-lg font-bold">{ad.title}</h3>
                                      <p className="text-sm text-white/80 mt-1 mb-3">{ad.description}</p>
                                      <Button size="sm" className="w-full bg-white/90 text-black hover:bg-white" asChild>
                                          <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                              Learn More <ArrowRight className="ml-2 size-3.5"/>
                                          </a>
                                      </Button>
                                  </div>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                   <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70" />
                </Carousel>
              )}
            </div>
          </SidebarContent>

          <div className="p-2 mt-auto">
            <UserAvatar />
          </div>
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
