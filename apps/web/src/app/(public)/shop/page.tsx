"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ShoppingBag, Search, Star, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { showSuccess } from '@/utils/toast'
import { PRODUCTS } from '@/lib/products-data'

const CATEGORIES = ['All', 'Bracelets', 'Combos', 'Vastu', 'Crystals', 'Healing']

type Product = typeof PRODUCTS[number]

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Set<number>>(new Set())

  const filtered = (PRODUCTS as readonly Product[]).filter(p =>
    (category === 'All' || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  )

  const addToCart = (p: Product) => {
    setCart(prev => new Set([...prev, p.id]))
    showSuccess(`${p.name} added to cart!`)
  }

  const discount = (p: Product) => p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0

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
              Crystal bracelets, Vastu items, healing combos and sacred frames —
              every product chosen to amplify your energy and attract abundance.
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
              {cat !== 'All' && (
                <span className="ml-1.5 opacity-50">
                  ({(PRODUCTS as readonly Product[]).filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
          <span className="px-5 py-2.5 text-xs font-black text-slate-400 uppercase tracking-widest">
            {filtered.length} items
          </span>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-slate-100">
              <div className="aspect-square relative overflow-hidden bg-slate-50">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {p.tag && (
                  <Badge className={`absolute top-3 left-3 border-none text-[10px] font-black uppercase tracking-widest ${
                    p.tag === 'Bestseller' ? 'bg-amber-500 text-white' :
                    p.tag === 'Sale' ? 'bg-rose-500 text-white' :
                    p.tag === 'Bundle' ? 'bg-indigo-600 text-white' :
                    p.tag === 'Certified' ? 'bg-emerald-600 text-white' :
                    'bg-slate-900 text-white'
                  }`}>
                    {p.tag}
                  </Badge>
                )}
                {discount(p) >= 50 && (
                  <Badge className="absolute top-3 right-3 bg-rose-500 text-white border-none text-[10px] font-black">
                    {discount(p)}% OFF
                  </Badge>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{p.category}</p>
                  <h3 className="font-bold text-slate-900 leading-tight text-sm">{p.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">{p.desc}</p>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                  <span className="text-xs text-slate-400 ml-1">5.0</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    <span className="text-lg font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                    {p.mrp > p.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">₹{p.mrp.toLocaleString()}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(p)}
                    className={`rounded-xl h-9 font-bold text-xs ${cart.has(p.id) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-black'}`}
                  >
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
            <p className="font-medium">No products found for &ldquo;{search}&rdquo;</p>
          </div>
        )}

        {/* Trust bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: "100% Natural & Authentic", desc: "Every crystal is ethically sourced, lab-certified where mentioned, and energetically cleansed before dispatch." },
            { icon: Sparkles, title: "Practitioner Curated", desc: "Each product personally selected by Archana Jain for its vibrational alignment and healing potency." },
            { icon: ShoppingBag, title: "Secure Checkout", desc: "Cashfree-powered payments with full encryption. 7-day return & exchange on all items." },
          ].map(item => (
            <div key={item.title} className="flex gap-4 items-start p-6 bg-slate-50 rounded-3xl">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-5 h-5 text-amber-600" />
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
