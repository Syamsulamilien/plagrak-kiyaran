import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  textClassName?: string;
  delay?: number;
  splitBy?: "word" | "char";
}

export default function AnimatedHeading({ text, as = "h2", className = "", textClassName = "", delay = 0, splitBy = "word" }: AnimatedHeadingProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as;
  const pieces = splitBy === "word" ? text.split(" ") : text.split("");

  if (prefersReduced) {
    return (
      <Tag className={className}>
        <span className={textClassName}>{text}</span>
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-transform ${textClassName}`}
          style={{ marginRight: splitBy === "word" ? "0.28em" : 0 }}
          initial={{ opacity: 0, y: "0.6em", rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: delay + i * (splitBy === "word" ? 0.07 : 0.025), ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {piece === "" ? "\u00A0" : piece}
        </motion.span>
      ))}
    </Tag>
  );
}
