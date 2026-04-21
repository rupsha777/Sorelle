'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react'

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-white px-12 py-24 flex flex-col items-center border-t border-luxury-beige/10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        <div className="flex flex-col gap-8 max-w-sm">
          <h2 className="text-3xl font-serif tracking-[0.2em] italic text-luxury-charcoal uppercase">Sorelle</h2>
          <p className="text-xs md:text-sm text-luxury-charcoal/50 leading-relaxed font-light tracking-wide">
            Crafting elegance since 1924. Our legacy is built on the intersection of timeless art and modern luxury, creating pieces that resonate with the essence of who you are.
          </p>
          <div className="flex gap-6">
            <Instagram size={18} className="text-luxury-charcoal/40 hover:text-luxury-gold cursor-pointer transition-colors" />
            <Twitter size={18} className="text-luxury-charcoal/40 hover:text-luxury-gold cursor-pointer transition-colors" />
            <Facebook size={18} className="text-luxury-charcoal/40 hover:text-luxury-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32 w-full md:w-auto">
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] tracking-[0.3em] font-medium text-luxury-charcoal uppercase">Collections</h4>
            <div className="flex flex-col gap-4 text-xs text-luxury-charcoal/40 font-light">
              <a href="#" className="hover:text-luxury-gold transition-colors">Bridal</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Evening Wear</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Heritage</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Contemporary</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] tracking-[0.3em] font-medium text-luxury-charcoal uppercase">Boutique</h4>
            <div className="flex flex-col gap-4 text-xs text-luxury-charcoal/40 font-light">
              <a href="#" className="hover:text-luxury-gold transition-colors">Our Story</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Locations</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Services</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Events</a>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-6">
            <h4 className="text-[10px] tracking-[0.3em] font-medium text-luxury-charcoal uppercase">Support</h4>
            <div className="flex flex-col gap-4 text-xs text-luxury-charcoal/40 font-light">
              <a href="#" className="hover:text-luxury-gold transition-colors">Shipping</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Returns</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Care Guide</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-luxury-beige/5 text-[10px] text-luxury-charcoal/30 tracking-[0.2em] uppercase font-light">
        <p>&copy; 2024 Sorelle Fine Jewelry. All rights reserved.</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-luxury-gold transition-colors">Privacy</a>
          <a href="#" className="hover:text-luxury-gold transition-colors">Terms</a>
        </div>
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 group hover:text-luxury-charcoal transition-colors"
        >
          Back to top
          <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
