# shadcn/ui Implementation Plan for VibeCoding Prompt Generator

## Exact Specifications from shadcn/ui

### 1. CSS Variables Structure (globals.css)

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

### 2. Tailwind Config

```js
tailwind.config = {
  darkMode: ["class"],
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

### 3. Typography System

- **Font Family**: Inter (not Inter Tight)
- **Font Sizes** (Tailwind defaults):
  - `text-xs`: 0.75rem
  - `text-sm`: 0.875rem
  - `text-base`: 1rem
  - `text-lg`: 1.125rem
  - `text-xl`: 1.25rem
  - `text-2xl`: 1.5rem
  - `text-3xl`: 1.875rem
  - `text-4xl`: 2.25rem
  - `text-5xl`: 3rem
  - `text-6xl`: 3.75rem
- **Font Weights**:
  - `font-normal`: 400
  - `font-medium`: 500
  - `font-semibold`: 600
  - `font-bold`: 700

### 4. Spacing (4px grid)
- 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 6 = 24px, 8 = 32px

### 5. Component Patterns

**Button:**
```html
<button class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
  Button
</button>
```

**Input:**
```html
<input class="bg-background border-input border px-3 py-2 rounded-md focus:ring-2 focus:ring-ring" />
```

**Card:**
```html
<div class="bg-card text-card-foreground border border-border rounded-lg p-6">
  Card content
</div>
```

### 6. Animations
- **Transitions**: `transition-colors duration-150`
- **Hover states**: Use `/90` opacity modifier (e.g., `hover:bg-primary/90`)

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Create `globals.css` with CSS variables
- [ ] Update Tailwind config inline
- [ ] Change font from Inter Tight to Inter
- [ ] Remove custom Monokai colors
- [ ] Add `.dark` class support

### Phase 2: Component Updates
- [ ] Replace all hardcoded colors with semantic tokens
- [ ] Update buttons: `bg-primary text-primary-foreground`
- [ ] Update inputs: `border-input bg-background`
- [ ] Update forms: `bg-card border-border`
- [ ] Update labels: `text-foreground`
- [ ] Update placeholders: `placeholder:text-muted-foreground`

### Phase 3: Interactive Elements
- [ ] Add Radix UI Select for platform dropdown
- [ ] Add Vaul drawer for generated output
- [ ] Add theme switcher (light/dark toggle)
- [ ] Toast notifications using shadcn pattern

### Phase 4: Themes
- [ ] Zinc (default)
- [ ] Slate
- [ ] Stone
- [ ] Neutral
- [ ] Rose (optional)

### Phase 5: PWA & Meta
- [ ] Add manifest.json
- [ ] Add service worker
- [ ] Add favicon
- [ ] Add meta tags

---

## File Structure

```
vibecode-prompt-generator/
├── index.html
├── globals.css (NEW)
├── app.js
├── template.md
├── themes.js (DELETE - using CSS variables instead)
└── components/ (NEW)
    ├── drawer.js (Vaul)
    └── select.js (Radix UI)
```

---

## Color Token Mapping

| Old | New |
|-----|-----|
| `bg-white` | `bg-background` |
| `text-black` | `text-foreground` |
| `text-gray-600` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| `bg-gray-50` | `bg-muted` |
| `text-gray-900` | `text-foreground` |
| `border-gray-300` | `border-input` |
| `bg-black` | `bg-primary` |
| `text-white` | `text-primary-foreground` |

---

## Next Steps

1. Create `globals.css`
2. Update `index.html` with new Tailwind config
3. Replace all color classes
4. Test light/dark mode
5. Add theme switcher
6. Implement Vaul drawer
7. Deploy

Ready to implement?
