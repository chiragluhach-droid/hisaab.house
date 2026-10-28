import config, { type ProductId } from "@config";

export type Topic = ProductId | "general";

/** Where on the page a buy/chat button lives — sent with the analytics event. */
export type Placement = "hero" | "card" | "founders" | "floating" | "faq" | "closing" | "header" | "menu" | "footer";

export function product(id: ProductId) {
  const p = config.products.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

export function waLink(message: string) {
  return `https://wa.me/${config.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** The URL a button opens: the product's `buyUrl`, or WhatsApp with its pre-filled message. */
export function buyHref(topic: Topic) {
  if (topic === "general") return waLink(config.messages.general);
  const p = product(topic);
  return p.buyUrl ?? waLink(p.message);
}

export function formatPrice(p: { price: number | null; priceLabel?: string }) {
  return p.price == null ? (p.priceLabel ?? "Price on request") : `₹${p.price.toLocaleString("en-IN")}`;
}
