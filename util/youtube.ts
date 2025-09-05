/**
 * Extracts YouTube video ID from various URL formats
 * @param url YouTube URL (watch, youtu.be, or embed format)
 * @returns YouTube video ID or empty string if invalid
 */
export function getYouTubeVideoId(url: string): string {
  try {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    )?.[1];
    return videoId || "";
  } catch {
    return "";
  }
}

/**
 * Converts YouTube URL to embed URL format
 * @param url YouTube URL (watch, youtu.be, or embed format)
 * @returns YouTube embed URL or empty string if invalid
 */
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}
