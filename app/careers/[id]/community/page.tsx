// app/careers/[id]/community/page.tsx
'use client'

import Link from 'next/link'
import { use } from 'react'

const careerCommunities = {
  'full-stack': {
    title: 'Full Stack Developer Community',
    description: 'Connect with fellow full stack developers, share knowledge, and grow together.',
    members: '50K+',
    activeDiscussions: '2.3K',
    mentors: '150+',
    resources: [
      { name: 'Code Review Sessions', description: 'Get your code reviewed by experienced developers', icon: '🔍' },
      { name: 'Project Collaborations', description: 'Work on real-world projects with community members', icon: '🤝' },
      { name: 'Interview Preparation', description: 'Mock interviews and technical question practice', icon: '💼' },
      { name: 'Tech Talks & Webinars', description: 'Learn from industry experts and community leaders', icon: '🎤' },
      { name: 'Study Groups', description: 'Join focused learning groups for specific technologies', icon: '📚' },
      { name: 'Job Opportunities', description: 'Exclusive job postings from partner companies', icon: '🚀' }
    ],
    platforms: [
      { name: 'Discord Server', members: '25K+', description: 'Real-time chat, voice channels, and community events', link: '#' },
      { name: 'GitHub Organization', members: '15K+', description: 'Open source projects and collaborative coding', link: '#' },
      { name: 'LinkedIn Group', members: '8K+', description: 'Professional networking and career discussions', link: '#' },
      { name: 'Local Meetups', members: '2K+', description: 'In-person events and networking opportunities', link: '#' }
    ],
    upcomingEvents: [
      { title: 'React 18 Deep Dive Workshop', date: 'Dec 15, 2024', type: 'Virtual Workshop', attendees: '450+' },
      { title: 'Full Stack Project Hackathon', date: 'Dec 20, 2024', type: '48-hour Hackathon', attendees: '1.2K+' },
      { title: 'System Design Interview Prep', date: 'Jan 5, 2025', type: 'Study Session', attendees: '300+' }
    ]
  },
  'data-scientist': {
    title: 'Data Science Community',
    description: 'Join data enthusiasts, share insights, and collaborate on data projects.',
    members: '35K+',
    activeDiscussions: '1.8K',
    mentors: '120+',
    resources: [
      { name: 'Kaggle Competitions', description: 'Participate in data science competitions together', icon: '🏆' },
      { name: 'Research Paper Discussions', description: 'Break down latest research in data science', icon: '📄' },
      { name: 'Case Study Analysis', description: 'Analyze real business cases and solutions', icon: '🔍' },
      { name: 'Data Challenges', description: 'Weekly data analysis and modeling challenges', icon: '🎯' },
      { name: 'Industry Projects', description: 'Work on real industry data problems', icon: '🏢' },
      { name: 'ML Model Reviews', description: 'Get feedback on your machine learning models', icon: '🤖' }
    ],
    platforms: [
      { name: 'Kaggle Teams', members: '18K+', description: 'Competition teams and collaborative notebooks', link: '#' },
      { name: 'Discord Server', members: '12K+', description: 'Data discussions and project collaborations', link: '#' },
      { name: 'ResearchGate', members: '3K+', description: 'Academic discussions and research sharing', link: '#' },
      { name: 'Local Meetups', members: '2K+', description: 'Data science workshops and networking', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Time Series Analysis Workshop', date: 'Dec 18, 2024', type: 'Virtual Workshop', attendees: '380+' },
      { title: 'ML Model Deployment Masterclass', date: 'Dec 25, 2024', type: 'Technical Session', attendees: '520+' },
      { title: 'Data Visualization Challenge', date: 'Jan 8, 2025', type: 'Competition', attendees: '850+' }
    ]
  },
  'ml-engineer': {
    title: 'Machine Learning Engineering Community',
    description: 'Connect with ML engineers working on production AI systems.',
    members: '28K+',
    activeDiscussions: '1.5K',
    mentors: '100+',
    resources: [
      { name: 'Research Paper Discussions', description: 'Latest ML research and implementation insights', icon: '📚' },
      { name: 'Model Implementations', description: 'Collaborative implementation of research papers', icon: '⚡' },
      { name: 'Deployment Guides', description: 'Best practices for ML model deployment', icon: '🚀' },
      { name: 'AI Ethics Discussions', description: 'Ethical considerations in AI development', icon: '⚖️' },
      { name: 'MLOps Tutorials', description: 'End-to-end MLOps pipeline guides', icon: '🔧' },
      { name: 'Hackathons', description: 'ML-focused coding competitions', icon: '💻' }
    ],
    platforms: [
      { name: 'Discord Server', members: '15K+', description: 'Technical discussions and project help', link: '#' },
      { name: 'GitHub Organization', members: '8K+', description: 'Open source ML projects and tools', link: '#' },
      { name: 'ArXiv Discussions', members: '3K+', description: 'Research paper breakdowns and implementations', link: '#' },
      { name: 'AI Conferences', members: '2K+', description: 'Conference meetups and networking', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Transformer Architecture Workshop', date: 'Dec 22, 2024', type: 'Technical Deep Dive', attendees: '420+' },
      { title: 'ML System Design Challenge', date: 'Jan 3, 2025', type: 'Design Competition', attendees: '680+' },
      { title: 'Production ML Best Practices', date: 'Jan 12, 2025', type: 'Industry Panel', attendees: '350+' }
    ]
  },
  'frontend': {
    title: 'Frontend Developer Community',
    description: 'Join frontend developers creating amazing user experiences.',
    members: '45K+',
    activeDiscussions: '2.1K',
    mentors: '130+',
    resources: [
      { name: 'Design Challenges', description: 'UI/UX design and implementation challenges', icon: '🎨' },
      { name: 'Code Reviews', description: 'Get feedback on your frontend code', icon: '🔍' },
      { name: 'UI/UX Workshops', description: 'Learn design principles and best practices', icon: '✨' },
      { name: 'Framework Deep Dives', description: 'In-depth sessions on React, Vue, and more', icon: '⚡' },
      { name: 'Accessibility Guides', description: 'Learn to build accessible web applications', icon: '♿' },
      { name: 'Performance Optimization', description: 'Techniques for faster web experiences', icon: '🚀' }
    ],
    platforms: [
      { name: 'Discord Server', members: '22K+', description: 'Real-time discussions and coding sessions', link: '#' },
      { name: 'CodePen', members: '15K+', description: 'Share and discover creative frontend code', link: '#' },
      { name: 'Design Communities', members: '6K+', description: 'Connect with UI/UX designers', link: '#' },
      { name: 'Local Meetups', members: '2K+', description: 'In-person frontend development events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'React Performance Optimization', date: 'Dec 16, 2024', type: 'Workshop', attendees: '520+' },
      { title: 'CSS Grid & Flexbox Masterclass', date: 'Dec 23, 2024', type: 'Technical Session', attendees: '380+' },
      { title: 'Frontend Architecture Patterns', date: 'Jan 6, 2025', type: 'Study Group', attendees: '290+' }
    ]
  },
  'backend': {
    title: 'Backend Developer Community',
    description: 'Connect with backend engineers building scalable systems.',
    members: '38K+',
    activeDiscussions: '1.6K',
    mentors: '110+',
    resources: [
      { name: 'Architecture Discussions', description: 'Discuss system design and scalability', icon: '🏗️' },
      { name: 'Database Optimization', description: 'Learn database performance techniques', icon: '💾' },
      { name: 'API Design Patterns', description: 'Best practices for API development', icon: '🔗' },
      { name: 'Security Best Practices', description: 'Secure coding and vulnerability prevention', icon: '🛡️' },
      { name: 'Cloud Guides', description: 'Deployment and management on cloud platforms', icon: '☁️' },
      { name: 'Microservices Architecture', description: 'Designing distributed systems', icon: '🔧' }
    ],
    platforms: [
      { name: 'Discord Server', members: '20K+', description: 'Technical discussions and code reviews', link: '#' },
      { name: 'Stack Overflow', members: '12K+', description: 'Q&A and problem-solving community', link: '#' },
      { name: 'GitHub', members: '4K+', description: 'Open source backend projects', link: '#' },
      { name: 'Tech Blogs', members: '2K+', description: 'Share and read technical articles', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Microservices Design Patterns', date: 'Dec 17, 2024', type: 'Workshop', attendees: '450+' },
      { title: 'Database Performance Tuning', date: 'Dec 24, 2024', type: 'Technical Session', attendees: '320+' },
      { title: 'API Security Best Practices', date: 'Jan 7, 2025', type: 'Study Session', attendees: '280+' }
    ]
  },
  'devops': {
    title: 'DevOps Community',
    description: 'Join DevOps professionals automating and optimizing infrastructure.',
    members: '25K+',
    activeDiscussions: '1.2K',
    mentors: '90+',
    resources: [
      { name: 'Infrastructure Templates', description: 'Reusable infrastructure code', icon: '📁' },
      { name: 'CI/CD Guides', description: 'Automated deployment pipelines', icon: '🔄' },
      { name: 'Cloud Cost Optimization', description: 'Reduce cloud infrastructure costs', icon: '💰' },
      { name: 'Security Practices', description: 'DevSecOps and security automation', icon: '🔒' },
      { name: 'Tool Comparisons', description: 'Evaluate different DevOps tools', icon: '🛠️' },
      { name: 'Monitoring Solutions', description: 'System monitoring and alerting', icon: '📊' }
    ],
    platforms: [
      { name: 'Discord Server', members: '14K+', description: 'DevOps discussions and tool help', link: '#' },
      { name: 'DevOps Forums', members: '7K+', description: 'Community forums and Q&A', link: '#' },
      { name: 'Cloud Provider Communities', members: '3K+', description: 'Platform-specific discussions', link: '#' },
      { name: 'Local Meetups', members: '1K+', description: 'In-person DevOps events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Kubernetes Deep Dive', date: 'Dec 19, 2024', type: 'Workshop', attendees: '380+' },
      { title: 'Infrastructure as Code Patterns', date: 'Dec 26, 2024', type: 'Technical Session', attendees: '290+' },
      { title: 'Cloud Cost Optimization Strategies', date: 'Jan 9, 2025', type: 'Panel Discussion', attendees: '240+' }
    ]
  },
  'mobile': {
    title: 'Mobile Developer Community',
    description: 'Connect with mobile developers building amazing apps.',
    members: '32K+',
    activeDiscussions: '1.4K',
    mentors: '95+',
    resources: [
      { name: 'App Design Reviews', description: 'Get feedback on your app designs', icon: '📱' },
      { name: 'Cross-Platform Guides', description: 'React Native and Flutter best practices', icon: '🔄' },
      { name: 'Native Development', description: 'iOS and Android specific resources', icon: '📲' },
      { name: 'Performance Optimization', description: 'Mobile app performance techniques', icon: '⚡' },
      { name: 'App Store Optimization', description: 'Improve app visibility and downloads', icon: '📈' },
      { name: 'Testing Strategies', description: 'Mobile app testing methodologies', icon: '🧪' }
    ],
    platforms: [
      { name: 'Discord Server', members: '18K+', description: 'Mobile development discussions', link: '#' },
      { name: 'App Development Forums', members: '10K+', description: 'Platform-specific help', link: '#' },
      { name: 'GitHub', members: '3K+', description: 'Open source mobile projects', link: '#' },
      { name: 'Local Meetups', members: '1K+', description: 'Mobile development events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Flutter State Management', date: 'Dec 20, 2024', type: 'Workshop', attendees: '420+' },
      { title: 'iOS 18 New Features', date: 'Dec 27, 2024', type: 'Tech Talk', attendees: '350+' },
      { title: 'Mobile App Architecture', date: 'Jan 10, 2025', type: 'Study Session', attendees: '310+' }
    ]
  },
  'data-engineer': {
    title: 'Data Engineering Community',
    description: 'Join data engineers building robust data pipelines.',
    members: '22K+',
    activeDiscussions: '980+',
    mentors: '80+',
    resources: [
      { name: 'Pipeline Design Patterns', description: 'Data pipeline architecture', icon: '🏗️' },
      { name: 'Big Data Tools', description: 'Spark, Hadoop, and distributed computing', icon: '🔧' },
      { name: 'Data Quality Frameworks', description: 'Ensure data reliability', icon: '✅' },
      { name: 'Cloud Data Services', description: 'AWS, Azure, GCP data tools', icon: '☁️' },
      { name: 'ETL Best Practices', description: 'Data extraction and transformation', icon: '🔄' },
      { name: 'Data Governance', description: 'Data management and compliance', icon: '📋' }
    ],
    platforms: [
      { name: 'Discord Server', members: '12K+', description: 'Data engineering discussions', link: '#' },
      { name: 'Data Engineering Forums', members: '7K+', description: 'Technical Q&A community', link: '#' },
      { name: 'GitHub', members: '2K+', description: 'Open source data projects', link: '#' },
      { name: 'Industry Conferences', members: '1K+', description: 'Data engineering events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Apache Spark Optimization', date: 'Dec 21, 2024', type: 'Workshop', attendees: '380+' },
      { title: 'Real-time Data Processing', date: 'Dec 28, 2024', type: 'Technical Session', attendees: '290+' },
      { title: 'Data Mesh Architecture', date: 'Jan 11, 2025', type: 'Study Group', attendees: '260+' }
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity Community',
    description: 'Connect with security professionals protecting digital assets.',
    members: '28K+',
    activeDiscussions: '1.1K',
    mentors: '85+',
    resources: [
      { name: 'Threat Intelligence', description: 'Latest security threats and vulnerabilities', icon: '🔍' },
      { name: 'Security Tools', description: 'Penetration testing and monitoring tools', icon: '🛠️' },
      { name: 'Incident Response', description: 'Security breach handling procedures', icon: '🚨' },
      { name: 'Security Certifications', description: 'Preparation guides and study groups', icon: '📜' },
      { name: 'Compliance Frameworks', description: 'Security standards and regulations', icon: '📋' },
      { name: 'Ethical Hacking', description: 'Legal penetration testing techniques', icon: '🎯' }
    ],
    platforms: [
      { name: 'Discord Server', members: '16K+', description: 'Security discussions and alerts', link: '#' },
      { name: 'Security Forums', members: '8K+', description: 'Cybersecurity Q&A community', link: '#' },
      { name: 'GitHub', members: '3K+', description: 'Security tools and scripts', link: '#' },
      { name: 'Security Conferences', members: '1K+', description: 'Industry security events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Cloud Security Best Practices', date: 'Dec 22, 2024', type: 'Workshop', attendees: '420+' },
      { title: 'Threat Hunting Techniques', date: 'Dec 29, 2024', type: 'Technical Session', attendees: '310+' },
      { title: 'Security Compliance Frameworks', date: 'Jan 12, 2025', type: 'Study Session', attendees: '270+' }
    ]
  },
  'cloud-engineer': {
    title: 'Cloud Engineering Community',
    description: 'Join cloud engineers building scalable infrastructure.',
    members: '30K+',
    activeDiscussions: '1.3K',
    mentors: '100+',
    resources: [
      { name: 'Cloud Architecture', description: 'Design patterns for cloud solutions', icon: '🏗️' },
      { name: 'Cost Optimization', description: 'Reduce cloud spending strategies', icon: '💰' },
      { name: 'Multi-cloud Strategies', description: 'Working across multiple cloud platforms', icon: '☁️' },
      { name: 'Infrastructure as Code', description: 'Terraform, CloudFormation guides', icon: '🔧' },
      { name: 'Container Orchestration', description: 'Kubernetes and container management', icon: '📦' },
      { name: 'Disaster Recovery', description: 'Business continuity planning', icon: '🔄' }
    ],
    platforms: [
      { name: 'Discord Server', members: '18K+', description: 'Cloud engineering discussions', link: '#' },
      { name: 'Cloud Provider Forums', members: '9K+', description: 'Platform-specific communities', link: '#' },
      { name: 'GitHub', members: '2K+', description: 'Infrastructure as code templates', link: '#' },
      { name: 'Cloud Conferences', members: '1K+', description: 'Industry cloud events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'AWS Advanced Networking', date: 'Dec 23, 2024', type: 'Workshop', attendees: '450+' },
      { title: 'Kubernetes Security', date: 'Dec 30, 2024', type: 'Technical Session', attendees: '320+' },
      { title: 'Multi-cloud Architecture', date: 'Jan 13, 2025', type: 'Panel Discussion', attendees: '280+' }
    ]
  },
  'ai-engineer': {
    title: 'AI Engineering Community',
    description: 'Connect with AI engineers building intelligent systems.',
    members: '24K+',
    activeDiscussions: '900+',
    mentors: '75+',
    resources: [
      { name: 'Research Collaborations', description: 'Work on AI research projects', icon: '🤝' },
      { name: 'Model Implementations', description: 'Implement research papers together', icon: '⚡' },
      { name: 'Ethics Discussions', description: 'AI ethics and responsible AI', icon: '⚖️' },
      { name: 'Industry Applications', description: 'Real-world AI use cases', icon: '🏢' },
      { name: 'Advanced Tutorials', description: 'Cutting-edge AI techniques', icon: '📚' },
      { name: 'Model Deployment', description: 'Production AI system deployment', icon: '🚀' }
    ],
    platforms: [
      { name: 'Research Communities', members: '12K+', description: 'AI research discussions', link: '#' },
      { name: 'GitHub', members: '8K+', description: 'Open source AI projects', link: '#' },
      { name: 'AI Conferences', members: '3K+', description: 'AI research events', link: '#' },
      { name: 'Academic Networks', members: '1K+', description: 'Academic collaborations', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Transformer Architectures', date: 'Dec 24, 2024', type: 'Workshop', attendees: '380+' },
      { title: 'AI Model Optimization', date: 'Dec 31, 2024', type: 'Technical Session', attendees: '290+' },
      { title: 'Ethical AI Development', date: 'Jan 14, 2025', type: 'Panel Discussion', attendees: '250+' }
    ]
  },
  'blockchain': {
    title: 'Blockchain Developer Community',
    description: 'Join blockchain developers building decentralized applications.',
    members: '18K+',
    activeDiscussions: '750+',
    mentors: '60+',
    resources: [
      { name: 'Smart Contract Audits', description: 'Security reviews for smart contracts', icon: '🔍' },
      { name: 'DApp Development', description: 'Decentralized application guides', icon: '🌐' },
      { name: 'DeFi Protocols', description: 'Decentralized finance development', icon: '💰' },
      { name: 'NFT Development', description: 'Non-fungible token creation', icon: '🖼️' },
      { name: 'DAO Governance', description: 'Decentralized autonomous organizations', icon: '🏛️' },
      { name: 'Blockchain Security', description: 'Secure blockchain development', icon: '🛡️' }
    ],
    platforms: [
      { name: 'Discord Server', members: '10K+', description: 'Blockchain development discussions', link: '#' },
      { name: 'Web3 Forums', members: '5K+', description: 'Blockchain Q&A community', link: '#' },
      { name: 'GitHub', members: '2K+', description: 'Open source blockchain projects', link: '#' },
      { name: 'Blockchain Conferences', members: '1K+', description: 'Industry blockchain events', link: '#' }
    ],
    upcomingEvents: [
      { title: 'Smart Contract Security', date: 'Dec 25, 2024', type: 'Workshop', attendees: '320+' },
      { title: 'DeFi Protocol Development', date: 'Jan 1, 2025', type: 'Technical Session', attendees: '270+' },
      { title: 'Web3 Architecture Patterns', date: 'Jan 15, 2025', type: 'Study Group', attendees: '230+' }
    ]
  }
}

const careerTitles = {
  'full-stack': 'Full Stack Developer',
  'data-scientist': 'Data Scientist',
  'ml-engineer': 'Machine Learning Engineer',
  'frontend': 'Frontend Developer',
  'backend': 'Backend Developer',
  'devops': 'DevOps Engineer',
  'mobile': 'Mobile Developer',
  'data-engineer': 'Data Engineer',
  'cybersecurity': 'Cybersecurity Analyst',
  'cloud-engineer': 'Cloud Engineer',
  'ai-engineer': 'AI Engineer',
  'blockchain': 'Blockchain Developer'
}

export default function CareerCommunityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const careerTitle = careerTitles[id as keyof typeof careerTitles] || 'Developer'
  const community = careerCommunities[id as keyof typeof careerCommunities] || careerCommunities['full-stack']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/careers/${id}`} className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          ← Back to Career Details
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {community.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {community.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Community Stats & Resources */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{community.members}</div>
                  <div className="text-gray-700 font-semibold">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{community.activeDiscussions}</div>
                  <div className="text-gray-700 font-semibold">Active Discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{community.mentors}</div>
                  <div className="text-gray-700 font-semibold">Expert Mentors</div>
                </div>
              </div>

              {/* Community Resources */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.resources.map((resource, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="text-2xl">{resource.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{resource.name}</h4>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {community.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <p className="text-gray-600 text-sm">{event.date} • {event.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">{event.attendees}</div>
                      <div className="text-sm text-gray-500">Attending</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Join Community & Platforms */}
          <div className="space-y-6">
            {/* Join Community CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
              <p className="text-blue-100 mb-6">
                Connect with {community.members} {careerTitle}s and accelerate your learning journey.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🤝</div>
                  <span className="font-semibold">Network with Peers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🚀</div>
                  <span className="font-semibold">Accelerate Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">💼</div>
                  <span className="font-semibold">Career Opportunities</span>
                </div>
              </div>

              <button className="w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Join Community
              </button>
            </div>

            {/* Community Platforms */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Platforms</h3>
              <div className="space-y-4">
                {community.platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.link}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {platform.name}
                      </div>
                      <div className="text-sm text-gray-600">{platform.members} members</div>
                    </div>
                    <div className="text-blue-600 font-semibold">→</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}