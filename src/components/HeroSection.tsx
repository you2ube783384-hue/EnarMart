"use client"

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faWandMagicSparkles,
  faCamera,
  faPalette,
  faTableColumns,
  faFont,
  faCube,
  faShapes,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"

const categoryCards = [
  { name: "Photos", icon: faCamera, count: "2,400+" },
  { name: "Graphics", icon: faPalette, count: "1,800+" },
  { name: "Templates", icon: faTableColumns, count: "3,200+" },
  { name: "Fonts", icon: faFont, count: "900+" },
  { name: "3D", icon: faCube, count: "600+" },
  { name: "Icons", icon: faShapes, count: "5,000+" },
]

interface HeroSectionProps {
  onCategoryClick: (category: string) => void
}

export function HeroSection({ onCategoryClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative bg-[#000000]">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffffff]/20 bg-[#ffffff]/10 px-4 py-1.5 text-sm text-[#ffffff]/80 mb-6">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="text-[#dff8f6] text-xs" />
              <span>New products added daily</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-4 tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
              Premium Digital Assets
              <br />
              <span className="text-[#dff8f6]">
                For Creators
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#ffffff]/60 mb-8 max-w-2xl mx-auto">
              Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide. 
              Everything you need to bring your creative vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-[#dff8f6] text-[#000000] hover:bg-[#dff8f6]/80 border-0 px-8"
                onClick={() => onCategoryClick("Templates")}
              >
                Explore Products
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#ffffff]/20 text-[#ffffff] hover:bg-[#ffffff]/10 px-8"
                onClick={() => onCategoryClick("Graphics")}
              >
                Browse Graphics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categoryCards.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="group relative overflow-hidden rounded-xl bg-[#ffffff] border shadow-sm p-4 md:p-5 text-left transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="size-10 md:size-12 rounded-lg bg-[#dff8f6] flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                <FontAwesomeIcon icon={cat.icon} className="text-[#000000] text-base md:text-lg" />
              </div>
              <h3 className="font-semibold text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>{cat.name}</h3>
              <p className="text-xs text-[#000000]/50 mt-0.5">{cat.count}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
