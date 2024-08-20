import React, { useEffect, useMemo, useState } from "react";
import Dot from "@/components/Elements/Dot";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";
import { projects } from "@/data/projects";

const prefixNumberWithZeroes = (number: number) => {
  if (number < 10) {
    return `00${number}`;
  } else if (number < 100) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
};

export default function Archive() {
  const CATEGORIES = [
    { name: "Visualization", slug: "visualization" },
    { name: "Web", slug: "web" },
  ];

  // Initialize state based on URL query
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const { filter } = router.query;
    if (filter) {
      return filter as string;
    }
    return "";
  });

  // Check URL query string for filter
  useEffect(() => {
    const { filter } = router.query;
    if (filter) {
      setSelectedFilter(filter as string);
    }
  }, [router.query]);

  // Actual filtering logic
  const projectsFiltered = useMemo(() => {
    const filterOutArchivedAndAddNumbers = (projects: any[]) =>
      projects
        .filter((project) => !project.archived)
        // .sort((a, b) => a.year - b.year)
        .map((project, i) => ({
          id: i + 1,
          ...project,
        }))
        .sort((a, b) => a.id - b.id);

    if (!selectedFilter) {
      return filterOutArchivedAndAddNumbers(projects);
    }

    return filterOutArchivedAndAddNumbers(
      projects.filter((project) => project.filterCategory === selectedFilter)
    );
  }, [selectedFilter]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section className="w-full min-h-screen relative">
      <div className="relative flex flex-col items-start justify-start py-24 w-full min-h-screen text-black px-[20px]">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-7xl font-sans font-extralight text-gray-700 mb-2 tracking-[-0.02em]">
            All Projects
          </h1>
          <p className="text-lg font-sans font-light leading-snug text-gray-700">
            Everything I have worked on.
          </p>
          <div className="flex flex-row gap-2 mb-12 mt-4">
            {CATEGORIES.map((filter) => (
              <p
                key={filter.slug}
                onMouseDown={() => {
                  if (selectedFilter === filter.slug) {
                    setSelectedFilter("");
                    router.push(
                      {
                        // pathname: "/archive",
                        pathname: router.pathname,
                      },
                      undefined,
                      {
                        scroll: false,
                      }
                    );
                  } else {
                    setSelectedFilter(filter.slug);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { filter: filter.slug },
                      },
                      undefined,
                      {
                        scroll: false,
                      }
                    );
                  }
                }}
                className={`select-none cursor-pointer text-sm font-sans font-light leading-snug text-gray-700 transition ${
                  selectedFilter === filter.slug
                    ? "underline underline-offset-8"
                    : "opacity-50"
                }`}
              >
                {filter.name}
              </p>
            ))}
          </div>
          <div className="hidden w-full max-w-5xl md:flex flex-row justify-between items-center gap-2 mb-2">
            <p className="min-w-[40px] text-sm uppercase text-left font-light">
              No.
            </p>
            <p className="w-full text-sm uppercase font-light">Title</p>
            <p className="w-full md:w-[100px] text-sm uppercase font-light">
              Type
            </p>
            <p className="w-full md:w-[100px] text-sm uppercase font-light">
              Year
            </p>
            <p className="w-12"></p>
          </div>

          {hasMounted ? (
            projectsFiltered
              .sort((a, b) => b.id - a.id)
              .map((project) => (
                <TableRow
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  type={project.type}
                  year={project.year}
                  url={project.url}
                  featured={project.featured}
                />
              ))
          ) : (
            <div className="h-screen" />
          )}
        </div>
      </div>
    </section>
  );
}

function TableRow({
  id,
  title,
  type,
  year,
  url,
  featured,
}: {
  id: number;
  title: string;
  type: string;
  year: number;
  url?: string;
  featured?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      key={id}
      className="group w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-2 border-t py-3 border-gray-400"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        cursor: url ? "pointer" : "default",
      }}
    >
      <p className="hidden md:block min-w-[40px] text-left text-xs font-sans font-light text-gray-500">
        {prefixNumberWithZeroes(id)}.
      </p>
      <div className="w-full text-left text-lg font-sans font-light text-gray-700">
        <TableTitle label={title} featured={featured} isActive={isActive} />
      </div>
      <p className="w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-light text-gray-500">
        {type}
        <span className="md:hidden font-sans inline">, {year}</span>
      </p>
      <p className="hidden md:block w-full md:w-[100px] text-left text-xs leading-none font-sans uppercase font-light text-gray-500">
        {year}
      </p>
      <div
        className={`hidden h-[18px] md:block w-12 text-right text-sm font-sans font-light text-gray-700`}
      >
        {featured && <HoverableDot />}
      </div>
    </a>
  );
}

function HoverableDot() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Dot />
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={6}>
          <p>Featured project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TableTitle({
  label,
  featured,
  isActive,
}: {
  label: string;
  featured: boolean | undefined;
  isActive: boolean;
}) {
  return (
    <div
      className="relative flex flex-row items-start gap-2"
      style={{
        perspective: "100px",
      }}
    >
      <div
        className="leading-none overflow-hidden relative group h-full w-full flex flex-row items-center gap-2"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 800ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <p
          className="tracking-[-0.01em] font-light duration-500 ease-in-out pointer-events-none"
          style={{
            opacity: isActive ? 0 : 1,
            transform: isActive ? "translateY(-100%)" : "translateY(0)",
            transitionProperty: "opacity, transform",
          }}
        >
          {label}
        </p>
        <p
          className="tracking-[-0.01em] absolute transform duration-500 ease-in-out pointer-events-none"
          style={{
            transform: isActive ? "none" : "rotateX(-90deg)",
            opacity: isActive ? 1 : 0,
            transformOrigin: "bottom center",
            transitionDelay: isActive ? "100ms" : "0ms",
            // fontStyle: "italic",
            // letterSpacing: ".4px",
            transitionProperty: "opacity, transform",
          }}
        >
          {label}
        </p>
      </div>
      <div className="md:hidden flex items-center">
        {featured && <HoverableDot />}
      </div>
    </div>
  );
}
