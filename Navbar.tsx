'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, User } from 'lucide-react'

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-8 pointer-events-none"
    >
      <div className="flex items-center gap-6 pointer-events-auto">
        <button className="p-2 hover:bg-luxury-gold/10 rounded-full transition-colors">
          <Search size={22} strokeWidth={1.5} className="text-luxury-charcoal" />
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <h1 className="text-3xl font-serif tracking-[0.2em] font-medium text-luxury-charcoal">
          Sorelle
        </h1>
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        <button className="p-2 hover:bg-luxury-gold/10 rounded-full transition-colors">
          <ShoppingBag size={22} strokeWidth={1.5} className="text-luxury-charcoal" />
        </button>
        <button className="p-2 hover:bg-luxury-gold/10 rounded-full transition-colors">
          <User size={22} strokeWidth={1.5} className="text-luxury-charcoal" />
        </button>
      </div>
    </motion.nav>
  )
}
