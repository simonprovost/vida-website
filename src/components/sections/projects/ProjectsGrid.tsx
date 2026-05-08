import { SectionShell } from "@/components/layout/SectionShell";
import type { Project } from "@/lib/projects";
import Link from "next/link";

type Props = {
  projects: Project[];
};

const kindLabel: Record<Project["kind"], string> = {
  program: "Program",
  project: "Project",
  tool: "Tool",
};

const kindColors: Record<Project["kind"], string> = {
  program: "text-zinc-600 dark:text-zinc-400",
  project: "text-zinc-600 dark:text-zinc-400",
  tool: "text-zinc-600 dark:text-zinc-400",
};

// Featured projects shown as large cards
function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border-b border-zinc-200 dark:border-zinc-800 py-6 last:border-0 sm:flex-row sm:gap-8 items-start">
      {/* Background image with overlay */}
      {project.image && (
        <div className="relative w-full sm:w-1/3 aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col mt-4 sm:mt-0">
        <div className="mb-2 flex items-center gap-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wider text-zinc-500`}>
            {kindLabel[project.kind]}
          </span>
          <span className={`text-[10px] uppercase tracking-wider ${
            project.status === "active" 
              ? "text-blue-600 dark:text-blue-400 font-semibold" 
              : "text-zinc-500"
          }`}>
            • {project.status}
          </span>
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/research/${project.slug}`}>
            {project.title}
          </Link>
        </h2>
        
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-zinc-500 dark:text-zinc-400"
            >
              • {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex gap-4">
          <Link
            href={`/research/${project.slug}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Learn more →
          </Link>
          {project.externalUrl && (
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
            >
              Visit site ↗
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// Regular project cards
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col border-b border-zinc-200 dark:border-zinc-800 py-4 last:border-0 sm:flex-row sm:gap-6 items-start">
      {/* Image header */}
      {project.image && (
        <div className="relative w-full sm:w-48 aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 shrink-0 mb-3 sm:mb-0">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col">
        <div className="flex items-start gap-2 mb-1">
          <span className={`text-[10px] font-semibold uppercase tracking-wider text-zinc-500`}>
            {kindLabel[project.kind]}
          </span>
          <span className={`text-[10px] uppercase tracking-wider ${
            project.status === "active" 
              ? "text-blue-600 dark:text-blue-400 font-semibold" 
              : "text-zinc-500"
          }`}>
            • {project.status}
          </span>
        </div>

        <h2 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/research/${project.slug}`}>
            {project.title}
          </Link>
        </h2>
        
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-500 dark:text-zinc-400"
              >
                • {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/research/${project.slug}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectsGrid({ projects }: Props) {
  // Split into featured (tools) and regular projects
  const featured = projects.filter(p => p.kind === "tool" || p.status === "active").slice(0, 3);
  const regular = projects.filter(p => !featured.includes(p));

  return (
    <SectionShell title="Research" eyebrow="Tools & Initiatives" theme="projects">
      <p className="text-zinc-600 dark:text-zinc-400">
        A selection of ongoing and past research programs, projects, and tools
        developed by the VIDA lab.
      </p>
      
      {/* Featured projects - large cards */}
      <div className="mt-8 flex flex-col">
        {featured.map((project) => (
          <FeaturedProject key={project.slug} project={project} />
        ))}
      </div>
      
      {/* Regular projects - smaller grid */}
      {regular.length > 0 && (
        <>
          <h3 className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            More Projects
          </h3>
          <div className="mt-4 flex flex-col">
            {regular.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
