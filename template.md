project:
  title: "{{PROJECT_TITLE}}"
  description: "{{PROJECT_DESCRIPTION}}"
  
platform:
  name: "{{PLATFORM_NAME}}"
  domain: "{{PLATFORM_DOMAIN}}"
  topic: "{{PLATFORM_TOPIC}}"

branding:
  favicon: "lucide-icon-matching-topic"
  url_pattern: "{{slugified-title}}-vd7.{{platform-domain}}"
  design_system: "shadcn/ui"
  theme: "auto-select" # Intelligently chosen based on app purpose (see theme selection guide below)
  font: "Inter"
  font_url: "https://fonts.google.com/specimen/Inter"

github:
  repo_name: "{{slugified-title}}"
  topics: 
    - "{{PLATFORM_TOPIC}}"
  banner_dimensions: "1280x640"
  homepage_url: "{{DEPLOYMENT_URL}}"

social:
  github: "vdutts7"
  twitter: "vdutts7"

seo:
  og_image_dimensions: "1200x630"
  twitter_card: "summary_large_image"
---

# Build Instructions for {{PROJECT_TITLE}}

## 🎯 Project Overview

Build a **{{PROJECT_TITLE}}** - {{PROJECT_DESCRIPTION}}

---

## 🏗️ Technical Stack

### Core Technologies
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 3.4+
- **Icons**: Lucide React (NOT Font Awesome, NOT Heroicons)
- **Component Primitives**: shadcn/ui 
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: React Router DOM v6

### Required Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "@tanstack/react-query": "^5.83.0",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.462.0",
    "tailwind-merge": "^2.6.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1"
  }
}
```

**Note**: Only include `@supabase/supabase-js` if the app requires database, auth, or server-side data. For simple client-side apps, use localStorage instead.

---

## 🔒 Data & Implementation Standards
### Real Data Requirement
**CRITICAL**: If app is dependent on data at its core: then app must use real data sources - mock data is strictly prohibited.

**Data Source Selection:**
- **Complex Apps** (auth, multi-user, real-time sync, server-side data):
  - Use **Supabase** (PostgreSQL + Auth + Storage + Realtime)
  - Install: `npm install @supabase/supabase-js`
  - Free tier: 500MB database, 50MB storage, 2GB bandwidth
  - Setup time: < 5 minutes with user-provided credentials

- **Simple Apps** (calculators, tools, single-user, client-side only):
  - Use **localStorage** or **IndexedDB** for persistence
  - No external dependencies required
  - Works offline by default

**PROHIBITED:**
- ❌ Mock data arrays (e.g., `const mockUsers = [...]`)
- ❌ Hardcoded placeholder data
- ❌ `setTimeout()` to simulate API calls
- ❌ Fake data generators

### Production-Ready Implementation
**NO SHORTCUTS**: Implement all features fully - this is production code, not a prototype.

**PROHIBITED:**
- ❌ `// TODO: Implement later` comments
- ❌ Stub functions that return empty values
- ❌ Placeholder implementations
- ❌ Mock API responses
- ❌ Functions that don't actually work

**ALLOWED:**
- ✅ Loading states and skeleton UIs (real UX need)
- ✅ Error boundaries and error handling (real UX need)
- ✅ Empty state messaging (e.g., "No items yet. Create your first item!")
- ✅ Onboarding example data (clearly labeled as "demo" or "example")

**Implementation Pattern:**
```typescript
// ❌ WRONG - Mock data
const fetchUsers = async () => {
  return [{ id: 1, name: "Mock User" }];
};

// ✅ CORRECT - Real implementation
const fetchUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) throw error;
  return data;
};
```

### Database & Authentication Setup

**Primary Solution: Supabase**

1. **Installation:**
```bash
npm install @supabase/supabase-js
```

2. **Configuration Structure:**
```
src/config/
  ├── env.ts          # Type-safe environment variables
  ├── constants.ts    # Non-secret configuration
  └── supabase.ts     # Supabase client initialization

.env.example          # Template for required variables
.env.local            # Actual secrets (gitignored)
```

3. **Environment Setup:**

Create `.env.example`:
```bash
# Supabase Configuration (User will provide these)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_NAME={{PROJECT_TITLE}}
VITE_APP_URL={{DEPLOYMENT_URL}}
```

Create `src/config/env.ts`:
```typescript
// Centralized, type-safe environment variable access
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || '{{PROJECT_TITLE}}',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },
} as const;

// Runtime validation - fail fast if required vars missing
if (!env.supabase.url || !env.supabase.anonKey) {
  throw new Error(
    'Missing Supabase credentials. Check .env.local and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}
```

