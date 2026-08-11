"use client"

import { useState, useMemo } from 'react'
import CategoryHeader from '@/components/CategoryHeader'
import CategoryTabs from '@/components/CategoryTabs'
import ProductCard from '@/components/ProductCard'
import FilterDrawer from '@/components/FilterDrawer'
import SortDropdown from '@/components/SortDropdown'
import MobileBottomNav from '@/components/MobileBottomNav'

const productsData = [
  { name: 'Ankara Maxi Dress', designer: 'Zola Designs', price: 89.99, rating: 4.8, reviews: 24, category: 'Dresses', image: 'https://picsum.photos/seed/prod1/600/750' },
  { name: 'Kente Peplum Top', designer: 'Akosua Collections', price: 59.99, rating: 4.7, reviews: 15, category: 'Tops', image: 'https://picsum.photos/seed/prod2/600/750' },
  { name: 'Off-Shoulder Dress', designer: 'Simi Osakwe', price: 79.99, rating: 4.6, reviews: 12, category: 'Dresses', image: 'https://picsum.photos/seed/prod3/600/750' },
  { name: 'Ankara Two-Piece Set', designer: 'House of Tayo', price: 99.99, rating: 4.9, reviews: 20, category: 'Sets', image: 'https://picsum.photos/seed/prod4/600/750' },
  { name: 'Wrap Skirt', designer: 'AfriChic', price: 45.99, rating: 4.5, reviews: 8, category: 'Skirts', image: 'https://picsum.photos/seed/prod5/600/750' },
  { name: 'Boubou Dress', designer: 'Anaya Styles', price: 69.99, rating: 4.8, reviews: 17, category: 'Dresses', image: 'https://picsum.photos/seed/prod6/600/750' },
  { name: 'Kimono Jacket', designer: 'Zuri Collections', price: 55.99, rating: 4.7, reviews: 11, category: 'Accessories', image: 'https://picsum.photos/seed/prod7/600/750' },
  { name: 'Ankara Jumpsuit', designer: 'Bold Stitches', price: 92.99, rating: 4.9, reviews: 19, category: 'Sets', image: 'https://picsum.photos/seed/prod8/600/750' },
  // extra
  { name: 'Midi Wrap Dress', designer: 'Ami Boutique', price: 64.99, rating: 4.6, reviews: 9, category: 'Dresses', image: 'https://picsum.photos/seed/prod9/600/750' },
  { name: 'Asymmetric Top', designer: 'Lagos Loom', price: 39.99, rating: 4.4, reviews: 6, category: 'Tops', image: 'https://picsum.photos/seed/prod10/600/750' },
]

const tabs = ['All', 'Dresses', 'Tops', 'Skirts', 'Sets', 'Accessories']

export default function WomenPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState('Featured')

  const products = useMemo(() => {
    let list = productsData.slice()
    if (activeTab !== 'All') list = list.filter((p) => p.category === activeTab)
    switch (sort) {
      case 'Newest': return list
      case 'Price: Low to High': return list.sort((a,b)=>a.price-b.price)
      case 'Price: High to Low': return list.sort((a,b)=>b.price-a.price)
      case 'Highest Rated': return list.sort((a,b)=>b.rating-a.rating ? b.rating-a.rating : b.reviews - a.reviews)
      default: return list
    }
  }, [activeTab, sort])

  return (
    <div style={{ paddingBottom: '84px', background: '#FFF' }}>
      <CategoryHeader title="Women" onFilter={() => setFilterOpen(true)} />

      <CategoryTabs tabs={tabs} active={activeTab} onChange={(t)=>setActiveTab(t)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', gap: 8 }}>
        <button onClick={() => setFilterOpen(true)} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', borderRadius: 8, border: '1px solid #E5E0D7', background: '#fff' }}>Filter</button>
        <div style={{ marginLeft: 'auto' }}>
          <SortDropdown value={sort} onChange={(v)=>setSort(v)} />
        </div>
      </div>

      <main style={{ padding: '0 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </main>

      <FilterDrawer open={filterOpen} onClose={()=>setFilterOpen(false)} />
      <MobileBottomNav active="categories" />

      <style>{`
        @media (min-width: 768px) { .mobile-only { display: none !important } }
      `}</style>
    </div>
  )
}
