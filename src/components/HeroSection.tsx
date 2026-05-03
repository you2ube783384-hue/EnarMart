"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { getIconDefinition } from "@/lib/icon-helpers"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

export function HeroSection() {
  const [heroCategories, setHeroCategories] = useState<HeroCategory[]>([])
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) {
          setHeroCategories(data.filter((cat: HeroCategory) => cat.showInHero))
        }
      } catch {
        // Silently ignore
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/products/counts")
        if (!res.ok) return
        const data = await res.json()
        setCategoryCounts(data.counts || [])
      } catch {
        // Silently ignore
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [])

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

  useEffect(() => {
    const timer = setTimeout(checkScroll, 150)
    return () => clearTimeout(timer)
  }, [heroCategories, checkScroll])

  const scrollCards = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("a")?.offsetWidth || 160
    el.scrollBy({ left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16, behavior: "smooth" })
  }

  const getCount = (categoryName: string) => {
    const found = categoryCounts.find((c) => c.category === categoryName)
    if (!found) return "0"
    if (found.count >= 1000) return `${(found.count / 1000).toFixed(1).replace(/\.0$/, "")}k+`
    return `${found.count}+`
  }

  return (
    <section>
      {/* Hero Banner */}
      <div className="bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00a67d] mb-4">
              Premium Canva Templates
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-5 leading-[1.15] tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Beautiful Canva Templates
              <br />
              for Every Project
            </h1>
            <p className="text-sm md:text-base text-[#666666] mb-8 max-w-lg leading-relaxed">
              Ready-to-use Canva templates for resumes, social media, YouTube, presentations, and more. Edit in minutes, download instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-[#00a67d] text-white hover:bg-[#008f6b] border-0 px-7 rounded-full h-11 text-sm font-semibold"
                >
                  Explore Templates
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards with scroll */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-4 pb-10">
        <div className="relative">
          {canScrollLeft && (
            <button
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center text-[#666666] hover:text-[#00a67d] hover:border-[#00a67d]/40 transition-all cursor-pointer"
              onClick={() => scrollCards("left")}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
          >
            {heroCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white border-[3px] border-[#e0e0e0] rounded-xl p-4 md:p-5 text-center transition-all hover:shadow-md hover:border-[#00a67d]/40 cursor-pointer shrink-0 w-[130px] md:w-[150px] lg:w-auto lg:flex-1"
              >
                <div className="mx-auto mb-2 transition-transform group-hover:scale-110 flex items-center justify-center">
                  <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-[60px] text-[#333333]" />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
                  {cat.name}
                </h3>
                <p className="text-[10px] md:text-xs text-[#999999] mt-0.5">
                  {loading ? "..." : getCount(cat.name)}
                </p>
              </Link>
            ))}
          </div>

          {canScrollRight && (
            <button
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white shadow-lg border border-[#e0e0e0] flex items-center justify-center text-[#666666] hover:text-[#00a67d] hover:border-[#00a67d]/40 transition-all cursor-pointer"
              onClick={() => scrollCards("right")}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

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
