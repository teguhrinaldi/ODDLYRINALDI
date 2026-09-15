"use client";

import { Lottie } from "lottie-react";

type LottiePlayerProps = {
  src: string;
  className?: string;
  loop?: boolean | number;
  autoplay?: boolean;
};

/** Thin wrapper around lottie-react's `Lottie` — it fetches `src` itself. */
export default function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
}: LottiePlayerProps) {
  return <Lottie src={src} loop={loop} autoplay={autoplay} className={className} />;
}
