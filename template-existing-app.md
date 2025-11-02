---
project:
  title: "{{PROJECT_TITLE}}"
  description: "{{PROJECT_DESCRIPTION}}"
  
platform:
  name: "{{PLATFORM_NAME}}"
  domain: "{{PLATFORM_DOMAIN}}"
  topic: "{{PLATFORM_TOPIC}}"

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

# Instructions

## 🎯 Project Overview

**Keep EVERYTHING about app UI, functionality the same. Surgically change the things mentioned below.**

## 🖼️ Visual Assets Generation

**CRITICAL**: Generate and place these assets in the project root directory to match vibecoded branding:

### Required Files to Generate:
1. `public/favicon.ico` - 32x32px favicon
2. `public/favicon.svg` - SVG favicon for modern browsers
3. `public/og-image.png` - 1200x630px Open Graph image
4. `public/github-banner.png` - 1280x640px GitHub repository banner
5. `public/twitter-card.png` - 1200x630px Twitter card image

### AI Generation Commands:
```
Generate the following visual assets:

1. FAVICON (32x32px):
   - Simple, recognizable icon related to site's topic
   - Clean, minimal design that works at small size
   - shadcn/ui aesthetic (modern, clean)
   - Save as: public/favicon.ico

2. OPEN GRAPH IMAGE (1200x630px):
   - Title: "{{PROJECT_TITLE}}"
   - Subtitle: "{{PROJECT_DESCRIPTION}}"
   - Modern, professional design with shadcn/ui aesthetic
   - Include app name prominently
   - Save as: public/og-image.png

3. GITHUB BANNER (1280x640px):
   - "{{PROJECT_TITLE}}" - {{PROJECT_DESCRIPTION}}
   - Professional banner for GitHub repository
   - Include GitHub/tech aesthetic with shadcn/ui styling
   - Save as: public/github-banner.png

4. TWITTER CARD (1200x630px):
   - "{{PROJECT_TITLE}}" - {{PROJECT_DESCRIPTION}}"
   - Optimized for Twitter sharing
   - Eye-catching design with shadcn/ui colors
   - Save as: public/twitter-card.png
```

### File Structure After Generation:
```
public/
├── favicon.ico          # 32x32px favicon
├── favicon.svg          # SVG favicon
├── og-image.png         # 1200x630px OG image
├── github-banner.png    # 1280x640px GitHub banner
└── twitter-card.png     # 1200x630px Twitter card
```

---

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

## 🎭 Social Links Footer

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

## 📸 Screenshot

![App Screenshot](./public/og-image.png)

## 🔗 Links

- **Live Demo**: [{{DEPLOYMENT_URL}}]({{DEPLOYMENT_URL}})
- **GitHub**: [GitHub](https://github.com/vdutts7)
- **Twitter**: [X](https://x.com/vdutts7)

```

---

## ✅ Pre-Deployment hecklist

Before deploying, verify:

### Data & Implementation
- [ ] NO mock data arrays or hardcoded placeholders
- [ ] NO setTimeout API simulations
- [ ] NO TODO comments or stub functions

### SEO & Social
- [ ] Meta tags complete (title, description, OG, Twitter)
- [ ] og-image.png created (1200×630px)
- [ ] Favicon set (Lucide icon matching topic)
- [ ] robots.txt present
- [ ] Canonical URL set

### PWA
- [ ] manifest.json configured
- [ ] Icons generated (192px, 512px)
- [ ] Works offline

### GitHub
- [ ] Repo name matches slug
- [ ] Description set
- [ ] Topics added (platform + tech stack)
- [ ] Homepage URL set to deployment
- [ ] README.md complete
- [ ] Banner image uploaded (1280×640px)

### Social Links
- [ ] Footer with GitHub/Twitter links implemented