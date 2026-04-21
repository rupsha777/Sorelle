'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background radial gradient animation already in globals.css */}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2 // Slight delay to ensure page load is smooth
        }}
        className="w-[90%] max-w-4xl h-[70vh] rounded-[4rem] bg-white shadow-2xl flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-ivory via-white to-luxury-beige/20 p-8 flex items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-8xl font-serif tracking-[0.3em] font-light text-luxury-charcoal uppercase italic">
              Sorelle
            </h2>
            <p className="mt-8 text-luxury-gold tracking-[0.4em] uppercase text-sm md:text-base font-light">
              London &bull; Paris &bull; Milan
            </p>
          </motion.div>
        </div>
        
        {/* Subtle decorative elements for the "isolated luxury" feel */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-luxury-gold to-transparent opacity-30" />
      </motion.div>
    </section>
  )
}
