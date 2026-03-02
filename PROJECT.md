# Dippi Landing Page — Project Documentation

## Overview
Coming soon landing page for Dippi, a queue-based event transportation platform. Designed to be shown to potential venue partners and taxi company partners when they Google "Dippi."

**Live preview**: Run `python3 -m http.server 8080 --directory /Users/carlylochmandy/code/Dippi/website` then visit `http://localhost:8080`

---

## File Structure
```
/Users/carlylochmandy/code/Dippi/website/
├── index.html              # Main landing page
├── style.css               # All styles (CSS custom properties, animations, responsive)
├── script.js               # Scroll animations, nav behavior, form handling
├── PROJECT.md              # This file
└── assets/
    ├── dippi-mascot.png         # Original mascot (purple bg) — old version
    ├── dippi-mascot.jpg         # Original mascot JPG — old version
    ├── dippi-mascot-new.png     # Updated mascot (white bg, purple lines, "D" headband)
    ├── dippi-mascot-small.png   # Small version of updated mascot
    ├── dippi-mascot-latest.png  # APP ICON version (orange bg, white character) — used in CTA
    ├── dippi-mascot-latest-small.png  # Small version of app icon
    ├── dippi-logo.png           # Peace sign hand logo (white, transparent bg) — used in nav/footer
    └── dippi-logo-small.png     # Small version of peace sign logo
```

## Currently Used Assets
- `dippi-logo.png` — Nav header + footer (peace sign hand next to "DIPPI" text)
- `dippi-mascot-latest.png` — CTA section at bottom (styled as iOS app icon with rounded corners)
- The hero section uses an **inline SVG animation** (no external image file)

## Design System

### Colors (CSS Custom Properties)
```css
--purple-700: #7c3aed    /* Primary */
--purple-900: #5b21b6    /* Dark */
--purple-950: #3b0764    /* Darkest (nav, footer, hero bg) */
--purple-50:  #faf5ff    /* Light bg */
--orange-500: #f97316    /* Accent */
--orange-600: #ea580c    /* Accent hover */
```
SVG illustration color: `#4B2085` (matches mascot line art)

### Fonts (Google Fonts)
- **Outfit** (600–900): Headings, logo, stats
- **Inter** (400–700): Body text, buttons, forms

### Tagline
"Good Vibes. Easy Rides."

---

## Page Sections (top to bottom)

1. **Navigation** — Fixed header. Peace sign logo + "DIPPI" text. "Coming Summer 2026" badge. "Get Notified" CTA button. Becomes solid purple on scroll.

2. **Hero** — Full-viewport purple gradient. Tagline "Good Vibes. Easy Rides." with orange accent. Email signup form. Animated SVG scene on right (3 concertgoers approaching a Dippi car — monochromatic purple line art with animations: bouncing, walking, floating music notes, twinkling sparkles).

3. **The Problem** — "Sound Familiar?" 3 cards: The Surge (pricing), The Search (finding driver), The Dead Zone (no cell service). SVG icons.

4. **Three Steps. Zero Stress.** — Pre-Register → Show Your Pass → Hop In & Go. Step cards with connector arrows.

5. **Why Dippi / Built Different** — 6 feature cards: Flat $40, Works Offline, 30-Second Matching, Pre-Committed Drivers, Door-to-Door, Organized & Safe.

6. **Comparison** — Side-by-side "Without Dippi" vs "With Dippi" with checkmarks/X marks.

7. **Partner With Us** — Two cards: "For Venues" (zero cost, safer exits, fewer complaints, etc.) and "For Transportation Partners" (guaranteed fares, back-to-back rides, demand data, etc.)

8. **CTA / Be First to Ride** — Purple gradient. App icon (orange hippie, iOS-style rounded corners). Email signup. Contact email + location.

9. **Footer** — Peace sign logo + "DIPPI". Copyright. Tagline.

---

## Animations & Interactions

### CSS Animations
- **Hero scene**: People bounce/walk/lean, car idles, music notes float, sparkles pulse
- **Scroll reveal**: Elements fade up as they enter viewport (IntersectionObserver, `.reveal` class)
- **Hero fade-in**: `.fade-up` elements animate on page load with staggered delays
- **Nav**: Transparent → solid purple on scroll (`.scrolled` class toggled via JS)
- **Buttons**: Translate up + shadow increase on hover
- **Cards**: Translate up + shadow on hover

### JavaScript (script.js)
- Nav scroll detection (adds `.scrolled` class at 50px)
- Hero elements `.fade-up` → `.visible` on load (200ms delay)
- IntersectionObserver for `.reveal` elements (threshold 0.15)
- Form submission handling (replaces form with success message, logs email to console)
- Smooth scroll for anchor links
- Subtle parallax on hero scene (desktop only)

---

## Responsive Breakpoints
- **900px**: Hero switches to single column (scene stacks above text). Step cards go vertical.
- **768px**: Problem grid → single column. Features → 2 columns. Comparison → stacked. Partners → single column.
- **600px**: Nav badge hidden.
- **500px**: Form inputs stack vertically. Feature grid → single column.

---

## Key Design Decisions
- **No specific venue names** — keeps partnership leverage. Uses "major outdoor amphitheaters across the Midwest."
- **Generalized crowd numbers** — "thousands" instead of "28,000" since first venue isn't locked down.
- **Hero uses SVG animation** instead of static mascot — more engaging, matches brand illustration style.
- **App icon styling** in CTA uses iOS border-radius (26.5%) for authenticity.
- **Peace sign logo** tucked tight against "DIPPI" text with negative margin — reads as part of the wordmark.

---

## To Extract Updated Assets from Strategy Doc
The `.pages` file is a ZIP archive. To get images:
```bash
cd /tmp
cp "/Users/carlylochmandy/code/Dippi/Dippi-Master-Strategy.pages" temp.zip
unzip -o temp.zip -d pages_extract
ls pages_extract/Data/   # Images are here
```

## Future: Email Signup Backend
Forms currently log to console. To make functional:
- Add Stripe/Mailchimp/ConvertKit API call in form submit handler (script.js)
- Or use a service like Formspree/Netlify Forms if deploying there

## Future: Deployment
Static site — deploy anywhere:
- **Netlify**: drag-and-drop the `website/` folder
- **Vercel**: `cd website && vercel`
- **GitHub Pages**: push to repo, enable Pages
- **Custom domain**: point DNS to host, add domain in provider settings
