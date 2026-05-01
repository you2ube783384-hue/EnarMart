"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLock,
  faUser,
  faEye,
  faEyeSlash,
  faArrowRightToBracket,
  faRightFromBracket,
  faPlus,
  faPen,
  faTrash,
  faUpload,
  faXmark,
  faStar,
  faArrowUpRightFromSquare,
  faImage,
  faSpinner,
  faRefresh,
  faFolderOpen,
  faCopy,
  faArrowsRotate,
  faSearch,
  faCheck,
  faCamera,
  faPalette,
  faFileAlt,
  faFont,
  faCube,
  faIcons,
  faFolder,
  faChevronRight,
  faTag,
  faShapes,
  faObjectGroup,
  faPaintBrush,
  faPencilRuler,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIconDefinition, FA_ICON_MAP, FA_ICON_OPTIONS } from "@/lib/icon-helpers"

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface LibraryImage {
  filename: string
  url: string
  size: number
  sizeFormatted: string
  modifiedAt: string
  extension: string
}

interface CategoryItem {
  id: string
  name: string
  icon: string
  showInNav: boolean
  showInHero: boolean
  subcategoriesCount: number
  createdAt: string
  updatedAt: string
}

interface SubcategoryItem {
  id: string
  name: string
  categoryId: string
  category?: { name: string }
  createdAt: string
  updatedAt: string
}

