"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn how to create an account, browse templates, and make your first purchase.",
    articles: [
      { title: "How to Create an EnarMart Account", slug: "create-account" },
      { title: "Browsing and Searching Templates", slug: "browsing-templates" },
      { title: "Making Your First Purchase", slug: "first-purchase" },
      { title: "Accessing Your Template Library", slug: "template-library" },
    ],
  },
  {
    title: "Using Your Templates",
    description: "Everything you need to know about editing and customizing your Canva templates.",
    articles: [
      { title: "How to Open a Template in Canva", slug: "open-in-canva" },
      { title: "Editing Text, Colors, and Fonts", slug: "editing-basics" },
      { title: "Replacing Images and Graphics", slug: "replacing-images" },
      { title: "Exporting Your Finished Design", slug: "exporting-design" },
      { title: "Canva Pro vs Free: What You Need", slug: "canva-pro-vs-free" },
    ],
  },
  {
    title: "Orders & Downloads",
    description: "Help with purchases, downloads, invoices, and order-related questions.",
    articles: [
      { title: "How to Download Your Template", slug: "download-template" },
      { title: "Can I Re-Download a Template?", slug: "redownload-template" },
      { title: "Where to Find My Invoice", slug: "find-invoice" },
      { title: "Payment Methods We Accept", slug: "payment-methods" },
    ],
  },
  {
    title: "Licensing & Usage",
    description: "Understand what you can and can't do with our templates under each license type.",
    articles: [
      { title: "Standard License Explained", slug: "standard-license" },
      { title: "Extended License: When You Need It", slug: "extended-license" },
      { title: "Can I Use Templates for Clients?", slug: "client-use" },
      { title: "Can I Sell Products Made with Templates?", slug: "sell-products" },
    ],
  },
  {
    title: "Account & Security",
    description: "Manage your account settings, password, and security preferences.",
    articles: [
      { title: "Resetting Your Password", slug: "reset-password" },
      { title: "Updating Your Email Address", slug: "update-email" },
      { title: "Deleting Your Account", slug: "delete-account" },
      { title: "Two-Factor Authentication", slug: "two-factor-auth" },
    ],
  },
  {
    title: "Troubleshooting",
    description: "Solutions for common issues like broken links, template errors, and compatibility problems.",
    articles: [
      { title: "Template Link Not Working", slug: "broken-link" },
      { title: "Canva Showing an Error Message", slug: "canva-error" },
      { title: "Template Looks Different Than Preview", slug: "different-preview" },
      { title: "Missing Fonts or Elements", slug: "missing-fonts" },
    ],
  },
]

const popularArticles = [
  "How to Open a Template in Canva",
  "Standard License Explained",
  "How to Download Your Template",
  "Canva Pro vs Free: What You Need",
  "Template Link Not Working",
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filteredCategories = searchQuery.trim()
    ? helpCategories.map((cat) => ({
        ...cat,
        articles: cat.articles.filter((a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.articles.length > 0)
    : helpCategories

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#f8f5f2] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Help Center
          </h1>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions, step-by-step guides, and everything you need to get the most out of your EnarMart templates.
          </p>
          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-[#e5e5e5] rounded-full text-sm placeholder:text-[#999999] focus:outline-none focus:border-[#00a67d] focus:ring-2 focus:ring-[#00a67d]/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-8 md:py-10 border-b border-[#e5e5e5]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[#999999] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Popular Articles
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularArticles.map((article) => (
              <span
                key={article}
                className="px-4 py-2 text-sm bg-[#f8f5f2] text-[#333333] rounded-full hover:bg-[#00a67d]/10 hover:text-[#00a67d] transition-colors cursor-pointer"
              >
                {article}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-8"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Browse by Category
          </h2>

          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                className="border border-[#e5e5e5] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.title ? null : category.title
                    )
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#fafafa] transition-colors cursor-pointer"
                >
                  <div>
                    <h3
                      className="text-base font-semibold text-[#333333]"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-sm text-[#666666] mt-1">{category.description}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#999999] shrink-0 ml-4 transition-transform duration-200 ${
                      expandedCategory === category.title ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedCategory === category.title && (
                  <div className="px-5 pb-5 border-t border-[#e5e5e5]">
                    <ul className="space-y-2 pt-4">
                      {category.articles.map((article) => (
                        <li key={article.slug}>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#00a67d] transition-colors group"
                          >
                            <svg
                              className="w-4 h-4 text-[#ccc] group-hover:text-[#00a67d] transition-colors shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && searchQuery.trim() && (
            <div className="text-center py-12">
              <p className="text-[#666666] mb-2">No articles found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-[#999999]">Try a different search term or <a href="/contact" className="text-[#00a67d] hover:underline">contact our support team</a>.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-12 md:py-16 bg-[#f8f5f2]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Still Need Help?
          </h2>
          <p className="text-[#666666] mb-6 max-w-lg mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00a67d] hover:bg-[#008f6b] text-white font-semibold rounded-full transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#e5e5e5] hover:border-[#00a67d]/30 text-[#333333] font-semibold rounded-full transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
