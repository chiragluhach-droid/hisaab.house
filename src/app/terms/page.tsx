import type { Metadata } from "next";
import config from "@config";
import { Contact, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function Terms() {
  const { legal } = config;
  return (
    <LegalPage title="Terms">
      <p>
        These terms apply when you buy the Hisaab Guide or the Founder’s Pass from {legal.businessName}. By completing a purchase you agree to them.
      </p>
      <h2>Buying a pass</h2>
      <ul>
        <li>Purchases are made on WhatsApp. Tap a buy button, send the message, and we’ll reply with payment details.</li>
        <li>All prices are in Indian Rupees (INR) and are one-time payments.</li>
        <li>
          <strong>Everything is delivered on WhatsApp after payment.</strong> Once payment is confirmed, we send your guide files or access links
          in the same chat.
        </li>
        <li>The 1:1 call is scheduled on WhatsApp at a time that suits us both.</li>
        <li>
          Founder’s Pass: your Instagram handle appears as a character in the series. We may decline handles that are offensive, impersonate
          someone or promote something unlawful, and refund you if we do.
        </li>
      </ul>
      <h2>Using what you buy</h2>
      <ul>
        <li>Your pass is for your personal use. You may use what you learn to make your own content.</li>
        <li>Please don’t share, resell or republish the guide or templates.</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        {/* TODO: confirm your refund policy */}
        TODO: state your refund policy here (for example, whether refunds are available because the guide is a digital product delivered
        instantly).
      </p>
      <h2>No guarantees</h2>
      <p>
        The guide shares the workflow we use. Results depend on your content, consistency and many factors outside our control, so we can’t
        guarantee any number of views, followers or earnings.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms. The version on this page at the time of your purchase applies.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of {legal.jurisdiction}.</p>
      <h2>Contact</h2>
      <Contact />
    </LegalPage>
  );
}