// ─── Login Form ──────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (data.success) {
        onLogin()
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f7f2] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#ffffff] rounded-2xl shadow-lg border p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo.png"
              alt="DigiMarket"
              width={180}
              height={45}
              className="h-10 w-auto"
            />
          </div>

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-[#e6f7f2] flex items-center justify-center">
              <FontAwesomeIcon icon={faLock} className="text-2xl text-[#00a67d]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
            Admin Login
          </h1>
          <p className="text-sm text-[#000000]/50 text-center mb-6">
            Enter your credentials to access the admin panel
          </p>

          {error && (
            <div className="bg-[#000000]/5 border border-[#000000]/10 rounded-lg p-3 mb-4 text-sm text-[#000000]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]/40 text-sm" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="pl-9"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]/40 text-sm" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#000000]/40 hover:text-[#000000] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm" />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2 bg-[#00a67d] text-white hover:bg-[#008f6b]"
              disabled={loading || !username || !password}
            >
              <FontAwesomeIcon
                icon={loading ? faSpinner : faArrowRightToBracket}
                className={`text-sm ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-[#000000]/40 mt-4">
          <Link href="/" className="hover:text-[#000000] transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  )
}

// ─── Image Library Tab ───────────────────────────────────────────────────────

function ImageLibraryTab() {
  const [images, setImages] = useState<LibraryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [replacing, setReplacing] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<LibraryImage | null>(null)
  const replaceInputRef = useRef<HTMLInputElement>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/library")
      const data = await res.json()
      setImages(data.images || [])
    } catch (error) {
      console.error("Failed to fetch images:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? This cannot be undone.`)) return

    setDeleting(filename)
    try {
      const res = await fetch(`/api/library?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.filename !== filename))
        if (selectedImage?.filename === filename) {
          setSelectedImage(null)
        }
      }
    } catch (error) {
      console.error("Failed to delete image:", error)
    } finally {
      setDeleting(null)
    }
  }

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>, filename: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    setReplacing(filename)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("filename", filename)

      const res = await fetch("/api/library", {
        method: "PUT",
        body: formData,
      })

      if (res.ok) {
        // Refresh the library to get updated file info
        fetchImages()
      }
    } catch (error) {
      console.error("Failed to replace image:", error)
    } finally {
      setReplacing(null)
      // Reset the file input
      if (replaceInputRef.current) {
        replaceInputRef.current.value = ""
      }
    }
  }

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    }
  }

  const filteredImages = images.filter((img) =>
    img.filename.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
            Image Library
          </h3>
          <p className="text-sm text-[#000000]/50">
            Manage all uploaded images in /public/uploads
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]/40 text-xs" />
            <Input
              placeholder="Search files..."
              className="pl-8 h-9 text-sm w-full sm:w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-9"
            onClick={fetchImages}
          >
            <FontAwesomeIcon icon={faRefresh} className="text-xs" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-[#e6f7f2] px-3 py-1.5">
          <FontAwesomeIcon icon={faImage} className="text-xs text-[#000000]/60" />
          <span className="text-xs font-medium">{images.length} image{images.length !== 1 ? "s" : ""}</span>
        </div>
        {searchQuery && (
          <div className="flex items-center gap-2 rounded-lg bg-[#fff8e1] px-3 py-1.5">
            <FontAwesomeIcon icon={faSearch} className="text-xs text-[#000000]/60" />
            <span className="text-xs font-medium">{filteredImages.length} result{filteredImages.length !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Hidden file input for replace */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (selectedImage) {
            handleReplace(e, selectedImage.filename)
          }
        }}
      />

      <div className="flex gap-5">
        {/* Image Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-[#e6f7f2] animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16">
              <div className="size-16 rounded-full bg-[#fff8e1] flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faFolderOpen} className="text-2xl text-[#000000]" />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-poppins)" }}>No images yet</h3>
              <p className="text-sm text-[#000000]/50">Upload images when adding products — they&apos;ll appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredImages.map((img) => (
                <div
                  key={img.filename}
                  className={`group relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                    selectedImage?.filename === img.filename
                      ? "border-[#000000] shadow-md"
                      : "border-transparent hover:border-[#000000]/20"
                  }`}
                  onClick={() => setSelectedImage(selectedImage?.filename === img.filename ? null : img)}
                >
                  <Image
                    src={img.url}
                    alt={img.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#000000]/0 group-hover:bg-[#000000]/20 transition-colors" />

                  {/* Extension badge */}
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-[9px] font-bold uppercase bg-[#ffffff]/90 text-[#000000] px-1.5 py-0.5 rounded">
                      {img.extension}
                    </span>
                  </div>

                  {/* Selected check */}
                  {selectedImage?.filename === img.filename && (
                    <div className="absolute top-1.5 right-1.5 size-5 rounded-full bg-[#000000] flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheck} className="text-[#ffffff] text-[0.5rem]" />
                    </div>
                  )}

                  {/* Filename at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#000000]/60 px-1.5 py-1">
                    <p className="text-[9px] text-[#ffffff] truncate">{img.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedImage && (
          <div className="w-72 shrink-0 border-l pl-5 hidden md:block">
            <div className="sticky top-4 space-y-4">
              {/* Preview */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#e6f7f2] border">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.filename}
                  fill
                  className="object-cover"
                  sizes="288px"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm break-all" style={{ fontFamily: "var(--font-poppins)" }}>
                  {selectedImage.filename}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md bg-[#e6f7f2] px-2 py-1.5">
                    <span className="text-[#000000]/50 block">Size</span>
                    <span className="font-medium">{selectedImage.sizeFormatted}</span>
                  </div>
                  <div className="rounded-md bg-[#e6f7f2] px-2 py-1.5">
                    <span className="text-[#000000]/50 block">Type</span>
                    <span className="font-medium uppercase">{selectedImage.extension}</span>
                  </div>
                </div>
                <div className="rounded-md bg-[#e6f7f2] px-2 py-1.5 text-xs">
                  <span className="text-[#000000]/50 block">Modified</span>
                  <span className="font-medium">{new Date(selectedImage.modifiedAt).toLocaleDateString()} {new Date(selectedImage.modifiedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="rounded-md bg-[#e6f7f2] px-2 py-1.5 text-xs">
                  <span className="text-[#000000]/50 block">URL</span>
                  <span className="font-medium break-all">{selectedImage.url}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-xs justify-center"
                  onClick={() => handleCopyUrl(selectedImage.url)}
                >
                  <FontAwesomeIcon
                    icon={copiedUrl === selectedImage.url ? faCheck : faCopy}
                    className="text-[0.65rem]"
                  />
                  {copiedUrl === selectedImage.url ? "Copied!" : "Copy URL"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-xs justify-center"
                  onClick={() => replaceInputRef.current?.click()}
                  disabled={replacing === selectedImage.filename}
                >
                  <FontAwesomeIcon
                    icon={replacing === selectedImage.filename ? faSpinner : faArrowsRotate}
                    className={`text-[0.65rem] ${replacing === selectedImage.filename ? "animate-spin" : ""}`}
                  />
                  {replacing === selectedImage.filename ? "Replacing..." : "Replace Image"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-xs justify-center text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20"
                  onClick={() => handleDelete(selectedImage.filename)}
                  disabled={deleting === selectedImage.filename}
                >
                  <FontAwesomeIcon
                    icon={deleting === selectedImage.filename ? faSpinner : faTrash}
                    className={`text-[0.65rem] ${deleting === selectedImage.filename ? "animate-spin" : ""}`}
                  />
                  {deleting === selectedImage.filename ? "Deleting..." : "Delete Image"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile detail bar (shown when image selected on small screens) */}
      {selectedImage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t shadow-lg p-3 z-50">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-md overflow-hidden bg-[#e6f7f2] shrink-0">
              <Image
                src={selectedImage.url}
                alt={selectedImage.filename}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{selectedImage.filename}</p>
              <p className="text-[10px] text-[#000000]/50">{selectedImage.sizeFormatted} · {selectedImage.extension.toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => handleCopyUrl(selectedImage.url)}
              >
                <FontAwesomeIcon
                  icon={copiedUrl === selectedImage.url ? faCheck : faCopy}
                  className="text-xs"
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => replaceInputRef.current?.click()}
                disabled={replacing === selectedImage.filename}
              >
                <FontAwesomeIcon
                  icon={replacing === selectedImage.filename ? faSpinner : faArrowsRotate}
                  className={`text-xs ${replacing === selectedImage.filename ? "animate-spin" : ""}`}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 text-destructive hover:text-destructive"
                onClick={() => handleDelete(selectedImage.filename)}
                disabled={deleting === selectedImage.filename}
              >
                <FontAwesomeIcon
                  icon={deleting === selectedImage.filename ? faSpinner : faTrash}
                  className={`text-xs ${deleting === selectedImage.filename ? "animate-spin" : ""}`}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => setSelectedImage(null)}
              >
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Icon helpers are imported from @/lib/icon-helpers ─────────────────────────

// ─── Categories Tab ───────────────────────────────────────────────────────────

function CategoriesTab() {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [catDeleting, setCatDeleting] = useState<string | null>(null)
  const [subDeleting, setSubDeleting] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Category form state
  const [showCatForm, setShowCatForm] = useState(false)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [catForm, setCatForm] = useState({ name: "", icon: "faFolder", showInNav: true, showInHero: true })

  // Subcategory form state
  const [showSubForm, setShowSubForm] = useState(false)
  const [editingSubId, setEditingSubId] = useState<string | null>(null)
  const [subForm, setSubForm] = useState({ name: "" })

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSubcategories = useCallback(async (categoryId: string) => {
    try {
      const res = await fetch(`/api/subcategories?categoryId=${categoryId}`)
      const data = await res.json()
      setSubcategories(data)
    } catch (error) {
      console.error("Failed to fetch subcategories:", error)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory.id)
    } else {
      setSubcategories([])
    }
  }, [selectedCategory, fetchSubcategories])

  // ─── Category CRUD ────────────────────────────────────────────────────────────

  const handleCatSubmit = async () => {
    if (!catForm.name) return
    setSaving(true)
    try {
      if (editingCatId) {
        await fetch(`/api/categories/${editingCatId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(catForm),
        })
      } else {
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(catForm),
        })
      }
      resetCatForm()
      fetchCategories()
    } catch (error) {
      console.error("Failed to save category:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleCatEdit = (cat: CategoryItem) => {
    setEditingCatId(cat.id)
    setCatForm({ name: cat.name, icon: cat.icon, showInNav: cat.showInNav, showInHero: cat.showInHero })
    setShowCatForm(true)
  }

  const handleCatToggle = async (id: string, field: "showInNav" | "showInHero", value: boolean) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
      fetchCategories()
    } catch (error) {
      console.error(`Failed to toggle ${field}:`, error)
    }
  }

  const handleCatDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? All its subcategories will also be deleted.")) return
    setCatDeleting(id)
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" })
      if (selectedCategory?.id === id) {
        setSelectedCategory(null)
      }
      fetchCategories()
    } catch (error) {
      console.error("Failed to delete category:", error)
    } finally {
      setCatDeleting(null)
    }
  }

  const resetCatForm = () => {
    setCatForm({ name: "", icon: "faFolder", showInNav: true, showInHero: true })
    setEditingCatId(null)
    setShowCatForm(false)
  }

  // ─── Subcategory CRUD ─────────────────────────────────────────────────────────

  const handleSubSubmit = async () => {
    if (!subForm.name || !selectedCategory) return
    setSaving(true)
    try {
      if (editingSubId) {
        await fetch(`/api/subcategories/${editingSubId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: subForm.name }),
        })
      } else {
        await fetch("/api/subcategories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: subForm.name, categoryId: selectedCategory.id }),
        })
      }
      resetSubForm()
      fetchSubcategories(selectedCategory.id)
      fetchCategories()
    } catch (error) {
      console.error("Failed to save subcategory:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleSubEdit = (sub: SubcategoryItem) => {
    setEditingSubId(sub.id)
    setSubForm({ name: sub.name })
    setShowSubForm(true)
  }

  const handleSubDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return
    setSubDeleting(id)
    try {
      await fetch(`/api/subcategories/${id}`, { method: "DELETE" })
      if (selectedCategory) {
        fetchSubcategories(selectedCategory.id)
        fetchCategories()
      }
    } catch (error) {
      console.error("Failed to delete subcategory:", error)
    } finally {
      setSubDeleting(null)
    }
  }

  const resetSubForm = () => {
    setSubForm({ name: "" })
    setEditingSubId(null)
    setShowSubForm(false)
  }

  return (
    <div className="p-6 mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
            Categories & Subcategories
          </h3>
          <p className="text-sm text-[#000000]/50">
            Manage product categories and their subcategories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-9"
            onClick={fetchCategories}
          >
            <FontAwesomeIcon icon={faRefresh} className="text-xs" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b] h-9"
            onClick={() => {
              resetCatForm()
              setShowCatForm(true)
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2 rounded-lg bg-[#e6f7f2] px-3 py-1.5">
          <FontAwesomeIcon icon={faFolder} className="text-xs text-[#00a67d]" />
          <span className="text-xs font-medium">{categories.length} categor{categories.length !== 1 ? "ies" : "y"}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#fff8e1] px-3 py-1.5">
          <FontAwesomeIcon icon={faTag} className="text-xs text-[#e67e22]" />
          <span className="text-xs font-medium">{subcategories.length} subcategor{subcategories.length !== 1 ? "ies" : "y"}</span>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Left: Categories list */}
        <div className="flex-1 min-w-0">
          {/* Add/Edit Category Form (inline) */}
          {showCatForm && (
            <div className="mb-4 p-4 rounded-lg border bg-[#e6f7f2]/50 space-y-3">
              <h4 className="text-sm font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
                {editingCatId ? "Edit Category" : "Add Category"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Name *</Label>
                  <Input
                    placeholder="e.g., Photos"
                    value={catForm.name}
                    onChange={(e) => setCatForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Icon</Label>
                  <Select
                    value={catForm.icon}
                    onValueChange={(value) => setCatForm((prev) => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {FA_ICON_OPTIONS.map((iconKey) => (
                        <SelectItem key={iconKey} value={iconKey}>
                          <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={getIconDefinition(iconKey)} className="text-xs" />
                            {FA_ICON_MAP[iconKey]}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Visibility toggles */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-md border bg-white">
                  <Switch
                    id="cat-show-nav"
                    checked={catForm.showInNav}
                    onCheckedChange={(checked) => setCatForm((prev) => ({ ...prev, showInNav: checked }))}
                    className="data-[state=checked]:bg-[#00a67d]"
                  />
                  <Label htmlFor="cat-show-nav" className="text-xs cursor-pointer flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEye} className="text-[0.6rem] text-[#00a67d]" />
                    Show in Navbar
                  </Label>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-md border bg-white">
                  <Switch
                    id="cat-show-hero"
                    checked={catForm.showInHero}
                    onCheckedChange={(checked) => setCatForm((prev) => ({ ...prev, showInHero: checked }))}
                    className="data-[state=checked]:bg-[#00a67d]"
                  />
                  <Label htmlFor="cat-show-hero" className="text-xs cursor-pointer flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEye} className="text-[0.6rem] text-[#00a67d]" />
                    Show in Hero Section
                  </Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b] h-8 text-xs"
                  onClick={handleCatSubmit}
                  disabled={saving || !catForm.name}
                >
                  <FontAwesomeIcon icon={saving ? faSpinner : faCheck} className={`text-[0.65rem] ${saving ? "animate-spin" : ""}`} />
                  {editingCatId ? "Update" : "Create"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={resetCatForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-[#e6f7f2] animate-pulse" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="size-16 rounded-full bg-[#fff8e1] flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faFolder} className="text-2xl text-[#000000]" />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-poppins)" }}>No categories yet</h3>
              <p className="text-sm text-[#000000]/50 mb-4">Create your first category to organize products</p>
              <Button
                className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b]"
                onClick={() => {
                  resetCatForm()
                  setShowCatForm(true)
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                Add Category
              </Button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCategory?.id === cat.id
                      ? "bg-[#e6f7f2] border-[#00a67d]/30"
                      : "hover:bg-[#e6f7f2]/30"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory?.id === cat.id ? null : cat)}
                >
                  <div className="size-10 rounded-md flex items-center justify-center bg-[#e6f7f2] shrink-0">
                    <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="text-[#00a67d]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate" style={{ fontFamily: "var(--font-poppins)" }}>{cat.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px] py-0 border-[#000000]/20 text-[#000000]/60">
                        <FontAwesomeIcon icon={getIconDefinition(cat.icon)} className="mr-1 text-[0.5rem]" />
                        {FA_ICON_MAP[cat.icon] || cat.icon}
                      </Badge>
                      <span className="text-[10px] text-[#000000]/50">
                        {cat.subcategoriesCount} subcategor{cat.subcategoriesCount !== 1 ? "ies" : "y"}
                      </span>
                    </div>
                    {/* Visibility badges */}
                    <div className="flex items-center gap-2 mt-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          cat.showInNav
                            ? "bg-[#e6f7f2] border-[#00a67d]/30 text-[#00a67d]"
                            : "bg-[#f5f5f5] border-[#e0e0e0] text-[#999999] line-through"
                        }`}
                        onClick={() => handleCatToggle(cat.id, "showInNav", !cat.showInNav)}
                      >
                        <FontAwesomeIcon icon={faEye} className="text-[0.5rem]" />
                        Nav
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          cat.showInHero
                            ? "bg-[#e6f7f2] border-[#00a67d]/30 text-[#00a67d]"
                            : "bg-[#f5f5f5] border-[#e0e0e0] text-[#999999] line-through"
                        }`}
                        onClick={() => handleCatToggle(cat.id, "showInHero", !cat.showInHero)}
                      >
                        <FontAwesomeIcon icon={faEye} className="text-[0.5rem]" />
                        Hero
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => handleCatEdit(cat)}
                    >
                      <FontAwesomeIcon icon={faPen} className="text-xs" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => handleCatDelete(cat.id)}
                      disabled={catDeleting === cat.id}
                    >
                      <FontAwesomeIcon
                        icon={catDeleting === cat.id ? faSpinner : faTrash}
                        className={`text-xs ${catDeleting === cat.id ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`text-[#000000]/30 text-xs transition-transform ${
                      selectedCategory?.id === cat.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Subcategories panel */}
        {selectedCategory && (
          <div className="w-80 shrink-0 border-l pl-5 hidden md:block">
            <div className="sticky top-4 space-y-4">
              {/* Category header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-md flex items-center justify-center bg-[#e6f7f2]">
                    <FontAwesomeIcon icon={getIconDefinition(selectedCategory.icon)} className="text-sm text-[#00a67d]" />
                  </div>
                  <h4 className="font-semibold text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                    {selectedCategory.name}
                  </h4>
                </div>
                <p className="text-xs text-[#000000]/50">
                  Subcategories for {selectedCategory.name}
                </p>
              </div>

              {/* Add Subcategory button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-1.5 text-xs"
                onClick={() => {
                  resetSubForm()
                  setShowSubForm(true)
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="text-[0.65rem]" />
                Add Subcategory
              </Button>

              {/* Add/Edit Subcategory Form */}
              {showSubForm && (
                <div className="p-3 rounded-lg border bg-[#fff8e1]/50 space-y-2">
                  <Label className="text-xs">{editingSubId ? "Edit Subcategory" : "New Subcategory"}</Label>
                  <Input
                    placeholder="e.g., Nature Photography"
                    value={subForm.name}
                    onChange={(e) => setSubForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-8 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b] h-7 text-xs"
                      onClick={handleSubSubmit}
                      disabled={saving || !subForm.name}
                    >
                      <FontAwesomeIcon icon={saving ? faSpinner : faCheck} className={`text-[0.6rem] ${saving ? "animate-spin" : ""}`} />
                      {editingSubId ? "Update" : "Add"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={resetSubForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Subcategories list */}
              <div className="space-y-1.5 max-h-[calc(100vh-420px)] overflow-y-auto">
                {subcategories.length === 0 ? (
                  <div className="text-center py-8">
                    <FontAwesomeIcon icon={faTag} className="text-lg text-[#000000]/20 mb-2" />
                    <p className="text-xs text-[#000000]/40">No subcategories yet</p>
                  </div>
                ) : (
                  subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-2 p-2.5 rounded-md border hover:bg-[#e6f7f2]/30 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTag} className="text-[0.6rem] text-[#000000]/30" />
                      <span className="flex-1 text-sm truncate">{sub.name}</span>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-7"
                          onClick={() => handleSubEdit(sub)}
                        >
                          <FontAwesomeIcon icon={faPen} className="text-[0.6rem]" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-7 text-destructive hover:text-destructive"
                          onClick={() => handleSubDelete(sub.id)}
                          disabled={subDeleting === sub.id}
                        >
                          <FontAwesomeIcon
                            icon={subDeleting === sub.id ? faSpinner : faTrash}
                            className={`text-[0.6rem] ${subDeleting === sub.id ? "animate-spin" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Subcategories section (shown below on small screens) */}
      {selectedCategory && (
        <div className="md:hidden mt-5 border-t pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={getIconDefinition(selectedCategory.icon)} className="text-sm text-[#00a67d]" />
              <h4 className="font-semibold text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                {selectedCategory.name} — Subcategories
              </h4>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-8"
              onClick={() => {
                resetSubForm()
                setShowSubForm(true)
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="text-[0.65rem]" />
              Add
            </Button>
          </div>

          {showSubForm && (
            <div className="p-3 rounded-lg border bg-[#fff8e1]/50 space-y-2">
              <Input
                placeholder="Subcategory name"
                value={subForm.name}
                onChange={(e) => setSubForm((prev) => ({ ...prev, name: e.target.value }))}
                className="h-8 text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b] h-7 text-xs"
                  onClick={handleSubSubmit}
                  disabled={saving || !subForm.name}
                >
                  {editingSubId ? "Update" : "Add"}
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={resetSubForm}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {subcategories.length === 0 ? (
            <p className="text-xs text-[#000000]/40 text-center py-4">No subcategories yet</p>
          ) : (
            <div className="space-y-1.5">
              {subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-2 p-2.5 rounded-md border hover:bg-[#e6f7f2]/30 transition-colors"
                >
                  <FontAwesomeIcon icon={faTag} className="text-[0.6rem] text-[#000000]/30" />
                  <span className="flex-1 text-sm truncate">{sub.name}</span>
                  <Button size="icon" variant="ghost" className="size-7" onClick={() => handleSubEdit(sub)}>
                    <FontAwesomeIcon icon={faPen} className="text-[0.6rem]" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 text-destructive hover:text-destructive"
                    onClick={() => handleSubDelete(sub.id)}
                    disabled={subDeleting === sub.id}
                  >
                    <FontAwesomeIcon icon={subDeleting === sub.id ? faSpinner : faTrash} className="text-[0.6rem]" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Admin Dashboard ─────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Graphics",
    imageUrl: "",
    viewUrl: "",
    featured: false,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [activeTab, setActiveTab] = useState("products")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dbCategories, setDbCategories] = useState<string[]>(["Photos", "Graphics", "Templates", "Fonts", "3D", "Icons"])

  const emptyForm = {
    title: "",
    description: "",
    price: "",
    category: "Graphics",
    imageUrl: "",
    viewUrl: "",
    featured: false,
  }

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDbCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const catNames = data.map((cat: CategoryItem) => cat.name)
        setDbCategories(catNames)
        // Update form default if current category not in list
        if (form.category && !catNames.includes(form.category)) {
          setForm((prev) => ({ ...prev, category: catNames[0] || "" }))
        }
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }, [form.category])

  useEffect(() => {
    fetchProducts()
    fetchDbCategories()
  }, [fetchProducts, fetchDbCategories])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.url) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }))
        setImagePreview(data.url)
      }
    } catch (error) {
      console.error("Failed to upload image:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price || !form.category) return

    setSaving(true)
    try {
      if (editingId) {
        await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      }
      resetForm()
      fetchProducts()
      setActiveTab("products")
    } catch (error) {
      console.error("Failed to save product:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      viewUrl: product.viewUrl,
      featured: product.featured,
    })
    setImagePreview(product.imageUrl)
    setActiveTab("add")
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" })
      fetchProducts()
    } catch (error) {
      console.error("Failed to delete product:", error)
    } finally {
      setDeleting(null)
    }
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImagePreview("")
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    onLogout()
  }

  return (
    <div className="min-h-screen bg-[#e6f7f2]">
      {/* Admin Header */}
      <header className="bg-[#000000] text-[#ffffff] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DigiMarket"
                width={110}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <span className="text-[#ffffff]/30 mx-1">/</span>
            <span className="text-sm text-[#ffffff]/60 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faStar} className="text-[#00a67d] text-xs" />
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-[#ffffff]/60 hover:text-[#ffffff] hover:bg-[#ffffff]/10 text-xs gap-1.5">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[0.6rem]" />
                View Store
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#ffffff]/60 hover:text-[#ffffff] hover:bg-[#ffffff]/10 text-xs gap-1.5"
              onClick={fetchProducts}
            >
              <FontAwesomeIcon icon={faRefresh} className="text-[0.6rem]" />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#ffffff]/60 hover:text-[#ffffff] hover:bg-[#ffffff]/10 text-xs gap-1.5"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="text-[0.6rem]" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-[#ffffff] rounded-xl border shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6 pt-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="products">
                    Products
                    <Badge className="ml-2 bg-[#e6f7f2] text-[#333333] text-[10px] border-0">
                      {products.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="add">
                    {editingId ? "Edit Product" : "Add Product"}
                  </TabsTrigger>
                  <TabsTrigger value="categories">
                    <FontAwesomeIcon icon={faFolder} className="mr-1.5 text-xs" />
                    Categories
                  </TabsTrigger>
                  <TabsTrigger value="library">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1.5 text-xs" />
                    Library
                  </TabsTrigger>
                </TabsList>

                <Button
                  size="sm"
                  className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b]"
                  onClick={() => {
                    resetForm()
                    setActiveTab("add")
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Products List Tab */}
            <TabsContent value="products" className="p-6 mt-0">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-20 rounded-lg bg-[#e6f7f2] animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="size-16 rounded-full bg-[#fff8e1] flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faImage} className="text-2xl text-[#000000]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-poppins)" }}>No products yet</h3>
                  <p className="text-sm text-[#000000]/50 mb-4">Add your first product to get started</p>
                  <Button
                    className="gap-1.5 bg-[#00a67d] text-white hover:bg-[#008f6b]"
                    onClick={() => {
                      resetForm()
                      setActiveTab("add")
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                    Add Product
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-[#e6f7f2]/30 transition-colors"
                    >
                      <div className="size-14 rounded-md overflow-hidden bg-[#e6f7f2] shrink-0">
                        {product.imageUrl && (
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={56}
                            height={56}
                            className="size-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate" style={{ fontFamily: "var(--font-poppins)" }}>{product.title}</h4>
                          {product.featured && (
                            <Badge className="bg-[#fff8e1] text-[#e67e22] text-[10px] border-0 shrink-0">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[10px] py-0 border-[#000000]/20 text-[#000000]/60">
                            {product.category}
                          </Badge>
                          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>${product.price}</span>
                          {product.viewUrl && (
                            <span className="text-[10px] text-[#000000]/50 flex items-center gap-0.5">
                              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[0.5rem]" />
                              Linked
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => handleEdit(product)}
                        >
                          <FontAwesomeIcon icon={faPen} className="text-xs" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                        >
                          <FontAwesomeIcon
                            icon={deleting === product.id ? faSpinner : faTrash}
                            className={`text-xs ${deleting === product.id ? "animate-spin" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Add/Edit Product Tab */}
            <TabsContent value="add" className="p-6 mt-0">
              <div className="max-w-2xl space-y-5">
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
                  {editingId ? "Edit Product" : "Add New Product"}
                </h3>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="flex gap-4 items-start">
                    <div className="relative size-32 rounded-lg border-2 border-dashed overflow-hidden bg-[#e6f7f2] shrink-0">
                      {imagePreview || form.imageUrl ? (
                        <>
                          <Image
                            src={imagePreview || form.imageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            className="absolute top-1 right-1 size-5 rounded-full bg-[#000000]/60 text-[#ffffff] flex items-center justify-center hover:bg-[#000000]/80 transition-colors"
                            onClick={() => {
                              setForm((prev) => ({ ...prev, imageUrl: "" }))
                              setImagePreview("")
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} className="text-xs" />
                          </button>
                        </>
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center text-[#000000]/30">
                          <FontAwesomeIcon icon={faImage} className="text-xl mb-1" />
                          <span className="text-[10px]">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <FontAwesomeIcon
                          icon={uploading ? faSpinner : faUpload}
                          className={`text-sm ${uploading ? "animate-spin" : ""}`}
                        />
                        {uploading ? "Uploading..." : "Upload Image"}
                      </Button>
                      <p className="text-xs text-[#000000]/50">
                        Or enter an image URL below
                      </p>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={form.imageUrl}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                          setImagePreview(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern Sans Serif Font Family"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product..."
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#000000]/50 text-sm">$</span>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="29.99"
                        className="pl-7"
                        value={form.price}
                        onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {dbCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* View Now URL */}
                <div className="space-y-2">
                  <Label htmlFor="viewUrl" className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                    View Now URL (Supaprofile Checkout)
                  </Label>
                  <Input
                    id="viewUrl"
                    placeholder="https://supaprofile.com/checkout/..."
                    value={form.viewUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, viewUrl: e.target.value }))}
                  />
                  <p className="text-xs text-[#000000]/50">
                    This URL will open when users click &quot;View Now&quot; on your product card
                  </p>
                </div>

                {/* Featured toggle */}
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label className="text-sm font-medium">Featured Product</Label>
                    <p className="text-xs text-[#000000]/50">Featured products appear with a badge</p>
                  </div>
                  <Switch
                    checked={form.featured}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, featured: checked }))}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 gap-2 bg-[#000000] text-[#ffffff] hover:bg-[#000000]/80"
                    onClick={handleSubmit}
                    disabled={saving || !form.title || !form.description || !form.price}
                  >
                    <FontAwesomeIcon
                      icon={saving ? faSpinner : faPlus}
                      className={`text-sm ${saving ? "animate-spin" : ""}`}
                    />
                    {editingId ? "Update Product" : "Add Product"}
                  </Button>
                  {editingId && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm()
                        setActiveTab("products")
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="mt-0">
              <CategoriesTab />
            </TabsContent>

            {/* Library Tab */}
            <TabsContent value="library" className="mt-0">
              <ImageLibraryTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// ─── Control Page (main export) ──────────────────────────────────────────────

export default function ControlPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check")
        if (res.ok) {
          setAuthenticated(true)
        }
      } catch {
        // Not authenticated
      } finally {
        setChecking(false)
      }
    }
    checkAuth()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e6f7f2]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-full border-[3px] border-[#e5e5e5]" />
            <div className="absolute inset-0 size-10 rounded-full border-[3px] border-transparent border-t-[#00a67d] animate-spin" />
          </div>
          <span className="text-sm text-[#999999]">Checking session...</span>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />
}