Create `src/config/constants.ts`:
```typescript
// Non-secret configuration (magic numbers, app constants)
export const APP_CONFIG = {
  // File upload limits
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Pagination
  itemsPerPage: 20,
  maxItemsPerPage: 100,
  
  // UI behavior
  debounceMs: 300,
  toastDuration: 3000,
  
  // Caching
  cacheTimeMs: 5 * 60 * 1000, // 5 minutes
  staleTimeMs: 60 * 1000, // 1 minute
} as const;
```

Create `src/config/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Initialize Supabase client
export const supabase = createClient(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Database types (auto-generated from Supabase)
export type Database = {
  // Add your database types here
  // Or generate with: npx supabase gen types typescript
};
```

4. **Authentication Pattern:**
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
```

5. **User Instructions:**
```markdown
## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key
3. Create `.env.local` in the project root:
   ```bash
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run `npm install`
5. Run `npm run dev`
```

### Configuration Management Rules

**Centralization:**
- ALL configuration must live in `src/config/` directory
- ALL environment variables accessed through `src/config/env.ts`
- ALL magic numbers defined in `src/config/constants.ts`
- ALL service initialization in `src/config/[service].ts`

**Security:**
- NEVER commit API keys or secrets to git
- ALWAYS use environment variables for sensitive data
- ALWAYS include `.env.example` documenting required variables
- ALWAYS add `.env.local` to `.gitignore`
- ALWAYS validate required environment variables at runtime

**Pattern:**
```typescript
// ❌ WRONG - Hardcoded
const API_KEY = "sk-1234567890";

// ❌ WRONG - Direct access
const url = import.meta.env.VITE_API_URL;

// ✅ CORRECT - Centralized, validated
import { env } from '@/config/env';
const url = env.api.url;
```

---

## 🎨 Design System Standards

### Visual Identity
- **Design Philosophy**: Apple/Vercel-inspired - simple, functional, clean, intuitive
- **Theme**: Monokai color scheme
- **Typography**: Inter Tight font family (all weights 100-900)
- **Component Library**: shadcn/ui for accessibility
- **Icons**: Lucide React - prioritize icons over text for better UX

### shadcn/ui Design System Setup

**CRITICAL**: Use shadcn/ui design system with CSS variables for theming.

Create `app/globals.css` (or `src/index.css`):

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}
```

### Tailwind Configuration

Update `tailwind.config.js`:

```js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
}
```

### Typography Setup
```html
<!-- Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Theme Selection Guide

**CRITICAL**: Choose the theme color that best matches the app's purpose and domain.

**Selection Logic:**

Based on **{{PROJECT_TITLE}}** and **{{PROJECT_DESCRIPTION}}**, select ONE theme:

- **Zinc** (default neutral): General-purpose apps, dashboards, admin panels, productivity tools, SaaS platforms
- **Slate**: Developer tools, code editors, technical documentation, API platforms
- **Stone**: Content management, blogs, publishing platforms, reading apps
- **Gray**: Minimal apps, calculators, converters, utility tools
- **Neutral**: Business apps, CRM, analytics, professional tools

- **Red**: Alerts, monitoring, security, emergency services, critical systems
- **Rose**: Dating apps, social platforms, creative tools, design apps
- **Orange**: Food delivery, restaurants, energy/fitness, enthusiasm-focused apps
- **Green**: Finance, health, eco/sustainability, growth/success apps, money management
- **Blue**: Communication, productivity, trust-focused apps, corporate tools, social networks
- **Yellow**: Learning platforms, education, optimism-focused, note-taking, highlights
- **Violet**: Creative tools, music apps, luxury brands, premium services, meditation

**Implementation:**

Add the selected theme class to `<html>` tag:

```html
<!-- For Green theme (finance/health app) -->
<html lang="en" class="theme-green">

<!-- For Blue theme (productivity app) -->
<html lang="en" class="theme-blue">

<!-- For default Zinc (general app) -->
<html lang="en">
```

**Example Selections:**
- "Budget Tracker" → **Green** (finance)
- "Task Manager" → **Blue** (productivity)
- "Recipe Finder" → **Orange** (food)
- "Meditation Timer" → **Violet** (wellness/calm)
- "Code Snippet Manager" → **Slate** (developer tool)
- "Habit Tracker" → **Green** (health/growth)
- "Dating App" → **Rose** (social/romance)
- "Learning Platform" → **Yellow** (education)
- "Admin Dashboard" → **Zinc** (neutral/professional)

### Component Styling Pattern

**ALWAYS use semantic tokens, NEVER hardcoded colors:**

