"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBars, faXmark, faChevronLeft, faChevronRight, faShop, faChevronDown } from "@fortawesome/free-solid-svg-icons"
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
  const subNavScrollRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
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

  // Check scroll position for arrows
  const checkScroll = useCallback(() => {
    const el = subNavScrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = subNavScrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true })
      window.addEventListener("resize", checkScroll)
      return () => {
        el.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [checkScroll, navCategories])

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100)
    return () => clearTimeout(timer)
  }, [navCategories, checkScroll])

  const scrollSubNav = (direction: "left" | "right") => {
    const el = subNavScrollRef.current
    if (!el) return
    el.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" })
  }

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
    }, 200)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    if (activeDropdown) {
      // Only add listener when dropdown is open
      // Small delay so the click that opened it doesn't close it
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
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Search overlay - closes on click on empty space */}
      {searchExpanded && (
        <div
          ref={searchOverlayRef}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />
      )}

      {/* Main nav bar */}
      <div className="relative z-50 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto flex h-14 items-center gap-6 px-4 lg:px-8">
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
                placeholder="Search Canva templates..."
                className={`pl-10 h-10 bg-[#f5f5f5] border-[#e5e5e5] rounded-full text-sm placeholder:text-[#999999] focus:bg-white focus:border-[#00a67d] focus:ring-[#00a67d]/20 transition-all duration-300 ${
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#e5e5e5] hover:bg-[#d5d5d5] text-[#666666] hover:text-[#333333] transition-all duration-200 cursor-pointer"
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
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 ${
                pathname === "/shop"
                  ? "text-[#00a67d] bg-[#e6f7f2]"
                  : "text-[#666666] hover:text-[#333333] hover:bg-[#f5f5f5]"
              }`}
            >
              <FontAwesomeIcon icon={faShop} className="text-[0.6rem]" />
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
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    activeDropdown === category.id
                      ? "text-[#00a67d] bg-[#e6f7f2]"
                      : "text-[#666666] hover:text-[#333333] hover:bg-[#f5f5f5]"
                  }`}
                  onClick={(e) => {
                    // If clicking the category link itself, navigate
                    setActiveDropdown(null)
                  }}
                >
                  {category.name}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[0.5rem] transition-transform duration-200 ${
                        activeDropdown === category.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown with subcategories */}
                {category.subcategories && category.subcategories.length > 0 && activeDropdown === category.id && (
                  <div
                    className="absolute top-full left-0 mt-0 min-w-[220px] bg-white rounded-lg shadow-xl border border-[#e5e5e5] py-2 z-[60] animate-in fade-in-0 slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleDropdownEnter(category.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Category header link */}
                    <Link
                      href={`/shop?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00a67d] hover:bg-[#e6f7f2] transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <FontAwesomeIcon icon={getIconDefinition(category.icon)} className="text-[0.6rem]" />
                      All {category.name}
                    </Link>
                    <div className="mx-3 border-t border-[#e5e5e5]" />
                    {/* Subcategory links */}
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
                        className="block px-4 py-2 text-sm text-[#555555] hover:text-[#00a67d] hover:bg-[#e6f7f2]/60 transition-colors cursor-pointer"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu toggle */}
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

      {/* Category sub-nav bar with scroll arrows */}
      {navCategories.length > 0 && (
        <div className="hidden lg:block border-b border-[#e5e5e5] bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
            {canScrollLeft && (
              <button
                className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fafafa] to-transparent z-10 flex items-center justify-start pl-1 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer"
                onClick={() => scrollSubNav("left")}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
              </button>
            )}

            <div
              ref={subNavScrollRef}
              className="flex items-center gap-6 overflow-x-auto py-2.5 text-sm scrollbar-none"
            >
              <Link
                href="/shop"
                className="shrink-0 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider"
              >
                All Templates
              </Link>
              <span className="shrink-0 text-[#e5e5e5]">|</span>
              {navCategories.map((category, idx) => (
                <React.Fragment key={category.id}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(category.name)}`}
                    className={`shrink-0 transition-colors cursor-pointer text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-[#999999] hover:text-[#00a67d]`}
                  >
                    <FontAwesomeIcon icon={getIconDefinition(category.icon)} className="text-[0.6rem]" />
                    {category.name}
                  </Link>
                  {idx < navCategories.length - 1 && (
                    <span className="shrink-0 text-[#e5e5e5]">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {canScrollRight && (
              <button
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fafafa] to-transparent z-10 flex items-center justify-end pr-1 text-[#999999] hover:text-[#00a67d] transition-colors cursor-pointer"
                onClick={() => scrollSubNav("right")}
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu with expandable categories */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e5e5e5] bg-white shadow-sm max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-2">
            {/* Shop All */}
            <Link
              href="/shop"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-lg bg-[#00a67d] text-white"
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
      <div className="flex items-center">
        <Link
          href={`/shop?category=${encodeURIComponent(category.name)}`}
          className="flex-1 flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg text-[#666666] bg-[#f5f5f5] hover:bg-[#e5e5e5]"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={getIconDefinition(category.icon)} className="text-[0.6rem]" />
          {category.name}
        </Link>
        {hasSubcategories && (
          <button
            className="ml-1 p-2.5 rounded-lg text-[#999999] hover:text-[#00a67d] hover:bg-[#e6f7f2] transition-colors cursor-pointer"
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
        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-[#e6f7f2] pl-3 py-1">
          <Link
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            className="block px-3 py-2 text-xs font-medium text-[#00a67d] hover:bg-[#e6f7f2] rounded-md transition-colors"
            onClick={onClose}
          >
            All {category.name}
          </Link>
          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}`}
              className="block px-3 py-2 text-xs text-[#666666] hover:text-[#00a67d] hover:bg-[#e6f7f2]/60 rounded-md transition-colors"
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
