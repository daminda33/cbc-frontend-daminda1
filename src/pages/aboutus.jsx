import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-20 py-10">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Beauty that shines with you ✨
        </p>
      </div>

      {/* Section 1 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to Glowé Beauty — your trusted destination for high-quality
          cosmetics. We believe beauty is about confidence, self-expression,
          and feeling comfortable in your own skin.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to make beauty accessible to everyone by offering
          affordable, trendy, and safe cosmetic products. We aim to empower
          individuals to express themselves confidently.
        </p>
      </div>

      {/* Section 3 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Skincare essentials</li>
          <li>Makeup products</li>
          <li>Beauty tools & accessories</li>
          <li>Latest beauty trends</li>
        </ul>
      </div>

      {/* Section 4 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>High-quality products</li>
          <li>Affordable prices</li>
          <li>Fast delivery</li>
          <li>Customer-first approach</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 border-t pt-6">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Glowé Beauty. All rights reserved.
        </p>
      </div>
    </div>
  );
}