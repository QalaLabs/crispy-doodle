'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Search, ShoppingCart } from 'lucide-react'
import { showSuccess } from '@/utils/toast'
import Topbar from '../../_components/Topbar'

const PRODUCTS = [
  { id: 'healing-crystal-set', name: 'Healing Crystal Set', category: 'Crystals', price: 1599, rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1611073100823-866669667741?auto=format&fit=crop&q=80&w=400', tag: 'Best Seller' },
  { id: 'healing-journal', name: 'Aumveda Guided Journal', category: 'Stationery', price: 799, rating: 4.8, reviews: 210, image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400', tag: 'New' },
  { id: 'calm-essential-oil-blend', name: 'Calm Essential Oil Blend', category: 'Wellness', price: 1299, rating: 4.7, reviews: 85, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400' },
  { id: 'copper-tongue-scraper', name: 'Copper Tongue Scraper', category: 'Wellness Tools', price: 299, rating: 4.9, reviews: 340, image: 'https://images.unsplash.com/photo-1559594882-7b551c32cf99?auto=format&fit=crop&q=80&w=400', tag: 'Essential' },
]

const CATEGORIES = ['All', 'Crystals', 'Stationery', 'Wellness', 'Wellness Tools']

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState<string[]>([])

  const filtered = PRODUCTS.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (id: string, name: string) => {
    setCart(prev => [...prev, id])
    showSuccess(`${name} added to cart!`)
  }

  return (
    <>
      <Topbar title="Aumveda Shop" />
      <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <p className="text-slate-500 font-medium">Curated Ayurvedic essentials for your Prakriti.</p>
          {cart.length > 0 && (
            <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold">
              <ShoppingCart className="w-4 h-4" />
              {cart.length} item{cart.length > 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Card key={product.id} className="border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
              <Link href={`/dashboard/shop/${product.id}`} className="aspect-square relative overflow-hidden bg-slate-100 block">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {product.tag && (
                  <Badge className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white border-none text-[10px] font-bold uppercase tracking-widest">
                    {product.tag}
                  </Badge>
                )}
              </Link>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  </div>
                </div>
                <Link href={`/dashboard/shop/${product.id}`}>
                  <h3 className="font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">₹{product.price}</span>
                  <Button size="sm" onClick={() => addToCart(product.id, product.name)} className="bg-slate-900 hover:bg-black rounded-lg h-9 px-4">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No products found. Try a different search or category.</p>
          </div>
        )}

      </div>
    </>
  )
}
