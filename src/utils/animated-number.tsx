"use client";

import {
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export default function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(
    spring,
    (current) =>
      Math.round(current)
        .toLocaleString("en-US")
        .replaceAll(/,/g, ".")
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.p className={className}>
      {display}
    </motion.p>
  );
}
