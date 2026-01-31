# Visual Quality Checklist

Detailed standards for pixel-perfect UI implementation.

## Spacing System

Use Tailwind's spacing scale consistently. Stick to these values:

| Token | Value | Use Case |
|-------|-------|----------|
| 1 | 4px | Icon padding, tight gaps |
| 2 | 8px | Between related elements |
| 3 | 12px | Small component padding |
| 4 | 16px | Default padding, card padding |
| 6 | 24px | Section spacing |
| 8 | 32px | Large section gaps |
| 12 | 48px | Page section separation |
| 16 | 64px | Major layout divisions |

### Spacing Rules

```tsx
// ✅ Consistent spacing
<div className="space-y-4">       // Uniform vertical gap
<div className="gap-4">           // Grid/flex gap
<div className="p-4">             // Padding

// ❌ Avoid arbitrary values
<div className="mt-[13px]">       // Use mt-3 (12px) instead
<div className="p-[22px]">        // Use p-5 (20px) or p-6 (24px)
```

---

## Alignment Patterns

### Horizontal Alignment

```tsx
// Left-aligned content (default for LTR)
<div className="text-left">

// Center-aligned: headings, CTAs, empty states
<div className="text-center mx-auto max-w-md">

// Right-aligned: numbers, actions, timestamps
<div className="text-right">

// Justify between: header with actions
<div className="flex items-center justify-between">
```

### Vertical Alignment

```tsx
// Center items vertically
<div className="flex items-center">

// Icon with text (icons should align with text baseline)
<div className="flex items-center gap-2">
  <Icon className="h-4 w-4" />
  <span>Label text</span>
</div>

// Top align for varying content heights
<div className="flex items-start">
```

### Grid Alignment

```tsx
// Equal columns
<div className="grid grid-cols-3 gap-4">

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Auto-fit for flexible grids
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

---

## Typography

### Type Scale

| Class | Size | Use Case |
|-------|------|----------|
| text-xs | 12px | Captions, badges |
| text-sm | 14px | Secondary text, labels |
| text-base | 16px | Body text |
| text-lg | 18px | Lead text |
| text-xl | 20px | Section headings |
| text-2xl | 24px | Page headings |
| text-3xl | 30px | Hero titles |

### Font Weight

```tsx
// Headings: semibold or bold
<h1 className="text-2xl font-semibold">

// Body: normal
<p className="text-base font-normal">

// Labels: medium
<label className="text-sm font-medium">

// Emphasis: medium, not bold (too heavy)
<span className="font-medium">Important</span>
```

### Line Height

```tsx
// Tight for headings
<h1 className="text-3xl leading-tight">

// Normal for body
<p className="text-base leading-normal">

// Relaxed for reading
<article className="leading-relaxed">
```

---

## Component Patterns

### Cards

```tsx
<div className="rounded-lg border bg-card p-4 shadow-sm">
  <div className="space-y-3">
    <h3 className="font-semibold">Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</div>
```

### Buttons

```tsx
// Primary action
<Button className="h-10 px-4">Primary</Button>

// Secondary action
<Button variant="outline" className="h-10 px-4">Secondary</Button>

// Icon button
<Button variant="ghost" size="icon" className="h-9 w-9">
  <Icon className="h-4 w-4" />
</Button>

// Button with icon
<Button className="gap-2">
  <Icon className="h-4 w-4" />
  <span>Label</span>
</Button>
```

### Form Fields

```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-sm font-medium">
    Email
  </Label>
  <Input 
    id="email" 
    type="email" 
    className="h-10"
    placeholder="Enter your email"
  />
  <p className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>
```

### Lists

```tsx
// Vertical list with dividers
<div className="divide-y">
  {items.map(item => (
    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
      {item.name}
    </div>
  ))}
</div>

// Horizontal list
<div className="flex items-center gap-4">
  {items.map(item => (
    <span key={item.id}>{item.name}</span>
  ))}
</div>
```

---

## Responsive Design

### Breakpoint Strategy

| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | 0px | Mobile phones |
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

### Mobile-First Patterns

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col gap-4 md:flex-row">

// Full width on mobile, contained on desktop
<div className="w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="md:hidden">
```

### Container Widths

```tsx
// Standard page container
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Narrow content (forms, articles)
<div className="max-w-xl mx-auto px-4">

// Wide content (dashboards)
<div className="max-w-7xl mx-auto px-4">
```

---

## Common Mistakes

### Spacing

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| `mt-3 mb-5` | `my-4` | Inconsistent spacing |
| `p-[15px]` | `p-4` | Arbitrary value |
| No gap in flex | `gap-4` | Margin on children is fragile |

### Alignment

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| `float-right` | `flex justify-end` | Float breaks layout |
| Text-only centering | `flex items-center justify-center` | Handles all content |
| Manual centering math | `mx-auto` | Automatic and responsive |

### Typography

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| `text-black` | `text-foreground` | Respects theme |
| `text-gray-500` | `text-muted-foreground` | Semantic color |
| No font-weight on headings | `font-semibold` | Visual hierarchy |

### Responsiveness

| ❌ Bad | ✅ Good | Why |
|--------|---------|-----|
| Fixed widths | `w-full max-w-md` | Responsive |
| Desktop-first | Mobile-first | Better progressive enhancement |
| `hidden` without breakpoint | `hidden md:block` | Specify when to show |

---

## Browser Testing Widths

Always verify at these widths:

| Width | Device | What to Check |
|-------|--------|---------------|
| 375px | iPhone SE | Content fits, no overflow |
| 414px | iPhone Pro | Slightly wider mobile |
| 768px | iPad | Tablet layout kicks in |
| 1024px | Small laptop | Desktop layout |
| 1280px | Desktop | Full layout |
| 1920px | Large monitor | No excessive stretching |

### Using browser_resize

```
browser_resize:
  width: 375
  height: 667
```

Test at each breakpoint and verify:
- Layout changes appropriately
- Content remains readable
- No horizontal scrolling
- Touch targets are large enough (44x44px minimum)
