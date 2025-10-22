'use client'

import { ReactNode } from 'react'
import FloatingProfile from './FloatingProfile'

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <FloatingProfile />
      {children}
    </>
  )
}