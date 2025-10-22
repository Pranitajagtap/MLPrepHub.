// app/careers/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const careerData = {
  'full-stack': {
    title: 'Full Stack Developer',
    description: 'Build complete web applications from frontend to backend. Master both client-side and server-side technologies to create seamless digital experiences.',
    salary: '₹5-15L for freshers | ₹15-40L for experienced',
    demand: 'Very High',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Git', 'REST APIs', 'HTML/CSS', 'TypeScript'],
    growth: '22% (Much faster than average)',
    companies: ['Google', 'Meta', 'Netflix', 'Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Startups'],
    icon: '💻',
    learningTime: '6-9 months',
    responsibilities: [
      'Develop and maintain web applications',
      'Design user interfaces and experiences',
      'Build RESTful APIs and backend services',
      'Manage databases and server infrastructure',
      'Collaborate with designers and product managers'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Proficiency in JavaScript and frameworks',
      'Understanding of databases and web servers',
      'Knowledge of version control systems',
      'Problem-solving and communication skills'
    ],
    marketTrend: 'High demand across startups and enterprises',
    futureOutlook: 'Continuous growth with emerging technologies'
  },
  'data-scientist': {
    title: 'Data Scientist',
    description: 'Extract valuable insights from data using statistical analysis and machine learning. Help businesses make data-driven decisions and predictions.',
    salary: '₹6-18L for freshers | ₹18-45L for experienced',
    demand: 'High',
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Data Visualization'],
    growth: '31% (Much faster than average)',
    companies: ['Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'HCL', 'Analytics startups'],
    icon: '📊',
    learningTime: '8-12 months',
    responsibilities: [
      'Analyze and interpret complex data sets',
      'Build predictive models and machine learning algorithms',
      'Create data visualizations and reports',
      'Collaborate with business teams',
      'Develop data-driven strategies'
    ],
    requirements: [
      'Degree in Statistics, Mathematics, Computer Science',
      'Strong programming skills in Python/R',
      'Knowledge of machine learning algorithms',
      'Statistical analysis expertise',
      'Business acumen and communication skills'
    ],
    marketTrend: 'Growing demand across all industries',
    futureOutlook: 'Essential role in AI and analytics revolution'
  },
  'ml-engineer': {
    title: 'Machine Learning Engineer',
    description: 'Design, build, and deploy machine learning models and AI systems. Bridge the gap between data science and software engineering.',
    salary: '₹8-20L for freshers | ₹20-50L for experienced',
    demand: 'High',
    skills: ['Python', 'ML Algorithms', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Preprocessing', 'Model Deployment'],
    growth: '28% (Much faster than average)',
    companies: ['Google', 'Microsoft', 'Amazon', 'IBM', 'NVIDIA', 'Indian AI startups'],
    icon: '🧠',
    learningTime: '9-15 months',
    responsibilities: [
      'Design and implement ML models',
      'Preprocess and analyze data',
      'Deploy models to production',
      'Optimize model performance',
      'Collaborate with data scientists and engineers'
    ],
    requirements: [
      'Degree in Computer Science, AI/ML',
      'Strong programming and math skills',
      'Experience with ML frameworks',
      'Knowledge of software engineering principles',
      'Problem-solving abilities'
    ],
    marketTrend: 'Rapid growth in AI adoption',
    futureOutlook: 'Critical role in technological advancement'
  },
  'frontend': {
    title: 'Frontend Developer',
    description: 'Create beautiful, responsive, and interactive user interfaces. Focus on user experience and visual design implementation.',
    salary: '₹4-12L for freshers | ₹12-30L for experienced',
    demand: 'Medium',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js', 'UI/UX Design', 'Responsive Design', 'TypeScript'],
    growth: '18% (Faster than average)',
    companies: ['All tech companies', 'E-commerce', 'Media', 'Startups', 'Digital agencies'],
    icon: '🎨',
    learningTime: '5-8 months',
    responsibilities: [
      'Develop user-facing features',
      'Optimize applications for performance',
      'Ensure cross-browser compatibility',
      'Collaborate with backend developers',
      'Implement responsive designs'
    ],
    requirements: [
      'Proficiency in HTML, CSS, JavaScript',
      'Experience with frontend frameworks',
      'Understanding of UI/UX principles',
      'Knowledge of web performance optimization',
      'Attention to detail'
    ],
    marketTrend: 'Consistent demand with focus on user experience',
    futureOutlook: 'Evolving with new frameworks and technologies'
  },
  'backend': {
    title: 'Backend Developer',
    description: 'Build server-side logic, databases, and APIs. Ensure performance, reliability, and security of web applications.',
    salary: '₹6-16L for freshers | ₹16-40L for experienced',
    demand: 'High',
    skills: ['Node.js/Python/Java', 'Database', 'APIs', 'Cloud', 'Security', 'System Design', 'Microservices'],
    growth: '20% (Faster than average)',
    companies: ['All tech companies', 'Fintech', 'E-commerce', 'SaaS companies'],
    icon: '⚙️',
    learningTime: '7-10 months',
    responsibilities: [
      'Develop server-side logic',
      'Design and manage databases',
      'Build RESTful APIs',
      'Implement security measures',
      'Optimize application performance'
    ],
    requirements: [
      'Proficiency in server-side languages',
      'Database management skills',
      'Understanding of APIs and web services',
      'Knowledge of security principles',
      'System design capabilities'
    ],
    marketTrend: 'Strong demand across all digital businesses',
    futureOutlook: 'Growing importance with cloud and microservices'
  },
  'devops': {
    title: 'DevOps Engineer',
    description: 'Automate deployment and infrastructure management. Bridge development and operations for faster, reliable software delivery.',
    salary: '₹7-18L for freshers | ₹18-45L for experienced',
    demand: 'High',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Infrastructure as Code', 'Monitoring'],
    growth: '25% (Much faster than average)',
    companies: ['All tech companies', 'Cloud providers', 'Fintech', 'E-commerce'],
    icon: '🔧',
    learningTime: '8-12 months',
    responsibilities: [
      'Automate deployment processes',
      'Manage cloud infrastructure',
      'Implement CI/CD pipelines',
      'Monitor system performance',
      'Ensure system reliability and security'
    ],
    requirements: [
      'Experience with cloud platforms',
      'Knowledge of containerization',
      'Scripting and automation skills',
      'Understanding of networking and security',
      'Problem-solving mindset'
    ],
    marketTrend: 'Critical for modern software development',
    futureOutlook: 'Essential for cloud-native applications'
  },
  'mobile': {
    title: 'Mobile Developer',
    description: 'Create native and cross-platform mobile applications for iOS and Android platforms.',
    salary: '₹5-14L for freshers | ₹14-35L for experienced',
    demand: 'Medium',
    skills: ['React Native', 'Flutter', 'Swift/Kotlin', 'Mobile UI/UX', 'REST APIs', 'Firebase', 'App Store Deployment'],
    growth: '17% (Faster than average)',
    companies: ['Uber', 'Ola', 'Swiggy', 'Zomato', 'Fintech Apps', 'E-commerce Apps', 'Startups'],
    icon: '📱',
    learningTime: '6-9 months',
    responsibilities: [
      'Develop mobile applications for iOS/Android',
      'Implement responsive mobile UI/UX',
      'Integrate with backend APIs and services',
      'Optimize app performance and battery usage',
      'Publish apps to App Store and Play Store'
    ],
    requirements: [
      'Proficiency in mobile development frameworks',
      'Understanding of mobile design patterns',
      'Knowledge of REST APIs and mobile security',
      'Experience with app store deployment',
      'Cross-platform development skills'
    ],
    marketTrend: 'Growing demand for mobile-first solutions',
    futureOutlook: 'Continuous evolution with new mobile technologies'
  },
  'data-engineer': {
    title: 'Data Engineer',
    description: 'Build data pipelines and infrastructure for analytics. Ensure data availability, reliability, and scalability.',
    salary: '₹7-20L for freshers | ₹20-45L for experienced',
    demand: 'High',
    skills: ['Python', 'SQL', 'Big Data', 'ETL', 'Data Warehousing', 'Spark', 'Airflow', 'Cloud Platforms'],
    growth: '26% (Much faster than average)',
    companies: ['Amazon', 'Microsoft', 'Walmart', 'Jio', 'Banking & Finance', 'E-commerce'],
    icon: '📈',
    learningTime: '9-14 months',
    responsibilities: [
      'Design and build data pipelines',
      'Implement ETL processes and data warehousing',
      'Optimize data storage and retrieval',
      'Ensure data quality and governance',
      'Collaborate with data scientists and analysts'
    ],
    requirements: [
      'Strong programming and SQL skills',
      'Knowledge of big data technologies',
      'Experience with cloud data platforms',
      'Understanding of data modeling',
      'Problem-solving and architecture skills'
    ],
    marketTrend: 'Critical role in data-driven organizations',
    futureOutlook: 'Growing importance with big data and AI'
  },
  'cybersecurity': {
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from cyber threats. Implement security measures and respond to security incidents.',
    salary: '₹6-16L for freshers | ₹16-40L for experienced',
    demand: 'High',
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'SIEM', 'Risk Assessment', 'Security Tools', 'Compliance'],
    growth: '33% (Much faster than average)',
    companies: ['All enterprises', 'Banks', 'Government', 'Tech Companies', 'Security Firms'],
    icon: '🛡️',
    learningTime: '10-15 months',
    responsibilities: [
      'Monitor systems for security breaches',
      'Implement security controls and measures',
      'Conduct vulnerability assessments',
      'Respond to security incidents',
      'Develop security policies and procedures'
    ],
    requirements: [
      'Knowledge of networking and security principles',
      'Understanding of cyber threats and attacks',
      'Familiarity with security tools and frameworks',
      'Analytical and problem-solving skills',
      'Continuous learning mindset'
    ],
    marketTrend: 'Increasing demand due to digital transformation',
    futureOutlook: 'Critical role in protecting digital assets'
  },
  'cloud-engineer': {
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure and services. Optimize cloud resources and ensure scalability.',
    salary: '₹8-22L for freshers | ₹22-50L for experienced',
    demand: 'High',
    skills: ['AWS/Azure/GCP', 'Cloud Architecture', 'Networking', 'Security', 'Infrastructure as Code', 'Containerization'],
    growth: '27% (Much faster than average)',
    companies: ['All cloud users', 'Enterprises', 'SaaS Companies', 'Startups', 'Consulting Firms'],
    icon: '☁️',
    learningTime: '8-12 months',
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Manage cloud resources and costs',
      'Implement security and compliance measures',
      'Automate deployment and scaling',
      'Monitor and optimize cloud performance'
    ],
    requirements: [
      'Experience with cloud platforms (AWS/Azure/GCP)',
      'Knowledge of networking and security',
      'Infrastructure as Code skills',
      'Understanding of cloud architecture patterns',
      'Automation and scripting skills'
    ],
    marketTrend: 'Rapid adoption of cloud technologies',
    futureOutlook: 'Essential for modern IT infrastructure'
  },
  'ai-engineer': {
    title: 'AI Engineer',
    description: 'Develop artificial intelligence solutions and systems. Work on cutting-edge AI technologies and applications.',
    salary: '₹10-25L for freshers | ₹25-60L for experienced',
    demand: 'Very High',
    skills: ['Python', 'Deep Learning', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'AI Ethics'],
    growth: '35% (Much faster than average)',
    companies: ['Google', 'Microsoft', 'Amazon', 'IBM', 'AI startups', 'Research labs'],
    icon: '🤖',
    learningTime: '12-18 months',
    responsibilities: [
      'Develop AI models and algorithms',
      'Implement natural language processing',
      'Work on computer vision projects',
      'Optimize AI system performance',
      'Research and implement new AI techniques'
    ],
    requirements: [
      'Advanced degree in AI/ML preferred',
      'Strong mathematical foundation',
      'Experience with AI frameworks',
      'Research and development skills',
      'Ethical AI understanding'
    ],
    marketTrend: 'Explosive growth in AI applications',
    futureOutlook: 'Pioneering role in technological revolution'
  },
  'blockchain': {
    title: 'Blockchain Developer',
    description: 'Build decentralized applications and smart contracts. Work with blockchain technologies and Web3 ecosystems.',
    salary: '₹8-20L for freshers | ₹20-50L for experienced',
    demand: 'Emerging',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'Cryptography', 'DApps', 'Ethereum', 'Blockchain Protocols'],
    growth: '45% (Explosive growth)',
    companies: ['Crypto Startups', 'Fintech', 'Web3 Companies', 'Blockchain Platforms', 'Consulting'],
    icon: '⛓️',
    learningTime: '9-14 months',
    responsibilities: [
      'Develop smart contracts and DApps',
      'Implement blockchain solutions',
      'Ensure security of blockchain applications',
      'Integrate with traditional systems',
      'Research and implement new blockchain technologies'
    ],
    requirements: [
      'Understanding of blockchain fundamentals',
      'Proficiency in Solidity or other blockchain languages',
      'Knowledge of cryptography and security',
      'Web3 development experience',
      'Innovative and research-oriented mindset'
    ],
    marketTrend: 'Emerging field with high growth potential',
    futureOutlook: 'Pioneering role in decentralized technologies'
  }
}

