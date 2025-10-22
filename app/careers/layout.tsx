export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded-full blur-3xl opacity-5"></div>
      </div>

      <nav className="relative bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo with gradient */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerPath AI
                </h1>
              </div>
            </div>

            {/* Navigation with hover effects */}
            <div className="flex items-center space-x-1">
              {[
                { name: 'Dashboard', href: '/dashboard', icon: '📊' },
                { name: 'Careers', href: '/dashboard', icon: '💼' },
                { name: 'Learn', href: '/dashboard', icon: '🎓' },
                { name: 'Resume', href: '/dashboard', icon: '📝' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-white/50"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative">
        <div className="animate-in fade-in-up duration-500">
          {children}
        </div>
      </div>
    </div>
  )
}