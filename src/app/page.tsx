
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
import { Skeleton } from "@/components/ui/skeleton";

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
          <SidebarHeader className="h-16">
            <div className="flex items-center gap-2.5">
              <DigiMarkLogo className="size-6" />
              <h2 className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                DigiMark AI
              </h2>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex-1 flex flex-col p-2 overflow-hidden group-data-[collapsible=icon]:p-0">
             <div className="h-full w-full group-data-[collapsible=icon]:hidden flex flex-col">
                {isLoadingAds ? (
                  <div className="p-2 space-y-2">
                      <Skeleton className="aspect-video w-full rounded-lg bg-muted/50" />
                      <Skeleton className="h-8 w-3/4 rounded-lg bg-muted/50" />
                      <Skeleton className="h-16 w-full rounded-lg bg-muted/50" />
                  </div>
                ) : ads.length > 0 && (
                  <Carousel
                    className="h-full w-full"
                    opts={{
                        loop: true,
                        align: "start",
                    }}
                    orientation="vertical"
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: false,
                        })
                    ]}
                  >
                    <CarouselContent className="h-full -mt-4">
                        {ads.map((ad) => (
                            <CarouselItem key={ad.id} className="pt-4 basis-1/1">
                                 <Card className="overflow-hidden h-full flex flex-col shadow-md">
                                    <CardContent className="p-0 flex flex-col flex-grow">
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={ad.imageUrl}
                                            alt={ad.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-3 flex flex-col flex-grow">
                                        <h3 className="font-semibold text-sm">{ad.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-1 mb-3 flex-grow">{ad.description}</p>
                                        <Button size="sm" className="w-full mt-auto" asChild>
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
                  DigiMark AI
                </h1>
                <p className="text-xs text-muted-foreground">
                   AI-powered hub for top-tier marketing tools.
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
          <div className="flex-1 overflow-auto">
            <div className="relative isolate overflow-hidden rounded-b-2xl border-b bg-primary/10 mb-8">
              <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Elevate Your Marketing</h2>
                  <p className="mt-6 text-lg leading-8 text-foreground/80">
                    Discover a curated collection of AI-powered tools designed to streamline your workflow and amplify your brand's voice.
                  </p>
                </div>
              </div>
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8085ff] to-[#3741b5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-0">
                <ToolGrid />
            </div>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
