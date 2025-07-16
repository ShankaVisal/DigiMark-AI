
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit } from 'lucide-react';
import type { Advertisement } from '@/lib/ads';
import { fetchAds, deleteAd } from '@/services/ad-service';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AddEditAdDialog } from './add-edit-ad-dialog';
import Image from 'next/image';

interface ManageAdsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageAdsDialog({ isOpen, onOpenChange }: ManageAdsDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [deletingAd, setDeletingAd] = useState<Advertisement | null>(null);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);

  const refreshAds = useCallback(async () => {
    setIsLoading(true);
    try {
        const fetchedAds = await fetchAds();
        setAds(fetchedAds);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch advertisements.' });
    } finally {
        setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      refreshAds();
    }
  }, [isOpen, refreshAds]);

  const handleOpenAddDialog = () => {
    setEditingAd(null);
    setIsAddEditDialogOpen(true);
  };
  
  const handleOpenEditDialog = (ad: Advertisement) => {
    setEditingAd(ad);
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteAd = async () => {
    if (!deletingAd) return;
    setIsLoading(true);
    try {
      await deleteAd(deletingAd.id);
      toast({ title: 'Advertisement Deleted', description: `Successfully deleted "${deletingAd.title}".` });
      setDeletingAd(null);
      refreshAds();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete advertisement.' });
      setIsLoading(false);
      setDeletingAd(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Advertisements</DialogTitle>
            <DialogDescription>
              Add, edit, or delete advertisements shown in the sidebar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button onClick={handleOpenAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Advertisement
              </Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto border rounded-md p-2">
              {isLoading ? (
                  <div className="flex justify-center items-center h-24">
                      <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
              ) : ads.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No advertisements found.</p>
              ) : (
                ads.map(ad => (
                  <div key={ad.id} className="flex items-center justify-between gap-4 rounded-md border p-2">
                     <div className="flex items-center gap-4">
                        <Image src={ad.imageUrl} alt={ad.title} width={80} height={45} className="rounded-md object-cover aspect-video" />
                        <div>
                            <p className="font-semibold">{ad.title}</p>
                            <p className="text-xs text-muted-foreground">{ad.description}</p>
                        </div>
                     </div>
                    <div className="flex gap-1 flex-shrink-0">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleOpenEditDialog(ad)}>
                            <Edit className="h-4 w-4"/>
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setDeletingAd(ad)}>
                            <Trash2 className="h-4 w-4 text-destructive"/>
                        </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AddEditAdDialog
        isOpen={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        ad={editingAd}
        onSuccess={() => {
            setIsAddEditDialogOpen(false);
            refreshAds();
        }}
      />

      <AlertDialog open={!!deletingAd} onOpenChange={() => setDeletingAd(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the ad titled "{deletingAd?.title}".
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} onClick={() => setDeletingAd(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAd} disabled={isLoading} className="bg-destructive hover:bg-destructive/90">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
