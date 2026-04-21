'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollSection } from './ScrollSection'

const GALLERY_ITEMS = [
  { id: 1, title: 'Grace', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop', tall: true },
  { id: 2, title: 'Strength', image: 'https://images.unsplash.com/photo-1599643478518-a744c5b7fdf1?q=80&w=1974&auto=format&fit=crop', tall: false },
  { id: 3, title: 'Journey', image: '/diamond_necklace_hero_1775289624107.png', tall: true },
  { id: 4, title: 'Elegance', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop', tall: false },
  { id: 5, title: 'Timeless', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2003&auto=format&fit=crop', tall: true },
]

export const CollectionGallery = () => {
  return (
    <section className="min-h-screen w-full px-12 py-32 flex flex-col items-center">
      <ScrollSection className="text-center mb-24 max-w-4xl mx-auto">
        <h3 className="text-luxury-charcoal/50 text-4xl md:text-5xl font-serif mb-4 italic">
          For the
        </h3>
        <h2 className="text-5xl md:text-7xl font-sans font-light tracking-[0.1em] uppercase text-luxury-charcoal">
          Woman You Are
        </h2>
        <div className="flex justify-end mt-12">
          <p className="max-w-xs text-right text-xs md:text-sm text-luxury-charcoal/60 leading-relaxed tracking-wider font-light uppercase">
            We create pieces that mirror your grace, your strength, and your journey — because elegance is not just worn, it&apos;s lived.
          </p>
        </div>
      </ScrollSection>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 w-full max-w-7xl">
        {GALLERY_ITEMS.map((item, index) => (
          <ScrollSection 
            key={item.id} 
            delay={index * 0.1}
            className={`relative group overflow-hidden rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl transition-all duration-700 ${item.tall ? 'aspect-[2/3]' : 'aspect-[2/3.5] mt-12'}`}
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 text-white font-serif tracking-[0.2em] italic uppercase text-xs">
              View Collection
            </div>
          </ScrollSection>
        ))}
      </div>
    </section>
  )
}
