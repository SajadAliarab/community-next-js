'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function FlashMessage() {
  const searchParams = useSearchParams()
  const msg    = searchParams.get('flash')
  const type   = searchParams.get('type')

  const show = !!msg && (type === 'success' || type === 'error')
  const router = useRouter()
  const path   = usePathname()

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      router.replace(path, { scroll: false })
    }, 3000)
    return () => clearTimeout(timer)
  }, [show, router, path])

  if (!show) return null

  return (
    <div className="fixed top-4 inset-x-0 mx-auto max-w-lg z-50">
    <div className={`p-4 rounded shadow-md ${
        type === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
      {msg}
    </div>
    </div>
  )
}
