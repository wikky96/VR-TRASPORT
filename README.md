# VR Transports - Order Management System

A modern web application for managing transport orders with real-time tracking and PWA capabilities.

## Features

- 📦 **Order Management** - Create, track, and manage transport orders
- 🔍 **Smart Search** - Search orders by mobile number
- 📱 **PWA Support** - Install as a mobile app with offline capabilities
- 🌐 **Multi-language** - Support for multiple languages
- 👤 **Admin Dashboard** - Comprehensive admin panel for order management
- 🔔 **Real-time Updates** - Instant notifications for order status changes
- 📊 **Analytics** - Track PWA installations and user engagement
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn-ui
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Database, Auth, Edge Functions)
- **PWA:** Service Worker with offline support
- **State Management:** React Context API
- **Routing:** React Router

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

Recommended: [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for Node version management

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vr-transports.git
cd vr-transports
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_VERSION=1.0.0
```

Get your Supabase credentials from [Supabase Dashboard](https://supabase.com/dashboard)

### 4. Database Setup

Run the SQL commands in your Supabase SQL Editor:

```sql
-- Create tables for PWA tracking
CREATE TABLE pwa_installations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE,
  installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_info JSONB,
  app_version TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE app_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version TEXT UNIQUE NOT NULL,
  release_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  is_mandatory BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pwa_installations ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_versions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read on app_versions" 
ON app_versions FOR SELECT USING (true);

CREATE POLICY "Allow service insert on installations" 
ON pwa_installations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service update on installations" 
ON pwa_installations FOR UPDATE USING (true);
```

### 5. Deploy Supabase Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy edge function
supabase functions deploy track-pwa-install
```

## Development

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
vr-transports/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   └── service-worker.js  # Service worker for offline support
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn-ui components
│   │   ├── Header.tsx    # App header with navigation
│   │   └── PWAInstallPrompt.tsx
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Orders.tsx
│   │   ├── Login.tsx
│   │   └── Admin.tsx
│   ├── lib/               # Utility functions
│   │   └── supabase.ts   # Supabase client
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   └── functions/         # Edge functions
│       └── track-pwa-install/
├── .env                   # Environment variables (not in git)
├── .env.example          # Example environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Key Features Guide

### PWA Installation Tracking

The app automatically tracks when users install it as a PWA:

- Unique user ID generation
- Device information collection
- Installation count tracking
- Active user monitoring

### Update System

Users are notified when new versions are available:

1. Add new version to database:
```sql
INSERT INTO app_versions (version, description, is_mandatory) 
VALUES ('1.0.1', 'Bug fixes and improvements', false);
```

2. Update `APP_VERSION` in code
3. Build and deploy
4. Users will see update prompt

### Multi-language Support

Add new languages in `LanguageContext.tsx`:

```typescript
const translations = {
  en: { /* English translations */ },
  ta: { /* Tamil translations */ },
  // Add more languages
};
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Custom Server

1. Build the project: `npm run build`
2. Upload the `dist` folder to your server
3. Configure your web server to serve the `index.html` for all routes

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_APP_VERSION` | Current app version | Yes |

## PWA Configuration

### Manifest (public/manifest.json)

```json
{
  "name": "VR Transports",
  "short_name": "VR Transports",
  "description": "Order Management System",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### PWA Not Installing

- Ensure HTTPS is enabled
- Check manifest.json is valid
- Verify service worker is registered

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project status
- Ensure RLS policies are configured

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Version History

- **1.0.0** (Current)
  - Initial release
  - Order management system
  - PWA support
  - Multi-language support
  - Admin dashboard

## License

This project is proprietary and confidential.

## Support

For support, email vrtransports49@gmail.com

## Authors

- VR Transports Development Team

## Acknowledgments

- shadcn-ui for the beautiful component library
- Supabase for the backend infrastructure
- React community for excellent tooling