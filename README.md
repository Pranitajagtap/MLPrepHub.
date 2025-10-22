# 🚀 CareerPath AI

AI-powered career guidance platform helping students discover and pursue their dream careers.

## ✨ Features

- 🎓 Explore 8+ career paths with detailed insights
- 📚 Personalized learning modules for each career
- 📊 Track your learning progress
- 📄 Build and optimize resumes
- 💼 View salary data and job market demand

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL (Neon)
- **Auth:** bcryptjs

## 📦 Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/careerpath-ai.git
cd careerpath-ai
npm install
```

### 2. Setup Environment
Create `.env`:
```env
DATABASE_URL="your-neon-connection-string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Test Credentials
```
Email: test@gmail.com
Password: password123
```

## 📁 Project Structure
```
careerpath-ai/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Server actions & utilities
├── prisma/          # Database schema & migrations
└── public/          # Static assets
```

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 📝 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npx prisma studio    # Open database GUI
npx prisma db seed   # Seed sample data
```

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by Pranita Jagtap