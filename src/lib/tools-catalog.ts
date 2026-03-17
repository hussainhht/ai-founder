import catalog from "../../ai-founder-tools-catalog.json";

export type CatalogTool = {
  id: string;
  name: string;
  categories: string[];
  useCases: string[];
  officialUrl: string;
  pricing: string;
  availability: string;
  platforms: string[];
  shortDescription: string;
};

type RawCatalog = {
  toolCount?: number;
  tools?: Partial<CatalogTool>[];
};

const rawCatalog = catalog as RawCatalog;

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function getCatalogTools(): CatalogTool[] {
  const tools = Array.isArray(rawCatalog.tools) ? rawCatalog.tools : [];

  return tools
    .map((tool) => ({
      id: typeof tool.id === "string" ? tool.id : "",
      name: typeof tool.name === "string" ? tool.name : "Unknown Tool",
      categories: normalizeList(tool.categories),
      useCases: normalizeList(tool.useCases),
      officialUrl: typeof tool.officialUrl === "string" ? tool.officialUrl : "",
      pricing: typeof tool.pricing === "string" ? tool.pricing : "unknown",
      availability: typeof tool.availability === "string" ? tool.availability : "unknown",
      platforms: normalizeList(tool.platforms),
      shortDescription:
        typeof tool.shortDescription === "string"
          ? tool.shortDescription
          : "No description available yet.",
    }))
    .filter((tool) => tool.name !== "Unknown Tool")
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCatalogCount(): number {
  return typeof rawCatalog.toolCount === "number" ? rawCatalog.toolCount : getCatalogTools().length;
}
