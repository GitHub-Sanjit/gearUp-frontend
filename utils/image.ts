export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop";

export function normalizeImageUrl(url?: string | null) {
  if (!url) {
    return FALLBACK_IMAGE;
  }

  const trimmed = url.trim();

  // Handle markdown style URL
  // Example:
  // [image](https://example.com/test.jpg)

  if (trimmed.startsWith("[") && trimmed.includes("](")) {
    const extracted = trimmed.match(/\((.*?)\)/);

    return extracted?.[1] || FALLBACK_IMAGE;
  }

  // Validate URL format

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return FALLBACK_IMAGE;
    }

    return trimmed;
  } catch {
    return FALLBACK_IMAGE;
  }
}
