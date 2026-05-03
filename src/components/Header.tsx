"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBars, faXmark, faChevronDown, faShop } from "@fortawesome/free-solid-svg-icons"
import { getIconDefinition } from "@/lib/icon-helpers"
import { Input } from "@/components/ui/input"

interface Subcategory {
  id: string
  name: string
  categoryId: string
}

interface NavCategory {
  id: string
  name: string
  icon: string
  showInNav: boolean
  subcategories: Subcategory[]
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [navCategories, setNavCategories] = useState<NavCategory[]>([])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchOverlayRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Fetch categories with subcategories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) {
          setNavCategories(data.filter((cat: NavCategory) => cat.showInNav))
        }
      } catch {
        // Silently ignore
      }
    }
    fetchCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchExpanded(false)
      searchInputRef.current?.blur()
    }
  }

  // Close search when clicking overlay (empty space)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === searchOverlayRef.current) {
      setSearchExpanded(false)
      setSearchQuery("")
      searchInputRef.current?.blur()
    }
  }

  // Close search on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchExpanded) {
        setSearchExpanded(false)
        setSearchQuery("")
        searchInputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [searchExpanded])

  // Dropdown handlers with delay for smooth UX
  const handleDropdownEnter = (categoryId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setActiveDropdown(categoryId)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 250)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    if (activeDropdown) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside)
      }, 0)
      return () => {
        clearTimeout(timer)
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [activeDropdown])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md">
      {/* Search overlay - closes on click on empty space */}
      {searchExpanded && (
        <div
          ref={searchOverlayRef}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Main nav bar */}
      <div className="relative z-50 border-b border-[#e8e8ed]">
        <div className="max-w-[1320px] mx-auto flex h-16 items-center gap-8 px-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center shrink-0 transition-all duration-300 ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
          >
            <Image
              src="/logo.png"
              alt="EnarMart"
              width={150}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className={`flex items-center gap-2 transition-all duration-300 ${
              searchExpanded ? "flex-1" : "flex-1 max-w-xl"
            }`}
          >
            <div className="relative w-full">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8ea0] text-sm"
              />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search Canva templates..."
                className={`pl-11 h-11 bg-[#f5f5f7] border-transparent rounded-xl text-sm placeholder:text-[#8e8ea0] focus:bg-white focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/15 transition-all duration-300 ${
                  searchExpanded ? "w-full pr-10 text-base" : ""
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchExpanded(true)}
              />
              {/* Close button - only closes search, does NOT redirect */}
              {searchExpanded && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[#e8e8ed] hover:bg-[#d8d8dd] text-[#555770] hover:text-[#1a1a2e] transition-all duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSearchExpanded(false)
                    setSearchQuery("")
                    searchInputRef.current?.blur()
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop nav with dropdown categories */}
          <nav
            className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
          >
            <Link
              href="/shop"
              className={`px-4 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-all duration-200 flex items-center gap-2 ${
                pathname === "/shop"
                  ? "text-[#00a67d] bg-[#e6f7f2]"
                  : "text-[#555770] hover:text-[#1a1a2e] hover:bg-[#f5f5f7]"
              }`}
            >
              <FontAwesomeIcon icon={faShop} className="text-[0.65rem]" />
              Shop
            </Link>
            {navCategories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(category.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className={`px-4 py-2 text-[13px] font-semibold tracking-wide rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    activeDropdown === category.id
                      ? "text-[#00a67d] bg-[#e6f7f2]"
                      : "text-[#555770] hover:text-[#1a1a2e] hover:bg-[#f5f5f7]"
                  }`}
                  onClick={() => setActiveDropdown(null)}
                >
                  {category.name}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[0.45rem] ml-0.5 transition-transform duration-200 ${
                        activeDropdown === category.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown with subcategories */}
                {category.subcategories && category.subcategories.length > 0 && activeDropdown === category.id && (
                  <div
                    className="absolute top-full left-0 pt-2 min-w-[260px] z-[60] dropdown-enter"
                    onMouseEnter={() => handleDropdownEnter(category.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] border border-[#e8e8ed] overflow-hidden">
                      {/* Category header link */}
                      <Link
                        href={`/shop?category=${encodeURIComponent(category.name)}`}
                        className="flex items-center gap-3 px-5 py-3.5 text-[13px] font-bold tracking-wide text-[#00a67d] hover:bg-[#f0fdf9] transition-colors border-b border-[#f0f0f3]"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <FontAwesomeIcon icon={getIconDefinition(category.icon)} className="text-[0.7rem]" />
                        All {category.name}
                      </Link>
                      {/* Subcategory links */}
                      <div className="py-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                            className="block px-5 py-2.5 text-sm text-[#555770] hover:text-[#00a67d] hover:bg-[#f0fdf9] hover:pl-6 transition-all duration-200 cursor-pointer"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden p-2.5 text-[#555770] hover:text-[#1a1a2e] rounded-lg hover:bg-[#f5f5f7] transition-all ${
              searchExpanded ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100 w-auto"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile menu with expandable categories */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e8e8ed] bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] max-h-[80vh] overflow-y-auto">
          <div className="p-5 space-y-2">
            {/* Shop All */}
            <Link
              href="/shop"
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-bold tracking-wide rounded-xl bg-[#00a67d] text-white shadow-md shadow-[#00a67d]/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faShop} className="text-xs" />
              Shop All Templates
            </Link>

            {/* Categories with expandable subcategories */}
            {navCategories.map((category) => (
              <MobileCategoryItem
                key={category.id}
                category={category}
                onClose={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

// Mobile category item with expandable subcategories
function MobileCategoryItem({ category, onClose }: { category: NavCategory; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const hasSubcategories = category.subcategories && category.subcategories.length > 0

  return (
    <div>
      <div className="flex items-center gap-1">
        <Link
          href={`/shop?category=${encodeURIComponent(category.name)}`}
          className="flex-1 flex items-center gap-3 px-5 py-3 text-[13px] font-semibold tracking-wide rounded-xl text-[#555770] bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={getIconDefinition(category.icon)} className="text-[0.65rem] text-[#00a67d]" />
          {category.name}
        </Link>
        {hasSubcategories && (
          <button
            className="p-3 rounded-xl text-[#8e8ea0] hover:text-[#00a67d] hover:bg-[#e6f7f2] transition-all cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-xs transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Subcategories dropdown */}
      {hasSubcategories && expanded && (
        <div className="ml-4 mt-1.5 space-y-0.5 border-l-2 border-[#e6f7f2] pl-4 py-1.5">
          <Link
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            className="block px-4 py-2.5 text-sm font-medium text-[#00a67d] hover:bg-[#f0fdf9] rounded-lg transition-colors"
            onClick={onClose}
          >
            All {category.name}
          </Link>
          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
              className="block px-4 py-2.5 text-sm text-[#555770] hover:text-[#00a67d] hover:bg-[#f0fdf9] rounded-lg transition-colors"
              onClick={onClose}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
