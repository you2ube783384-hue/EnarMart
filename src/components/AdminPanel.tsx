"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPen,
  faTrash,
  faUpload,
  faXmark,
  faStar,
  faArrowUpRightFromSquare,
  faImage,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface AdminPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProductChange: () => void
}

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

export function AdminPanel({ open, onOpenChange, onProductChange }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (open) {
      fetchProducts()
    }
  }, [open, fetchProducts])

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
    if (!form.title || !form.description || !form.price || !form.category) {
      return
    }

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
      onProductChange()
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
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" })
      fetchProducts()
      onProductChange()
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl" style={{ fontFamily: "var(--font-poppins)" }}>
            <FontAwesomeIcon icon={faStar} className="text-sm" />
            Admin Panel
          </DialogTitle>
          <DialogDescription>
            Manage your digital products, add new ones, or edit existing listings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="products" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 mt-2 w-fit">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add">{editingId ? "Edit Product" : "Add Product"}</TabsTrigger>
          </TabsList>

          {/* Products List Tab */}
          <TabsContent value="products" className="flex-1 overflow-y-auto px-6 pb-6 mt-0">
            <div className="flex items-center justify-between mb-4 mt-4">
              <p className="text-sm text-[#000000]/50">
                {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
              <Button
                size="sm"
                className="gap-1.5 bg-[#000000] text-[#ffffff] hover:bg-[#000000]/80"
                onClick={() => {
                  resetForm()
                  const addTab = document.querySelector('[data-state="inactive"][value="add"]') as HTMLButtonElement
                  addTab?.click()
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                Add Product
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-lg bg-[#dff8f6] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <FontAwesomeIcon icon={faImage} className="text-3xl text-[#000000]/30 mb-3" />
                <p className="text-[#000000]/50">No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-[#dff8f6]/50 transition-colors"
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
                          <Badge className="bg-[#dff8f6] text-[#000000] text-[10px] border-0 shrink-0">
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
                        onClick={() => {
                          handleEdit(product)
                          const addTab = document.querySelector('[value="add"]') as HTMLButtonElement
                          addTab?.click()
                        }}
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
          <TabsContent value="add" className="flex-1 overflow-y-auto px-6 pb-6 mt-0">
            <div className="space-y-5 mt-4">
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
                      const productsTab = document.querySelector('[value="products"]') as HTMLButtonElement
                      productsTab?.click()
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
