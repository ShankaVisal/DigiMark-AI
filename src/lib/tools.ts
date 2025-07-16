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
  LucideIcon
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
  id: string;
  name: string;
  description: string;
  link: string;
  icon: LucideIcon;
  category: ToolCategory;
}

const iconMap: Record<string, LucideIcon> = {
    ImageIcon,
    PenSquare,
    BotMessageSquare,
    TrendingUp,
    Hash,
    Mic,
    CalendarClock,
    Video,
};

export function getIconForTool(iconName: string): LucideIcon {
    return iconMap[iconName] || PenSquare;
}

export const tools: Tool[] = [
  {
    id: '1',
    name: "Canva",
    description: "User-friendly design tool for creating social media graphics.",
    link: "https://www.canva.com/",
    icon: ImageIcon,
    category: ToolCategory.Creation,
  },
  {
    id: '2',
    name: "Bing Image Creator",
    description: "AI-powered image generation from text descriptions.",
    link: "https://www.bing.com/images/create",
    icon: PenSquare,
    category: ToolCategory.Creation,
  },
  {
    id: '3',
    name: "Adobe Express",
    description: "Quickly create stunning graphics, photos, and videos.",
    link: "https://www.adobe.com/express/",
    icon: ImageIcon,
    category: ToolCategory.Creation,
  },
  {
    id: '4',
    name: "ChatGPT",
    description: "Generative AI for captions, ideas, and content.",
    link: "https://chat.openai.com/",
    icon: BotMessageSquare,
    category: ToolCategory.Caption,
  },
  {
    id: '5',
    name: "Gemini",
    description: "Google's creative and helpful AI collaborator.",
    link: "https://gemini.google.com/",
    icon: BotMessageSquare,
    category: ToolCategory.Caption,
  },
  {
    id: '6',
    name: "Copy.ai",
    description: "AI writer for marketing copy and content.",
    link: "https://www.copy.ai/",
    icon: PenSquare,
    category: ToolCategory.Caption,
  },
  {
    id: '7',
    name: "Google Trends",
    description: "Analyze the popularity of top search queries.",
    link: "https://trends.google.com/",
    icon: TrendingUp,
    category: ToolCategory.Trends,
  },
  {
    id: '8',
    name: "Exploding Topics",
    description: "Discover rapidly growing topics before they take off.",
    link: "https://explodingtopics.com/",
    icon: TrendingUp,
    category: ToolCategory.Trends,
  },
  {
    id: '9',
    name: "All Hashtag",
    description: "Generate top, random, or live hashtags for your posts.",
    link: "https://www.all-hashtag.com/",
    icon: Hash,
    category: ToolCategory.Hashtags,
  },
  {
    id: '10',
    name: "KeywordTool.io",
    description: "Find great keywords using Google Autocomplete.",
    link: "https://keywordtool.io/",
    icon: Hash,
    category: ToolCategory.Hashtags,
  },
  {
    id: '11',
    name: "ElevenLabs",
    description: "AI-powered text-to-speech and voice cloning.",
    link: "https://elevenlabs.io/",
    icon: Mic,
    category: ToolCategory.Voiceover,
  },
  {
    id: '12',
    name: "TTSMP3",
    description: "Free and simple text-to-speech with multiple languages.",
    link: "https://ttsmp3.com/",
    icon: Mic,
    category: ToolCategory.Voiceover,
  },
  {
    id: '13',
    name: "Buffer",
    description: "Social media management for scheduling and analytics.",
    link: "https://buffer.com/",
    icon: CalendarClock,
    category: ToolCategory.Scheduling,
  },
  {
    id: '14',
    name: "Later",
    description: "Visually plan and schedule your social media posts.",
    link: "https://later.com/",
    icon: CalendarClock,
    category: ToolCategory.Scheduling,
  },
  {
    id: '15',
    name: "CapCut",
    description: "Free all-in-one video editor for everyone.",
    link: "https://www.capcut.com/",
    icon: Video,
    category: ToolCategory.Video,
  },
  {
    id: '16',
    name: "Pictory",
    description: "Create and edit professional quality videos using AI.",
    link: "https://pictory.ai/",
    icon: Video,
    category: ToolCategory.Video,
  },
];