```tsx
// ✅ CORRECT
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>

<input className="bg-background border-input focus:ring-ring" />

<div className="bg-card text-card-foreground border-border">
  Card content
</div>

// ❌ WRONG
<button className="bg-black text-white">Click me</button>
<input className="bg-white border-gray-300" />
<div className="bg-white text-gray-900 border-gray-200">Card</div>
```

### Icon Usage Guidelines
- Use Lucide icons throughout for consistency
- Minimum icon size: 20px (h-5 w-5)
- Interactive icons: 24px (h-6 w-6)
- Always include `aria-label` on icon-only buttons

---

## 📱 Mobile Optimization & PWA

### Mobile-First Requirements
- **Touch Targets**: Minimum 44px × 44px for all interactive elements
- **Gestures**: Smooth swipe interactions where applicable
- **Feedback**: Active states with `active:scale-95` for tactile feedback
- **Responsive**: Mobile-first breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

### PWA Configuration
Create `public/manifest.json`:
```json
{
  "name": "{{PROJECT_TITLE}}",
  "short_name": "{{SHORT_NAME}}",
  "description": "{{PROJECT_DESCRIPTION}}",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#272822",
  "theme_color": "#272822",
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

Add to `index.html`:
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#272822">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

---

## ♿ Accessibility Standards

### ARIA Requirements
- All interactive elements MUST have `aria-label` or visible text
- Form inputs MUST have associated labels
- Images MUST have descriptive `alt` text
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)

### Keyboard Navigation
- All interactive elements accessible via Tab key
- Focus indicators visible and clear
- Skip-to-content link for screen readers

### Example Accessible Button
```tsx
<button
  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
  onClick={handleClick}
  aria-label="Descriptive action name"
>
  <IconName className="h-5 w-5" />
</button>
```

---

## 🚀 Performance & Core Web Vitals

### Target Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Score**: > 95 (all categories)

### Optimization Techniques
1. **Image Optimization**: Use WebP format, lazy loading
2. **Code Splitting**: Dynamic imports for routes
3. **Font Loading**: `font-display: swap` in CSS
4. **Minimize Bundle**: Tree-shaking, remove unused dependencies
5. **Caching**: Service worker for offline support

---

## 🔍 SEO & Social Sharing

### Meta Tags Template
Add to `index.html` `<head>`:
```html
<!-- Primary Meta Tags -->
<title>{{PROJECT_TITLE}} | {{TAGLINE}}</title>
<meta name="title" content="{{PROJECT_TITLE}} | {{TAGLINE}}">
<meta name="description" content="{{PROJECT_DESCRIPTION}}">

<!-- Favicon (Lucide icon matching topic) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="{{DEPLOYMENT_URL}}">
<meta property="og:title" content="{{PROJECT_TITLE}}">
<meta property="og:description" content="{{PROJECT_DESCRIPTION}}">
<meta property="og:image" content="{{DEPLOYMENT_URL}}/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="{{DEPLOYMENT_URL}}">
<meta property="twitter:title" content="{{PROJECT_TITLE}}">
<meta property="twitter:description" content="{{PROJECT_DESCRIPTION}}">
<meta property="twitter:image" content="{{DEPLOYMENT_URL}}/og-image.png">

<!-- Additional SEO -->
<meta name="robots" content="index, follow">
<link rel="canonical" href="{{DEPLOYMENT_URL}}">
```

### OpenGraph Image Requirements
- **Dimensions**: 1200×630px (og-image.png)
- **Location**: `/public/og-image.png`
- **Content**: Project name, brief description, visual representation
- **Format**: PNG or JPG, optimized < 300KB

### robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: {{DEPLOYMENT_URL}}/sitemap.xml
```

---

## 🎭 Reusable Component: Social Links Footer

**CRITICAL**: Copy this exact implementation for consistent branding:

```tsx
{/* Footer with Social Links */}
<footer className="border-t border-gray-200 py-10 mt-20">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="flex flex-col items-center gap-5">
      {/* Social Links */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
          onClick={() => window.open('https://github.com/vdutts7', '_blank')}
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </button>
        <button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
          onClick={() => window.open('https://x.com/vdutts7', '_blank')}
          aria-label="X (Twitter)"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</footer>
```

**Import required**:
```tsx
import { Github } from "lucide-react";
```

---

## 🏛️ Architecture Principles

### Code Organization
```
src/
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── layout/       # Layout components (Header, Footer)
│   └── features/     # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Route pages
├── types/            # TypeScript types
└── config/           # Configuration files
```

### Design Principles
1. **Modular**: Each component has single responsibility
2. **Composable**: Components accept props for customization
3. **Scalable**: Easy to add features without refactoring
4. **Type-Safe**: Full TypeScript coverage with strict mode
5. **DRY**: Don't Repeat Yourself - extract reusable logic

