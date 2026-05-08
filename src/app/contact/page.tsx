import { SectionShell } from "@/components/layout/SectionShell";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <SectionShell title="Contact" eyebrow="Get in Touch">
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Location</h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              VIDA Center<br />
              NYU Tandon School of Engineering<br />
              2 MetroTech Center<br />
              Brooklyn, NY 11201
            </p>
          </div>

        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Send us a message</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              We'll respond as soon as possible, typically within a few business days.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
