"use client"

import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faCamera,
  faPalette,
  faTableColumns,
  faFont,
  faCube,
  faShapes,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"

const categoryCards = [
  { name: "Photos", icon: faCamera, color: "#00a67d", bg: "#e6f7f2" },
  { name: "Graphics", icon: faPalette, color: "#e67e22", bg: "#fef3e8" },
  { name: "Templates", icon: faTableColumns, color: "#8e44ad", bg: "#f5eef8" },
  { name: "Fonts", icon: faFont, color: "#2c3e50", bg: "#eef0f2" },
  { name: "3D", icon: faCube, color: "#e74c3c", bg: "#fdeeed" },
  { name: "Icons", icon: faShapes, color: "#f39c12", bg: "#fef9ed" },
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
    <section>
      {/* Hero Banner */}
      <div className="bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00a67d] mb-4">
              Handcrafted digital assets
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#333333] mb-5 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Bring your creative
              <br />
              ideas to life
            </h1>
            <p className="text-base md:text-lg text-[#666666] mb-8 max-w-lg leading-relaxed">
              Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-[#00a67d] text-white hover:bg-[#008f6b] border-0 px-7 rounded-full h-11 text-sm font-semibold"
                onClick={() => onCategoryClick("Templates")}
              >
                Explore Products
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white px-7 rounded-full h-11 text-sm font-semibold"
                onClick={() => onCategoryClick("Graphics")}
              >
                Browse Graphics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-7 relative z-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categoryCards.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="group relative overflow-hidden rounded-xl bg-white border border-[#e5e5e5] p-4 md:p-5 text-left transition-all hover:shadow-md hover:border-transparent cursor-pointer"
            >
              <div
                className="size-10 md:size-11 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.bg }}
              >
                <FontAwesomeIcon icon={cat.icon} className="text-base md:text-lg" style={{ color: cat.color }} />
              </div>
              <h3 className="font-semibold text-sm text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
                {cat.name}
              </h3>
              <p className="text-xs text-[#999999] mt-0.5">
                {loading ? "..." : getCount(cat.name)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
