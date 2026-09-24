import "server-only";
import { promotions } from "@/data/promotions";
import { testimonials } from "@/data/testimonials";
import type { Promotion, Testimonial } from "@/types/domain";

export async function getActivePromotions(): Promise<Promotion[]> {
  return promotions.filter((p) => p.active);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}
