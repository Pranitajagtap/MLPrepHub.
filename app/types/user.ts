export interface User {
  id: string
  email: string
  name: string | null
  targetRole: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  user: User
  progress: {
    overall: number
    skills: number
    assessments: number
    completedModules: number
  }
  recentActivity: Array<{
    action: string
    item: string
    time: string
    icon: string
  }>
  skills: Array<{
    name: string
    level: number
    gradient: string
  }>
  careerGoals: Array<{
    type: string
    timeline: string
    goals: string[]
    gradient: string
    icon: string
  }>
}