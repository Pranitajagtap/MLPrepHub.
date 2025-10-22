'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string | null
  targetRole: string | null
  createdAt: string
  updatedAt: string
  hasCompletedOnboarding?: boolean
}

export default function FloatingProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Function to get user data from localStorage
  const getUserFromStorage = () => {
    try {
      console.log('🔄 FloatingProfile: Getting user from localStorage...')
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        console.log('✅ FloatingProfile: User found in localStorage:', user)
        return user
      }
      console.log('❌ FloatingProfile: No user found in localStorage')
      return null
    } catch (error) {
      console.error('❌ FloatingProfile: Error reading from localStorage:', error)
      return null
    }
  }

  // Enhanced function to fetch user data
  const fetchUserData = async () => {
    try {
      // First try localStorage (for immediate response)
      const localUser = getUserFromStorage()
      if (localUser) {
        setUser(localUser)
        setIsLoading(false)
        return
      }

      // If no local user, try API (fallback)
      console.log('🔄 FloatingProfile: No local user, trying API...')
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ FloatingProfile: User data fetched from API:', userData)
        setUser(userData)
        // Also store in localStorage for consistency
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        console.log('❌ FloatingProfile: No authenticated user found from API')
        setUser(null)
      }
    } catch (error) {
      console.error('❌ FloatingProfile: Error fetching user data:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced useEffect with better event handling
  useEffect(() => {
    console.log('🎯 FloatingProfile: Component mounted')
    
    // Fetch user data initially
    fetchUserData()

    // Enhanced auth change handler
    const handleAuthChange = (event: CustomEvent) => {
      console.log('🔄 FloatingProfile: Auth change event detected:', event.detail)
      
      if (event.detail.action === 'login' || event.detail.action === 'register') {
        // For login events, we already have the user data, so we can set it directly
        if (event.detail.user) {
          console.log('✅ FloatingProfile: Setting user from auth event:', event.detail.user)
          setUser(event.detail.user)
          setIsOpen(false)
          setIsLoading(false)
          
          // Also store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(event.detail.user))
          console.log('✅ FloatingProfile: User saved to localStorage')
        } else {
          // If no user data in event, refetch
          console.log('🔄 FloatingProfile: No user in event, refetching...')
          fetchUserData()
        }
      } else if (event.detail.action === 'logout') {
        console.log('✅ FloatingProfile: Logging out user')
        setUser(null)
        setIsOpen(false)
        // Clear localStorage on logout
        localStorage.removeItem('user')
        console.log('✅ FloatingProfile: User removed from localStorage')
      }
    }

    // Enhanced page visibility handler
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('🔄 FloatingProfile: Page became visible, refreshing user data')
        fetchUserData()
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Listen for storage changes (in case user data is updated elsewhere)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        console.log('🔄 FloatingProfile: Storage changed, updating user data')
        if (event.newValue) {
          setUser(JSON.parse(event.newValue))
        } else {
          setUser(null)
        }
      }
    }

    // Add event listeners with better error handling
    const authHandler = handleAuthChange as EventListener
    window.addEventListener('authChange', authHandler)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('authChange', authHandler)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, []) // Removed user dependency to avoid infinite loops

  // Debug: Log when user state changes
  useEffect(() => {
    console.log('👤 FloatingProfile: User state updated:', user)
  }, [user])

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return // Don't drag when dropdown is open
    
    setIsDragging(true)
    const rect = dragRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y

    // Keep within viewport bounds
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 60

    setPosition({
      x: Math.max(10, Math.min(newX, maxX)),
      y: Math.max(10, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleLogout = async () => {
    try {
      console.log('🚪 FloatingProfile: Logging out...')
      
      // Try API logout first
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (response.ok) {
          console.log('✅ FloatingProfile: API logout successful')
        } else {
          console.log('⚠️ FloatingProfile: API logout failed, continuing with local logout')
        }
      } catch (apiError) {
        console.log('⚠️ FloatingProfile: API logout error, continuing with local logout:', apiError)
      }

      // Always clear local state regardless of API response
      setUser(null)
      setIsOpen(false)
      localStorage.removeItem('user')
      
      // Trigger auth event for other components
      window.dispatchEvent(new CustomEvent('authChange', { 
        detail: { user: null, action: 'logout' } 
      }))
      
      console.log('✅ FloatingProfile: Local logout completed')
      router.push('/')
      router.refresh()
      
    } catch (error) {
      console.error('❌ FloatingProfile: Error during logout:', error)
      // Even if there's an error, clear local state and redirect
      setUser(null)
      setIsOpen(false)
      localStorage.removeItem('user')
      router.push('/')
      router.refresh()
    }
  }

  const getInitials = (name: string | null): string => {
    if (!name) return '👤'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomEmoji = () => {
    const emojis = ['😊', '🌟', '🚀', '💫', '🎯', '🔥', '💻', '🧠', '📚', '🎓']
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className="fixed z-50"
        style={{ left: position.x, top: position.y }}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm bg-gray-200 animate-pulse">
          <div className="text-gray-400 text-sm">...</div>
        </div>
      </div>
    )
  }

  // Debug: Show current state
  console.log('🎨 FloatingProfile: Rendering - user:', user, 'isOpen:', isOpen)

  if (!user) {
    console.log('🔍 FloatingProfile: No user - showing login button')
    return (
      <div 
        className="fixed z-50 cursor-move"
        style={{ 
          left: position.x, 
          top: position.y,
          backgroundColor: '#ec4899',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
        ref={dragRef}
        onMouseDown={handleMouseDown}
      >
        <Link
          href="/auth/login"
          className="flex items-center justify-center w-full h-full text-white hover:text-white transition-all duration-300 transform hover:scale-110"
        >
          <span className="text-lg">👤</span>
        </Link>
      </div>
    )
  }

  console.log('✅ FloatingProfile: User exists - showing profile button')

  return (
    <div 
      className="fixed z-50"
      style={{ left: position.x, top: position.y }}
      ref={dropdownRef}
    >
      {/* Draggable Profile Button */}
      <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className={`cursor-move transition-all duration-300 ${
          isDragging ? 'scale-110 rotate-12' : 'hover:scale-110'
        }`}
      >
        <button
          onClick={() => {
            console.log('🎯 FloatingProfile: Profile button clicked')
            setIsOpen(!isOpen)
          }}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300 ${
            isOpen 
              ? 'bg-linear-to-br from-purple-500 to-pink-500 scale-110 rotate-12' 
              : 'bg-linear-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600'
          } ${isDragging ? 'shadow-3xl' : 'hover:shadow-3xl'}`}
        >
          <div className="text-white font-bold text-sm relative">
            {getInitials(user.name)}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-16 top-0 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in slide-in-from-right-5 duration-300">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-blue-500 to-purple-500 p-6 text-white relative">
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 text-2xl opacity-20">{getRandomEmoji()}</div>
            <div className="absolute bottom-2 left-2 text-xl opacity-20">✨</div>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 shadow-lg">
                {getInitials(user.name)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg truncate">{user.name || 'Student'}</h3>
                <p className="text-blue-100 text-sm truncate">{user.email}</p>
                <p className="text-blue-100 text-sm mt-1 flex items-center">
                  <span className="mr-1">🎯</span>
                  {user.targetRole || 'ML Student'}
                </p>
                {!user.hasCompletedOnboarding && (
                  <p className="text-yellow-100 text-xs mt-1 flex items-center">
                    <span className="mr-1">⭐</span>
                    Complete onboarding to unlock features
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-gray-200/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {user.hasCompletedOnboarding ? '42%' : '0%'}
                </div>
                <div className="text-xs text-gray-600">Progress</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <div className="text-lg font-bold text-green-600 mb-1">
                  {user.hasCompletedOnboarding ? '12' : '0'}
                </div>
                <div className="text-xs text-gray-600">Skills</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <div className="text-lg font-bold text-purple-600 mb-1">
                  {user.hasCompletedOnboarding ? '8' : '0'}
                </div>
                <div className="text-xs text-gray-600">Modules</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors shadow-sm">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <span className="text-gray-700 font-medium">My Profile</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors shadow-sm">
                <span className="text-green-600 text-sm">🏠</span>
              </div>
              <span className="text-gray-700 font-medium">Dashboard</span>
            </Link>

            {user.hasCompletedOnboarding ? (
              <>
                <Link
                  href="/learn"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 group transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors shadow-sm">
                    <span className="text-purple-600 text-sm">📚</span>
                  </div>
                  <span className="text-gray-700 font-medium">Learning Hub</span>
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors shadow-sm">
                    <span className="text-orange-600 text-sm">💼</span>
                  </div>
                  <span className="text-gray-700 font-medium">Career Paths</span>
                </Link>

                <Link
                  href="/resume"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-pink-50 transition-all duration-200 group transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors shadow-sm">
                    <span className="text-pink-600 text-sm">📝</span>
                  </div>
                  <span className="text-gray-700 font-medium">Resume Builder</span>
                </Link>
              </>
            ) : (
              <Link
                href="/onboarding"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-yellow-50 transition-all duration-200 group transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors shadow-sm">
                  <span className="text-yellow-600 text-sm">⭐</span>
                </div>
                <span className="text-gray-700 font-medium">Complete Onboarding</span>
              </Link>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200/50">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group transform hover:scale-105 w-full text-left"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors shadow-sm">
                <span className="text-red-600 text-sm">🚪</span>
              </div>
              <span className="text-red-600 font-medium">Sign Out</span>
            </button>
          </div>

          {/* Drag Hint */}
          <div className="px-4 pb-3">
            <div className="text-xs text-gray-400 text-center flex items-center justify-center space-x-1">
              <span>💡</span>
              <span>Drag me anywhere!</span>
            </div>
          </div>
        </div>
      )}

      {/* Drag State Visual Feedback */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-blue-200/20 rounded-full animate-ping"></div>
        </div>
      )}
    </div>
  )
}