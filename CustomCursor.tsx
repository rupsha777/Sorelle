'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const checkPointer = () => {
      const hoveredElement = document.querySelector(':hover')
      if (hoveredElement) {
        const style = window.getComputedStyle(hoveredElement)
        setIsPointer(style.cursor === 'pointer')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', checkPointer)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', checkPointer)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        translateX: smoothX,
        translateY: smoothY,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ scale: 1, opacity: 0 }}
      animate={{ 
        scale: isPointer ? 1.5 : 1,
        opacity: 1 
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference border border-luxury-gold flex items-center justify-center overflow-hidden"
    >
      <div className="w-1 h-1 bg-luxury-gold rounded-full" />
      <div className="absolute inset-0 bg-luxury-gold/10 blur-xl scale-[2] pointer-events-none" />
    </motion.div>
  )
}
