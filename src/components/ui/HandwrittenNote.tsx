import { ReactNode } from "react";
import clsx from "clsx";

type HandwrittenNoteProps = {
  children: ReactNode;
  className?: string;
  rotate?: number;
};

/** Marker/handwritten-style annotation text — used for playful asides, never body copy. */
export default function HandwrittenNote({
  children,
  className,
  rotate = 0,
}: HandwrittenNoteProps) {
  return (
    <span
      className={clsx("font-hand leading-none inline-block", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
