/**
 * Generates a short forensic hash for video watermarking.
 * Uses a simple deterministic transform — not cryptographic.
 */
export function generateForensicHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).toUpperCase().padStart(8, '0').slice(0, 8)
}
