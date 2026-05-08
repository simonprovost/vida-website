import { SectionShell } from "@/components/layout/SectionShell";
import { NewsletterForm } from "./NewsletterForm";

export default function NewsletterPage() {
  return (
    <SectionShell title="Newsletter" eyebrow="Stay Updated">
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Left: About the newsletter */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The VIDA Newsletter delivers research highlights, publication announcements, lab news, and upcoming events directly to your inbox.
            </p>
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            We respect your privacy. No spam, unsubscribe at any time.
          </p>
        </div>

        {/* Right: Signup form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Subscribe to the VIDA Newsletter</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Join researchers, practitioners, and students who follow our work.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
