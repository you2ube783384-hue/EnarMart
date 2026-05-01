"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Input } from "@/components/ui/input"

const categories = [
  "Fonts",
  "Templates",
  "Graphics",
  "Photos",
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
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

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
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Main nav bar */}
      <div className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto flex h-14 items-center gap-6 px-4 lg:px-8">
          {/* Logo - hidden when search expanded */}
          <Link
            href="/"
            className={`flex items-center shrink-0 transition-all duration-300 ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
          >
            <Image
              src="/logo.png"
              alt="DigiMarket"
              width={140}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className={`flex items-center gap-2 transition-all duration-300 ${
              searchExpanded ? "flex-1" : "flex-1 max-w-lg"
            }`}
          >
            <div className="relative w-full">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] text-sm"
              />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search products..."
                className={`pl-10 h-10 bg-[#f5f5f5] border-[#e5e5e5] rounded-full text-sm placeholder:text-[#999999] focus:bg-white focus:border-[#00a67d] focus:ring-[#00a67d]/20 transition-all duration-300 ${
                  searchExpanded ? "w-full pr-10 text-base" : ""
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchExpanded(true)}
              />
              {/* Cross button - visible when search expanded */}
              {searchExpanded && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#e5e5e5] hover:bg-[#d5d5d5] text-[#666666] hover:text-[#333333] transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    setSearchExpanded(false)
                    setSearchQuery("")
                    onSearch("")
                    searchInputRef.current?.blur()
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop nav - hidden when search expanded */}
          <nav
            className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "text-[#00a67d] bg-[#e6f7f2]"
                    : "text-[#666666] hover:text-[#333333] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle - hidden when search expanded */}
          <button
            className={`lg:hidden p-2 text-[#666666] hover:text-[#333333] transition-colors ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      {/* Category sub-nav bar */}
      <div className="hidden lg:block border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5 text-sm scrollbar-none">
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect(null)}
            >
              All Products
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("Photos")}
            >
              Stock Photos
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("Graphics")}
            >
              Vector Graphics
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("Templates")}
            >
              Design Templates
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("Fonts")}
            >
              Premium Fonts
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("3D")}
            >
              3D Assets
            </button>
            <span className="shrink-0 text-[#e5e5e5]">|</span>
            <button
              className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              onClick={() => onCategorySelect("Icons")}
            >
              Icon Packs
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e5e5e5] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "text-[#00a67d] bg-[#e6f7f2] border border-[#00a67d]/20"
                    : "text-[#666666] bg-[#f5f5f5] hover:bg-[#e5e5e5] border border-transparent"
                }`}
                onClick={() => {
                  handleCategoryClick(category)
                  setMobileMenuOpen(false)
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
