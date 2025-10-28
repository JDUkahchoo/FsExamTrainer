/**
 * Parse flexible time input strings to minutes
 * Supports formats like: "30", "30 min", "2h", "1.5 hours", "2 hr 30 min"
 * Returns null if input cannot be parsed
 */
export function parseTimeToMinutes(input: string | null | undefined): number | null {
  if (!input || input.trim() === '') return null;

  const normalized = input.toLowerCase().trim();

  // Try to extract hours and minutes
  let totalMinutes = 0;

  // Match patterns like "2h 30m", "2 hr 30 min", etc.
  const hoursMinutesMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)\s*(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes)?/);
  if (hoursMinutesMatch) {
    const hours = parseFloat(hoursMinutesMatch[1]);
    const minutes = parseFloat(hoursMinutesMatch[2]);
    return Math.round(hours * 60 + minutes);
  }

  // Match hours only: "2h", "2 hours", "1.5hr"
  const hoursMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)/);
  if (hoursMatch) {
    const hours = parseFloat(hoursMatch[1]);
    return Math.round(hours * 60);
  }

  // Match minutes only: "30", "30m", "30 min"
  const minutesMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes)?$/);
  if (minutesMatch) {
    return Math.round(parseFloat(minutesMatch[1]));
  }

  return null;
}

/**
 * Format minutes to human-readable string
 * Examples: 30 -> "30 min", 90 -> "1h 30min", 120 -> "2h"
 */
export function formatMinutes(minutes: number | null | undefined): string {
  if (!minutes || minutes === 0) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}min`;
}
