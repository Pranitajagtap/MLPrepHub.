// components/ResumeForm.tsx
'use client'

import { useState } from 'react'
import { ResumeFormData, Experience, Education, Project, Certification } from '../types'

interface ResumeFormProps {
  resumeData: ResumeFormData;
  setResumeData: (data: ResumeFormData | ((prev: ResumeFormData) => ResumeFormData)) => void;
}

export default function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<string>('personal')

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      period: '',
      description: '',
      achievements: ['']
    }
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }))
  }

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addAchievement = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }))
  }

  const updateAchievement = (expIndex: number, achievementIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.map((ach, j) => 
            j === achievementIndex ? value : ach
          )
        } : exp
      )
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      period: '',
      gpa: ''
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      name: '',
      description: '',
      technologies: [''],
      link: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }))
  }

  const addTechnology = (projectIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projectIndex ? { ...proj, technologies: [...proj.technologies, ''] } : proj
      )
    }))
  }

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projectIndex ? {
          ...proj,
          technologies: proj.technologies.map((tech, j) => 
            j === techIndex ? value : tech
          )
        } : proj
      )
    }))
  }

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  // Certification functions
  const addCertification = () => {
    const newCertification: Certification = {
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      link: ''
    }
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }))
  }

  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {['personal', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              activeSection === section
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section === 'personal' ? 'Personal Info' : section}
          </button>
        ))}
      </div>

      {/* Personal Information */}
      {activeSection === 'personal' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={resumeData.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="+91 38732 46809"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
              <input
                type="url"
                value={resumeData.personalInfo.portfolio}
                onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
          </div>
        </div>
      )}

      {/* Professional Summary */}
      {activeSection === 'summary' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h3>
          <p className="text-gray-600 text-sm mb-4">
            Write a brief overview of your professional background, skills, and career goals.
          </p>
          <textarea
            value={resumeData.summary}
            onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="Experienced software developer with 3+ years of expertise in web development..."
          />
        </div>
      )}

      {/* Skills */}
      {activeSection === 'skills' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Skills</h3>
          <p className="text-gray-600 text-sm mb-4">
            Add your technical skills, programming languages, tools, and frameworks.
          </p>
          <div className="space-y-3">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...resumeData.skills]
                    newSkills[index] = e.target.value
                    setResumeData(prev => ({ ...prev, skills: newSkills }))
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
                <button
                  onClick={() => {
                    const newSkills = resumeData.skills.filter((_, i) => i !== index)
                    setResumeData(prev => ({ ...prev, skills: newSkills }))
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => setResumeData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              + Add Skill
            </button>
          </div>
        </div>
      )}

      {/* Experience */}
      {activeSection === 'experience' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Experience</h3>
              <p className="text-gray-600 text-sm mt-1">
                Add your work experience. Focus on quantifiable achievements and relevant technologies.
              </p>
            </div>
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>+</span> Add Experience
            </button>
          </div>

          {resumeData.experiences.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">💼</div>
              <p className="text-gray-600">No experience added yet</p>
              <p className="text-gray-500 text-sm mt-1">Click "Add Experience" to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900">Experience #{index + 1}</h4>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(index, 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., 2022 - Present"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="Describe your role and responsibilities..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                            placeholder="e.g., Improved performance by 40%"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => addAchievement(index)}
                        className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {activeSection === 'education' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Education</h3>
              <p className="text-gray-600 text-sm mt-1">
                Add your educational background including degrees, institutions, and relevant coursework.
              </p>
            </div>
            <button
              onClick={addEducation}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>+</span> Add Education
            </button>
          </div>

          {resumeData.education.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">🎓</div>
              <p className="text-gray-600">No education added yet</p>
              <p className="text-gray-500 text-sm mt-1">Click "Add Education" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900">Education #{index + 1}</h4>
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., University of Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(index, 'period', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., 2016 - 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Projects</h3>
              <p className="text-gray-600 text-sm mt-1">
                Showcase your personal or academic projects. Include technologies used and outcomes.
              </p>
            </div>
            <button
              onClick={addProject}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>+</span> Add Project
            </button>
          </div>

          {resumeData.projects.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">🚀</div>
              <p className="text-gray-600">No projects added yet</p>
              <p className="text-gray-500 text-sm mt-1">Click "Add Project" to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900">Project #{index + 1}</h4>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., E-Commerce Platform"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="Describe the project and its purpose..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                      <div className="space-y-2">
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                              placeholder="e.g., React, Node.js, MongoDB"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => addTechnology(index)}
                          className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                        >
                          + Add Technology
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certifications */}
      {activeSection === 'certifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
              <p className="text-gray-600 text-sm mt-1">
                Add professional certifications, licenses, and credentials.
              </p>
            </div>
            <button
              onClick={addCertification}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
            >
              <span>+</span> Add Certification
            </button>
          </div>

          {resumeData.certifications.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-gray-600">No certifications added yet</p>
              <p className="text-gray-500 text-sm mt-1">Click "Add Certification" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900">Certification #{index + 1}</h4>
                    <button
                      onClick={() => removeCertification(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., AWS Certified Solutions Architect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Earned</label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => updateCertification(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., June 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID (Optional)</label>
                      <input
                        type="text"
                        value={cert.credentialId || ''}
                        onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="e.g., ABC123XYZ"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Credential URL (Optional)</label>
                      <input
                        type="url"
                        value={cert.link || ''}
                        onChange={(e) => updateCertification(index, 'link', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        placeholder="https://credential.net/your-certification"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}