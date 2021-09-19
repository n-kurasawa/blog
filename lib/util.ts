export function published(publishedAt: string): boolean {
  return new Date(new Date(publishedAt).setHours(0, 0, 0, 0)) <= new Date();
}
