
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ToolGrid } from "@/components/tool-grid";
import { AddToolDialog } from "@/components/add-tool-dialog";
import { PlusCircle, Home, Settings } from 'lucide-react';
import { ManageCategoriesDialog } from '@/components/manage-categories-dialog';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAddToolDialogOpen, setAddToolDialogOpen] = useState(false);
  const [isManageCategoriesDialogOpen, setManageCategoriesDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Manage Tools</h1>
          <p className="text-xs text-muted-foreground">Manage your marketing tools and categories.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={() => setAddToolDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Tool
            </Button>
            <Button variant="outline" onClick={() => setManageCategoriesDialogOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Manage Categories
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
                <Home className="mr-2 h-4 w-4" />
                Back to Home
            </Button>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        <ToolGrid isAdmin={true} />
      </main>
      <AddToolDialog isOpen={isAddToolDialogOpen} onOpenChange={setAddToolDialogOpen} />
      <ManageCategoriesDialog isOpen={isManageCategoriesDialogOpen} onOpenChange={setManageCategoriesDialogOpen} />
    </div>
  );
}
