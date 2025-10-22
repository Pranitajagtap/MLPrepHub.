import Link from 'next/link'

export default function CareersPage() {
  const careers = [
    {
      id: 'full-stack',
      title: 'Full Stack Developer',
      description: 'Build complete web applications from frontend to backend',
      demand: 'High',
      salary: '₹5-15L for freshers',
      skills: ['JavaScript', 'React', 'Node.js', 'Database', 'APIs'],
      match: 85,
      gradient: 'from-blue-500 to-cyan-500',
      icon: '💻',
      learningTime: '6-9 months'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Extract insights from data and build predictive models',
      demand: 'High',
      salary: '₹6-18L for freshers',
      skills: ['Python', 'Statistics', 'ML', 'SQL', 'Data Analysis'],
      match: 78,
      gradient: 'from-green-500 to-emerald-500',
      icon: '📊',
      learningTime: '8-12 months'
    },
    {
      id: 'ml-engineer',
      title: 'Machine Learning Engineer',
      description: 'Design and implement AI/ML models and systems',
      demand: 'High',
      salary: '₹8-20L for freshers',
      skills: ['Python', 'ML Algorithms', 'Deep Learning', 'TensorFlow'],
      match: 72,
      gradient: 'from-purple-500 to-pink-500',
      icon: '🧠',
      learningTime: '9-15 months'
    },
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'Create beautiful and responsive user interfaces',
      demand: 'Medium',
      salary: '₹4-12L for freshers',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX'],
      match: 65,
      gradient: 'from-orange-500 to-red-500',
      icon: '🎨',
      learningTime: '5-8 months'
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      description: 'Build server-side logic and database architecture',
      demand: 'High',
      salary: '₹6-16L for freshers',
      skills: ['Node.js/Python', 'Database', 'APIs', 'Cloud', 'Security'],
      match: 70,
      gradient: 'from-indigo-500 to-purple-500',
      icon: '⚙️',
      learningTime: '7-10 months'
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      description: 'Automate deployment and infrastructure management',
      demand: 'High',
      salary: '₹7-18L for freshers',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      match: 68,
      gradient: 'from-teal-500 to-blue-500',
      icon: '🔧',
      learningTime: '8-12 months'
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      description: 'Create native and cross-platform mobile applications',
      demand: 'Medium',
      salary: '₹5-14L for freshers',
      skills: ['React Native', 'Flutter', 'iOS/Android', 'APIs'],
      match: 62,
      gradient: 'from-pink-500 to-rose-500',
      icon: '📱',
      learningTime: '6-9 months'
    },
    {
      id: 'data-engineer',
      title: 'Data Engineer',
      description: 'Build data pipelines and infrastructure for analytics',
      demand: 'High',
      salary: '₹7-20L for freshers',
      skills: ['Python', 'SQL', 'Big Data', 'ETL', 'Data Warehousing'],
      match: 75,
      gradient: 'from-amber-500 to-orange-500',
      icon: '📈',
      learningTime: '9-14 months'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Analyst',
      description: 'Protect systems and networks from cyber threats',
      demand: 'High',
      salary: '₹6-16L for freshers',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'SIEM'],
      match: 58,
      gradient: 'from-red-500 to-pink-500',
      icon: '🛡️',
      learningTime: '10-15 months'
    },
    {
      id: 'cloud-engineer',
      title: 'Cloud Engineer',
      description: 'Design and manage cloud infrastructure and services',
      demand: 'High',
      salary: '₹8-22L for freshers',
      skills: ['AWS/Azure', 'Cloud Architecture', 'Networking', 'Security'],
      match: 64,
      gradient: 'from-sky-500 to-blue-500',
      icon: '☁️',
      learningTime: '8-12 months'
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      description: 'Develop artificial intelligence solutions and systems',
      demand: 'Very High',
      salary: '₹10-25L for freshers',
      skills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow'],
      match: 80,
      gradient: 'from-violet-500 to-purple-500',
      icon: '🤖',
      learningTime: '12-18 months'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Developer',
      description: 'Build decentralized applications and smart contracts',
      demand: 'Emerging',
      salary: '₹8-20L for freshers',
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'Cryptography'],
      match: 55,
      gradient: 'from-gray-500 to-blue-500',
      icon: '⛓️',
      learningTime: '9-14 months'
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Explore 12+ Career Opportunities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tech Career Paths
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect tech career with structured learning paths and 
            <span className="font-semibold text-blue-600"> personalized job market insights</span>
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div 
              key={career.id} 
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${career.gradient}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{career.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{career.description}</p>
                    </div>
                  </div>
                  <span className={`bg-${
                    career.demand === 'Very High' ? 'red' : 
                    career.demand === 'High' ? 'green' : 
                    career.demand === 'Emerging' ? 'purple' : 'yellow'
                  }-100 text-${
                    career.demand === 'Very High' ? 'red' : 
                    career.demand === 'High' ? 'green' : 
                    career.demand === 'Emerging' ? 'purple' : 'yellow'
                  }-800 text-xs px-2 py-1 rounded-full font-semibold`}>
                    {career.demand}
                  </span>
                </div>
                
                {/* Progress Match */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">Profile Match</span>
                    <span className="font-semibold text-gray-900">{career.match}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full bg-linear-to-r ${career.gradient} transition-all duration-1000 ease-out`}
                      style={{ width: `${career.match}%` }}
                    ></div>
                  </div>
                </div>

                {/* Learning Time & Salary */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600">⏱️ {career.learningTime}</span>
                  <span className="font-bold text-green-600">{career.salary}</span>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                        +{career.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link 
                    href={`/careers/${career.id}`}
                    className="block w-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-center py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                  >
                    Explore Path
                  </Link>
                  <Link 
                    href={`/careers/${career.id}/learn`}
                    className="block w-full border border-blue-500 text-blue-600 text-center py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-sm"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div>
              <div className="text-2xl font-bold text-blue-600">12+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-gray-600">Job Placement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">6-18</div>
              <div className="text-gray-600">Months to Job Ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">₹4-25L</div>
              <div className="text-gray-600">Starting Salary Range</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}