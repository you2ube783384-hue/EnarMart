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
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f0fdf9] via-[#f8f5f2] to-[#e6f7f2]">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a67d]/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00a67d]/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 md:py-24 lg:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a67d]/10 text-[#00a67d] text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a67d] animate-pulse" />
              Premium Canva Templates
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a2e] mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Beautiful Canva
              <br />
              Templates for
              <br />
              <span className="text-[#00a67d]">Every Project</span>
            </h1>
            <p className="text-base md:text-lg text-[#555770] mb-10 max-w-lg leading-relaxed">
              Ready-to-use Canva templates for resumes, social media, YouTube, presentations, and more. Edit in minutes, download instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-[#00a67d] text-white hover:bg-[#008f6b] border-0 px-8 rounded-xl h-12 text-sm font-bold tracking-wide shadow-lg shadow-[#00a67d]/25 hover:shadow-xl hover:shadow-[#00a67d]/30 transition-all duration-300"
                >
                  Explore Templates
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2.5 text-xs" />
                </Button>
              </Link>
              <Link href="/shop?category=Most+Purchased">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#e8e8ed] text-[#555770] hover:text-[#1a1a2e] hover:bg-white hover:border-[#d8d8dd] px-8 rounded-xl h-12 text-sm font-bold tracking-wide transition-all duration-300"
                >
                  Most Popular
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards with scroll */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-lg md:text-xl font-bold text-[#1a1a2e] tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Browse by Category
            </h2>
            <p className="text-sm text-[#8e8ea0] mt-0.5">Find the perfect template for your needs</p>
          </div>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white shadow-lg border border-[#e8e8ed] flex items-center justify-center text-[#555770] hover:text-[#00a67d] hover:border-[#00a67d]/30 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => scrollCards("left")}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-2"
          >
            {heroCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white border border-[#e8e8ed] rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#00a67d]/5 hover:border-[#00a67d]/20 cursor-pointer shrink-0 w-[140px] md:w-[160px] lg:w-auto lg:flex-1"
              >
                <div className="mx-auto mb-3 w-14 h-14 rounded-xl bg-[#f0fdf9] flex items-center justify-center transition-all duration-300 group-hover:bg-[#e6f7f2] group-hover:scale-110">
                  <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-2xl text-[#00a67d]" />
                </div>
                <h3
                  className="font-semibold text-xs md:text-sm text-[#1a1a2e] tracking-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#8e8ea0] mt-1 font-medium">
                  {loading ? "..." : getCount(cat.name)}
                </p>
              </Link>
            ))}
          </div>

          {canScrollRight && (
            <button
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white shadow-lg border border-[#e8e8ed] flex items-center justify-center text-[#555770] hover:text-[#00a67d] hover:border-[#00a67d]/30 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => scrollCards("right")}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}

          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-2 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          )}
        </div>
      </div>
    </section>
  )
}
