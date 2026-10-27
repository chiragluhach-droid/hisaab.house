import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex min-h-[100svh] max-w-xl flex-col items-start justify-center px-5">
        <span className="stamp text-red-text">Case not found</span>
        <h1 className="mt-5 text-4xl font-bold leading-tight">This page doesn’t exist.</h1>
        <p className="mt-3 text-cream/75">The link may be old or mistyped.</p>
        <a href="/" className="btn btn-primary mt-8 w-full sm:w-auto">
          Back to Hisaab House
        </a>
      </main>
    </>
  );
}
