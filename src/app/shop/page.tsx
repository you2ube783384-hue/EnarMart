"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faDownload,
  faSliders,
  faXmark,
  faSortAmountDown,
  faFilter,
  faChevronDown,
  faChevronUp,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { getIconDefinition } from "@/lib/icon-helpers"

interface Product {
  id: string
  title: string
  description: string
  price: string
  category: string
  imageUrl: string
  viewUrl: string
  featured: boolean
  createdAt: string
}

interface Category {
  id: string
  name: string
  icon: string
  showInNav: boolean
  showInHero: boolean
  subcategoriesCount: number
}

const PRODUCTS_PER_PAGE = 24

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A to Z" },
  { value: "name-za", label: "Name: Z to A" },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialSearch = searchParams.get("search") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE)

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState("newest")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) setCategories(data)
      } catch {
        // Silently ignore
      }
    }
    fetchCategories()
  }, [])

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory) params.set("category", selectedCategory)
      if (searchQuery) params.set("search", searchQuery)
      const res = await fetch(`/api/products?${params.toString()}`)
      if (!res.ok) return
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      // Silently ignore
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE)
  }, [selectedCategory, searchQuery, sortBy, minPrice, maxPrice])

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let result = [...products]

    // Price filter
    if (minPrice) {
      result = result.filter((p) => parseFloat(p.price) >= parseFloat(minPrice))
    }
    if (maxPrice) {
      result = result.filter((p) => parseFloat(p.price) <= parseFloat(maxPrice))
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "price-low":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        break
      case "price-high":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        break
      case "name-az":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-za":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    return result
  }, [products, sortBy, minPrice, maxPrice])

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = displayCount < filteredProducts.length

  const handleCardClick = (product: Product) => {
    if (product.viewUrl) {
      window.open(product.viewUrl, "_blank", "noopener,noreferrer")
    }
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSearchQuery("")
    setSortBy("newest")
    setMinPrice("")
    setMaxPrice("")
  }

  const activeFilterCount = [
    selectedCategory,
    searchQuery,
    minPrice,
    maxPrice,
    sortBy !== "newest",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <div className="bg-[#f8f5f2] border-b border-[#e5e5e5]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
              {selectedCategory || "All Templates"}
            </h1>
            <p className="text-sm text-[#999999] mt-1">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategory
                ? `Browse our ${selectedCategory.toLowerCase()} collection`
                : "Browse all premium Canva templates"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {/* Filter bar */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Top row: search + sort + filter toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] text-xs" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-9 h-9 text-sm bg-[#f5f5f5] border-[#e5e5e5] rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <FontAwesomeIcon icon={faSortAmountDown} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] text-xs" />
                <select
                  className="pl-9 pr-8 h-9 text-sm bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#00a67d]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] text-[0.6rem] pointer-events-none" />
              </div>

              {/* Filter toggle (mobile) */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-1.5 h-9"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faSliders} className="text-xs" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 bg-[#00a67d] text-white text-[10px] px-1.5 py-0 min-w-[18px] h-[18px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 h-9 text-[#999999] hover:text-[#333333]"
                  onClick={clearFilters}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                  Clear
                </Button>
              )}
            </div>

            {/* Category + Price filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
                {/* Categories */}
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#999999] uppercase tracking-wider mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
                        !selectedCategory
                          ? "bg-[#00a67d] text-white border-[#00a67d]"
                          : "bg-white text-[#666666] border-[#e5e5e5] hover:border-[#00a67d]/40 hover:text-[#00a67d]"
                      }`}
                      onClick={() => setSelectedCategory("")}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          selectedCategory === cat.name
                            ? "bg-[#00a67d] text-white border-[#00a67d]"
                            : "bg-white text-[#666666] border-[#e5e5e5] hover:border-[#00a67d]/40 hover:text-[#00a67d]"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                      >
                        <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-[0.6rem]" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="shrink-0">
                  <p className="text-xs font-medium text-[#999999] uppercase tracking-wider mb-2">Price Range</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-20 h-8 text-sm bg-[#f5f5f5] border-[#e5e5e5] rounded-lg"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <span className="text-xs text-[#999999]">—</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-20 h-8 text-sm bg-[#f5f5f5] border-[#e5e5e5] rounded-lg"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-3 mb-5">
            <Badge className="text-xs bg-[#e6f7f2] text-[#00a67d] border-0 font-medium px-3 py-1 rounded-full">
              {filteredProducts.length} template{filteredProducts.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Skeleton className="aspect-[4/5] w-full rounded-xl" />
                  <div className="pt-2.5 space-y-1.5">
                    <Skeleton className="h-3.5 w-4/5" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="size-16 rounded-full bg-[#e6f7f2] flex items-center justify-center mx-auto mb-5">
                <FontAwesomeIcon icon={faEye} className="text-2xl text-[#00a67d]" />
              </div>
              <h3 className="text-lg font-semibold text-[#333333] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                No templates found
              </h3>
              <p className="text-sm text-[#999999] max-w-sm mx-auto">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No templates match your current filters. Try adjusting them."}
              </p>
              <Button
                variant="outline"
                className="mt-4 gap-1.5"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => handleCardClick(product)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] rounded-lg sm:rounded-xl">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg sm:rounded-xl" />
                      {product.featured && (
                        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#e67e22] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <div className="pt-2 sm:pt-2.5 px-0.5">
                      <h3 className="font-medium text-[13px] sm:text-sm text-[#333333] line-clamp-2 leading-snug group-hover:text-[#00a67d] transition-colors">
                        {product.title}
                      </h3>
                      <span className="block text-[15px] sm:text-lg font-bold text-[#222222] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        ${product.price}
                      </span>
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] sm:text-[11px] font-medium text-white bg-[#00a67d] px-2 py-0.5 rounded-full">
                        <FontAwesomeIcon icon={faDownload} className="text-[0.5rem]" />
                        Canva Template
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 rounded-full h-11 text-sm font-semibold border-[#00a67d] text-[#00a67d] hover:bg-[#00a67d] hover:text-white"
                    onClick={() => setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE)}
                  >
                    Load More Templates
                    <span className="ml-2 text-xs text-[#999999]">
                      ({filteredProducts.length - displayCount} remaining)
                    </span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin size-8 border-2 border-[#00a67d] border-t-transparent rounded-full" />
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
