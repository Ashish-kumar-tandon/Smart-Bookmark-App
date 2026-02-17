# Smart Bookmark App

A streamlined, real-time bookmark manager built to securely save and organize web links.

## 🚀 Features

- **Google OAuth Authentication**: Secure sign-in exclusively via Google OAuth.
- **Private User Data**: Bookmarks are private to each user; Row Level Security (RLS) ensures users cannot see or modify others' data.
- **Real-time Synchronization**: The dashboard updates instantly across multiple tabs without page refreshes using database listeners.
- **Full CRUD Functionality**: Users can add (URL + Title) and delete their own bookmarks.
- **Deployment**: Fully optimized for and deployed on Vercel.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database & Auth**: Supabase (Auth, PostgreSQL, Realtime)
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

## 🧠 Challenges & Solutions

### 1. Real-time Updates without Refresh

**Problem**: The requirement was to update the UI in real-time if a bookmark is added in a different tab.
**Solution**: I implemented **Supabase Realtime** subscriptions. By listening to `INSERT` and `DELETE` events on the bookmarks table, the UI state reflects database changes immediately for the logged-in user.

### 2. Ensuring Strict Data Privacy

**Problem**: Bookmarks must be private to each user.
**Solution**: I configured **Row Level Security (RLS)** policies in the Supabase dashboard. I created a policy that restricts `SELECT` and `DELETE` actions to only those rows where the `user_id` matches the authenticated `auth.uid()`.

### 3. Google-Only Authentication

**Problem**: The app requires Google OAuth only, with no traditional email/password login.
**Solution**: I utilized the `@supabase/ssr` package to manage server-side sessions and restricted the login flow to the Google provider using `signInWithOAuth`.

## 🔗 Links

- **Live Demo**: https://smart-bookmark-app-three-umber.vercel.app/
- **GitHub Repository**: https://github.com/Ashish-kumar-tandon/Smart-Bookmark-App
