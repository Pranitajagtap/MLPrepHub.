'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string | null
  targetRole: string | null
  createdAt: string
  updatedAt: string
}

interface Progress {
  overall: number
  skills: number
  assessments: number
  completedModules: number
}

interface Activity {
  action: string
  item: string
  time: string
  icon: string
}

interface Skill {
  name: string
  level: number
  gradient: string
}

interface CareerGoal {
  type: string
  timeline: string
  goals: string[]
  gradient: string
  icon: string
}

interface UserProfileData {
  progress: Progress
  recentActivity: Activity[]
  skills: Skill[]
  careerGoals: CareerGoal[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    const guestData = localStorage.getItem('guestOnboarding')
    
    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData)
        setUser(parsedUser)
        
        // Create user profile with mock data
        const userProfileData: UserProfileData = {
          progress: {
            overall: 42,
            skills: 12,
            assessments: 86,
            completedModules: 8
          },
          recentActivity: [
            { action: 'Completed', item: 'React State Management', time: '2 hours ago', icon: '✅' },
            { action: 'Scored', item: '85% on JavaScript Assessment', time: '1 day ago', icon: '🎯' },
            { action: 'Updated', item: 'Full Stack Developer Resume', time: '2 days ago', icon: '📝' },
            { action: 'Started', item: 'Node.js Backend Module', time: '3 days ago', icon: '🚀' }
          ],
          skills: [
            { name: 'JavaScript', level: 85, gradient: 'from-blue-500 to-cyan-500' },
            { name: 'React', level: 78, gradient: 'from-green-500 to-emerald-500' },
            { name: 'Node.js', level: 65, gradient: 'from-purple-500 to-pink-500' },
            { name: 'MongoDB', level: 60, gradient: 'from-orange-500 to-red-500' },
            { name: 'CSS', level: 82, gradient: 'from-indigo-500 to-purple-500' },
            { name: 'Git', level: 75, gradient: 'from-teal-500 to-blue-500' }
          ],
          careerGoals: [
            { 
              type: 'Short-term', 
              timeline: '3-6 months',
              goals: ['Complete Full Stack path', 'Build 3 projects', 'Prepare resume'],
              gradient: 'from-blue-500 to-cyan-500',
              icon: '🎯'
            },
            { 
              type: 'Mid-term', 
              timeline: '6-12 months',
              goals: ['Land developer job', 'Contribute to open source', 'Learn TypeScript'],
              gradient: 'from-green-500 to-emerald-500',
              icon: '🚀'
            },
            { 
              type: 'Long-term', 
              timeline: '1-3 years',
              goals: ['Senior Developer role', 'Master system design', 'Mentor others'],
              gradient: 'from-purple-500 to-pink-500',
              icon: '🏆'
            }
          ]
        }
        
        setUserProfile(userProfileData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
        router.push('/auth/login')
      }
    } else if (guestData) {
      // Handle guest user
      const guestOnboarding = JSON.parse(guestData)
      const guestUser: User = {
        id: 'guest',
        email: 'guest@example.com',
        name: 'Guest Student',
        targetRole: guestOnboarding.matchingCareers[0]?.title || 'ML Student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setUser(guestUser)
      setUserProfile({
        progress: {
          overall: 25,
          skills: 6,
          assessments: 72,
          completedModules: 3
        },
        recentActivity: [
          { action: 'Completed', item: 'Onboarding', time: 'Just now', icon: '✅' },
          { action: 'Selected', item: 'Career Interests', time: 'Just now', icon: '🎯' }
        ],
        skills: [
          { name: 'Python', level: 70, gradient: 'from-blue-500 to-cyan-500' },
          { name: 'Machine Learning', level: 45, gradient: 'from-green-500 to-emerald-500' },
          { name: 'Data Analysis', level: 60, gradient: 'from-purple-500 to-pink-500' }
        ],
        careerGoals: [
          { 
            type: 'Short-term', 
            timeline: '3-6 months',
            goals: ['Complete learning path', 'Build first project', 'Learn fundamentals'],
            gradient: 'from-blue-500 to-cyan-500',
            icon: '🎯'
          }
        ]
      })
    } else {
      router.push('/auth/login')
    }
  }, [router])

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  const { progress, recentActivity, skills, careerGoals } = userProfile

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/learn"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue Learning
            </Link>
            <Link 
              href="/careers"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Explore Careers
            </Link>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center text-3xl font-bold border-4 border-white/30">
                {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-3">{user.name || 'Student'}</h1>
                <p className="text-xl text-blue-100 mb-2">{user.email}</p>
                <p className="text-blue-100">🎯 Targeting: <span className="font-semibold">{user.targetRole || 'ML Student'}</span></p>
                <p className="text-blue-100 mt-1">📅 Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Progress Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{progress.overall}%</div>
                <div className="text-gray-700 font-semibold">Overall Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${progress.overall}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">{progress.skills}</div>
                <div className="text-gray-700 font-semibold">Skills Mastered</div>
              </div>
              <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">{progress.assessments}%</div>
                <div className="text-gray-700 font-semibold">Avg. Score</div>
              </div>
              <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center border border-orange-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">{progress.completedModules}</div>
                <div className="text-gray-700 font-semibold">Modules Completed</div>
              </div>
            </div>

            {/* Target Role */}
            <div className="bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">🎯 Current Learning Focus</h3>
              <p className="text-xl mb-4">Working towards becoming a <span className="font-bold">{user.targetRole || 'ML Student'}</span></p>
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm">📚 Active learner</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Skill Levels</h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between text-lg mb-3">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="font-bold text-gray-700">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full bg-linear-to-r ${skill.gradient} transition-all duration-1000 ease-out group-hover:shadow-lg`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 bg-linear-to-r from-white to-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900">{activity.action}</span>
                        <span className="text-gray-700"> {activity.item}</span>
                      </div>
                      <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Career Goals & Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerGoals.map((goal, index) => (
              <div 
                key={index}
                className={`bg-linear-to-br ${goal.gradient} rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{goal.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{goal.type}</h3>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    {goal.timeline}
                  </div>
                </div>
                <ul className="space-y-2">
                  {goal.goals.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-white/90">
                      <span className="text-lg">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link 
            href="/learn"
            className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-2xl mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2">Continue Learning</h3>
            <p className="text-blue-100 mb-4">Resume your current module</p>
            <div className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all inline-block">
              Resume →
            </div>
          </Link>
          <Link 
            href="/learn/assessments"
            className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Take Assessment</h3>
            <p className="text-green-100 mb-4">Test your current skills</p>
            <div className="bg-white text-green-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all inline-block">
              Start Test →
            </div>
          </Link>
          <Link 
            href="/resume"
            className="bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-2xl mb-3">📝</div>
            <h3 className="text-xl font-bold mb-2">Update Resume</h3>
            <p className="text-purple-100 mb-4">Add your new skills</p>
            <div className="bg-white text-purple-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all inline-block">
              Edit Resume →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}