
"use client";

import React from "react";
import { ToolGrid } from "@/components/tool-grid";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {

  return (
    <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              DigiMark AI
            </h1>
            <p className="text-xs text-muted-foreground">
                AI-powered hub for top-tier marketing tools.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Link>
          </Button>
        </header>
        <main className="flex-1 overflow-auto">
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
        </main>
    </div>
  );
}
