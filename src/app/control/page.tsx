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
    <div className="min-h-screen flex items-center justify-center bg-[#dff8f6] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#ffffff] rounded-2xl shadow-lg border p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="size-10 rounded-lg bg-[#000000] flex items-center justify-center">
              <span className="text-[#ffffff] font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>DigiMarket</span>
          </div>

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-[#dff8f6] flex items-center justify-center">
              <FontAwesomeIcon icon={faLock} className="text-2xl text-[#000000]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
            Admin Login
          </h1>
          <p className="text-sm text-[#000000]/50 text-center mb-6">
            Enter your credentials to access the admin panel
          </p>

          {/* Error */}
          {error && (
            <div className="bg-[#000000]/5 border border-[#000000]/10 rounded-lg p-3 mb-4 text-sm text-[#000000]">
              {error}
            </div>
          )}

          {/* Form */}
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
              className="w-full gap-2 bg-[#000000] text-[#ffffff] hover:bg-[#000000]/80"
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

  const categories = ["Photos", "Graphics", "Templates", "Fonts", "3D", "Icons"]

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

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

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
    <div className="min-h-screen bg-[#dff8f6]">
      {/* Admin Header */}
      <header className="bg-[#000000] text-[#ffffff] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[#ffefb8] flex items-center justify-center">
                <span className="text-[#000000] font-bold text-xs">D</span>
              </div>
              <span className="font-bold text-sm" style={{ fontFamily: "var(--font-poppins)" }}>DigiMarket</span>
            </Link>
            <span className="text-[#ffffff]/30 mx-1">/</span>
            <span className="text-sm text-[#ffffff]/60 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faStar} className="text-[#ffefb8] text-xs" />
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
                    <Badge className="ml-2 bg-[#dff8f6] text-[#000000] text-[10px] border-0">
                      {products.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="add">
                    {editingId ? "Edit Product" : "Add Product"}
                  </TabsTrigger>
                </TabsList>

                <Button
                  size="sm"
                  className="gap-1.5 bg-[#000000] text-[#ffffff] hover:bg-[#000000]/80"
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
                    <div key={i} className="h-20 rounded-lg bg-[#dff8f6] animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <div className="size-16 rounded-full bg-[#ffefb8] flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faImage} className="text-2xl text-[#000000]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-poppins)" }}>No products yet</h3>
                  <p className="text-sm text-[#000000]/50 mb-4">Add your first product to get started</p>
                  <Button
                    className="gap-1.5 bg-[#000000] text-[#ffffff] hover:bg-[#000000]/80"
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
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-[#dff8f6]/30 transition-colors"
                    >
                      <div className="size-14 rounded-md overflow-hidden bg-[#dff8f6] shrink-0">
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
                            <Badge className="bg-[#ffefb8] text-[#000000] text-[10px] border-0 shrink-0">
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
                    <div className="relative size-32 rounded-lg border-2 border-dashed overflow-hidden bg-[#dff8f6] shrink-0">
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
                        {categories.map((cat) => (
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
      <div className="min-h-screen flex items-center justify-center bg-[#dff8f6]">
        <div className="flex items-center gap-2 text-[#000000]/50">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          <span className="text-sm">Checking session...</span>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />
}
