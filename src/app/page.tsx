"use client"

import React, { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ProductGrid } from "@/components/ProductGrid"
import { Footer } from "@/components/Footer"

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer ring */}
          <div className="size-12 rounded-full border-[3px] border-[#e5e5e5]" />
          {/* Spinning arc */}
          <div className="absolute inset-0 size-12 rounded-full border-[3px] border-transparent border-t-[#00a67d] animate-spin" />
        </div>
        <Image
          src="/logo.png"
          alt="DigiMarket"
          width={120}
          height={30}
          className="h-6 w-auto opacity-60"
        />
      </div>
    </div>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [productRefreshKey, setProductRefreshKey] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for fonts and icons to be fully loaded
    const checkReady = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Small extra delay to ensure CSS is painted
          requestAnimationFrame(() => {
            setIsReady(true)
          })
        })
      } else {
        // Fallback: just wait a short time
        setTimeout(() => setIsReady(true), 300)
      }
    }
    checkReady()
  }, [])

  const handleCategorySelect = useCallback((category: string | null) => {
    setActiveCategory(category)
    setSearchQuery("")
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setActiveCategory(null)
  }, [])

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category)
    setSearchQuery("")
    const el = document.getElementById("products-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      {/* Show spinner while loading, hide content to prevent icon flash */}
      {!isReady && <LoadingSpinner />}

      <div
        className={`min-h-screen flex flex-col bg-white transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Header
          onSearch={handleSearch}
          onCategorySelect={handleCategorySelect}
          activeCategory={activeCategory}
        />

        <main className="flex-1">
          {!activeCategory && !searchQuery && (
            <HeroSection key={productRefreshKey} onCategoryClick={handleCategoryClick} />
          )}

          <div id="products-section">
            <ProductGrid
              key={productRefreshKey}
              category={activeCategory}
              searchQuery={searchQuery}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
