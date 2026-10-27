import type { Metadata } from "next";
import config from "@config";
import { Contact, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  const { legal } = config;
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {legal.businessName} (“we”, “us”) collects when you visit this website or buy a pass, and how
        we use it. We keep it short because we collect very little.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>On this website:</strong> no accounts, no forms. If analytics are switched on, we collect anonymous usage data (pages
          visited, buttons tapped, the link you arrived from, device type) through Google Analytics, Plausible and/or the Meta Pixel.
        </li>
        <li>
          <strong>On Instagram:</strong> when you message us, we receive your Instagram username, profile name and the messages you send, including payment
          confirmations.
        </li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to you, confirm your payment and deliver your pass.</li>
        <li>To answer questions and provide support after purchase.</li>
        <li>To understand which parts of the site work, so we can improve it.</li>
      </ul>
      <p>We don’t sell your information, and we don’t send marketing messages unless you ask for them.</p>
      <h2>Third parties</h2>
      <p>
        Instagram (Meta) handles our chats. Payments are made through the method we share with you in the DM, and that provider’s own
        privacy policy applies. Analytics providers, if enabled, process usage data on our behalf. The promo video is served by Cloudinary.
      </p>
      <h2>Cookies</h2>
      <p>This site doesn’t set its own cookies. Analytics tools, if enabled, may set cookies to count visits.</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to delete your chat history and purchase records at any time by messaging us. You can block analytics cookies in your
        browser settings.
      </p>
      <h2>Contact</h2>
      <Contact />
    </LegalPage>
  );
}
