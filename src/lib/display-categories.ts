export const DISPLAY_CATEGORY_MAP = {
  "AI Assistant": [
    "chatbot",
    "general-assistant",
    "productivity-assistant",
    "research-assistant",
    "meeting-assistant",
    "answer-engine",
    "browser-assistant",
    "multimodal",
    "model-aggregator",
  ],
  Coding: ["coding-assistant", "coding-agent", "agentic-ide", "developer-tools", "cli"],
  "Writing & Productivity": [
    "writing",
    "text-generation",
    "paraphrasing",
    "translation",
    "productivity",
    "marketing",
    "text-improvement",
  ],
  "Image & Design": ["image-generation", "design", "vector-design", "creative-tools", "creative-image", "3d"],
  Video: ["video-generation", "avatar-video", "business-video", "creative-video"],
  Audio: ["audio", "tts", "stt", "audio-understanding", "music-generation", "voice-agent"],
  "Automation & Agents": ["automation", "agents", "agent-framework", "agent-builder", "app-builder", "agentic-automation"],
  Research: ["research", "document-ai", "document-processing", "search"],
  "Model APIs & Hosting": ["api", "model-apis", "model-hosting", "inference", "sdk", "sdks"],
  "Data & RAG": ["rag", "vector-db", "database", "postgres", "ai-sql", "data-platform"],
  Business: ["business-intelligence", "customer-service", "saas", "services", "analytics", "bi"],
} as const;

export type DisplayCategory = keyof typeof DISPLAY_CATEGORY_MAP;

const DISPLAY_CATEGORY_KEYS = Object.keys(DISPLAY_CATEGORY_MAP) as DisplayCategory[];

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[+_]/g, "-").replace(/\s+/g, "-").trim();
}

export function getDisplayCategories(): DisplayCategory[] {
  return DISPLAY_CATEGORY_KEYS;
}

export function getMappedCategories(displayCategory: string): string[] {
  const match = DISPLAY_CATEGORY_KEYS.find((key) => key.toLowerCase() === displayCategory.toLowerCase());
  if (!match) {
    return [];
  }

  return DISPLAY_CATEGORY_MAP[match].map(normalizeToken);
}

export function getMappedCategoriesForSelection(displayCategories: string[]): string[] {
  const categorySet = new Set<string>();

  displayCategories.forEach((displayCategory) => {
    getMappedCategories(displayCategory).forEach((category) => categorySet.add(category));
  });

  return Array.from(categorySet);
}

export function toolMatchesDisplayCategory(toolCategories: string[], displayCategory: string): boolean {
  const mapped = getMappedCategories(displayCategory);
  if (mapped.length === 0) {
    return false;
  }

  return toolCategories.some((category) => mapped.includes(normalizeToken(category)));
}

export function toolMatchesAnyDisplayCategories(toolCategories: string[], displayCategories: string[]): boolean {
  if (displayCategories.length === 0) {
    return true;
  }

  const mappedSet = new Set(getMappedCategoriesForSelection(displayCategories));
  if (mappedSet.size === 0) {
    return false;
  }

  return toolCategories.some((category) => mappedSet.has(normalizeToken(category)));
}

export function getDisplayCategoriesForTool(toolCategories: string[]): DisplayCategory[] {
  return DISPLAY_CATEGORY_KEYS.filter((displayCategory) => toolMatchesDisplayCategory(toolCategories, displayCategory));
}
