"use client"

import React, { useState, useCallback } from "react"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ProductGrid } from "@/components/ProductGrid"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [productRefreshKey, setProductRefreshKey] = useState(0)

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
    // Scroll to products section
    const el = document.getElementById("products-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* Show hero only when no category or search filter is active */}
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
  )
}
