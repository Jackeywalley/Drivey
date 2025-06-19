# DriveMate - Chauffeur-on-Demand Platform

DriveMate is a full-stack platform connecting car owners with professional chauffeurs. Built with React Native (mobile), Next.js (web), and TypeScript.

## 🚀 Features

- **Client App**: Book chauffeurs for your personal vehicle
- **Chauffeur App**: Accept rides and manage earnings
- **Admin Dashboard**: Manage users, bookings, and platform operations
- **Real-time Tracking**: Live location updates during rides
- **Secure Payments**: Integrated with Stripe/Paystack
- **Dark/Light Mode**: Beautiful UI with theme support

## 🛠 Tech Stack

- **Frontend**: React Native (mobile), Next.js (web)
- **Backend**: Next.js API Routes
- **Authentication**: Supabase
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Maps**: Google Maps API
- **Notifications**: Firebase Cloud Messaging
- **Styling**: Tailwind CSS (web), Styled Components (mobile)

## 📦 Project Structure

```
drivemate/
├── apps/
│   ├── web/          # Next.js web app (admin dashboard)
│   └── mobile/       # React Native mobile app
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   └── types/        # Shared TypeScript types
└── package.json
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drivemate.git
   cd drivemate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in each app directory
   - Fill in your API keys and configuration

4. **Start development servers**
   ```bash
   # Start web app
   npm run dev:web

   # Start mobile app
   npm run dev:mobile
   ```

## 📱 Mobile App Development

1. Install Expo CLI:
   ```bash
   npm install -g expo-cli
   ```

2. Start the mobile app:
   ```bash
   cd apps/mobile
   npm start
   ```

3. Use Expo Go app on your device or an emulator to test

## 🌐 Web App Development

1. Start the Next.js development server:
   ```bash
   cd apps/web
   npm run dev
   ```

2. Open http://localhost:3000 in your browser

## 🔐 Environment Variables

Create `.env` files in both `apps/web` and `apps/mobile` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
STRIPE_PUBLIC_KEY=your_stripe_key
```

## 📄 License

MIT License - see LICENSE file for details 