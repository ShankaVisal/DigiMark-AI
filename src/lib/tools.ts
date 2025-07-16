import type { LucideProps } from "lucide-react";
import {
  BotMessageSquare,
  CalendarClock,
  Hash,
  Image as ImageIcon,
  Mic,
  PenSquare,
  TrendingUp,
  Video,
} from "lucide-react";

export enum ToolCategory {
  Creation = "creation",
  Caption = "caption",
  Trends = "trends",
  Hashtags = "hashtags",
  Voiceover = "voiceover",
  Scheduling = "scheduling",
  Video = "video",
}

export interface Tool {
  name: string;
  description: string;
  link: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  category: ToolCategory;
}

export const tools: Tool[] = [
  {
    name: "Canva",
    description: "User-friendly design tool for creating social media graphics.",
    link: "https://www.canva.com/",
    icon: ImageIcon,
    category: ToolCategory.Creation,
  },
  {
    name: "Bing Image Creator",
    description: "AI-powered image generation from text descriptions.",
    link: "https://www.bing.com/images/create",
    icon: PenSquare,
    category: ToolCategory.Creation,
  },
  {
    name: "Adobe Express",
    description: "Quickly create stunning graphics, photos, and videos.",
    link: "https://www.adobe.com/express/",
    icon: ImageIcon,
    category: ToolCategory.Creation,
  },
  {
    name: "ChatGPT",
    description: "Generative AI for captions, ideas, and content.",
    link: "https://chat.openai.com/",
    icon: BotMessageSquare,
    category: ToolCategory.Caption,
  },
  {
    name: "Gemini",
    description: "Google's creative and helpful AI collaborator.",
    link: "https://gemini.google.com/",
    icon: BotMessageSquare,
    category: ToolCategory.Caption,
  },
  {
    name: "Copy.ai",
    description: "AI writer for marketing copy and content.",
    link: "https://www.copy.ai/",
    icon: PenSquare,
    category: ToolCategory.Caption,
  },
  {
    name: "Google Trends",
    description: "Analyze the popularity of top search queries.",
    link: "https://trends.google.com/",
    icon: TrendingUp,
    category: ToolCategory.Trends,
  },
  {
    name: "Exploding Topics",
    description: "Discover rapidly growing topics before they take off.",
    link: "https://explodingtopics.com/",
    icon: TrendingUp,
    category: ToolCategory.Trends,
  },
  {
    name: "All Hashtag",
    description: "Generate top, random, or live hashtags for your posts.",
    link: "https://www.all-hashtag.com/",
    icon: Hash,
    category: ToolCategory.Hashtags,
  },
  {
    name: "KeywordTool.io",
    description: "Find great keywords using Google Autocomplete.",
    link: "https://keywordtool.io/",
    icon: Hash,
    category: ToolCategory.Hashtags,
  },
  {
    name: "ElevenLabs",
    description: "AI-powered text-to-speech and voice cloning.",
    link: "https://elevenlabs.io/",
    icon: Mic,
    category: ToolCategory.Voiceover,
  },
  {
    name: "TTSMP3",
    description: "Free and simple text-to-speech with multiple languages.",
    link: "https://ttsmp3.com/",
    icon: Mic,
    category: ToolCategory.Voiceover,
  },
  {
    name: "Buffer",
    description: "Social media management for scheduling and analytics.",
    link: "https://buffer.com/",
    icon: CalendarClock,
    category: ToolCategory.Scheduling,
  },
  {
    name: "Later",
    description: "Visually plan and schedule your social media posts.",
    link: "https://later.com/",
    icon: CalendarClock,
    category: ToolCategory.Scheduling,
  },
  {
    name: "CapCut",
    description: "Free all-in-one video editor for everyone.",
    link: "https://www.capcut.com/",
    icon: Video,
    category: ToolCategory.Video,
  },
  {
    name: "Pictory",
    description: "Create and edit professional quality videos using AI.",
    link: "https://pictory.ai/",
    icon: Video,
    category: ToolCategory.Video,
  },
];
