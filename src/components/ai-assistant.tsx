"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, BrainCircuit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateMarketingContent } from "@/ai/flows/generate-marketing-content";
import { getToolUseAdvice } from "@/ai/flows/get-tool-use-advice";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const contentSchema = z.object({
  platform: z.string().min(1, "Please select a platform."),
});

const adviceSchema = z.object({
  goal: z
    .string()
    .min(10, "Please describe your goal in at least 10 characters.")
    .max(500, "Goal description must be 500 characters or less."),
});

export function AIAssistant() {
  const { toast } = useToast();
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGettingAdvice, setIsGettingAdvice] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedAdvice, setGeneratedAdvice] = useState("");

  const contentForm = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: { platform: "" },
  });

  const adviceForm = useForm<z.infer<typeof adviceSchema>>({
    resolver: zodResolver(adviceSchema),
    defaultValues: { goal: "" },
  });

  async function onContentSubmit(values: z.infer<typeof contentSchema>) {
    setIsGeneratingContent(true);
    setGeneratedContent("");
    try {
      const result = await generateMarketingContent(values);
      setGeneratedContent(result.content);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate content. Please try again.",
      });
    } finally {
      setIsGeneratingContent(false);
    }
  }

  async function onAdviceSubmit(values: z.infer<typeof adviceSchema>) {
    setIsGettingAdvice(true);
    setGeneratedAdvice("");
    try {
      const result = await getToolUseAdvice(values);
      setGeneratedAdvice(result.advice);
    } catch (error) {
      console.error("Error getting advice:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get advice. Please try again.",
      });
    } finally {
      setIsGettingAdvice(false);
    }
  }

  return (
    <div className="p-2">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">
            <Sparkles className="mr-2 h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="advice">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Advice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...contentForm}>
                <form
                  onSubmit={contentForm.handleSubmit(onContentSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={contentForm.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Media Platform</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            <SelectItem value="X (Twitter)">
                              X (Twitter)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isGeneratingContent}
                  >
                    {isGeneratingContent && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate
                  </Button>
                </form>
              </Form>
              {(isGeneratingContent || generatedContent) && (
                <div className="mt-4">
                  <Separator />
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Suggested Content:</h4>
                    {isGeneratingContent ? (
                       <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                       </div>
                    ) : (
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {generatedContent}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advice" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tool Use Advisor</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...adviceForm}>
                <form
                  onSubmit={adviceForm.handleSubmit(onAdviceSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={adviceForm.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Marketing Goal</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Increase engagement on my new product launch.'"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isGettingAdvice}
                  >
                    {isGettingAdvice && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Get Advice
                  </Button>
                </form>
              </Form>
              {(isGettingAdvice || generatedAdvice) && (
                <div className="mt-4">
                  <Separator />
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Expert Advice:</h4>
                    {isGettingAdvice ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {generatedAdvice}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
