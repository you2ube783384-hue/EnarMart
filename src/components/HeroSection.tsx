"use client"

import React, { useState, useEffect } from "react"
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
  { name: "Photos", icon: faCamera, bgColor: "#dff8f6" },
  { name: "Graphics", icon: faPalette, bgColor: "#ffefb8" },
  { name: "Templates", icon: faTableColumns, bgColor: "#dff8f6" },
  { name: "Fonts", icon: faFont, bgColor: "#ffefb8" },
  { name: "3D", icon: faCube, bgColor: "#dff8f6" },
  { name: "Icons", icon: faShapes, bgColor: "#ffefb8" },
]

interface CategoryCount {
  category: string
  count: number
}

interface HeroSectionProps {
  onCategoryClick: (category: string) => void
}

export function HeroSection({ onCategoryClick }: HeroSectionProps) {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/products/counts")
        const data = await res.json()
        setCategoryCounts(data.counts || [])
      } catch (error) {
        console.error("Failed to fetch category counts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [])

  const getCount = (categoryName: string) => {
    const found = categoryCounts.find((c) => c.category === categoryName)
    if (!found) return "0"
    if (found.count >= 1000) {
      return `${(found.count / 1000).toFixed(1).replace(/\.0$/, "")}k+`
    }
    return `${found.count}+`
  }

  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative bg-[#000000]">
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffefb8] px-4 py-1.5 text-sm text-[#000000] mb-6">
              <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs" />
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
                className="bg-[#ffefb8] text-[#000000] hover:bg-[#ffefb8]/80 border-0 px-8"
                onClick={() => onCategoryClick("Graphics")}
              >
                Browse Graphics
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-sm" />
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
              <div
                className="size-10 md:size-12 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.bgColor }}
              >
                <FontAwesomeIcon icon={cat.icon} className="text-[#000000] text-base md:text-lg" />
              </div>
              <h3 className="font-semibold text-sm md:text-base" style={{ fontFamily: "var(--font-poppins)" }}>{cat.name}</h3>
              <p className="text-xs text-[#000000]/50 mt-0.5">
                {loading ? "..." : getCount(cat.name)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
