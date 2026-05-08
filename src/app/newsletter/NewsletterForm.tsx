"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMessage(json?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-6 py-5 text-sm space-y-1">
        <p className="font-semibold text-green-700 dark:text-green-400">You&apos;re subscribed!</p>
        <p className="text-green-600 dark:text-green-500">Thanks for signing up. You&apos;ll hear from us when we publish new updates.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_NEWSLETTER_KEY ?? ""} />
      <input type="hidden" name="subject" value="New Newsletter Subscription - VIDA" />
      <input type="hidden" name="from_name" value="VIDA Website" />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="nl-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Name
          </label>
          <input
            id="nl-name"
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 transition"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label htmlFor="nl-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 transition"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Interests (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {["Visualization", "Data Analysis", "Machine Learning", "Urban Analytics", "Imaging", "Publications & Papers"].map((topic) => (
            <label key={topic} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                name="interests"
                value={topic}
                className="rounded border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-200 focus:ring-zinc-400"
              />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{topic}</span>
            </label>
          ))}
        </div>
      </div>

      {state === "error" && (
        <p className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-6 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm transition hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Subscribing…
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
