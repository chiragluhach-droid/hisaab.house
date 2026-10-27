import type { Metadata } from "next";
import config from "@config";
import { Contact, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

export default function Terms() {
  const { legal } = config;
  return (
    <LegalPage title="Terms">
      <p>
        These terms apply when you buy a pass from {legal.businessName}. By completing a purchase you agree to them.
      </p>
      <h2>Buying a pass</h2>
      <ul>
        <li>Purchases are made by Instagram DM with @hisaab.house. Tap a buy button, send the message, and we’ll reply with payment details.</li>
        <li>All prices are in Indian Rupees (INR) and are one-time payments.</li>
        <li>
          <strong>Passes are delivered by Instagram DM after payment.</strong> Once payment is confirmed, we send your pass files or access links
          in the same chat.
        </li>
        <li>The 1:1 call included with the Over-the-Shoulder Pass is scheduled over Instagram DM at a time that suits us both.</li>
      </ul>
      <h2>Using what you buy</h2>
      <ul>
        <li>Your pass is for your personal use. You may use what you learn to make your own content.</li>
        <li>Please don’t share, resell or republish the playbook, templates or recordings.</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        {/* TODO: confirm your refund policy */}
        TODO: state your refund policy here (for example, whether refunds are available because passes are digital products delivered
        instantly).
      </p>
      <h2>No guarantees</h2>
      <p>
        The passes share the workflow we use. Results depend on your content, consistency and many factors outside our control, so we can’t
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
