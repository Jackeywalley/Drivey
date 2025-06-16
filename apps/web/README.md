# DriveMate Web Application

This is the web application for DriveMate, a premium chauffeur service platform.

## Features

- User authentication and authorization
- Booking management
- Payment processing
- Chauffeur profiles
- Vehicle management
- Real-time location tracking
- Admin dashboard

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/drivemate.git
cd drivemate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the `apps/web` directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom React hooks
│   └── styles/          # Global styles
├── public/              # Static files
└── package.json         # Project dependencies
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 