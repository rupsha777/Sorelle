'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollSection } from './ScrollSection'
import { ArrowRight } from 'lucide-react'

export const ProductSection = () => {
  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row bg-[#FBFBFA]">
      {/* Left Content Side */}
      <div className="w-full md:w-[40%] px-12 md:px-20 py-24 flex flex-col justify-center border-r border-luxury-beige/20">
        <ScrollSection>
          <h2 className="text-4xl md:text-5xl font-serif tracking-[0.1em] text-luxury-charcoal uppercase italic font-light mb-12">
            The Aurora Necklace
          </h2>
          
          <p className="text-luxury-charcoal/70 text-sm md:text-base leading-relaxed mb-12 max-w-sm font-light">
            Elevate your look with the Aurora Necklace Set, a timeless blend of grace and glamour. Designed with intricate craftsmanship, this set features a statement necklace and matching earrings that shimmer with every movement. Perfect for weddings, evening events, or adding a touch of luxury to your everyday ensemble.
          </p>

          <div className="space-y-6 mb-12">
            <h4 className="text-sm tracking-[0.2em] font-medium text-luxury-charcoal uppercase">Details:</h4>
            <ul className="space-y-4">
              {['Premium gold-plated finish', 'Handcrafted with precision stones', 'Hypoallergenic & skin-friendly', 'Comes with matching earrings', 'Packed in a premium gift box'].map((detail, i) => (
                <li key={i} className="flex items-center gap-4 text-xs md:text-sm text-luxury-charcoal/60 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <p className="text-3xl font-serif text-luxury-charcoal">Price: $3,000</p>
            </div>
            
            <button className="group relative w-full max-w-xs py-5 bg-luxury-charcoal text-white tracking-[0.3em] uppercase text-xs font-light hover:bg-neutral-800 transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Buy Now</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </button>
          </div>
        </ScrollSection>
      </div>

      {/* Right Image Side */}
      <div className="w-full md:w-[60%] h-[70vh] md:h-screen sticky top-0 bg-[#0A0A0A] overflow-hidden group">
        <ScrollSection delay={0.2} className="h-full w-full">
          <img 
            src="/diamond_necklace_hero_1775289624107.png" 
            alt="The Aurora Necklace"
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1)"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Navigation/Flow indicators as seen in screenshots */}
          <button className="absolute right-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500">
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </ScrollSection>
      </div>
    </section>
  )
}
