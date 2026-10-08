"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import type { ProjectEstimatorWizardProps } from "@/components/site/forms/project-estimator-wizard";

/* -------------------------------------------------------------------------
 * Lazy wizard
 *
 * The provider lives in the root layout, so the wizard (react-hook-form, zod,
 * gsap, all the option data) is kept out of the initial bundle and loaded the
 * first time someone hovers/focuses a trigger or opens the dialog.
 * ---------------------------------------------------------------------- */

const loadWizard = () =>
  import("@/components/site/forms/project-estimator-wizard").then((module) => module.ProjectEstimatorWizard);

const ProjectEstimatorWizard = dynamic(loadWizard, { ssr: false });

const preloadWizard = () => {
  void loadWizard();
};

/* -------------------------------------------------------------------------
 * Context
 * ---------------------------------------------------------------------- */

interface ProjectEstimatorContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Warm the wizard chunk, e.g. on hover/focus of a custom trigger. */
  preload: () => void;
}

const ProjectEstimatorContext = createContext<ProjectEstimatorContextValue | null>(null);

export function useProjectEstimator(): ProjectEstimatorContextValue {
  const context = useContext(ProjectEstimatorContext);

  if (!context) {
    throw new Error("useProjectEstimator must be used inside <ProjectEstimatorProvider>.");
  }

  return context;
}

/* -------------------------------------------------------------------------
 * Provider + full-screen dialog
 * ---------------------------------------------------------------------- */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface ProjectEstimatorProviderProps {
  children: ReactNode;
  onSubmitLead?: ProjectEstimatorWizardProps["onSubmitLead"];
}

export function ProjectEstimatorProvider({ children, onSubmitLead }: ProjectEstimatorProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Bumped on every open so the wizard fully remounts and re-reads saved progress.
  const [instanceKey, setInstanceKey] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setInstanceKey((key) => key + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const { body, documentElement } = document;

    // -----------------------------------------------------------------------
    // Lock page scrolling
    // -----------------------------------------------------------------------
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = documentElement.style.overflow;

    const scrollbarWidth =
      window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Prevent layout shift when the scrollbar disappears.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus the dialog.
    overlay?.focus();

    // -----------------------------------------------------------------------
    // Animation
    // -----------------------------------------------------------------------
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tween =
      overlay && !reduceMotion
        ? gsap.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
        )
        : null;

    // -----------------------------------------------------------------------
    // Keyboard handling
    // -----------------------------------------------------------------------
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !overlay) return;

      const focusable =
        overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

      if (focusable.length === 0) {
        event.preventDefault();
        overlay.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (
        event.shiftKey &&
        (active === first || active === overlay)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // -----------------------------------------------------------------------
    // Cleanup
    // -----------------------------------------------------------------------
    return () => {
      window.removeEventListener("keydown", onKeyDown);

      tween?.kill();

      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;

      returnFocusRef.current?.focus();
    };
  }, [isOpen, close]);
  const value = useMemo<ProjectEstimatorContextValue>(
    () => ({ isOpen, open, close, preload: preloadWizard }),
    [isOpen, open, close]
  );

  return (
    <ProjectEstimatorContext.Provider value={value}>
      {children}

      {isOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Project Estimator"
          tabIndex={-1}
          className="bg-background fixed inset-0 z-[999] overflow-hidden overflow-y outline-none"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted absolute top-6 right-6 z-10 rounded-full p-2.5 transition-colors"
          >
            <X className="size-5" />
          </button>
          <ProjectEstimatorWizard
            key={instanceKey}
            className="h-screen"
            onSubmitLead={onSubmitLead}
          />
        </div>
      )}
    </ProjectEstimatorContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * Trigger — drop this anywhere on the site
 * ---------------------------------------------------------------------- */
//removed mx-auto on the below element class - Sithuliso Zulu
const TRIGGER_CLASSES =
  "cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 has-[>svg]:px-4 gap-2 rounded-lg px-6! text-base shadow-sm max-[400px]:flex-1";

type EstimateProjectButtonProps = Omit<ComponentPropsWithoutRef<"button">, "type" | "onClick">;

export function EstimateProjectButton({
                                        className,
                                        children = "Estimate my project",
                                        ...props
                                      }: EstimateProjectButtonProps) {
  const { open, preload } = useProjectEstimator();

  return (
    <button
      type="button"
      onClick={open}
      onPointerEnter={preload}
      onFocus={preload}
      className={cn(TRIGGER_CLASSES, className)}
      {...props}
    >
      {children}
    </button>
  );
}
