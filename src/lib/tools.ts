
import type { LucideIcon } from "lucide-react";
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

export interface ToolCategory {
  id: string;
  name: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: LucideIcon;
  iconName: string;
  category: string; // Corresponds to ToolCategory.id
  categoryName?: string;
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

export const initialCategories: ToolCategory[] = [
  { id: "creation", name: "Post & Image Creation" },
  { id: "video", name: "Video Tools" },
  { id: "caption", name: "Caption Generation" },
  { id: "trends", name: "Trend Analysis" },
  { id: "hashtags", name: "Hashtag Tools" },
  { id: "voiceover", name: "Voiceover Tools" },
  { id: "scheduling", name: "Content Scheduling" },
];

export const initialTools: Tool[] = [
  {
    id: '1',
    name: "Canva",
    description: "User-friendly design tool for creating social media graphics.",
    link: "https://www.canva.com/",
    icon: ImageIcon,
    iconName: 'ImageIcon',
    category: "creation",
  },
  {
    id: '2',
    name: "Bing Image Creator",
    description: "AI-powered image generation from text descriptions.",
    link: "https://www.bing.com/images/create",
    icon: PenSquare,
    iconName: 'PenSquare',
    category: "creation",
  },
  {
    id: '3',
    name: "Adobe Express",
    description: "Quickly create stunning graphics, photos, and videos.",
    link: "https://www.adobe.com/express/",
    icon: ImageIcon,
    iconName: 'ImageIcon',
    category: "creation",
  },
  {
    id: '17',
    name: "ImageFX",
    description: "Explore image generation with this tool from Google Labs.",
    link: "https://labs.google/fx/tools/image-fx",
    icon: ImageIcon,
    iconName: 'ImageIcon',
    category: "creation",
  },
  {
    id: '4',
    name: "ChatGPT",
    description: "Generative AI for captions, ideas, and content.",
    link: "https://chat.openai.com/",
    icon: BotMessageSquare,
    iconName: 'BotMessageSquare',
    category: "caption",
  },
  {
    id: '5',
    name: "Gemini",
    description: "Google's creative and helpful AI collaborator.",
    link: "https://gemini.google.com/",
    icon: BotMessageSquare,
    iconName: 'BotMessageSquare',
    category: "caption",
  },
  {
    id: '6',
    name: "Copy.ai",
    description: "AI writer for marketing copy and content.",
    link: "https://www.copy.ai/",
    icon: PenSquare,
    iconName: 'PenSquare',
    category: "caption",
  },
  {
    id: '7',
    name: "Google Trends",
    description: "Analyze the popularity of top search queries.",
    link: "https://trends.google.com/",
    icon: TrendingUp,
    iconName: 'TrendingUp',
    category: "trends",
  },
  {
    id: '8',
    name: "Exploding Topics",
    description: "Discover rapidly growing topics before they take off.",
    link: "https://explodingtopics.com/",
    icon: TrendingUp,
    iconName: 'TrendingUp',
    category: "trends",
  },
  {
    id: '9',
    name: "All Hashtag",
    description: "Generate top, random, or live hashtags for your posts.",
    link: "https://www.all-hashtag.com/",
    icon: Hash,
    iconName: 'Hash',
    category: "hashtags",
  },
  {
    id: '10',
    name: "KeywordTool.io",
    description: "Find great keywords using Google Autocomplete.",
    link: "https://keywordtool.io/",
    icon: Hash,
    iconName: 'Hash',
    category: "hashtags",
  },
  {
    id: '11',
    name: "ElevenLabs",
    description: "AI-powered text-to-speech and voice cloning.",
    link: "https://elevenlabs.io/",
    icon: Mic,
    iconName: 'Mic',
    category: "voiceover",
  },
  {
    id: '12',
    name: "TTSMP3",
    description: "Free and simple text-to-speech with multiple languages.",
    link: "https://ttsmp3.com/",
    icon: Mic,
    iconName: 'Mic',
    category: "voiceover",
  },
  {
    id: '13',
    name: "Buffer",
    description: "Social media management for scheduling and analytics.",
    link: "https://buffer.com/",
    icon: CalendarClock,
    iconName: 'CalendarClock',
    category: "scheduling",
  },
  {
    id: '14',
    name: "Later",
    description: "Visually plan and schedule your social media posts.",
    link: "https://later.com/",
    icon: CalendarClock,
    iconName: 'CalendarClock',
    category: "scheduling",
  },
  {
    id: '15',
    name: "CapCut",
    description: "Free all-in-one video editor for everyone.",
    link: "https://www.capcut.com/",
    icon: Video,
    iconName: 'Video',
    category: "video",
  },
  {
    id: '16',
    name: "Pictory",
    description: "Create and edit professional quality videos using AI.",
    link: "https://pictory.ai/",
    icon: Video,
    iconName: 'Video',
    category: "video",
  },
];

