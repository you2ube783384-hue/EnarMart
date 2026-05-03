"use client"

import React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function LicensePage() {
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
            License Agreement
          </h1>
          <p className="text-[#555770] text-base md:text-lg max-w-2xl mx-auto">
            Understand how you can use our Canva templates. This license defines the terms for personal and commercial use of our digital products.
          </p>
          <p className="text-sm text-[#8e8ea0] mt-4">Last updated: March 4, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="space-y-10 text-[#555770] leading-relaxed">
            {/* License Overview */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                1. License Overview
              </h2>
              <p className="mb-3">
                When you purchase a template from EnarMart, you are not buying the template itself — you are purchasing a license that grants you specific rights to use the template. The template and its design remain the intellectual property of EnarMart or its respective creators.
              </p>
              <p>
                All templates on EnarMart are sold under a <strong className="text-[#1a1a2e]">Standard License</strong> unless otherwise specified. Some premium templates may include an <strong className="text-[#1a1a2e]">Extended License</strong> option for broader commercial use.
              </p>
            </div>

            {/* Standard License */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                2. Standard License
              </h2>
              <p className="mb-4">
                The Standard License is included with every template purchase on EnarMart and permits the following uses:
              </p>

              <h3
                className="text-lg font-semibold text-[#1a1a2e] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                What You CAN Do:
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Use the template for <strong className="text-[#1a1a2e]">personal projects</strong> such as personal branding, resumes, and social media accounts</li>
                <li>Use the template for <strong className="text-[#1a1a2e]">commercial projects</strong> for one business or client, including social media posts, presentations, and marketing materials</li>
                <li>Customize the template by editing text, colors, images, fonts, and layout within Canva</li>
                <li>Export the finished design in any format supported by Canva (PNG, JPG, PDF, MP4, etc.)</li>
                <li>Use the exported design in digital and print media, including websites, social media platforms, email campaigns, and printed materials</li>
                <li>Create unlimited end products for a single business or personal brand</li>
              </ul>

              <h3
                className="text-lg font-semibold text-[#1a1a2e] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                What You CANNOT Do:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resell, redistribute, or share the original template file or a modified version as a template</li>
                <li>Include the template in any template bundle, design pack, or digital product for resale</li>
                <li>Use the template to create products for sale on any marketplace (e.g., Etsy, Creative Market, Canva Creator)</li>
                <li>Sub-license, transfer, or give away your license to another person or entity</li>
                <li>Use the template for more than one client or business without purchasing an additional license</li>
                <li>Claim the design as your own original work</li>
              </ul>
            </div>

            {/* Extended License */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                3. Extended License
              </h2>
              <p className="mb-4">
                The Extended License is available for select premium templates and provides broader commercial rights. In addition to all Standard License permissions, the Extended License allows:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Use the template for <strong className="text-[#1a1a2e]">unlimited client projects</strong> — no per-client restrictions</li>
                <li>Create <strong className="text-[#1a1a2e]">Print-on-Demand (POD)</strong> products using the customized design (t-shirts, mugs, posters, etc.)</li>
                <li>Use in <strong className="text-[#1a1a2e]">digital products for sale</strong>, such as eBooks, online courses, or digital downloads, provided the template is significantly modified and not distributed as an editable Canva file</li>
                <li>Use the template across <strong className="text-[#1a1a2e]">multiple businesses or brands</strong> owned by the licensee</li>
              </ul>
              <p className="mb-3">
                The Extended License does NOT allow:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reselling the original or modified template as a Canva template or design asset</li>
                <li>Distributing the editable Canva link to others</li>
                <li>Sub-licensing the template to third parties</li>
              </ul>
            </div>

            {/* Canva-Specific Terms */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                4. Canva-Specific Terms
              </h2>
              <p className="mb-3">
                Our templates are designed for use within the Canva platform. Please note the following:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#1a1a2e]">Canva Account Required:</strong> You must have a Canva account (free or Pro) to access and edit the template. Some templates may require Canva Pro for full access to premium elements, fonts, and features.
                </li>
                <li>
                  <strong className="text-[#1a1a2e]">Template Link:</strong> Upon purchase, you will receive a Canva template link. This link is for your use only and should not be shared, distributed, or made publicly accessible.
                </li>
                <li>
                  <strong className="text-[#1a1a2e]">Canva Pro Elements:</strong> Templates containing Canva Pro elements will display watermarks or require a Pro subscription to use without watermarks. This is clearly indicated on each product listing.
                </li>
                <li>
                  <strong className="text-[#1a1a2e]">Platform Changes:</strong> Canva may update its platform, features, or element library, which could affect template appearance or functionality. We are not responsible for changes made by Canva that impact template performance.
                </li>
                <li>
                  <strong className="text-[#1a1a2e]">Third-Party Assets:</strong> Some templates may include placeholder images, fonts, or graphics that are subject to Canva&apos;s own licensing terms. Please review Canva&apos;s content license agreement for details on third-party assets.
                </li>
              </ul>
            </div>

            {/* License Duration */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                5. License Duration
              </h2>
              <p className="mb-3">
                The license is perpetual and does not expire. Once purchased, you may continue to use the template in accordance with the license terms indefinitely. However:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The license is valid for the version of the template at the time of purchase</li>
                <li>Updates or new versions of the template may be offered at our discretion but are not guaranteed</li>
                <li>The license may be terminated if you violate the terms described in this agreement</li>
                <li>Upon license termination, you must cease all use of the template and delete any copies</li>
              </ul>
            </div>

            {/* Ownership */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                6. Ownership and Copyright
              </h2>
              <p className="mb-3">
                EnarMart retains full ownership and copyright of all template designs, including any modifications or derivative works created by us. Your purchase of a license does not transfer any ownership rights.
              </p>
              <p>
                You own the content you create using the template (your text, images, and data), but the underlying template design remains the property of EnarMart. You may not register, patent, or trademark the template design or any derivative thereof.
              </p>
            </div>

            {/* License Violations */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                7. License Violations
              </h2>
              <p className="mb-3">
                Violation of the license terms may result in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Immediate termination of your license without refund</li>
                <li>Suspension or closure of your EnarMart account</li>
                <li>Legal action seeking damages and injunctive relief</li>
                <li>A DMCA takedown notice for any infringing content</li>
              </ul>
              <p className="mt-3">
                If you become aware of any license violations or unauthorized distribution of our templates, please report it to <a href="mailto:legal@enarmart.com" className="text-[#00a67d] hover:underline">legal@enarmart.com</a>.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                8. Contact Us
              </h2>
              <p>
                If you have questions about licensing, need an Extended License, or want to discuss custom licensing arrangements, please contact us:
              </p>
              <div className="mt-4 p-6 bg-[#f5f5f7] rounded-xl">
                <p className="text-[#1a1a2e] font-semibold mb-2">EnarMart Licensing Team</p>
                <p>Email: <a href="mailto:license@enarmart.com" className="text-[#00a67d] hover:underline">license@enarmart.com</a></p>
                <p>Website: <a href="https://enarmart.com" className="text-[#00a67d] hover:underline">enarmart.com</a></p>
                <p>For custom licensing inquiries, include &quot;Custom License Request&quot; in your email subject.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
