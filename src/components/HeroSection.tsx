"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { getIconDefinition } from "@/lib/icon-helpers"
import { Button } from "@/components/ui/button"

interface HeroCategory {
  id: string
  name: string
  icon: string
  showInHero: boolean
}

interface CategoryCount {
  category: string
  count: number
}

interface HeroSectionProps {
  onCategoryClick: (category: string) => void
}

export function HeroSection({ onCategoryClick }: HeroSectionProps) {
  const [heroCategories, setHeroCategories] = useState<HeroCategory[]>([])
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Fetch categories with showInHero
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        if (Array.isArray(data)) {
          // Only show categories where showInHero is true
          setHeroCategories(data.filter((cat: HeroCategory) => cat.showInHero))
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch product counts
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

  // Check scroll position for arrows
  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true })
      window.addEventListener("resize", checkScroll)
      return () => {
        el.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [checkScroll, heroCategories])

  // Re-check after categories load
  useEffect(() => {
    const timer = setTimeout(checkScroll, 150)
    return () => clearTimeout(timer)
  }, [heroCategories, checkScroll])

  const scrollCards = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("button")?.offsetWidth || 160
    const gap = 16
    const scrollAmount = cardWidth + gap
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

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

      {/* Category Cards with scroll */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4 pb-12">
        <div className="relative">
          {/* Left scroll arrow */}
          {canScrollLeft && (
            <button
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center text-[#666666] hover:text-[#00a67d] hover:border-[#00a67d]/40 transition-all cursor-pointer"
              onClick={() => scrollCards("left")}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          {/* Scrollable cards container */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
          >
            {heroCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.name)}
                className="group bg-white border-[3px] border-[#e0e0e0] rounded-xl p-5 md:p-6 text-center transition-all hover:shadow-md hover:border-[#00a67d]/40 cursor-pointer shrink-0 w-[140px] md:w-[160px] lg:w-auto lg:flex-1"
              >
                {/* Icon */}
                <div className="mx-auto mb-3 transition-transform group-hover:scale-110 flex items-center justify-center">
                  <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-[70px] text-[#333333]" />
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

          {/* Right scroll arrow */}
          {canScrollRight && (
            <button
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center text-[#666666] hover:text-[#00a67d] hover:border-[#00a67d]/40 transition-all cursor-pointer"
              onClick={() => scrollCards("right")}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

          {/* Fade edges to indicate more content */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          )}
        </div>
      </div>
    </section>
  )
}
