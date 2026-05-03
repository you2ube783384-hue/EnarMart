"use client"

import React, { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const contactMethods = [
  {
    title: "Email Support",
    description: "Reach out to our support team for any questions about orders, templates, or account issues.",
    detail: "support@enarmart.com",
    action: "mailto:support@enarmart.com",
    icon: "✉️",
  },
  {
    title: "Sales & Licensing",
    description: "For bulk purchases, custom licensing, or business partnerships.",
    detail: "sales@enarmart.com",
    action: "mailto:sales@enarmart.com",
    icon: "📋",
  },
  {
    title: "Legal & Privacy",
    description: "Questions about our terms, privacy policy, or intellectual property.",
    detail: "legal@enarmart.com",
    action: "mailto:legal@enarmart.com",
    icon: "⚖️",
  },
]

const faqLinks = [
  { question: "How do I access my purchased template?", href: "/faq" },
  { question: "Can I get a refund on a digital template?", href: "/refund" },
  { question: "What's the difference between Standard and Extended License?", href: "/license" },
  { question: "Do I need Canva Pro to use your templates?", href: "/faq" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send the form data to an API
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0fdf9] via-[#f8f5f2] to-[#e6f7f2] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Contact Us
          </h1>
          <p className="text-[#555770] text-base md:text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We&apos;d love to hear from you. Our team typically responds within 24-48 hours.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.action}
                className="p-6 rounded-xl border border-[#e8e8ed] hover:border-[#00a67d]/30 hover:shadow-sm transition-all duration-200 block group"
              >
                <span className="text-3xl mb-4 block">{method.icon}</span>
                <h3
                  className="text-base font-semibold text-[#1a1a2e] mb-2"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {method.title}
                </h3>
                <p className="text-sm text-[#555770] mb-3 leading-relaxed">{method.description}</p>
                <p className="text-sm text-[#00a67d] font-medium group-hover:underline">{method.detail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + FAQ Links */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#f0fdf9] via-[#f8f5f2] to-[#e6f7f2]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-6"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-white rounded-xl p-8 border border-[#00a67d]/20 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00a67d]/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#00a67d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-semibold text-[#1a1a2e] mb-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-[#555770] text-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="mt-4 text-sm text-[#00a67d] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 border border-[#e8e8ed] space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Full Name</label>
                      <Input
                        required
                        placeholder="Your name"
                        className="h-10 bg-[#fafafa] border-[#e8e8ed] focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Email Address</label>
                      <Input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="h-10 bg-[#fafafa] border-[#e8e8ed] focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Subject</label>
                    <Input
                      required
                      placeholder="What's this about?"
                      className="h-10 bg-[#fafafa] border-[#e8e8ed] focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a2e] mb-1.5">Message</label>
                    <Textarea
                      required
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className="bg-[#fafafa] border-[#e8e8ed] focus:border-[#00a67d] focus:ring-[#00a67d]/20 resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#00a67d] hover:bg-[#008f6b] text-white font-semibold rounded-lg"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* FAQ Sidebar */}
            <div className="lg:col-span-2">
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-6"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Common Questions
              </h2>
              <div className="space-y-3">
                {faqLinks.map((faq) => (
                  <a
                    key={faq.question}
                    href={faq.href}
                    className="block p-4 rounded-lg border border-[#e8e8ed] bg-white hover:border-[#00a67d]/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <p className="text-sm text-[#1a1a2e] font-medium group-hover:text-[#00a67d] transition-colors">
                      {faq.question}
                    </p>
                  </a>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-white border border-[#e8e8ed]">
                <p className="text-sm text-[#555770] leading-relaxed">
                  Looking for more answers? Visit our <a href="/faq" className="text-[#00a67d] hover:underline font-medium">FAQ page</a> or <a href="/help" className="text-[#00a67d] hover:underline font-medium">Help Center</a> for detailed guides and information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
