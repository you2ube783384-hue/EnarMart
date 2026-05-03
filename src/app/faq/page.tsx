"use client"

import React, { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const faqCategories = [
  {
    name: "General",
    questions: [
      {
        q: "What is EnarMart?",
        a: "EnarMart is a premium marketplace for Canva templates. We offer beautifully designed, ready-to-edit templates for resumes, social media, YouTube thumbnails, presentations, and more. All our templates are created by professional designers and optimized for the Canva platform.",
      },
      {
        q: "Do I need a Canva account to use your templates?",
        a: "Yes, you need a Canva account to open and edit our templates. Canva offers a free tier that works with most of our templates. However, some templates include Canva Pro elements (premium fonts, images, or graphics) which require a Canva Pro subscription. This is clearly indicated on each product listing page.",
      },
      {
        q: "Are the templates one-time purchases or subscriptions?",
        a: "All templates on EnarMart are one-time purchases. There are no recurring fees or subscriptions. Once you buy a template, it's yours to use forever under the terms of our license agreement. You only pay once at the time of purchase.",
      },
      {
        q: "How are EnarMart templates different from free Canva templates?",
        a: "Our templates are professionally designed with premium aesthetics, strategic layouts, and attention to detail that goes beyond what's available in Canva's free template library. We focus on unique, modern designs that help you stand out — not cookie-cutter templates that everyone else is using.",
      },
    ],
  },
  {
    name: "Purchasing & Downloads",
    questions: [
      {
        q: "How do I purchase a template?",
        a: "Simply browse our shop, add the templates you want to your cart, and proceed to checkout. We accept major credit cards, debit cards, and other payment methods. After completing your purchase, you'll receive instant access to download your template files and Canva template links.",
      },
      {
        q: "How do I access my purchased templates?",
        a: "After purchase, you'll receive: (1) A confirmation email with your download link, (2) Access to your template library in your EnarMart account dashboard, and (3) A direct Canva template link that opens the template in your Canva account. You can re-download your templates at any time from your account.",
      },
      {
        q: "Can I re-download a template after purchasing?",
        a: "Yes! Your purchases are stored in your EnarMart account library permanently. You can access and re-download your templates at any time by logging into your account. We recommend saving the Canva template link for easy access.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and other payment methods through our secure payment processor. All transactions are encrypted and PCI-compliant.",
      },
    ],
  },
  {
    name: "Using Templates",
    questions: [
      {
        q: "How do I open a template in Canva?",
        a: "After purchasing, click the Canva template link provided in your download or account dashboard. This will open the template directly in Canva. If you're not already logged into Canva, you'll be prompted to sign in or create a free account. Once opened, click 'Use template' to start editing.",
      },
      {
        q: "Can I customize the templates?",
        a: "Absolutely! All our templates are fully editable in Canva. You can change text, fonts, colors, images, backgrounds, and layout elements. You can add your own photos, adjust sizes, rearrange elements, and make any modifications you need to fit your brand or project.",
      },
      {
        q: "Some elements show a Canva Pro badge. What does this mean?",
        a: "Templates that include Canva Pro elements (premium fonts, stock photos, or graphics) will display a small Pro badge. You can still use these templates with a free Canva account, but the Pro elements will appear with a watermark. To use them without watermarks, you'll need a Canva Pro subscription. Each product listing clearly indicates if Pro elements are included.",
      },
      {
        q: "Can I use templates on my phone or tablet?",
        a: "Yes, Canva has mobile apps for iOS and Android. While you can view and make basic edits on mobile devices, we recommend using a desktop or laptop computer for the best editing experience, especially for templates with complex layouts.",
      },
    ],
  },
  {
    name: "Licensing",
    questions: [
      {
        q: "What license do I get when I purchase a template?",
        a: "Every template purchase includes our Standard License, which allows you to use the template for personal projects and commercial projects for one business or client. You can customize the template and use the finished design in both digital and print media. For broader commercial use, you can purchase an Extended License for select templates.",
      },
      {
        q: "Can I use templates for client work?",
        a: "Yes, under the Standard License you can use a template for one client's project. If you need to use the same template for multiple clients, you'll need to purchase an additional license for each client, or consider our Extended License which covers unlimited client projects.",
      },
      {
        q: "Can I resell or redistribute the template?",
        a: "No. You cannot resell, redistribute, or share the original template file or a modified version as a template. This includes selling on marketplaces, sharing editable Canva links, or including templates in design bundles. Please review our License Agreement for full details.",
      },
      {
        q: "What's the difference between Standard and Extended License?",
        a: "The Standard License covers personal use and commercial use for one business/client. The Extended License additionally allows: unlimited client projects, Print-on-Demand products, and use in digital products for sale (significantly modified). The Extended License is available for select premium templates.",
      },
    ],
  },
  {
    name: "Refunds & Support",
    questions: [
      {
        q: "What is your refund policy?",
        a: "Due to the digital nature of our products, refunds are handled on a case-by-case basis. We offer refunds for duplicate purchases, technical issues (corrupted files, Canva errors), products not matching descriptions, and unauthorized purchases. Refund requests must be submitted within 30 days of purchase. Visit our Refund Policy page for full details.",
      },
      {
        q: "The template link isn't working. What should I do?",
        a: "If your Canva template link isn't working: (1) Make sure you're logged into your Canva account, (2) Try opening the link in an incognito/private browser window, (3) Clear your browser cache and try again, (4) If the issue persists, contact our support team at support@enarmart.com with your order number, and we'll provide a new link.",
      },
      {
        q: "How can I contact support?",
        a: "You can reach our support team by emailing support@enarmart.com or by using the contact form on our Contact page. We typically respond within 24-48 hours during business days. For urgent issues, please include 'URGENT' in your email subject line.",
      },
      {
        q: "Do you offer template customization services?",
        a: "Currently, we do not offer custom design or template customization services. Our templates are designed to be easily editable in Canva, so most users can customize them themselves. If you need help with a specific template, our support team is happy to guide you through the editing process.",
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const currentCategory = faqCategories.find((c) => c.name === activeCategory)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#f8f5f2] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto">
            Find quick answers to the most common questions about EnarMart, our templates, licensing, and more.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b border-[#e5e5e5]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {faqCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name)
                  setOpenIndex(0)
                }}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                  activeCategory === cat.name
                    ? "bg-[#00a67d] text-white"
                    : "bg-[#f5f5f5] text-[#666666] hover:bg-[#e5e5e5]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {currentCategory && (
            <div className="space-y-3">
              {currentCategory.questions.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#e5e5e5] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#fafafa] transition-colors cursor-pointer"
                  >
                    <h3
                      className="text-base font-medium text-[#333333] pr-4"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {faq.q}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-[#999999] shrink-0 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-5 border-t border-[#e5e5e5]">
                      <p className="text-[#666666] text-sm leading-relaxed pt-4">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 md:py-16 bg-[#f8f5f2]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Still Have Questions?
          </h2>
          <p className="text-[#666666] mb-6 max-w-lg mx-auto">
            We&apos;re here to help. Browse our Help Center for detailed guides or reach out to our support team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00a67d] hover:bg-[#008f6b] text-white font-semibold rounded-full transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#e5e5e5] hover:border-[#00a67d]/30 text-[#333333] font-semibold rounded-full transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