export default function CareerDetailPage() {
  const params = useParams()
  const id = params.id as string
  const career = careerData[id as keyof typeof careerData] || careerData['full-stack']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/careers" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          ← Back to Careers
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{career.icon}</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {career.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {career.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Career Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Career Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">💰 Average Salary</h3>
                    <p className="text-2xl font-bold text-green-600">{career.salary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">📈 Job Growth</h3>
                    <p className="text-xl font-bold text-blue-600">{career.growth}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🔥 Market Demand</h3>
                    <p className="text-2xl font-bold text-orange-600">{career.demand}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🏢 Top Companies</h3>
                    <p className="text-lg text-gray-700">{career.companies.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Skills Required</h2>
              <div className="flex flex-wrap gap-3">
                {career.skills.map((skill, index) => (
                  <span key={index} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h3>
                <ul className="space-y-3">
                  {career.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {career.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Market Outlook */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Market Outlook</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📊 Current Trend</h3>
                  <p className="text-gray-700">{career.marketTrend}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔮 Future Outlook</h3>
                  <p className="text-gray-700">{career.futureOutlook}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
              <p className="text-blue-100 mb-6">
                Begin your path to becoming a {career.title} with our structured learning program.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">📚</div>
                  <span className="font-semibold">Structured Curriculum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🎯</div>
                  <span className="font-semibold">Real-world Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🤖</div>
                  <span className="font-semibold">AI-Powered Guidance</span>
                </div>
              </div>

              <Link 
                href={`/careers/${id}/learn`}
                className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Explore Learning Path
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Outlook</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Remote Opportunities</span>
                  <span className="font-semibold text-green-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Learning Curve</span>
                  <span className="font-semibold text-orange-600">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Career Flexibility</span>
                  <span className="font-semibold text-blue-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entry Barrier</span>
                  <span className="font-semibold text-yellow-600">Medium</span>
                </div>
              </div>
            </div>

            {/* Learning Time */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Timeline</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{career.learningTime}</div>
                <p className="text-gray-600">to become job-ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href={`/careers/${id}/learn`}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-lg mb-2">Learning Path</h3>
              <p className="text-green-100">Structured curriculum with projects</p>
            </Link>
            
            <Link 
              href={`/careers/${id}/assessment`}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-lg mb-2">Skill Assessment</h3>
              <p className="text-blue-100">Test your current knowledge</p>
            </Link>
            
            <Link 
              href={`/careers/${id}/community`}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-purple-100">Connect with other learners</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}