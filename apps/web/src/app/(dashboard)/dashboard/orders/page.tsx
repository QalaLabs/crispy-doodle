'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import OrderList from '@/components/OrderList'
import OrderDetailModal from '@/components/OrderDetailModal'
import QuickShopCard from '@/components/QuickShopCard'
import { showSuccess, showError } from '@/utils/toast'
import { Loader2, ShoppingBag, History, ArrowLeft } from 'lucide-react'
import Topbar from '../../_components/Topbar'

const RECOMMENDED_PRODUCT = {
  id: 'healing-journal',
  name: 'Aumveda Guided Journal',
  price: 799,
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400',
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(d => { if (d.success) setOrders(d.orders) })
      .catch(() => showError('Failed to load order history'))
      .finally(() => setLoading(false))
  }, [])

  const handleViewDetails = async (order: any) => {
    try {
      const res = await fetch(`/api/orders/${order.id}`)
      const data = await res.json()
      if (data.success) { setSelectedOrder(data.order); setIsDetailModalOpen(true) }
    } catch { showError('Failed to load order details') }
  }

  const handleReorder = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/reorder`, { method: 'POST' })
      if (res.ok) { showSuccess('Items added to your cart!'); router.push('/dashboard/shop') }
    } catch { showError('Failed to reorder') }
  }

  const handleDownloadInvoice = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/invoice`)
      const data = await res.json()
      if (data.success) { window.open(data.url, '_blank'); showSuccess('Invoice download started') }
    } catch { showError('Failed to generate invoice') }
  }

  return (
    <>
      <Topbar title="Orders & Purchases" />
      <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto">

        <div className="mb-8 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
            <Link href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard</Link>
          </Button>
          <p className="text-slate-500 font-medium ml-auto">Manage your wellness essentials and history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4 bg-white rounded-[32px] border border-slate-100">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm font-medium text-slate-400 animate-pulse">Retrieving your history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-900">No orders yet</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">Start your Ayurvedic journey with our curated shop.</p>
                <Button asChild className="bg-slate-900 hover:bg-black rounded-xl px-8">
                  <Link href="/dashboard/shop">Visit Shop</Link>
                </Button>
              </div>
            ) : (
              <OrderList orders={orders} onViewDetails={handleViewDetails} onReorder={handleReorder} onDownloadInvoice={handleDownloadInvoice} />
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <QuickShopCard product={RECOMMENDED_PRODUCT} onAddToCart={() => showSuccess('Added to cart!')} />
            <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-bold text-slate-900">Need Help?</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <History className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Tracking Orders</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Orders are typically processed within 24 hours and shipped via express courier.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Returns Policy</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">We offer a 30-day return policy for unopened Ayurvedic supplements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <OrderDetailModal order={selectedOrder} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} onReorder={handleReorder} onDownloadInvoice={handleDownloadInvoice} />
    </>
  )
}
