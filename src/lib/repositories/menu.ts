import "server-only";
import { categories } from "@/data/categories";
import { menuItems } from "@/data/menu";
import type { Category, MenuItem } from "@/types/domain";

/**
 * Data access for the menu. Today it reads static files; later swap
 * these bodies for database / CMS queries — callers stay the same.
 */

export async function getCategories(): Promise<Category[]> {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const order = new Map(categories.map((c) => [c.id, c.sortOrder]));
  return [...menuItems].sort((a, b) => (order.get(a.category) ?? 0) - (order.get(b.category) ?? 0));
}

export async function getFeaturedItems(limit = 3): Promise<MenuItem[]> {
  return (await getMenuItems()).filter((i) => i.featured && i.available).slice(0, limit);
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  return menuItems.find((i) => i.id === id);
}
