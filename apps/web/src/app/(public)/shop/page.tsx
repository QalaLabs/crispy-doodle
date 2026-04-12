"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ShoppingBag, Search, Star, Filter, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { showSuccess } from '@/utils/toast'

const CATEGORIES = ['All', 'Crystals', 'Journals', 'Sound', 'Oils & Herbs', 'Courses']

const PRODUCTS = [
  { id: 1, name: "Rose Quartz Healing Set", category: "Crystals", price: 2499, originalPrice: 3200, rating: 4.9, reviews: 124, tag: "Bestseller", desc: "A curated set of 5 rose quartz crystals for heart chakra activation and emotional healing.", image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Aumveda Healing Journal", category: "Journals", price: 899, rating: 4.8, reviews: 89, tag: "New", desc: "Guided prompts for shadow work, gratitude and daily reflection. 180 pages, premium paper.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "528 Hz Singing Bowl", category: "Sound", price: 4999, originalPrice: 5999, rating: 5.0, reviews: 43, tag: "Premium", desc: "Handcrafted Tibetan singing bowl tuned to 528 Hz — the frequency of DNA repair and cellular healing.", image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Ashwagandha Rasayana", category: "Oils & Herbs", price: 649, rating: 4.7, reviews: 201, tag: "Organic", desc: "Premium KSM-66 ashwagandha with traditional honey and ghee. 60-day supply.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Amethyst Cluster", category: "Crystals", price: 1899, rating: 4.8, reviews: 67, desc: "Natural amethyst cluster for mental clarity, stress relief and enhanced intuition.", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Ayurveda Fundamentals", category: "Courses", price: 1999, originalPrice: 4999, rating: 4.9, reviews: 312, tag: "Sale", desc: "12-module video course by Dr. Sejal Jain. Master the ancient science of life.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "Sacred Sandalwood Oil", category: "Oils & Herbs", price: 799, rating: 4.6, reviews: 88, desc: "Pure Mysore sandalwood essential oil. Grounding, meditative and deeply calming.", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "Selenite Wand Set", category: "Crystals", price: 1299, rating: 4.9, reviews: 55, tag: "Popular", desc: "Set of 3 selenite wands for aura cleansing, chakra clearing and meditation.", image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=400" },
]

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Set<number>>(new Set())

  const filtered = PRODUCTS.filter(p =>
    (category === 'All' || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  )

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart(prev => new Set([...prev, p.id]))
    showSuccess(`${p.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-400 text-xs font-black uppercase tracking-[0.3em]">
              <ShoppingBag className="w-3 h-3" /> Sacred Commerce
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
              The Aumveda <br />
              <span className="text-amber-600 italic">Apothecary</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Crystals, journals, sound instruments, Ayurvedic formulations and online courses —
              every product chosen to support your healing journey.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="pl-10 h-12 rounded-xl border-slate-200" />
            </div>
            {cart.size > 0 && (
              <Button className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-black font-bold shrink-0">
                <ShoppingBag className="w-4 h-4 mr-2" /> Cart ({cart.size})
              </Button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                category === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(p => (
            <div key={p.id} className="group flex flex-col bg-white rounded-[40px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {p.tag && (
                  <Badge className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white border-none text-[10px] font-black uppercase tracking-widest">
                    {p.tag}
                  </Badge>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{p.category}</p>
                  <h3 className="font-bold text-slate-900 leading-tight">{p.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= Math.floor(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />)}
                  </div>
                  <span className="text-xs text-slate-400">({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    <span className="text-xl font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2">₹{p.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <Button size="sm" onClick={() => addToCart(p)} className={`rounded-xl h-9 font-bold text-xs ${cart.has(p.id) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-black'}`}>
                    {cart.has(p.id) ? '✓ Added' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">No products found for "{search}"</p>
          </div>
        )}

        {/* Trust bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "Authentically Sourced", desc: "Every crystal and herb is ethically sourced and energetically cleansed." },
            { icon: Sparkles, title: "Practitioner Curated", desc: "Each product personally selected by Dr. Sejal and Archana Jain." },
            { icon: ShoppingBag, title: "Secure Checkout", desc: "Cashfree-powered payments with full data encryption." },
          ].map(item => (
            <div key={item.title} className="flex gap-4 items-start p-6 bg-slate-50 rounded-3xl">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Login CTA */}
        <div className="p-10 bg-slate-900 rounded-[48px] text-center space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Client Benefit</p>
          <h2 className="text-3xl font-serif font-bold text-white">Members get 20% off every order</h2>
          <p className="text-slate-400 max-w-md mx-auto">Create your free Aumveda account to unlock member pricing, track orders and earn healing credits.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="h-12 px-10 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold">
              <Link href="/auth/register">Create Free Account</Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 px-8 rounded-xl text-slate-400 hover:text-white border border-white/10 font-bold">
              <Link href="/auth/login">Sign In <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
