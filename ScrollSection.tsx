'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const ScrollSection = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode,
  className?: string,
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, // Only animate once
    amount: 0.1 // 10% in view to trigger
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