### Component Template
```tsx
import { FC } from 'react';

interface ComponentNameProps {
  // Props with JSDoc comments
}

export const ComponentName: FC<ComponentNameProps> = ({ ...props }) => {
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};
```

---

## 📦 GitHub Repository Setup

### Repository Configuration
1. **Name**: `{{slugified-title}}` (lowercase, hyphens only)
2. **Description**: "{{PROJECT_DESCRIPTION}}"
3. **Topics**: `{{PLATFORM_TOPIC}}`, `pwa`, `react`, `typescript`, `tailwindcss`, [custom topics]
4. **Homepage**: `{{DEPLOYMENT_URL}}`
5. **Banner**: 1280×640px image showcasing the app

### README.md (template)
```markdown
# {{PROJECT_TITLE}}

{{PROJECT_DESCRIPTION}}

[![Live Demo](https://img.shields.io/badge/demo-live-success)]({{DEPLOYMENT_URL}})
[![Built with](https://img.shields.io/badge/built%20with-{{PLATFORM_NAME}}-blue)]({{PLATFORM_URL}})

## 🚀 Features

- Feature 1
- Feature 2
- Feature 3

## 📸 Screenshot

![App Screenshot](./public/og-image.png)

## 🔗 Links

- **Live Demo**: [{{DEPLOYMENT_URL}}]({{DEPLOYMENT_URL}})
- **GitHub**: [GitHub](https://github.com/vdutts7)
- **Twitter**: [X](https://x.com/vdutts7)

```

---

## ✅ Pre-Deployment Checklist

Before deploying, verify:

### Data & Implementation
- [ ] Using real data sources (Supabase or localStorage)
- [ ] NO mock data arrays or hardcoded placeholders
- [ ] NO setTimeout API simulations
- [ ] NO TODO comments or stub functions
- [ ] All features fully implemented
- [ ] Loading states and error handling present

### Configuration
- [ ] All config centralized in src/config/ directory
- [ ] Environment variables in src/config/env.ts
- [ ] Constants in src/config/constants.ts
- [ ] .env.example created and documented
- [ ] .env.local in .gitignore
- [ ] Runtime validation for required env vars
- [ ] NO hardcoded API keys or secrets

### Database & Auth (if applicable)
- [ ] Supabase client initialized in src/config/supabase.ts
- [ ] Authentication hook implemented (useAuth)
- [ ] Database queries use real Supabase calls
- [ ] Row Level Security (RLS) configured in Supabase
- [ ] User setup instructions in README

### Code Quality
- [ ] TypeScript strict mode enabled, no errors
- [ ] All components have proper TypeScript types
- [ ] ESLint passes with no warnings
- [ ] No console.logs in production code

### Design & UX
- [ ] Inter Tight font loaded and applied
- [ ] Monokai theme colors implemented
- [ ] All icons from Lucide React
- [ ] Mobile responsive (test on 375px, 768px, 1024px)
- [ ] Touch targets minimum 44px
- [ ] Active states on all interactive elements

### Accessibility
- [ ] All buttons have aria-labels
- [ ] Images have alt text
- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse score > 95
- [ ] Images optimized (WebP, lazy loading)
- [ ] Bundle size reasonable (< 500KB gzipped)
- [ ] No layout shifts (CLS < 0.1)

### SEO & Social
- [ ] Meta tags complete (title, description, OG, Twitter)
- [ ] og-image.png created (1200×630px)
- [ ] Favicon set (Lucide icon matching topic)
- [ ] robots.txt present
- [ ] Canonical URL set

### PWA
- [ ] manifest.json configured
- [ ] Icons generated (192px, 512px)
- [ ] Theme color set
- [ ] Works offline (if applicable)

### GitHub
- [ ] Repo name matches slug
- [ ] Description set
- [ ] Topics added (platform + tech stack)
- [ ] Homepage URL set to deployment
- [ ] README.md complete
- [ ] Banner image uploaded (1280×640px)

### Social Links
- [ ] Footer with GitHub/Twitter links implemented

---

## 🎯 Project-Specific Instructions

{{PROJECT_SPECIFIC_INSTRUCTIONS}}

---

## 📚 Additional Resources

- **Supabase**: https://supabase.com (Database, Auth, Storage)
- **Supabase Docs**: https://supabase.com/docs
- **Lucide Icons**: https://lucide.dev
- **shadcn/ui**: https://ui.shadcn.com
- **TailwindCSS**: https://tailwindcss.com
- **Inter Tight Font**: https://fonts.google.com/specimen/Inter+Tight
- **Core Web Vitals**: https://web.dev/vitals
