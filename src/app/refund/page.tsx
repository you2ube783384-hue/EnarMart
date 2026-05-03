"use client"

import React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Please review our refund policy for digital Canva template products.
          </p>
          <p className="text-sm text-[#999999] mt-4">Last updated: March 4, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="space-y-10 text-[#666666] leading-relaxed">
            {/* Overview */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                1. Overview
              </h2>
              <p className="mb-3">
                Due to the digital nature of our Canva template products, all sales are generally considered final once the template files have been downloaded or accessed. Unlike physical goods, digital products cannot be returned once they have been delivered.
              </p>
              <p>
                However, we understand that circumstances may arise where a refund is warranted. We handle each refund request on a case-by-case basis and are committed to treating our customers fairly.
              </p>
            </div>

            {/* Eligible Refunds */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                2. Eligible for Refund
              </h2>
              <p className="mb-4">You may request a refund under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#333333]">Duplicate Purchase:</strong> If you accidentally purchased the same template more than once, we will issue a full refund for the duplicate order upon verification.
                </li>
                <li>
                  <strong className="text-[#333333]">Technical Issues:</strong> If the template file is corrupted, cannot be opened in Canva, or has significant defects that prevent normal use, and we are unable to provide a working replacement within 48 hours.
                </li>
                <li>
                  <strong className="text-[#333333]">Product Not as Described:</strong> If the template significantly differs from its product description, preview images, or listing details on our Site.
                </li>
                <li>
                  <strong className="text-[#333333]">Unauthorized Purchase:</strong> If you can demonstrate that an unauthorized party made the purchase using your payment information without your consent.
                </li>
                <li>
                  <strong className="text-[#333333]">Pre-Download Request:</strong> If you request a refund before downloading or accessing the template files, we will process a full refund without question.
                </li>
              </ul>
            </div>

            {/* Not Eligible */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                3. Not Eligible for Refund
              </h2>
              <p className="mb-4">Refunds will not be issued in the following situations:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-[#333333]">Change of Mind:</strong> If you simply changed your mind about the purchase after downloading the template.
                </li>
                <li>
                  <strong className="text-[#333333]">Skill Level:</strong> If the template requires Canva Pro features that you do not have access to (each listing clearly indicates Pro requirements).
                </li>
                <li>
                  <strong className="text-[#333333]">Minor Variations:</strong> If the template has minor visual differences due to Canva platform updates, font availability changes, or browser rendering differences.
                </li>
                <li>
                  <strong className="text-[#333333]">Customization Difficulties:</strong> If you are unable to customize the template to your liking. Our templates are designed to be editable, but some Canva knowledge may be required.
                </li>
                <li>
                  <strong className="text-[#333333]">Late Requests:</strong> Refund requests submitted more than 30 days after the purchase date.
                </li>
                <li>
                  <strong className="text-[#333333]">Extensive Use:</strong> If the template has been significantly modified, used in published materials, or distributed.
                </li>
              </ul>
            </div>

            {/* How to Request */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                4. How to Request a Refund
              </h2>
              <p className="mb-4">To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong className="text-[#333333]">Contact Support:</strong> Email us at <a href="mailto:support@enarmart.com" className="text-[#00a67d] hover:underline">support@enarmart.com</a> with the subject line &quot;Refund Request — [Order Number].&quot;
                </li>
                <li>
                  <strong className="text-[#333333]">Provide Details:</strong> Include your order number, the template name, the date of purchase, and a clear explanation of the reason for the refund.
                </li>
                <li>
                  <strong className="text-[#333333]">Attach Evidence:</strong> If applicable, include screenshots or other evidence supporting your claim (e.g., error messages, comparison with product listing).
                </li>
                <li>
                  <strong className="text-[#333333]">Wait for Review:</strong> Our team will review your request within 2-3 business days and respond with our decision.
                </li>
              </ol>
            </div>

            {/* Refund Processing */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                5. Refund Processing
              </h2>
              <p className="mb-3">If your refund request is approved:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-[#333333]">Method:</strong> Refunds will be issued to the original payment method used for the purchase.</li>
                <li><strong className="text-[#333333]">Timing:</strong> Please allow 5-10 business days for the refund to appear on your statement, depending on your payment provider.</li>
                <li><strong className="text-[#333333]">Partial Refunds:</strong> In some cases, a partial refund may be offered if the template is partially usable or if a significant portion of the product is functional.</li>
                <li><strong className="text-[#333333]">Currency:</strong> Refunds will be processed in the same currency as the original purchase. Exchange rate fluctuations may result in slight differences in the refunded amount.</li>
              </ul>
            </div>

            {/* Exchanges */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                6. Exchanges and Replacements
              </h2>
              <p className="mb-3">
                In some cases, we may offer an exchange or replacement instead of a refund:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If a template has minor issues, we may provide an updated or corrected version at no additional cost.</li>
                <li>If a template is no longer compatible with Canva, we may offer a comparable replacement template of equal or greater value.</li>
                <li>Exchanges are subject to template availability and are offered at our discretion.</li>
              </ul>
            </div>

            {/* Chargebacks */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                7. Chargebacks
              </h2>
              <p className="mb-3">
                We kindly request that you contact us before initiating a chargeback with your bank or credit card company. Chargebacks can be time-consuming for all parties and may result in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Immediate suspension of your EnarMart account</li>
                <li>Loss of access to all previously purchased templates</li>
                <li>Being flagged in payment processor databases, which may affect future purchases</li>
              </ul>
              <p className="mt-3">
                We are committed to resolving any issues directly and fairly. Most refund requests submitted in good faith are resolved within our standard process.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                8. Contact Us
              </h2>
              <p>
                If you have any questions about our Refund Policy or need to request a refund, please reach out:
              </p>
              <div className="mt-4 p-6 bg-[#f8f5f2] rounded-lg">
                <p className="text-[#333333] font-semibold mb-2">EnarMart Support Team</p>
                <p>Email: <a href="mailto:support@enarmart.com" className="text-[#00a67d] hover:underline">support@enarmart.com</a></p>
                <p>Response time: Within 2-3 business days</p>
                <p>Refund window: 30 days from purchase date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
