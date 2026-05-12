# Furniture Franchise Evaluation Form

A premium, mobile-first franchise evaluation system built with Next.js + TypeScript + Tailwind CSS.

## Features

- ✅ 7-step form with smooth navigation
- ✅ Smart conditional logic (manufacturing fields appear only if relevant)
- ✅ Auto scoring with 3 outcomes: Franchise Ready / Needs Improvement / Not Suitable Yet
- ✅ **Live QR code** linked to your deployed URL (works once deployed)
- ✅ Admin dashboard with PDF report download
- ✅ WhatsApp help button
- ✅ Mobile-first responsive design
- ✅ File upload zones

## Admin Credentials
- **User ID:** FK220
- **Password:** admin

---

## 🚀 Deploy to Vercel (Free — 5 minutes)

### Step 1 — Push to GitHub
1. Create a free account at [github.com](https://github.com)
2. Create a new repository called `furniture-franchise-form`
3. Upload all these project files to the repository

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `furniture-franchise-form` repository
4. Click **Deploy** — Vercel detects Next.js automatically

### Step 3 — Get your URL
- Vercel gives you a free URL like: `https://furniture-franchise-form.vercel.app`
- The QR code on the form will automatically point to this URL
- Share the URL or the QR code with business owners

---

## 🖥 Run Locally (for testing)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
franchise-form/
├── pages/
│   ├── _app.tsx        # App wrapper
│   └── index.tsx       # Main form (all sections + admin)
├── components/
│   └── UI.tsx          # Reusable UI components
├── lib/
│   └── formData.ts     # Form data, constants, scoring logic
├── styles/
│   └── globals.css     # Global styles + Tailwind
├── package.json
├── tailwind.config.js
├── next.config.js
└── vercel.json
```

---

## 🔧 Customisation

**Change WhatsApp number:** In `pages/index.tsx`, find `wa.me/919999999999` and replace with your number.

**Change admin credentials:** In `pages/index.tsx`, find `uid === 'FK220' && pwd === 'admin'` and update.

**Add more cities or options:** Edit the constants in `lib/formData.ts`.

**Change scoring weights:** Edit the `calcScore()` function in `lib/formData.ts`.
