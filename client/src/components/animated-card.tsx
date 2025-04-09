import type { ReactNode } from "react"
import { motion, type MotionProps } from "framer-motion"

interface AnimatedCardProps extends MotionProps {
  children: ReactNode
}

export function AnimatedCard({ children, ...motionProps }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
