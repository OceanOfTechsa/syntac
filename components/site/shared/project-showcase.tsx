"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { toCardImage } from "@/lib/cloudinary";
import { StackedCards } from "@/components/site/shared/stacked-cards";

export interface ProjectShowcaseItem {
  name: string;
  alt: string;
  href?: string;
}

interface ProjectShowcaseProps {
  projects: ProjectShowcaseItem[];
  className?: string;
  hold?: number;
  duration?: number;
  offsetY?: number;
  scaleStep?: number;
}

export default function ProjectShowcase({
                                          projects,
                                          className,
                                          hold = 2.8,
                                          duration = 1.1,
                                          offsetY = -20,
                                          scaleStep = 0.035,
                                        }: ProjectShowcaseProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const otherTheme = theme === "dark" ? "light" : "dark";

  return (
    <>
      {mounted &&
        projects.map((project) => (
          <link
            key={`${project.name}-${otherTheme}`}
            rel="preload"
            as="image"
            href={toCardImage(project.name, otherTheme)}
          />
        ))}

      <StackedCards
        hold={hold}
        duration={duration}
        offsetY={offsetY}
        scaleStep={scaleStep}
        className={cn(
          "relative mx-auto flex h-58 sm:h-68 w-full mt-16 items-end",
          className
        )}
      >
        {projects.map((project) => {
          const image = mounted
            ? toCardImage(project.name, theme)
            : "";

          const content = (
            <div
              data-cursor-hide
              className="absolute w-full inset-x-5 overflow-hidden rounded-md border bg-card transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]"
            >
              {image ? (
                <img
                  src={image}
                  alt={project.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>
          );

          if (project.href) {
            return (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={project.name}
              className="absolute inset-0"
            >
              {content}
            </div>
          );
        })}
      </StackedCards>
    </>
  );
}
