"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

type MissionHeroProps = {
  peopleCount?: number;
  publicationsCount?: number;
};

export function MissionHero({ peopleCount, publicationsCount }: MissionHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();

  // useCallback with empty deps so refs are always read imperatively — never stale
  const scrubVideo = useCallback((latest: number) => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    const duration = video.duration;
    if (!duration || !Number.isFinite(duration) || duration <= 0) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const absoluteTop = rect.top + latest;
    const scrollStart = absoluteTop - viewportHeight;
    const scrollEnd = absoluteTop;
    const scrollRange = scrollEnd - scrollStart;
    const progress = Math.max(0, Math.min((latest - scrollStart) / scrollRange, 1));

    if (Number.isFinite(progress)) {
      video.currentTime = progress * duration;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.pause();

    const onMetadata = () => {
      video.currentTime = 0;
      video.pause();
      scrubVideo(scrollY.get());
    };

    video.addEventListener("loadedmetadata", onMetadata);
    return () => video.removeEventListener("loadedmetadata", onMetadata);
  }, [scrubVideo, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    scrubVideo(latest);
  });

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-zinc-800 bg-black p-[1px] shadow-sm"
    >
      <div className="relative flex flex-col gap-8 rounded-xl bg-black px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">

        <div className="relative z-10 flex-1 space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Visualizing data.
            <br />
            Amplifying understanding.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            The Visualization Imaging and Data Analysis Center at NYU consists of 
            computer scientists who work closely with domain experts to apply the 
            latest advances in computing to problems of critical societal importance.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            We work in the areas of Visualization, Imaging and Data Analysis, 
            generating hypotheses and methods that new data sources and data types demand.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Link
              href="/research"
              className="inline-flex items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-zinc-200"
            >
              View projects
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex-1">
          <div className="relative flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-sm">
            <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-black sm:h-64">
              <motion.div 
                className="relative w-full h-full flex items-center justify-center"
              >
                <video
                  ref={videoRef}
                  src="/assets/Vida-logo.mp4"
                  className="w-full h-full object-contain max-w-[340px] sm:max-w-[420px]"
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.currentTime = 0;
                    e.currentTarget.pause();
                  }}
                />
              </motion.div>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
              NYU Tandon School of Engineering
            </p>
            <p className="text-xs text-zinc-300">
              Co-directed by Professors Claudio Silva and Juliana Freire, VIDA brings 
              together researchers working on visualization, data management, machine 
              learning, and urban analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
