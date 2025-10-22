// app/resume/builder/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResumeBuilder() {
  const router = useRouter()
  
  useEffect(() => {
    // Generate a new unique ID and redirect to the resume editor
    const newId = Date.now().toString()
    router.push(`/resume/${newId}`)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Creating your resume...</h2>
        <p className="text-gray-600 mt-2">Redirecting to the editor</p>
      </div>
    </div>
  )
}