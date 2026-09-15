"use client";

import { RefObject, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LottiePlayer from "@/components/ui/LottiePlayer";

type RunningDogProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const DOG_WIDTH = 220; // matches the largest (lg) rendered width, in px
const WALK_SPEED = 90; // px per second

/**
 * The dog, walking continuously across the hero — off-screen right, then
 * straight back in from the left, on a loop. The hero section clips it via
 * overflow-hidden while it's off-canvas either side.
 */
export default function RunningDog({ containerRef }: RunningDogProps) {
  const reduce = useReducedMotion();
  const [travel, setTravel] = useState(1600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setTravel(el.offsetWidth + DOG_WIDTH * 2);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return (
    <motion.div
      className="absolute -left-14 bottom-0 z-20 w-37.5 sm:w-47.5 lg:w-55"
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, x: [0, travel] }}
      transition={
        reduce
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.7, delay: 0.3 },
              x: {
                delay: 0.3,
                duration: travel / WALK_SPEED,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }
      }
      role="img"
      aria-label="A golden retriever walking playfully across the hero"
    >
      <LottiePlayer
        src="/animations/Dog walking.json"
        loop={!reduce}
        autoplay={!reduce}
        className="w-full drop-shadow-[0_16px_18px_rgba(0,0,0,0.15)]"
      />
    </motion.div>
  );
}
