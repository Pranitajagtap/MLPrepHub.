'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RoleType {
  title: string;
  description?: string;
  level?: string;
}

interface ResumeTemplate {
  id: string
  title: string
  role: string
  lastUpdated: string
  score: number
}

const jobRoles = [
  {
    id: 'full-stack',
    title: 'Full Stack Developer',
    icon: '💻',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Build complete web applications with modern frameworks',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: '📊',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Transform data into actionable insights and predictions',
    skills: ['Python', 'ML', 'Statistics', 'Data Visualization', 'SQL']
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    icon: '🧠',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Design and deploy intelligent AI systems',
    skills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision']
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: '🎨',
    gradient: 'from-orange-500 to-red-500',
    description: 'Create beautiful and responsive user experiences',
    skills: ['React', 'TypeScript', 'CSS', 'UI/UX', 'Next.js']
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: '⚙️',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Build robust server-side systems and APIs',
    skills: ['Node.js', 'Python', 'SQL', 'Cloud Services', 'APIs']
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: '🔧',
    gradient: 'from-teal-500 to-blue-500',
    description: 'Automate infrastructure and deployment pipelines',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform']
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    icon: '📱',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Create native and cross-platform mobile applications',
    skills: ['React Native', 'Flutter', 'iOS/Android', 'APIs', 'Firebase']
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    icon: '📈',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Build data pipelines and infrastructure for analytics',
    skills: ['Python', 'SQL', 'Big Data', 'ETL', 'Data Warehousing']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    icon: '🛡️',
    gradient: 'from-red-500 to-pink-500',
    description: 'Protect systems and networks from cyber threats',
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'SIEM']
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    icon: '☁️',
    gradient: 'from-sky-500 to-blue-500',
    description: 'Design and manage cloud infrastructure and services',
    skills: ['AWS/Azure', 'Cloud Architecture', 'Networking', 'Security']
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    icon: '🤖',
    gradient: 'from-violet-500 to-purple-500',
    description: 'Develop artificial intelligence solutions and systems',
    skills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow']
  },
  {
    id: 'blockchain',
    title: 'Blockchain Developer',
    icon: '⛓️',
    gradient: 'from-gray-500 to-blue-500',
    description: 'Build decentralized applications and smart contracts',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'Cryptography']
  }
]

const resumeTips = [
  {
    title: "Use Action Verbs",
    description: "Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Optimized'",
    icon: "🚀",
    category: "Writing"
  },
  {
    title: "Quantify Achievements",
    description: "Include numbers and metrics to show impact (e.g., 'Improved performance by 40%')",
    icon: "📊",
    category: "Impact"
  },
  {
    title: "Tailor to Job Description",
    description: "Customize your resume for each application using keywords from the job posting",
    icon: "🎯",
    category: "Customization"
  },
  {
    title: "Keep it Concise",
    description: "Limit to 1 page for early career, 2 pages for experienced professionals",
    icon: "📄",
    category: "Formatting"
  },
  {
    title: "Include Relevant Projects",
    description: "Showcase personal projects that demonstrate your skills and passion",
    icon: "💼",
    category: "Content"
  },
  {
    title: "Use ATS-Friendly Format",
    description: "Avoid graphics and tables, use standard headings and common fonts",
    icon: "🤖",
    category: "ATS"
  },
  {
    title: "Highlight Technical Skills",
    description: "Create a dedicated skills section with relevant technologies and tools",
    icon: "⚡",
    category: "Skills"
  },
  {
    title: "Show Career Progression",
    description: "Demonstrate growth and increasing responsibility in your experience",
    icon: "📈",
    category: "Career"
  }
]

export default function ResumeDashboard() {
  const [resumes, setResumes] = useState<ResumeTemplate[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const createNewResume = (role: RoleType) => {
    const newResume: ResumeTemplate = {
      id: Date.now().toString(),
      title: `${role.title} Resume`,
      role: role.title,
      lastUpdated: 'Just now',
      score: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    }
    setResumes(prev => [newResume, ...prev])
  }

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(resume => resume.id !== id))
    setShowDeleteConfirm(null)
  }

  const confirmDelete = (id: string) => {
    setShowDeleteConfirm(id)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗑️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Resume?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this resume? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteResume(showDeleteConfirm)}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Delete Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Build Your Dream Resume
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Create ATS-friendly resumes that get you noticed. 
            <span className="font-semibold text-blue-600"> Get hired faster with AI-powered optimization.</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600 font-medium">ATS Success Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2.5x</div>
            <div className="text-gray-600 font-medium">More Interviews</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">30min</div>
            <div className="text-gray-600 font-medium">Average Build Time</div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Template</h2>
            <Link 
              href="/resume/builder"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
            >
              <span>✨</span>
              Custom Resume
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobRoles.map((role) => (
              <div 
                key={role.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => createNewResume(role)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${role.gradient}`}></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{role.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                      {role.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                          +{role.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm group-hover:scale-105">
                    Start Building
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Optimization Tips */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Resume Optimization Tips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert advice to make your resume stand out and pass through ATS systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeTips.map((tip, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">{tip.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                        {tip.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Resumes Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">My Resumes</h2>
              <p className="text-gray-600 mt-2">Manage and edit your created resumes</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {resumes.length} resume{resumes.length !== 1 ? 's' : ''} created
              </span>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Choose a template above to create your first professional resume
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => confirmDelete(resume.id)}
                    className="absolute top-4 right-4 p-2 bg-red-50 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-100 hover:scale-110"
                    title="Delete resume"
                  >
                    <span className="text-lg">🗑️</span>
                  </button>

                  <Link href={`/resume/${resume.id}`} className="block">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                          {resume.title}
                        </h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                          {resume.role}
                        </span>
                      </div>
                      <div className="text-2xl">📄</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Last updated</span>
                        <span className="text-gray-700 font-medium">{resume.lastUpdated}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">AI Score</span>
                        <span className={`font-semibold ${
                          resume.score >= 80 ? 'text-green-600' : 
                          resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {resume.score}%
                        </span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <div className="w-full bg-gray-100 text-gray-700 text-center py-2 rounded-xl hover:bg-gray-200 transition-all font-semibold text-sm group-hover:bg-blue-50 group-hover:text-blue-600">
                          Edit Resume →
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 text-sm">
              Get instant feedback on your resume's strength and areas for improvement with our intelligent AI analyzer.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">ATS Optimized</h3>
            <p className="text-gray-600 text-sm">
              Ensure your resume passes through Applicant Tracking Systems with keyword optimization and proper formatting.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200">
            <div className="text-2xl mb-3">📥</div>
            <h3 className="font-bold text-gray-900 mb-2">One-Click Download</h3>
            <p className="text-gray-600 text-sm">
              Download professionally formatted PDF resumes instantly, ready to send to employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}