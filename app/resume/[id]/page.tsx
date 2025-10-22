// app/resume/[id]/page.tsx
'use client'

import { useState, useRef, use, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ResumeForm from '../components/ResumeForm'
import FloatingChatbot from '../components/FloatingChatbot'
import { ResumeData, ResumeFormData } from '../types'

interface PageProps {
  params: Promise<{ id: string }>
}

// Example templates
const exampleTemplates = {
  experiences: [
    {
      company: "Tech Company Inc.",
      position: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Led development of customer-facing web applications using React and TypeScript",
      achievements: [
        "Improved application performance by 40% through code optimization and lazy loading",
        "Mentored 3 junior developers and conducted weekly code reviews",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      period: "2016 - 2020",
      gpa: "3.8/4.0"
    }
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
      link: "https://github.com/username/ecommerce"
    }
  ],
  summaries: [
    "Experienced Full Stack Developer with 4+ years building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating efficient solutions and mentoring team members.",
    "Frontend Specialist with expertise in modern JavaScript frameworks. Focus on creating responsive, user-friendly interfaces with optimal performance and accessibility standards."
  ]
}

function getEmptyResumeData(id: string): ResumeData {
  return {
    id: id,
    title: 'My Resume',
    role: '',
    personalInfo: { 
      name: '', 
      email: '', 
      phone: '', 
      location: '', 
      portfolio: '', 
      linkedin: '' 
    },
    summary: '',
    skills: [],
    experiences: [],
    education: [],
    projects: [],
    certifications: [], // Add this
    lastUpdated: 'Just now',
    score: 0
  }
}

export default function ResumeEditor({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const resumePreviewRef = useRef<HTMLDivElement>(null)
  const [showExamples, setShowExamples] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [resumeData, setResumeData] = useState<ResumeData>(() => getEmptyResumeData(resolvedParams.id))

  // Load resume data from database
  useEffect(() => {
    const loadResume = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/resumes/${resolvedParams.id}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data) {
            // Map the API response to your ResumeData structure
            setResumeData({
              id: data.id || resolvedParams.id,
              title: data.title || 'My Resume',
              role: data.role || '',
              personalInfo: data.personalInfo || { 
                name: '', 
                email: '', 
                phone: '', 
                location: '', 
                portfolio: '', 
                linkedin: '' 
              },
              summary: data.summary || '',
              skills: data.skills || [],
              experiences: data.experiences || [],
              education: data.education || [],
              projects: data.projects || [],
              certifications: data.certifications || [], // Add this line
              lastUpdated: data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'Just now',
              score: data.aiScore || 0
            })
          }
        } else if (response.status === 404) {
          // Resume doesn't exist, check if it's a new one
          const isNewResume = /^\d+$/.test(resolvedParams.id) && parseInt(resolvedParams.id) > Date.now() - 60000
          if (!isNewResume) {
            router.push('/resume/builder')
            return
          }
          // For new resumes, we'll create it when they first save
        }
      } catch (error) {
        console.error('Error loading resume:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResume()
  }, [resolvedParams.id, router])

  // Extract form data for the ResumeForm component
  const formData: ResumeFormData = {
    personalInfo: resumeData.personalInfo,
    summary: resumeData.summary,
    skills: resumeData.skills,
    experiences: resumeData.experiences,
    education: resumeData.education,
    projects: resumeData.projects,
    certifications: resumeData.certifications
  }

  // Update function that handles ResumeFormData and merges it with existing ResumeData
  const updateFormData = (newFormData: ResumeFormData | ((prev: ResumeFormData) => ResumeFormData)) => {
    if (typeof newFormData === 'function') {
      setResumeData(prev => {
        const updatedFormData = newFormData({
          personalInfo: prev.personalInfo,
          summary: prev.summary,
          skills: prev.skills,
          experiences: prev.experiences,
          education: prev.education,
          projects: prev.projects,
          certifications: prev.certifications
        })
        return {
          ...prev,
          ...updatedFormData
        }
      })
    } else {
      setResumeData(prev => ({
        ...prev,
        ...newFormData
      }))
    }
  }

  const handleRoleChange = (newRole: string) => {
    setResumeData(prev => ({
      ...prev,
      role: newRole
    }))
  }

  const handleSave = async () => {
    try {
      const updatedData = {
        ...resumeData,
        lastUpdated: new Date().toLocaleString(),
        score: calculateScore(resumeData)
      }
      
      console.log('🔄 Saving resume data:', {
        id: resolvedParams.id,
        data: updatedData
      })

      // Save to Neon database
      const response = await fetch(`/api/resumes/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedData.title,
          role: updatedData.role,
          summary: updatedData.summary,
          personalInfo: updatedData.personalInfo,
          skills: updatedData.skills,
          experiences: updatedData.experiences,
          education: updatedData.education,
          projects: updatedData.projects,
          certifications: updatedData.certifications || [], // Add this if missing
          score: updatedData.score, // Make sure this matches aiScore in API
          updatedAt: new Date().toISOString() 
        })
      })

      console.log('📨 API Response status:', response.status, response.statusText)

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Save successful:', result)
      setResumeData(prev => ({
        ...prev,
        ...result.resume,
        lastUpdated: new Date().toLocaleString()
      }))
      alert('Resume saved successfully! 💾')
    } else {
      // Try to get the actual error message from the API
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
        console.error('❌ API Error details:', errorData)
      } catch (e) {
        console.error('❌ Could not parse error response:', e)
      }
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('💥 Error saving resume:', error)
    alert('Error saving resume: ' + (error as Error).message)
  }
}

  const calculateScore = (data: ResumeData): number => {
    let score = 0
    if (data.personalInfo.name) score += 10
    if (data.personalInfo.email) score += 10
    if (data.summary.length > 50) score += 15
    if (data.skills.length >= 5) score += 15
    if (data.experiences.length > 0) score += 20
    if (data.education.length > 0) score += 15
    if (data.projects.length > 0) score += 15
    return Math.min(score, 100)
  }

  const handleDownloadPDF = () => {
    if (!resumePreviewRef.current) {
      alert('Cannot generate PDF. Please try again.')
      return
    }

    // Create a print-friendly version
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow popups to download PDF')
      return
    }

    // Get the resume content
    const resumeContent = resumePreviewRef.current.innerHTML

    // Create print-optimized HTML
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${resumeData.personalInfo.name || 'Professional Resume'}</title>
        <style>
          /* Professional Resume Styles */
          @media print {
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
          
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Calibri', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.4;
              color: #2d3748;
              font-size: 11pt;
              background: #ffffff;
            }
          
            .resume-container {
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm;
              background: white;
            }
          
            /* Header Section */
            .header { 
              text-align: center; 
              margin-bottom: 25px;
              padding-bottom: 20px;
              border-bottom: 2px solid #2c5282;
            }
          
            .header h1 { 
              font-size: 24pt; 
              margin: 0 0 8px 0;
              color: #2d3748;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
          
            .role {
              font-size: 14pt;
              color: #4a5568;
              margin-bottom: 12px;
              font-weight: 500;
            }
          
            .contact-info { 
              display: flex; 
              justify-content: center; 
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 8px;
              font-size: 10pt;
            }
          
            .contact-item {
              display: flex;
              align-items: center;
              gap: 4px;
            }
          
            .links { 
              display: flex; 
              justify-content: center; 
              gap: 15px;
              font-size: 10pt;
            }
          
            .link-item {
              color: #2c5282;
              text-decoration: none;
            }
          
            /* Sections */
            .section { 
              margin-bottom: 18px; 
              page-break-inside: avoid;
            }
          
            .section-header { 
              font-size: 12pt; 
              margin-bottom: 12px;
              color: #2c5282;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 4px;
            }
          
            /* Summary */
            .summary {
              font-size: 10.5pt;
              line-height: 1.5;
              color: #4a5568;
              text-align: justify;
            }
          
            /* Skills */
            .skills { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 6px; 
            }
          
            .skill { 
              background: #edf2f7; 
              padding: 3px 10px; 
              border-radius: 4px; 
              font-size: 9pt;
              color: #4a5568;
              border: 1px solid #e2e8f0;
            }
          
            /* Experience & Education Items */
            .experience-item, .education-item, .project-item { 
              margin-bottom: 14px;
              page-break-inside: avoid;
            }
          
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 6px;
            }
          
            .item-title {
              font-weight: 600;
              color: #2d3748;
              font-size: 10.5pt;
            }
          
            .item-subtitle {
              color: #4a5568;
              font-size: 10pt;
              font-style: italic;
              margin-bottom: 4px;
            }
          
            .period { 
              background: #f7fafc; 
              padding: 2px 8px; 
              border-radius: 4px; 
              font-size: 9pt;
              color: #718096;
              border: 1px solid #e2e8f0;
              white-space: nowrap;
            }
          
            .description { 
              font-size: 10pt; 
              line-height: 1.5;
              color: #4a5568;
              margin-bottom: 6px;
            }
          
            .achievements { 
              margin-top: 6px; 
              padding-left: 16px;
            }
          
            .achievements li { 
              margin-bottom: 3px; 
              font-size: 9.5pt;
              color: #4a5568;
              line-height: 1.4;
            }
          
            /* Projects */
            .technologies { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 5px; 
              margin: 6px 0;
            }
          
            .tech { 
              background: #ebf8ff; 
              padding: 2px 8px; 
              border-radius: 4px; 
              font-size: 8.5pt;
              color: #2b6cb0;
              border: 1px solid #bee3f8;
            }
          
            .project-link {
              color: #2c5282;
              font-size: 9.5pt;
              text-decoration: none;
            }
          
            /* Print Optimizations */
            @page { 
              margin: 0;
              size: A4;
            }
          
            /* Avoid breaking inside important elements */
            .section, .experience-item, .education-item, .project-item {
              page-break-inside: avoid;
            }
          
            /* Ensure proper spacing after page breaks */
            .section:first-child {
              page-break-before: avoid;
            }
          }
        
          /* Screen preview styles */
          @media screen {
            body { 
              background: #f7fafc; 
              padding: 20px;
              font-family: 'Calibri', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .resume-container {
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm;
              background: white;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              border-radius: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          ${resumeContent}
        </div>
        <script>
          window.onload = function() {
            // Add a small delay to ensure all content is rendered
            setTimeout(() => {
              window.print();
              // Close window after print dialog is closed (longer timeout for better UX)
              setTimeout(() => {
                window.close();
              }, 500);
            }, 250);
          }
        
          // Fallback in case onload doesn't fire
          document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                window.close();
              }, 500);
            }, 250);
          });
        </script>
      </body>
    </html>
  `)

    printWindow.document.close()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading your resume...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">{resumeData.title}</h1>
              <div className="relative">
                <input
                  type="text"
                  value={resumeData.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  placeholder="Enter your role..."
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold border-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none min-w-[150px]"
                />
              </div>
            </div>
            <p className="text-gray-600">Edit and preview your resume in real-time</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span>🕒 Updated {resumeData.lastUpdated}</span>
              <span className={`font-semibold ${
                resumeData.score >= 80 ? 'text-green-600' : 
                resumeData.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                Score: {resumeData.score}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/resume"
              className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all font-semibold text-sm"
            >
              ← Back
            </Link>
            <button 
              onClick={() => setShowExamples('menu')}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-all font-semibold text-sm"
            >
              📚 Examples
            </button>

            {/* Replace the button with Link */}
            <Link 
              href={`/resume/analyze?id=${resolvedParams.id}`}
              className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition-all font-semibold text-sm flex items-center gap-2"
            >
              🤖 Analyze
            </Link>
            <button 
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all font-semibold text-sm"
            >
              💾 Save
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all font-semibold text-sm"
            >
              📥 PDF
            </button>
          </div>
        </div>

        {/* Examples Modal */}
        {showExamples && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Resume Examples & Tips</h3>
                <button 
                  onClick={() => setShowExamples(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {showExamples === 'menu' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-2xl mb-3">💼</div>
                    <h4 className="font-bold text-gray-900 mb-2">Work Experience</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Focus on quantifiable achievements and relevant technologies. Use action verbs and include metrics.
                    </p>
                    <button 
                      onClick={() => setShowExamples('experience')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                    >
                      View Examples
                    </button>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <div className="text-2xl mb-3">🎓</div>
                    <h4 className="font-bold text-gray-900 mb-2">Education</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Include degrees, institutions, relevant coursework, and academic achievements.
                    </p>
                    <button 
                      onClick={() => setShowExamples('education')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                    >
                      View Examples
                    </button>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-2xl mb-3">🚀</div>
                    <h4 className="font-bold text-gray-900 mb-2">Projects</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Showcase personal or academic projects. Include technologies used and outcomes achieved.
                    </p>
                    <button 
                      onClick={() => setShowExamples('projects')}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-semibold"
                    >
                      View Examples
                    </button>
                  </div>
                  
                  <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                    <div className="text-2xl mb-3">📝</div>
                    <h4 className="font-bold text-gray-900 mb-2">Professional Summary</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Write a compelling overview of your skills, experience, and career objectives.
                    </p>
                    <button 
                      onClick={() => setShowExamples('summary')}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold"
                    >
                      View Examples
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h4 className="font-bold text-2xl text-gray-900 capitalize mb-6 border-b pb-4">
                    {showExamples} Examples
                  </h4>
                  
                  {showExamples === 'experience' && exampleTemplates.experiences.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                      <h5 className="font-bold text-lg text-gray-900 mb-4">Senior Developer Example</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">{example.position}</div>
                            <div className="text-gray-700 font-medium">{example.company}</div>
                          </div>
                          <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded">
                            {example.period}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{example.description}</p>
                        <ul className="space-y-2">
                          {example.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start">
                              <span className="text-green-500 mr-2 mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  
                  {showExamples === 'education' && exampleTemplates.education.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                      <h5 className="font-bold text-lg text-gray-900 mb-4">University Education Example</h5>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{example.degree}</div>
                          <div className="text-gray-700">{example.institution}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-600 text-sm">{example.period}</div>
                          {example.gpa && <div className="text-gray-600 text-sm">GPA: {example.gpa}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {showExamples === 'projects' && exampleTemplates.projects.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                      <h5 className="font-bold text-lg text-gray-900 mb-4">Project Example</h5>
                      <div className="space-y-3">
                        <div className="font-semibold text-gray-900">{example.name}</div>
                        <p className="text-gray-600 text-sm">{example.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {example.technologies.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {example.link && (
                          <a href={example.link} className="text-blue-600 text-sm hover:underline inline-block">
                            View Project →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {showExamples === 'summary' && exampleTemplates.summaries.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                      <h5 className="font-bold text-lg text-gray-900 mb-4">Summary Example #{index + 1}</h5>
                      <p className="text-gray-700 leading-relaxed">{example}</p>
                    </div>
                  ))}
                  
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => setShowExamples('menu')}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      ← Back to Menu
                    </button>
                    <button
                      onClick={() => setShowExamples(null)}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Close Examples
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor - ON LEFT */}
          <div className="space-y-6">
            <ResumeForm 
              resumeData={formData} 
              setResumeData={updateFormData}
            />
          </div>

          {/* Preview - ON RIGHT */}
          <div className="sticky top-6">
            <div ref={resumePreviewRef} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {resumeData.personalInfo.name || 'Your Name'}
                </h1>
                {resumeData.role && (
                  <div className="text-xl text-gray-600 mb-4 font-medium">
                    {resumeData.role}
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-4 text-gray-600 mb-4">
                  {resumeData.personalInfo.email && (
                    <span className="flex items-center gap-1">
                      <span>📧</span>
                      {resumeData.personalInfo.email}
                    </span>
                  )}
                  {resumeData.personalInfo.phone && (
                    <span className="flex items-center gap-1">
                      <span>📱</span>
                      {resumeData.personalInfo.phone}
                    </span>
                  )}
                  {resumeData.personalInfo.location && (
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {resumeData.personalInfo.location}
                    </span>
                  )}
                </div>
                <div className="flex justify-center gap-4 text-blue-600">
                  {resumeData.personalInfo.portfolio && (
                    <a href={resumeData.personalInfo.portfolio} className="hover:underline">Portfolio</a>
                  )}
                  {resumeData.personalInfo.linkedin && (
                    <a href={resumeData.personalInfo.linkedin} className="hover:underline">LinkedIn</a>
                  )}
                </div>
              </div>

              {resumeData.summary && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                </div>
              )}

              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resumeData.experiences.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Work Experience</h3>
                  {resumeData.experiences.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-900">{exp.position}</span>
                        <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded">{exp.period}</span>
                      </div>
                      <div className="text-gray-700 font-medium mb-2">{exp.company}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {resumeData.education.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Education</h3>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-900">{edu.degree}</div>
                        <div className="text-gray-700">{edu.institution}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-600 text-sm">{edu.period}</div>
                        {edu.gpa && <div className="text-gray-600 text-sm">GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.projects.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Projects</h3>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="font-semibold text-gray-900 mb-1">{project.name}</div>
                      <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a href={project.link} className="text-blue-600 text-sm hover:underline">
                          View Project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FloatingChatbot />
    </div>
  )
}