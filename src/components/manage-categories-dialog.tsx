
"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { addCategory, fetchCategories, updateCategory, deleteCategory } from '@/services/tool-service';
import type { ToolCategory } from '@/lib/tools';
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

interface ManageCategoriesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageCategoriesDialog({ isOpen, onOpenChange }: ManageCategoriesDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [deletingCategory, setDeletingCategory] = useState<ToolCategory | null>(null);


  const refreshCategories = async () => {
    setIsLoading(true);
    try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch categories.' });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshCategories();
    }
  }, [isOpen]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsLoading(true);
    try {
      await addCategory(newCategoryName);
      toast({ title: 'Category Added', description: `Successfully added ${newCategoryName}.` });
      setNewCategoryName('');
      refreshCategories();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add category.' });
      setIsLoading(false);
    }
  };
  
  const handleStartEdit = (category: ToolCategory) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const handleUpdateCategory = async () => {
    if (!editingCategoryId || !editingCategoryName.trim()) return;
    setIsLoading(true);
    try {
        await updateCategory(editingCategoryId, editingCategoryName);
        toast({ title: 'Category Updated', description: `Successfully updated category.` });
        handleCancelEdit();
        refreshCategories();
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to update category.' });
        setIsLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;
    setIsLoading(true);
    try {
      await deleteCategory(deletingCategory.id);
      toast({ title: 'Category Deleted', description: `Successfully deleted ${deletingCategory.name}.` });
      setDeletingCategory(null);
      refreshCategories();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete category.' });
      setIsLoading(false);
      setDeletingCategory(null);
    }
  };


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>
              Add, rename, or delete tool categories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Input
                placeholder="New category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={isLoading}
              />
              <Button onClick={handleAddCategory} disabled={isLoading || !newCategoryName.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span className="ml-2">Add</span>
              </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between gap-2 rounded-md border p-2">
                   {editingCategoryId === category.id ? (
                        <Input
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
                            className="h-8"
                            autoFocus
                        />
                   ) : (
                    <span className="text-sm font-medium">{category.name}</span>
                   )}
                  <div className="flex gap-1">
                    {editingCategoryId === category.id ? (
                        <>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleUpdateCategory} disabled={isLoading}>
                                <Check className="h-4 w-4 text-green-600"/>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancelEdit} disabled={isLoading}>
                                <X className="h-4 w-4"/>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleStartEdit(category)} disabled={isLoading}>
                                <Edit className="h-4 w-4"/>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setDeletingCategory(category)} disabled={isLoading}>
                                <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                        </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { onOpenChange(false); window.location.reload(); }}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                Deleting the category "{deletingCategory?.name}" cannot be undone. Tools in this category will become uncategorized.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} onClick={() => setDeletingCategory(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} disabled={isLoading} className="bg-destructive hover:bg-destructive/90">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
