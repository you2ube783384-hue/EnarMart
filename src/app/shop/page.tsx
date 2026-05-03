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
  faArrowRight,
  faStar,
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

interface Subcategory {
  id: string
  name: string
  categoryId: string
}

interface Category {
  id: string
  name: string
  icon: string
  showInNav: boolean
  showInHero: boolean
  subcategoriesCount: number
  subcategories: Subcategory[]
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
  const initialSubcategory = searchParams.get("subcategory") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE)

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState("newest")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Get subcategories for selected category
  const currentCategorySubcategories = categories.find(c => c.name === selectedCategory)?.subcategories || []

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
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, minPrice, maxPrice])

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let result = [...products]

    // Subcategory filter
    if (selectedSubcategory) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
        p.category.toLowerCase().includes(selectedSubcategory.toLowerCase())
      )
    }

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
  }, [products, sortBy, minPrice, maxPrice, selectedSubcategory])

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = displayCount < filteredProducts.length

  const handleCardClick = (product: Product) => {
    if (product.viewUrl) {
      window.open(product.viewUrl, "_blank", "noopener,noreferrer")
    }
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedSubcategory("")
    setSearchQuery("")
    setSortBy("newest")
    setMinPrice("")
    setMaxPrice("")
  }

  const handleCategorySelect = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory("")
      setSelectedSubcategory("")
    } else {
      setSelectedCategory(catName)
      setSelectedSubcategory("")
    }
  }

  const activeFilterCount = [
    selectedCategory,
    selectedSubcategory,
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
        <div className="bg-gradient-to-br from-[#f0fdf9] via-[#f8f5f2] to-[#e6f7f2] border-b border-[#e8e8ed]">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-8 md:py-10">
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a2e]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {selectedSubcategory || selectedCategory || "All Templates"}
            </h1>
            <p className="text-sm text-[#8e8ea0] mt-1.5">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedSubcategory
                ? `Browse ${selectedSubcategory} templates in ${selectedCategory}`
                : selectedCategory
                ? `Browse our ${selectedCategory.toLowerCase()} collection`
                : "Browse all premium Canva templates"}
            </p>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-8 md:py-10">
          {/* Filter bar */}
          <div className="flex flex-col gap-5 mb-8">
            {/* Top row: search + sort + filter toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FontAwesomeIcon icon={faFilter} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8ea0] text-xs" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-10 h-10 text-sm bg-[#f5f5f7] border-transparent rounded-xl focus:bg-white focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/15"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <FontAwesomeIcon icon={faSortAmountDown} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8ea0] text-xs" />
                <select
                  className="pl-10 pr-9 h-10 text-sm bg-[#f5f5f7] border border-transparent rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/15"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e8ea0] text-[0.5rem] pointer-events-none" />
              </div>

              {/* Filter toggle (mobile) */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-2 h-10 rounded-xl border-[#e8e8ed]"
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
                  className="gap-1.5 h-10 text-[#8e8ea0] hover:text-[#1a1a2e] rounded-xl"
                  onClick={clearFilters}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                  Clear
                </Button>
              )}
            </div>

            {/* Category + Subcategory + Price filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                {/* Categories with subcategories */}
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-[#8e8ea0] uppercase tracking-[0.15em] mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                        !selectedCategory
                          ? "bg-[#00a67d] text-white border-[#00a67d] shadow-md shadow-[#00a67d]/20"
                          : "bg-white text-[#555770] border-[#e8e8ed] hover:border-[#00a67d]/30 hover:text-[#00a67d]"
                      }`}
                      onClick={() => { setSelectedCategory(""); setSelectedSubcategory(""); }}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          selectedCategory === cat.name
                            ? "bg-[#00a67d] text-white border-[#00a67d] shadow-md shadow-[#00a67d]/20"
                            : "bg-white text-[#555770] border-[#e8e8ed] hover:border-[#00a67d]/30 hover:text-[#00a67d]"
                        }`}
                        onClick={() => handleCategorySelect(cat.name)}
                      >
                        <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-[0.6rem]" />
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Subcategories for selected category */}
                  {selectedCategory && currentCategorySubcategories.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[11px] font-bold text-[#8e8ea0] uppercase tracking-[0.15em] mb-3">
                        <FontAwesomeIcon icon={faChevronDown} className="mr-1.5 text-[0.5rem]" />
                        Subcategories
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`px-3.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                            !selectedSubcategory
                              ? "bg-[#f0fdf9] text-[#00a67d] border-[#00a67d]/30"
                              : "bg-white text-[#8e8ea0] border-[#e8e8ed] hover:border-[#00a67d]/30 hover:text-[#00a67d]"
                          }`}
                          onClick={() => setSelectedSubcategory("")}
                        >
                          All {selectedCategory}
                        </button>
                        {currentCategorySubcategories.map((sub) => (
                          <button
                            key={sub.id}
                            className={`px-3.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                              selectedSubcategory === sub.name
                                ? "bg-[#f0fdf9] text-[#00a67d] border-[#00a67d]/30"
                                : "bg-white text-[#8e8ea0] border-[#e8e8ed] hover:border-[#00a67d]/30 hover:text-[#00a67d]"
                            }`}
                            onClick={() => setSelectedSubcategory(selectedSubcategory === sub.name ? "" : sub.name)}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price range */}
                <div className="shrink-0">
                  <p className="text-[11px] font-bold text-[#8e8ea0] uppercase tracking-[0.15em] mb-3">Price Range</p>
                  <div className="flex items-center gap-2.5">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-24 h-9 text-sm bg-[#f5f5f7] border-transparent rounded-lg focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/15"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <span className="text-xs text-[#8e8ea0] font-medium">—</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-24 h-9 text-sm bg-[#f5f5f7] border-transparent rounded-lg focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/15"
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
          <div className="flex items-center gap-3 mb-6">
            <Badge className="text-xs bg-[#f0fdf9] text-[#00a67d] border border-[#e6f7f2] font-semibold px-3.5 py-1.5 rounded-full">
              {filteredProducts.length} template{filteredProducts.length !== 1 ? "s" : ""}
            </Badge>
            {selectedSubcategory && (
              <Badge className="text-xs bg-[#fff8e1] text-[#e67e22] border border-[#f5edda] font-semibold px-3.5 py-1.5 rounded-full">
                {selectedSubcategory}
              </Badge>
            )}
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                  <div className="pt-3 space-y-2 px-1">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <div className="size-20 rounded-2xl bg-[#f0fdf9] flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faEye} className="text-3xl text-[#00a67d]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1a1a2e] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                No templates found
              </h3>
              <p className="text-sm text-[#8e8ea0] max-w-sm mx-auto leading-relaxed">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No templates match your current filters. Try adjusting them."}
              </p>
              <Button
                variant="outline"
                className="mt-6 gap-2 rounded-xl border-[#00a67d] text-[#00a67d] hover:bg-[#00a67d] hover:text-white"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card group cursor-pointer bg-white rounded-2xl border border-[#f0f0f3] hover:border-[#00a67d]/20 overflow-hidden"
                    onClick={() => handleCardClick(product)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f8fa]">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.featured && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#e67e22] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#e67e22]/10">
                          <FontAwesomeIcon icon={faStar} className="text-[0.5rem]" />
                          Featured
                        </span>
                      )}
                      {/* Quick view overlay */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center shadow-lg">
                          <span className="text-xs font-bold text-[#1a1a2e] tracking-wide">View Template</span>
                        </div>
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-4 sm:p-5">
                      <h3
                        className="font-semibold text-[13px] sm:text-sm text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-[#00a67d] transition-colors"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {product.title}
                      </h3>
                      <p className="text-[11px] text-[#8e8ea0] mt-1.5 font-medium uppercase tracking-wider">
                        {product.category}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span
                          className="text-lg sm:text-xl font-extrabold text-[#1a1a2e]"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          ${product.price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00a67d] bg-[#f0fdf9] px-2.5 py-1 rounded-full border border-[#e6f7f2]">
                          <FontAwesomeIcon icon={faDownload} className="text-[0.45rem]" />
                          Canva
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-10 rounded-xl h-12 text-sm font-bold border-[#00a67d] text-[#00a67d] hover:bg-[#00a67d] hover:text-white hover:shadow-lg hover:shadow-[#00a67d]/20 transition-all duration-300"
                    onClick={() => setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE)}
                  >
                    Load More Templates
                    <span className="ml-2 text-xs opacity-60">
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
