'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PencilIcon, Zap, Share2, Lock } from 'lucide-react';

const ShapeIcons = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" className="w-full h-full">
    {/* Rectangle */}
    <rect x="20" y="20" width="50" height="35" fill="none" stroke="white" strokeWidth="2" />
    {/* Circle */}
    <circle cx="120" cy="37" r="18" fill="none" stroke="white" strokeWidth="2" />
    {/* Triangle */}
    <polygon points="50,120 65,90 80,120" fill="none" stroke="white" strokeWidth="2" />
    {/* Line */}
    <line x1="100" y1="110" x2="160" y2="140" stroke="white" strokeWidth="2" />
    {/* Freehand */}
    <path d="M 20 160 Q 30 150 40 160 T 60 160" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#18181b' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full backdrop-blur border-b border-slate-700 z-50" style={{ backgroundColor: '#18181b' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#09090b' }}>
              <PencilIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Excalidraw</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#features" className="text-white hover:text-gray-300 transition">Features</a>
            <a href="#about" className="text-white hover:text-gray-300 transition">About</a>
            <a href="#demo" className="text-white hover:text-gray-300 transition">Demo</a>
            <div className="flex gap-3">
              <Link
                href="/signin"
                className="px-4 py-2 text-white border border-gray-600 rounded-lg hover:border-white hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-white rounded-lg hover:opacity-80 transition"
                style={{ backgroundColor: '#09090b' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Create, Design & Collaborate
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            A simple yet powerful open-source drawing application for sketching, diagramming, and designing. Transform your ideas into reality with our intuitive tools.
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-80 transition"
              style={{ backgroundColor: '#09090b' }}
            >
              Start Drawing Now
            </Link>
            <button className="px-8 py-3 border border-gray-600 text-white rounded-lg font-semibold hover:border-white hover:bg-slate-800 transition">
              Watch Demo
            </button>
          </div>

          {/* Canvas Preview */}
          <div className="rounded-xl border border-slate-700 p-8 shadow-2xl" style={{ backgroundColor: '#1e1e20' }}>
            <div className="rounded-lg w-full h-80 flex items-center justify-center border border-slate-600 relative overflow-hidden" style={{ backgroundColor: '#18181b' }}>
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <div className="relative z-10 w-48 h-48">
                <ShapeIcons />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">Draw shapes, write text, and collaborate in real-time</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6" style={{ backgroundColor: '#1e1e20' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Draw Shapes</h3>
              <p className="text-gray-400">Create rectangles, circles, triangles, and more with precision.</p>
            </div>

            {/* Feature 2 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3.586a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Text & Labels</h3>
              <p className="text-gray-400">Add text annotations, labels, and notes to your drawings.</p>
            </div>

            {/* Feature 3 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Real-time Collaboration</h3>
              <p className="text-gray-400">Work together with others on the same canvas simultaneously.</p>
            </div>

            {/* Feature 4 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-400">Your drawings are encrypted and stored securely in the cloud.</p>
            </div>

            {/* Feature 5 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Freehand Drawing</h3>
              <p className="text-gray-400">Sketch freely with natural pen and pencil tools.</p>
            </div>

            {/* Feature 6 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Smooth, responsive experience with instant rendering.</p>
            </div>

            {/* Feature 7 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 2a1 1 0 011 1v1h2V3a1 1 0 112 0v1h2V3a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a2 2 0 01-2-2v-1H4a1 1 0 110-2h1V9H4a1 1 0 010-2h1V5a2 2 0 012-2h1V3a1 1 0 011-1zm0 5a1 1 0 100 2 1 1 0 000-2zm5 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Customization</h3>
              <p className="text-gray-400">Change colors, styles, and organize layers effortlessly.</p>
            </div>

            {/* Feature 8 */}
            <div className="border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition group cursor-pointer" style={{ backgroundColor: '#18181b' }}>
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition" style={{ backgroundColor: '#09090b' }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Export & Share</h3>
              <p className="text-gray-400">Export as PNG, SVG or share links with your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-2xl p-12 text-center" style={{ backgroundColor: '#09090b' }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of designers and teams using Excalidraw for their creative projects.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 text-white font-bold rounded-lg hover:opacity-80 transition shadow-lg"
            style={{ backgroundColor: '#262628' }}
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-6" style={{ backgroundColor: '#1e1e20' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#09090b' }}>
                  <PencilIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">Excalidraw</span>
              </div>
              <p className="text-white text-sm">The best way to share your creative ideas.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><a href="#" className="hover:text-gray-300 transition">Features</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><a href="#" className="hover:text-gray-300 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Terms</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-white text-sm">
            <p>&copy; 2024 Excalidraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
