"use client"

import React, { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  "Photos",
  "Graphics",
  "Templates",
  "Fonts",
  "3D",
  "Icons",
]

interface HeaderProps {
  onSearch: (query: string) => void
  onCategorySelect: (category: string | null) => void
  activeCategory: string | null
}

export function Header({ onSearch, onCategorySelect, activeCategory }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      onCategorySelect(null)
    } else {
      onCategorySelect(category)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-[#000000] text-[#ffffff]">
        <div className="container mx-auto flex h-9 items-center justify-center px-4 text-xs">
          <span>Discover 100,000+ premium digital products</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0" style={{ fontFamily: "var(--font-poppins)" }}>
          <div className="size-8 rounded-lg bg-[#000000] flex items-center justify-center">
            <span className="text-[#ffffff] font-bold text-sm">D</span>
          </div>
          <span className="hidden sm:inline">DigiMarket</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]/50 text-sm" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 h-10 bg-[#dff8f6]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              size="sm"
              className="text-sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-lg" />
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-[#ffffff] p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  handleCategoryClick(category)
                  setMobileMenuOpen(false)
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Category bar */}
      <div className="hidden lg:block border-t bg-[#dff8f6]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2 text-sm text-[#000000]/60">
            <span className="shrink-0 font-medium text-[#000000]">Popular:</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect(null)}
            >
              All Products
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("Photos")}
            >
              Stock Photos
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("Graphics")}
            >
              Vector Graphics
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("Templates")}
            >
              Design Templates
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("Fonts")}
            >
              Premium Fonts
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("3D")}
            >
              3D Assets
            </button>
            <span className="shrink-0">•</span>
            <button
              className="shrink-0 hover:text-[#000000] transition-colors cursor-pointer"
              onClick={() => onCategorySelect("Icons")}
            >
              Icon Packs
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
