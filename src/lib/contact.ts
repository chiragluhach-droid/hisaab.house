import config, { type ProductId } from "@config";

export type Topic = ProductId | "general";

/** Where on the page a buy/chat button lives — sent with the analytics event. */
export type Placement = "hero" | "card" | "floating" | "faq" | "closing" | "header" | "menu" | "footer";

export function product(id: ProductId) {
  const p = config.products.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

/** The URL a button opens: the product's `buyUrl`, or the Instagram DM. */
export function buyHref(topic: Topic) {
  return (topic !== "general" && product(topic).buyUrl) || config.contact.instagramDm;
}

/** The message copied to the clipboard for the buyer to paste into the DM. */
export function messageFor(topic: Topic) {
  return topic === "general" ? config.messages.general : product(topic).message;
}

export function formatPrice(p: { price: number | null; priceLabel?: string }) {
  return p.price == null ? (p.priceLabel ?? "Price on request") : `₹${p.price.toLocaleString("en-IN")}`;
}
