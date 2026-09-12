import { motion, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

export default function FadeIn({ children, className = "", delay = 0, duration = 0.52, x = 0, y = 16 }) {
  const reduce = useReducedMotion();

  return (
    <MotionDiv
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  );
}
