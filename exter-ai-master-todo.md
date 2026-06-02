# EXTER-AI.COM — MASTER TASK SPLIT
### Who Does What: Antigravity (Dev) vs. You (Manual)

**Last Updated:** May 30, 2026  
**Goal:** Get exter-ai.com indexed, ranked, and cited across Google + AI engines  

---
---

# 🔵 SECTION A: ANTIGRAVITY / DEV TEAM TASKS

*Hand this entire section to your dev team. These are code-level, infrastructure, and deployment tasks that require access to the codebase and hosting.*

---

## A1. CRITICAL — FIX INDEXING (DEPLOY WITHIN 24 HOURS)

The site is currently NOT INDEXED in Google. Nothing else works until this is fixed.

### A1.1 Create and deploy robots.txt

**File:** `/robots.txt` (root of domain)  
**Priority:** EMERGENCY — deploy today  

```
User-agent: *
Allow: /
Sitemap: https://exter-ai.com/sitemap.xml

# AI Search Crawlers — ALLOW ALL
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /
```

**Why:** Without robots.txt, search engines don't know what they're allowed to crawl. Without explicit `Allow` for AI bots, ChatGPT/Perplexity/Claude may skip your site entirely. This single file controls whether AI engines can even see you.

---

### A1.2 Create and deploy XML Sitemap

**File:** `/sitemap.xml` (root of domain)  
**Priority:** EMERGENCY — deploy today  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://exter-ai.com/</loc>
    <lastmod>2026-05-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://exter-ai.com/about.html</loc>
    <lastmod>2026-05-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exter-ai.com/work.html</loc>
    <lastmod>2026-05-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://exter-ai.com/book.html</loc>
    <lastmod>2026-05-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://exter-ai.com/work-template.html</loc>
    <lastmod>2026-05-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- ADD EVERY NEW PAGE HERE AS YOU CREATE THEM -->
  <!-- Service pages, blog posts, case studies, team pages -->
</url>
</urlset>
```

**Instructions for Antigravity:**
- Deploy this file at the exact URL `https://exter-ai.com/sitemap.xml`
- Every time a new page is published (blog post, service page, case study), add it to the sitemap with the correct `<lastmod>` date
- If using a static site generator or CMS, automate sitemap generation
- The `<lastmod>` date MUST update whenever page content changes — this tells Google and AI crawlers to re-fetch the page

---

### A1.3 Verify site is not accidentally blocking crawlers

**Check these immediately:**

- [ ] Open `https://exter-ai.com` in a browser → View Source → search for `<meta name="robots"` — if you find `noindex` or `nofollow`, REMOVE IT immediately
- [ ] Check if any JavaScript framework is rendering the site client-side only (SPA without SSR). If so, implement server-side rendering (SSR) or pre-rendering. Google can render JS but AI crawlers generally cannot — they need the HTML to contain the actual text content
- [ ] Check HTTP response headers for `X-Robots-Tag: noindex` — remove if present
- [ ] Ensure the site returns HTTP 200 (not 301 redirect loops, not 403, not soft 404)
- [ ] Test with `curl -I https://exter-ai.com` — the response must be `200 OK` with `Content-Type: text/html`
- [ ] If using Cloudflare or any CDN/WAF, ensure bot traffic is NOT being blocked or challenged with CAPTCHAs

**Why this matters:** The fact that `site:exter-ai.com` returns zero results in Google means something is actively preventing indexing. It's either a `noindex` tag, a JS rendering issue, or a server-side block. This must be diagnosed and fixed before anything else.

---

## A2. META TAGS — ADD TO EVERY PAGE (Week 1)

### A2.1 Homepage (`index.html` or `/`)

Add inside `<head>`:

```html
<title>AI Agency for Startups — Web, Automation & Branding | Exter.ai</title>
<meta name="description" content="AI-native studio building websites, AI automations, and brand identity for ambitious founders. Fixed pricing. Based in India, shipping worldwide.">
<meta name="keywords" content="AI agency, AI automation, AI receptionist, 3D website design, AI branding, startup agency, fullstack development">
<link rel="canonical" href="https://exter-ai.com/">

<!-- Open Graph (for social sharing) -->
<meta property="og:title" content="Exter.ai — AI-Native Studio for Founders">
<meta property="og:description" content="AI-native studio building websites, AI automations, and brand identity for ambitious founders.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://exter-ai.com/">
<meta property="og:image" content="https://exter-ai.com/og-image.jpg">
<meta property="og:site_name" content="Exter.ai">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Exter.ai — AI-Native Studio for Founders">
<meta name="twitter:description" content="AI-native studio building websites, AI automations, and brand identity for ambitious founders.">
<meta name="twitter:image" content="https://exter-ai.com/og-image.jpg">
```

**Antigravity also needs to create:** An OG image (1200x630px) — a branded card with the Exter.ai logo, tagline, and visual identity. Save as `/og-image.jpg`. This is what shows when people share your link on LinkedIn, Twitter, WhatsApp, Slack, etc.

---

### A2.2 About Page (`about.html`)

```html
<title>About Exter.ai — AI-Native Studio Built by Founders, for Founders</title>
<meta name="description" content="Four founders using AI to deliver enterprise-grade websites, automations, and branding at startup speed. Based in India, shipping worldwide.">
<link rel="canonical" href="https://exter-ai.com/about.html">
```

---

### A2.3 Work Page (`work.html`)

```html
<title>Case Studies — AI Receptionist, 3D Web, Fullstack Apps | Exter.ai</title>
<meta name="description" content="See how Exter.ai builds AI receptionists, 3D websites, and fullstack applications. Real projects, real results, real founders.">
<link rel="canonical" href="https://exter-ai.com/work.html">
```

---

### A2.4 Book Page (`book.html`)

```html
<title>Book a Free Discovery Call — Exter.ai</title>
<meta name="description" content="Schedule a free 30-minute call with Exter.ai. Get a written plan with scope, timeline, and fixed price. No pitch decks.">
<link rel="canonical" href="https://exter-ai.com/book.html">
```

---

### A2.5 Each Service Page (new — see A4)

```html
<!-- /services/ai-receptionist.html -->
<title>AI Receptionist for Business — 24/7 Voice AI Agent | Exter.ai</title>
<meta name="description" content="AI receptionists that answer calls, book appointments, and qualify leads 24/7. Built by Exter.ai. Setup in 4 days. Integrates with your CRM.">

<!-- /services/3d-web-design.html -->
<title>3D Website Design Agency — Immersive Web Experiences | Exter.ai</title>
<meta name="description" content="Custom 3D websites with cinematic motion design. Built by Exter.ai for founders who want to stand out. Fixed pricing, 3-week delivery.">

<!-- /services/fullstack-development.html -->
<title>Fullstack Development Agency — AI-Powered Web & App Dev | Exter.ai</title>
<meta name="description" content="Fullstack web and app development powered by AI. React, Next.js, Node, Python. Built by Exter.ai. Fixed pricing, shipped fast.">

<!-- /services/ai-video-branding.html -->
<title>AI Video Branding — Studio-Quality Brand Videos with AI | Exter.ai</title>
<meta name="description" content="AI-generated brand videos, motion graphics, and visual identity. Studio quality at startup speed. Built by Exter.ai.">
```

---

### A2.6 Each Blog Post (template for all future posts)

```html
<title>[Blog Post Title — Under 60 Characters] | Exter.ai Blog</title>
<meta name="description" content="[150-character summary of the post with primary keyword]">
<link rel="canonical" href="https://exter-ai.com/blog/[slug].html">
<meta property="og:type" content="article">
<meta property="article:published_time" content="[ISO date]">
<meta property="article:modified_time" content="[ISO date]">
<meta property="article:author" content="[Founder Real Name]">
```

---

## A3. SCHEMA MARKUP — ADD TO EVERY PAGE (Week 1)

### A3.1 Organization Schema (add to EVERY page, in `<head>` as `<script type="application/ld+json">`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Exter.ai",
  "alternateName": ["Exter AI", "exter-ai", "Exter"],
  "url": "https://exter-ai.com",
  "logo": "https://exter-ai.com/logo.png",
  "description": "AI-native studio building websites, automations, and brand identity for ambitious founders. Based in India, shipping worldwide.",
  "foundingDate": "2026",
  "founder": [
    {
      "@type": "Person",
      "name": "[FOUNDER 1 REAL NAME]",
      "jobTitle": "Co-Founder & Strategy Lead",
      "url": "https://exter-ai.com/team/[name]",
      "sameAs": ["https://linkedin.com/in/[ACTUAL-PROFILE]"]
    },
    {
      "@type": "Person",
      "name": "[FOUNDER 2 REAL NAME]",
      "jobTitle": "Co-Founder & Technical Lead",
      "url": "https://exter-ai.com/team/[name]",
      "sameAs": ["https://linkedin.com/in/[ACTUAL-PROFILE]"]
    },
    {
      "@type": "Person",
      "name": "[FOUNDER 3 REAL NAME]",
      "jobTitle": "Co-Founder & Creative Lead",
      "url": "https://exter-ai.com/team/[name]",
      "sameAs": ["https://linkedin.com/in/[ACTUAL-PROFILE]"]
    },
    {
      "@type": "Person",
      "name": "[FOUNDER 4 REAL NAME]",
      "jobTitle": "Co-Founder & Growth Lead",
      "url": "https://exter-ai.com/team/[name]",
      "sameAs": ["https://linkedin.com/in/[ACTUAL-PROFILE]"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[Your City]",
    "addressRegion": "[Your State]",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@exter.ai",
    "contactType": "sales",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/[ACTUAL-COMPANY-PAGE]",
    "https://www.instagram.com/[ACTUAL-HANDLE]",
    "https://x.com/[ACTUAL-HANDLE]",
    "https://github.com/[ACTUAL-ORG]",
    "https://www.youtube.com/@[ACTUAL-CHANNEL]"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "AI Automation",
    "AI Receptionist",
    "Voice AI",
    "3D Web Design",
    "Fullstack Development",
    "AI Video Branding",
    "LLM Orchestration"
  ]
}
```

**⚠️ IMPORTANT FOR ANTIGRAVITY:** Replace every `[PLACEHOLDER]` with actual data. The founder will provide real names, real LinkedIn URLs, and real social handles. Do NOT deploy with placeholders — Google treats fake structured data as spam.

---

### A3.2 WebSite Schema with SearchAction (Homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Exter.ai",
  "url": "https://exter-ai.com",
  "description": "AI-native studio for founders who can't afford to look small.",
  "publisher": {
    "@type": "Organization",
    "name": "Exter.ai"
  }
}
```

---

### A3.3 Service Schema (one per service page — 4 total)

**Example for AI Receptionist page:**

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Receptionist Development",
  "description": "Custom AI voice agents that answer phone calls, book appointments, qualify leads, and handle customer inquiries 24/7. Integrates with CRM, calendar, and phone systems. Setup in 4 days.",
  "provider": {
    "@type": "Organization",
    "name": "Exter.ai",
    "url": "https://exter-ai.com"
  },
  "serviceType": "AI Automation",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Receptionist Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Receptionist — Starter",
          "description": "Voice AI agent with appointment booking and CRM integration"
        }
      }
    ]
  }
}
```

**Repeat this pattern for:**
- 3D Web Design → `"serviceType": "Web Design"`
- Fullstack Development → `"serviceType": "Software Development"`
- AI Video Branding → `"serviceType": "Brand Design"`

---

### A3.4 FAQ Schema (add to Homepage, every service page, and every blog post)

**Homepage FAQ Schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Exter.ai do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exter.ai is an AI-native studio that builds websites, AI automations, fullstack applications, and brand identities for ambitious founders. We use AI to ship faster and deliver enterprise-grade quality at startup speed, with fixed pricing and no pitch decks."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Exter.ai charge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide fixed-price proposals after a free discovery call. Every project gets a written plan with scope, timeline, and exact price before we start. No hourly billing, no surprise invoices."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Exter.ai based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exter.ai is based in India and ships worldwide. We work with founders and companies across the US, UK, Middle East, and Asia Pacific."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a project take with Exter.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical timelines range from 4 days for an AI receptionist to 3 weeks for a full 3D website. We provide exact timelines in our proposal after the discovery call."
      }
    },
    {
      "@type": "Question",
      "name": "Does Exter.ai work with international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Exter.ai ships worldwide. We have clients across the US, UK, UAE, and Asia. We communicate in English, work across time zones, and handle everything from discovery to deployment remotely."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Exter.ai different from other AI agencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are AI-native — we don't just build AI for clients, we use AI in every part of our own workflow. This means faster delivery, lower costs, and higher quality. No middlemen, no bloat, just four founders shipping directly."
      }
    }
  ]
}
```

---

### A3.5 Article Schema (template for EVERY blog post)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Blog Post Title]",
  "description": "[Meta description]",
  "image": "https://exter-ai.com/blog/images/[post-image].jpg",
  "author": {
    "@type": "Person",
    "name": "[Author Real Name]",
    "url": "https://exter-ai.com/team/[author-slug]",
    "jobTitle": "[Title] at Exter.ai"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Exter.ai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://exter-ai.com/logo.png"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://exter-ai.com/blog/[slug].html"
  }
}
```

**⚠️ CRITICAL FOR ANTIGRAVITY:** The `dateModified` field MUST update every time blog content is edited. Perplexity and Google AI Overviews heavily favor recently-modified content. If you can automate this (e.g., build date injected at deploy time), do it.

---

### A3.6 HowTo Schema (for process-oriented service pages and blog posts)

**Example for the AI Receptionist service page:**

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get an AI Receptionist for Your Business",
  "description": "A step-by-step guide to setting up an AI receptionist with Exter.ai, from discovery call to live deployment.",
  "totalTime": "P4D",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Book a Discovery Call",
      "text": "Schedule a free 30-minute discovery call. We'll discuss your business needs, call volume, existing systems, and integration requirements."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Receive Your Proposal",
      "text": "Within 24 hours, you'll get a written plan with scope, timeline, and fixed price. No guesswork."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "System Configuration",
      "text": "We configure the AI voice agent, set up call flows, design conversation scripts, and integrate with your CRM and calendar system."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Testing & Launch",
      "text": "We run test calls, fine-tune AI responses based on your feedback, and go live. Typical setup: 4 days from kickoff to live."
    }
  ]
}
```

---

## A4. NEW PAGES TO BUILD (Week 1-3)

### A4.1 Create 4 Dedicated Service Pages

Currently, all services are cards on the homepage. Each needs its own URL with rich content.

**Pages to create:**

| URL Path | Page Title | Min Word Count |
|----------|-----------|---------------|
| `/services/ai-receptionist.html` | AI Receptionist for Business | 1500 words |
| `/services/3d-web-design.html` | 3D Website Design Agency | 1500 words |
| `/services/fullstack-development.html` | Fullstack Development Agency | 1500 words |
| `/services/ai-video-branding.html` | AI Video Branding | 1500 words |

**Each service page must contain:**

1. **H1** — Primary keyword as heading (e.g., "AI Receptionist for Business")
2. **Hero paragraph** (40-60 words) — A direct, citable definition/answer. This is the paragraph AI engines will extract and cite. Write it as if answering "What is [service]?" Start with "[Service] is..."
3. **"How It Works" section** with 3-5 steps (H2)
4. **Features list** with descriptions (H2)
5. **"Who It's For" section** — Industries and use cases (H2)
6. **Pricing / engagement model** — Even if it's "starts at $X" or "fixed price after discovery" (H2)
7. **Case study summary** — Link to full case study (H2)
8. **Comparison section** — Table comparing your approach vs alternatives (H2)
9. **FAQ section** — 5-8 questions with answers (H2), with FAQ schema
10. **CTA block** — "Book a Call" button linking to `/book.html`
11. **Internal links** — Link to related blog posts, other services, and case studies
12. **Schema markup** — Service schema + FAQ schema + BreadcrumbList schema

**Content structure for the hero paragraph (this is what AI engines cite):**

```
An AI receptionist is a voice-enabled artificial intelligence system that 
answers phone calls, qualifies leads, books appointments, and handles 
customer inquiries 24 hours a day, 7 days a week. Unlike traditional 
answering services, AI receptionists integrate directly with CRM systems, 
calendar tools, and phone networks, providing instant responses without 
human intervention. Businesses using AI receptionists typically see a 
60-80% reduction in missed calls and a 3-5x increase in after-hours 
appointment bookings.
```

**⚠️ NOTE:** The founder will write or approve the actual content. Antigravity builds the page templates, implements the markup, and deploys. DO NOT use AI-generated filler text — Google's Helpful Content system penalizes thin/generic AI content.

---

### A4.2 Create Blog Infrastructure

**URL structure:** `/blog/` for the index, `/blog/[slug].html` for posts

**Build a blog system with:**

- [ ] Blog index page (`/blog/`) with list of all posts, sorted by date (newest first)
- [ ] Individual post template with:
  - Title (H1)
  - Author name + photo + link to team page
  - Published date + last modified date (visible on page AND in schema)
  - Estimated reading time
  - Featured image with alt text
  - Body content with proper H2/H3 hierarchy
  - Table of contents (auto-generated from headings, for posts > 1500 words)
  - FAQ section at bottom
  - Related posts section (3 related articles)
  - CTA block ("Need help with [topic]? Book a call")
  - Social share buttons
  - Previous/Next post navigation
- [ ] RSS feed at `/blog/feed.xml`
- [ ] Blog sitemap or include blog URLs in main sitemap
- [ ] Auto-inject Article schema on every post
- [ ] Auto-inject FAQ schema when FAQ section is present
- [ ] Open Graph tags auto-populated from post metadata

**Tech recommendation:** If the site is static HTML, consider adding a lightweight CMS (Contentful, Sanity, Notion as CMS, or even markdown files processed by a static site generator like Astro, Hugo, or 11ty). This makes the 2x/week publishing cadence sustainable.

---

### A4.3 Create Team / Founder Pages

**URL structure:** `/team/[founder-name].html` (4 pages)

**Each page must contain:**

- [ ] Founder's real full name (H1)
- [ ] Professional photo
- [ ] Job title and role at Exter.ai
- [ ] 200-300 word professional bio
- [ ] Areas of expertise (listed)
- [ ] Previous experience / credentials
- [ ] Links to LinkedIn, GitHub, Twitter, personal site
- [ ] Links to their authored blog posts on Exter.ai
- [ ] Links to external publications / speaking engagements
- [ ] Person schema with `sameAs` pointing to all profiles

**Why this matters:** Google's E-E-A-T framework and AI engines both need to verify that real, credible humans stand behind the content. "The Architect" and "The Engineer" are not verifiable — real names with linked profiles are.

---

### A4.4 Create a `/services/` Index Page

A page listing all 4 services with brief descriptions and links to individual service pages. Include BreadcrumbList schema.

---

### A4.5 Create a `/resources/` or `/tools/` Section (Month 2-3)

Interactive tools that generate unique data and attract backlinks:

- [ ] **AI Receptionist ROI Calculator** — User inputs their call volume, missed call rate, cost per missed appointment → calculator shows estimated ROI of an AI receptionist. (Build as an interactive React/JS component)
- [ ] **Website Cost Estimator** — User selects project type, features, complexity → shows estimated price range
- [ ] **AI Readiness Assessment** — Short quiz that tells founders how ready they are for AI automation

These tools are linkable assets that bloggers and publications will reference, creating natural backlinks.

---

## A5. FIX BROKEN SOCIAL LINKS (Deploy within 24 hours)

**Current problem:** The footer has social links pointing to generic root domains:
- LinkedIn → `#` (goes nowhere)
- Instagram → `#` (goes nowhere)
- X / Twitter → `#` (goes nowhere)

**Fix:** Replace ALL `#` placeholder links with actual profile URLs once the founder creates them (see Section B). Until real profiles exist, REMOVE the social links entirely. Dead/placeholder links damage trust signals.

---

## A6. INTERNAL LINKING ARCHITECTURE (Week 2-3)

### A6.1 Add Breadcrumb Navigation

Add breadcrumbs to every page (visible + BreadcrumbList schema):

```
Home > Services > AI Receptionist
Home > Blog > What Is an AI Receptionist
Home > Work > Dental Clinic Voice AI
Home > Team > [Founder Name]
```

Schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://exter-ai.com/"},
    {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://exter-ai.com/services/"},
    {"@type": "ListItem", "position": 3, "name": "AI Receptionist", "item": "https://exter-ai.com/services/ai-receptionist.html"}
  ]
}
```

### A6.2 Update the Navigation Menu

Current nav: `About | Work | Book a call`

Updated nav: `Services ▾ | Work | Blog | About | Book a call`

Where "Services" has a dropdown:
- AI Receptionist
- 3D Web Design
- Fullstack Development
- AI Video Branding

### A6.3 Add Footer Links

Expand the footer "Quick Links" to include:
- All 4 service pages
- Blog
- Team / About
- Case Studies (work)
- Book a Call
- Sitemap

### A6.4 Implement Cross-Linking Rules

- **Every blog post** must link to at least 1 service page, 1 case study, and 1 other blog post
- **Every service page** must link to at least 2 blog posts and 1 case study
- **Every case study** must link to the relevant service page and the booking page
- **Homepage** must link to all service pages, latest blog posts, and featured case studies

---

## A7. PAGE SPEED & CORE WEB VITALS (Week 2)

The site uses heavy 3D/motion elements. Ensure performance doesn't kill SEO:

- [ ] **Lazy load all videos and 3D elements** — They should not load until the user scrolls to them
- [ ] **Preload critical resources** — Hero fonts, above-the-fold images, critical CSS
- [ ] **Compress all images** — Convert to WebP or AVIF format, use responsive `srcset`
- [ ] **Minify CSS and JS** — Remove unused code
- [ ] **Enable GZIP/Brotli compression** on the server
- [ ] **Set proper cache headers** — Static assets should have `Cache-Control: max-age=31536000`
- [ ] **Defer non-critical JavaScript** — Use `defer` or `async` attributes
- [ ] **Eliminate render-blocking resources** — Inline critical CSS, defer the rest
- [ ] **Target scores:** PageSpeed Insights — 90+ mobile, 95+ desktop
- [ ] **Core Web Vitals targets:** LCP < 2.5s, FID < 100ms, CLS < 0.1

Test with: `https://pagespeed.web.dev/` and `https://web.dev/measure/`

---

## A8. TECHNICAL SEO CHECKLIST (Week 1-2)

- [ ] **HTTPS** — Confirm SSL certificate is valid and all pages load over HTTPS (no mixed content warnings)
- [ ] **WWW redirect** — Ensure `www.exter-ai.com` redirects to `exter-ai.com` (or vice versa) with 301 redirect. Pick one canonical version
- [ ] **Trailing slash consistency** — Pick either `/about.html` or `/about/` and redirect the other. Be consistent across the entire site
- [ ] **404 page** — Create a custom 404 page with navigation, search, and links to key pages. It should return HTTP 404 status code (not 200)
- [ ] **Mobile responsiveness** — Test every page on mobile. Google uses mobile-first indexing
- [ ] **Structured data testing** — Validate all schema markup at `https://validator.schema.org/` and `https://search.google.com/test/rich-results`
- [ ] **No orphan pages** — Every page must be reachable from at least one internal link and be in the sitemap
- [ ] **Heading hierarchy** — Every page must have exactly one H1, followed by H2s, then H3s. No skipping levels
- [ ] **Image alt text** — Every image must have descriptive alt text containing relevant keywords
- [ ] **Canonical tags** — Every page must have a `<link rel="canonical">` pointing to itself

---

## A9. ANALYTICS & TRACKING SETUP (Week 1)

### A9.1 Google Analytics 4

- [ ] Create GA4 property for exter-ai.com
- [ ] Install GA4 tracking code on every page
- [ ] Set up conversion events:
  - `book_call_click` — When someone clicks "Book a Call"
  - `contact_form_submit` — If there's a contact form
  - `blog_scroll_75` — When someone reads 75% of a blog post
- [ ] Set up custom dimensions for traffic source:
  - AI referral traffic (from chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com)
  - Organic search
  - Social
  - Direct
  - Referral

### A9.2 Google Tag Manager (Optional but recommended)

Install GTM container to manage all tracking scripts without code deploys.

### A9.3 Microsoft Clarity (Free heatmaps)

Install Clarity for user behavior analysis — heatmaps, session recordings, scroll depth.

---

## A10. GEOGRAPHIC LANDING PAGES (Month 2-3)

Create dedicated pages for target markets:

| URL Path | Target Keyword | Purpose |
|----------|---------------|---------|
| `/ai-agency-usa.html` | "AI agency for US startups" | Target American founders |
| `/ai-agency-uk.html` | "AI agency UK" | Target British businesses |
| `/ai-agency-dubai.html` | "AI agency Dubai / UAE" | Target Middle East |
| `/ai-agency-india.html` | "AI agency India" | Target local market |
| `/ai-agency-australia.html` | "AI agency Australia" | Target APAC |

**Each page must have:**
- Unique content (NOT duplicate of homepage) about serving that market
- Relevant client testimonials from that region
- Timezone/communication details
- Local success stories
- Proper hreflang tags if multi-language
- Location-specific schema

---

## A11. RSS FEED & STRUCTURED FEEDS (Week 2)

- [ ] Create RSS feed at `/blog/feed.xml` — enables feed readers, news aggregators, and some AI engines to discover content
- [ ] Create JSON feed at `/blog/feed.json` (optional but modern)
- [ ] Submit RSS feed to Feedly, NewsBlur, and other aggregators

---

## A12. SECURITY & TRUST SIGNALS (Week 1)

- [ ] Implement Content Security Policy headers
- [ ] Add `X-Content-Type-Options: nosniff` header
- [ ] Implement HSTS (`Strict-Transport-Security`) header
- [ ] Ensure no mixed content warnings (all resources load via HTTPS)
- [ ] Add a visible privacy policy (already exists at /privacy.html — good)
- [ ] Add trust badges if applicable (any certifications, partnerships, awards)

---
---

# 🟠 SECTION B: YOUR MANUAL TASKS (FOUNDER)

*These are tasks that ONLY YOU can do. They require your identity, your voice, your relationships, your accounts, and your decisions. No dev team can do these for you.*

---

## B1. ACCOUNT CREATION & VERIFICATION (Day 1-3)

### B1.1 Google Search Console — SET UP TODAY

1. Go to `https://search.google.com/search-console/`
2. Click "Add Property"
3. Enter `https://exter-ai.com`
4. Verify ownership (DNS TXT record is the most reliable method — add the TXT record Antigravity provides to your domain's DNS settings)
5. Once verified, go to "Sitemaps" → Submit `https://exter-ai.com/sitemap.xml`
6. Go to "URL Inspection" → Enter `https://exter-ai.com/` → Click "Request Indexing"
7. Repeat URL Inspection + Request Indexing for EVERY existing page:
   - `https://exter-ai.com/about.html`
   - `https://exter-ai.com/work.html`
   - `https://exter-ai.com/book.html`
   - `https://exter-ai.com/work-template.html`
8. Check back daily for 2 weeks to monitor crawl status and fix any errors

### B1.2 Bing Webmaster Tools — SET UP TODAY

1. Go to `https://www.bing.com/webmasters/`
2. Sign in with a Microsoft account
3. Add `https://exter-ai.com`
4. Verify ownership
5. Submit sitemap: `https://exter-ai.com/sitemap.xml`
6. Submit individual URLs for indexing

**Why Bing matters even more than you think:** ChatGPT uses Bing for its web search. Microsoft Copilot uses Bing. DuckDuckGo uses Bing. Being indexed in Bing means being visible to 3+ AI engines at once.

### B1.3 Google Business Profile

1. Go to `https://business.google.com/`
2. Create a profile for "Exter.ai"
3. Category: "Software Company" or "Web Development Company" or "AI Company"
4. Set as "Service Area Business" (you serve clients remotely — no walk-in address needed)
5. Add service areas: India, United States, United Kingdom, UAE, Worldwide
6. Complete EVERY field: description, services, hours, phone, email, website
7. Upload photos: team photos, office/workspace, project screenshots, logo
8. Once verified, start collecting Google Reviews from clients

### B1.4 Google Analytics 4

1. Go to `https://analytics.google.com/`
2. Create a new GA4 property for exter-ai.com
3. Get the Measurement ID (starts with `G-`)
4. Send the Measurement ID to Antigravity so they can install the tracking code

---

## B2. SOCIAL MEDIA PROFILES — CREATE REAL ONES (Day 1-3)

### B2.1 LinkedIn Company Page

1. Go to LinkedIn → Create a Company Page
2. Company name: "Exter.ai"
3. Tagline: "AI-native studio for founders who can't afford to look small"
4. Industry: Information Technology & Services
5. Company size: 2-10
6. Upload logo and banner image
7. Write a 200+ word company description with keywords
8. Add specialties: AI Automation, AI Receptionist, 3D Web Design, Fullstack Development, AI Branding
9. Add website URL: `https://exter-ai.com`
10. **Send the URL to Antigravity** to update the footer link

### B2.2 LinkedIn Personal Profiles (ALL 4 Founders)

Each founder must:
1. Update their LinkedIn headline to mention Exter.ai (e.g., "Co-Founder & CTO at Exter.ai | AI Automation & Voice AI")
2. Update their "Experience" section with Exter.ai
3. Write a detailed "About" section mentioning expertise
4. Enable "Creator Mode"
5. Start publishing posts (see B5)
6. **Send profile URLs to Antigravity** for schema markup and team pages

### B2.3 X / Twitter

1. Create `@ExterAI` or similar handle
2. Write bio: "AI-native studio for founders. Web, automation, branding. Built in India, shipped worldwide. hello@exter.ai"
3. Add website link
4. Upload profile and header images
5. **Send the handle/URL to Antigravity** to update footer

### B2.4 Instagram

1. Create `@exter.ai` or `@exterai` handle
2. Set up as Business account
3. Write bio with keywords and link
4. Plan visual content: project screenshots, behind-the-scenes, 3D web showcases
5. **Send the handle/URL to Antigravity** to update footer

### B2.5 YouTube

1. Create a YouTube channel: "Exter.ai"
2. Write channel description with keywords
3. Upload banner and profile image
4. Plan content: project walkthroughs, tool demos, "how we built X" videos, founder vlogs
5. **Send the channel URL to Antigravity** to update footer

### B2.6 GitHub Organization

1. Create a GitHub org: `exter-ai`
2. Pin 3-5 repositories (open-source tools, templates, examples)
3. Write a compelling org README
4. **Send the URL to Antigravity** for schema

---

## B3. DIRECTORY & LISTING SUBMISSIONS (Week 2-4)

You need to manually create profiles on these platforms. Each one takes 10-30 minutes. Each gives you a backlink and a citation source for AI engines.

### B3.1 Priority 1 — Tech Agency Directories (Do first 10 in Week 2)

| # | Platform | URL | Time | Notes |
|---|----------|-----|------|-------|
| 1 | Clutch.co | clutch.co | 30 min | Most important agency directory. Complete your full profile, list services, add case studies. Ask clients to leave reviews here |
| 2 | DesignRush | designrush.com | 20 min | Submit as "AI Agency" + "Web Development Agency" |
| 3 | GoodFirms | goodfirms.co | 20 min | List services, add portfolio, collect reviews |
| 4 | G2 | g2.com | 15 min | List as a service provider. Get client reviews |
| 5 | Crunchbase | crunchbase.com | 20 min | CRITICAL for AI citation. Complete all fields: founders, funding, founding date, description. AI engines cite Crunchbase heavily |
| 6 | AngelList / Wellfound | wellfound.com | 15 min | Startup ecosystem visibility |
| 7 | TopDevelopers.co | topdevelopers.co | 15 min | Submit profile and portfolio |
| 8 | UpCity | upcity.com | 15 min | Local + national visibility |
| 9 | TechBehemoth | techbehemoth.com | 15 min | Global agency directory |
| 10 | Agency Spotter | agencyspotter.com | 15 min | Portfolio showcase |

### B3.2 Priority 2 — AI-Specific Directories (Week 3)

| # | Platform | URL | Time | Notes |
|---|----------|-----|------|-------|
| 11 | There's An AI For That | theresanaiforthat.com | 15 min | If you have a specific AI product to list |
| 12 | Futurepedia | futurepedia.io | 10 min | AI tool directory |
| 13 | TopAI.tools | topai.tools | 10 min | AI tool listing |
| 14 | AI Tool Directory | aitoolsdirectory.com | 10 min | General AI listing |
| 15 | ProductHunt | producthunt.com | 30 min | Launch Exter.ai as a "product" — great for backlinks and initial traffic burst |

### B3.3 Priority 3 — India & Business Directories (Week 3-4)

| # | Platform | URL | Time | Notes |
|---|----------|-----|------|-------|
| 16 | Startup India | startupindia.gov.in | 30 min | Government registry — strong trust signal |
| 17 | IndiaMART | indiamart.com | 20 min | B2B directory |
| 18 | Justdial | justdial.com | 15 min | Local business listing |
| 19 | Sulekha | sulekha.com | 15 min | Indian services directory |
| 20 | YellowPages India | yellowpages.co.in | 10 min | Basic citation |

### B3.4 Priority 4 — General Business Directories (Week 4)

| # | Platform | URL | Time | Notes |
|---|----------|-----|------|-------|
| 21 | Yelp | yelp.com | 15 min | If targeting US clients |
| 22 | BBB | bbb.org | 20 min | US trust signal |
| 23 | Trustpilot | trustpilot.com | 15 min | Review platform — get client reviews |
| 24 | Glassdoor | glassdoor.com | 15 min | Employer brand (even as a small team) |
| 25 | LinkedIn Company Directory | Already done in B2.1 | — | — |

---

## B4. CONTENT CREATION — YOU WRITE, ANTIGRAVITY PUBLISHES (Ongoing)

### B4.1 First 8 Blog Posts (Month 1 — write 2 per week)

**Post 1: "What Is an AI Receptionist? The Complete Guide for 2026"**
- Primary keyword: "AI receptionist"
- Word count: 2000-2500
- Structure: Definition → How it works → Who needs it → Cost → Comparison vs human → FAQ
- MUST include a 40-60 word citable paragraph right after the H1
- MUST include FAQ section with 5+ questions
- Author: [Technical founder]

**Post 2: "AI Receptionist vs. Human Receptionist: Cost, Quality, and ROI"**
- Primary keyword: "AI receptionist vs human receptionist"
- Word count: 1500-2000
- Structure: Comparison table → Cost analysis → Quality differences → Use cases → Verdict
- Include a comparison table (HTML table for snippet eligibility)
- Author: [Strategy founder]

**Post 3: "How We Built a Voice AI That Books 40+ Appointments Per Week"**
- Primary keyword: "AI appointment booking"
- Word count: 1500-2000
- Structure: Client problem → Our approach → Tech stack → Results → Lessons
- This is a case study disguised as a blog post — excellent for E-E-A-T
- Author: [Technical founder]

**Post 4: "5 Signs Your Startup Needs an AI Agency (Not a Freelancer)"**
- Primary keyword: "AI agency for startups"
- Word count: 1500
- Structure: 5 clear signs with real examples → Why agency > freelancer → CTA
- Author: [Strategy founder]

**Post 5: "The Real Cost of a 3D Website in 2026"**
- Primary keyword: "3D website cost"
- Word count: 1500-2000
- Structure: Price ranges → What affects cost → Examples → Our pricing → FAQ
- Author: [Creative founder]

**Post 6: "AI Video Branding: How to Create Studio-Quality Brand Videos with AI"**
- Primary keyword: "AI video branding"
- Word count: 1500
- Structure: What it is → Tools/process → Examples → Cost → FAQ
- Author: [Creative founder]

**Post 7: "How AI Agencies Actually Use AI Internally (Our Exact Stack)"**
- Primary keyword: "AI agency tools"
- Word count: 2000
- Structure: Our stack (design, code, communication, deployment) → How it makes us faster → What it means for clients
- Very shareable — founders love "behind the scenes" content
- Author: [Technical founder]

**Post 8: "The Founder's Guide to AI Automation: What to Automate First"**
- Primary keyword: "AI automation for founders"
- Word count: 2000-2500
- Structure: Priority framework → Top 10 things to automate → How to evaluate → Getting started → FAQ
- Make this a pillar/definitive guide
- Author: [Strategy founder]

### B4.2 Blog Writing Rules (Follow these for EVERY post)

1. **First paragraph must be a direct answer** — 40-60 words that completely answer the title question. This is what AI engines extract and cite. Start with "[Topic] is..." or "The answer is..."

2. **Use H2 and H3 subheadings with keywords** — Don't just write "Overview" — write "How AI Receptionists Work: A Technical Overview"

3. **Include specific numbers and data** — "40+ calls/week" not "many calls." "4-day setup" not "quick setup." "83% of missed calls convert to appointments" not "most calls convert." AI engines strongly prefer content with numbers.

4. **Include original insights** — Don't write what ChatGPT could generate. Write from YOUR experience. "When we built the dental clinic voice AI, we discovered that..." — this cannot be replicated and is exactly what AI engines reward.

5. **End every post with a FAQ section** — 5-8 questions and answers. This captures additional long-tail keywords and earns FAQ rich results.

6. **Every post must link to:**
   - At least 1 relevant Exter.ai service page
   - At least 1 case study (once you have them)
   - At least 1 other blog post (once you have others)
   - The booking page

7. **Add an author byline** — Real name, real photo, real credentials. Link to the team page.

8. **Update the `dateModified`** whenever you edit a post. Tell Antigravity to update it in the schema too.

### B4.3 Expanding Case Studies (Month 1-2)

Currently you have ONE thin case study (Dental Clinic Voice AI template). You need at minimum 3 rich case studies.

**For each case study, write:**

- Client industry and problem (can anonymize company name if needed)
- Why they chose Exter.ai
- What you built (technical detail — don't be vague)
- Timeline from discovery call to deployment
- Specific results with numbers (calls handled, appointments booked, revenue impact, time saved)
- Client testimonial (ask the client for a quote — even 2 sentences)
- What you learned / what you'd do differently
- Screenshots or video of the final product

**Target: 800-1200 words per case study**

---

## B5. THOUGHT LEADERSHIP & SOCIAL PUBLISHING (Ongoing)

### B5.1 LinkedIn Posts (2-3x per week, from founder personal accounts)

**Post types to rotate:**

1. **"Here's what we built this week"** — Show a screenshot/video of a project. Brief description. What problem it solved. Tag the client if appropriate.

2. **"Lesson learned"** — Something you discovered while building for a client. Technical insight, business insight, or process insight.

3. **"Hot take / opinion"** — Your perspective on an AI trend, industry change, or common misconception. Be specific and contrarian if possible.

4. **"Behind the scenes"** — Your process, your tools, your workspace, your team dynamic. People love seeing how small teams operate.

5. **"Client result"** — Share a metric from a project. "Our AI receptionist handled 847 calls this month for a 4-dentist practice in Dallas. Here's what we learned."

**Rules:**
- Write in first person ("I" not "we" — LinkedIn is personal)
- Include 3-5 relevant hashtags (#AIAutomation #VoiceAI #StartupFounder #AIAgency #WebDevelopment)
- Post consistently — LinkedIn's algorithm rewards regular posting
- Engage with comments on your posts and other people's posts
- NEVER use generic AI-generated content — it's obvious and destroys credibility

### B5.2 Medium Articles (2x per month)

Republish edited versions of your best blog posts on Medium. Use Medium's "Import" feature and set the canonical URL back to your site so Google doesn't penalize duplicate content.

Target publications to submit to:
- Towards AI
- Better Programming
- The Startup
- Hackernoon
- UX Collective (for design content)

### B5.3 Dev.to Posts (2x per month)

Publish technical deep-dives:
- How you built the voice AI pipeline
- Your tech stack and why you chose it
- Code examples and architectural decisions
- Open-source tool announcements

### B5.4 YouTube Videos (2x per month minimum)

**Video ideas (in priority order):**

1. "How We Built an AI Receptionist in 4 Days" — Screen recording + voiceover walkthrough
2. "3D Website Showcase — [Client Project]" — Visual walkthrough of a stunning project
3. "Our AI Stack: Every Tool We Use to Ship Faster" — Screencast of your workflow
4. "AI Receptionist Demo: Live Call Handling" — Record the AI handling a real call
5. "3 Things Every Founder Gets Wrong About AI Agencies" — Talking head / opinion piece

Each video description should include:
- Links to exter-ai.com
- Keywords in the description
- Timestamps for key sections
- Call to action to book a call

---

## B6. COMMUNITY ENGAGEMENT (Daily — 30 min/day)

### B6.1 Reddit (15 min/day)

**Subreddits to engage in:**
- r/startups
- r/smallbusiness
- r/webdev
- r/SaaS
- r/Entrepreneur
- r/artificial
- r/ChatGPT
- r/dentistry (you have a dental case study!)
- r/voip (voice AI related)

**Rules:**
- DO NOT spam links to your site. Reddit will ban you.
- Instead, give genuinely helpful answers. When relevant (and only when relevant), mention your experience: "We built something like this for a dental clinic — the key challenge was..."
- Build karma first by being helpful. After 2-3 weeks of engagement, you can share blog posts occasionally.
- Share your blog posts in relevant subreddits ONLY when they genuinely answer someone's question

### B6.2 Quora (10 min/day)

**Find and answer questions like:**
- "What is an AI receptionist?"
- "How much does it cost to build an AI agent?"
- "Is it worth hiring an AI agency?"
- "Best AI tools for small business?"
- "How do I automate my dental practice?"

**For each answer:**
- Write 200-400 words of genuine value
- Include specific examples from your experience
- Naturally mention Exter.ai when relevant ("At our studio, we typically see...")
- Link to your blog post for "more detail" (only when truly relevant)

### B6.3 IndieHackers (1x per month)

Write founder journey posts. The IH community loves:
- Revenue milestones
- Client acquisition stories
- "What I learned building an AI agency" type posts
- Process and system documentation

---

## B7. OUTREACH & LINK BUILDING (Week 4+)

### B7.1 Guest Post Outreach (5 pitches per week)

**Find blogs that accept guest posts in these niches:**
- AI and automation blogs
- Startup and entrepreneurship blogs
- SaaS and tech blogs
- Industry blogs (dental, healthcare, real estate — wherever you have case studies)
- Web design and development blogs

**Pitch template:**

```
Subject: Guest post pitch: [Specific Topic] — with real case study data

Hi [Name],

I'm [Your Name], co-founder of Exter.ai — we're an AI-native studio 
that builds voice AI, 3D websites, and automation systems for founders.

I noticed your recent post on [their recent post]. I'd love to write 
a guest post for [Blog Name] about [specific topic], drawing from 
our real-world experience building [specific project].

Here's what I'm thinking:

Title: "[Proposed Title]"
Angle: [2-3 sentences about the unique angle, with real data]

I'd include original data from our projects, practical how-to steps, 
and a specific case study with measurable results.

Here's a sample of my writing: [link to your best blog post]

Would this be a fit for [Blog Name]?

Best,
[Your Name]
Co-Founder, Exter.ai
```

### B7.2 HARO / Connectively / Qwoted / Help a B2B Writer

1. Sign up at:
   - `https://www.connectively.us/` (formerly HARO)
   - `https://www.qwoted.com/`
   - `https://helpab2bwriter.com/`
2. You'll receive daily emails with journalist queries
3. Respond to any query related to: AI, automation, web development, startups, small business technology, Indian tech, agency work
4. Each successful placement = a high-authority backlink + a citation source for AI engines

**Response template:**

```
Query: [Their question]

Response:
[Your name], [Your title] at Exter.ai

[3-5 sentence expert answer with specific data points. 
Don't be generic — give them something quotable with numbers.]

Bio: [Your Name] is Co-Founder of Exter.ai, an AI-native studio 
building AI receptionists, 3D websites, and automation systems 
for founders worldwide. The studio has built voice AI systems 
handling 40+ weekly appointments for multi-location practices.
```

### B7.3 Podcast Outreach (2 pitches per week)

**Target podcasts:**
- AI-focused: Practical AI, AI in Business, The AI Podcast
- Startup-focused: My First Million, Indie Hackers, Startups For the Rest of Us
- Tech-focused: Software Engineering Daily, Changelog, Ship It
- Business: How I Built This, Masters of Scale (reach goals)
- Indian tech: The Ken, FactorDaily podcasts, Indian Silicon Valley

**Pitch angle examples:**
- "How 4 founders in India are building AI systems for US clinics — without ever visiting them"
- "We ship AI receptionists in 4 days. Here's our process."
- "Why AI-native agencies are killing traditional agencies"

---

## B8. AWARDS & RECOGNITION SUBMISSIONS (Month 2-3)

Submit your work to these awards. Even being shortlisted gives you a backlink + press + AI citation source:

| Award | Submission Fee | Deadline | What to Submit |
|-------|---------------|----------|---------------|
| Awwwards | $60-75/submission | Rolling | Your best 3D web project |
| CSS Design Awards | Free-$50 | Rolling | 3D web work |
| FWA (Favourite Website Awards) | Free | Rolling | Web projects |
| Webby Awards | $100-250 | ~Dec-Jan annually | Best AI agency/tool |
| ProductHunt | Free | Anytime | Launch Exter.ai |
| Clutch Top Agencies | Free | Annual | Based on Clutch reviews |
| DesignRush Best Of | Free | Quarterly | Based on profile + portfolio |
| GoodFirms Top Companies | Free | Rolling | Based on reviews + portfolio |

---

## B9. CLIENT TESTIMONIAL & REVIEW COLLECTION (Ongoing)

This is critical for E-E-A-T and local SEO:

1. **After every project delivery,** email the client asking for:
   - A Google Review (on your Google Business Profile)
   - A Clutch Review
   - A brief written testimonial (2-3 sentences) you can quote on your site
   - Permission to use their company name and logo in your case study

2. **Template email:**

```
Subject: Quick favor — would you share your experience?

Hi [Client Name],

Now that [project] is live and running, I was hoping you might 
be willing to share a brief review of working with us.

It would genuinely help us a ton — here are two quick options:

1. Google Review (2 min): [your Google Business Profile review link]
2. Clutch Review (5 min): [your Clutch profile review link]

If you'd prefer, even a 2-sentence written testimonial I can 
quote on our website would be amazing.

Thanks so much for the partnership on this project!

[Your Name]
```

---

## B10. AI CITATION MONITORING (Weekly — 20 min)

Every week, manually test these queries in 4 different AI engines and log the results:

### B10.1 Queries to Test

**Brand queries:**
- "What is Exter.ai?"
- "Tell me about Exter AI"
- "Is Exter.ai a good AI agency?"

**Service queries:**
- "Best AI receptionist provider"
- "AI agency for startups"
- "AI receptionist for dental clinic"
- "3D website design agency"
- "AI automation agency India"
- "AI video branding service"

**Informational queries:**
- "What is an AI receptionist?"
- "How much does AI automation cost?"
- "Best AI agencies in India 2026"

### B10.2 Where to Test

| Engine | URL | What to Check |
|--------|-----|--------------|
| ChatGPT | chat.openai.com | Is Exter.ai mentioned? Linked? |
| Perplexity | perplexity.ai | Is Exter.ai cited? Which URL? |
| Gemini | gemini.google.com | Does it know about Exter.ai? |
| Claude | claude.ai | Does it mention Exter.ai? |
| Copilot | copilot.microsoft.com | Does it reference your site? |
| Google AI Overview | google.com (search) | Are you in the AI overview box? |

### B10.3 Tracking Spreadsheet

Create a Google Sheet with:
- Columns: Date | Query | Engine | Mentioned (Y/N) | Cited with Link (Y/N) | Position (1st/2nd/3rd mention) | Competitors Mentioned | Notes
- Update weekly
- Track trends over time

### B10.4 Connect Peec AI + Ahrefs Brand Radar in Claude

Once connected, you can ask Claude to pull automated tracking data instead of doing it manually.

---

## B11. CONNECT CLAUDE CONNECTORS (Day 1)

Go to Claude Settings → Connectors and connect:

1. **Ahrefs** — For backlink analysis, keyword research, competitor tracking, and Brand Radar (AI visibility monitoring)
2. **Peec AI** — For LLM citation tracking across ChatGPT, Perplexity, Gemini, Claude
3. **Similarweb** — For competitor traffic analysis
4. **Google Drive** — To store and access your content calendar, keyword maps, and strategy docs directly in Claude

Once connected, you can ask Claude things like:
- "Check my domain rating and backlink profile for exter-ai.com"
- "Find keyword opportunities for AI receptionist"
- "Show me which AI engines are citing exter-ai.com"
- "Analyze competitor backlinks for [competitor URL]"

---

## B12. ONGOING MANUAL MAINTENANCE CALENDAR

### Daily (30 min total)
- [ ] 15 min: Reddit/Quora engagement — answer 1-2 questions
- [ ] 10 min: LinkedIn — post or engage with comments
- [ ] 5 min: Check Google Search Console for errors

### Weekly (2 hours total)
- [ ] Write 2 blog posts (or review if someone else writes) — 60 min
- [ ] AI citation monitoring (test 5 queries across 4 engines) — 20 min
- [ ] Review GSC/GA4 for traffic trends — 15 min
- [ ] Respond to HARO/Connectively queries — 15 min
- [ ] LinkedIn post creation — 10 min

### Monthly (4 hours total)
- [ ] Write 1 Medium article — 60 min
- [ ] Write 1 Dev.to post — 45 min
- [ ] Record 1-2 YouTube videos — 60 min
- [ ] Submit to 3-5 new directories — 30 min
- [ ] Send 5 guest post pitches — 30 min
- [ ] Send 2 podcast pitches — 15 min
- [ ] Request testimonials from recent clients — 15 min
- [ ] Review keyword rankings and adjust content strategy — 30 min

### Quarterly (2 hours total)
- [ ] Submit to 1-2 awards — 30 min
- [ ] Update all directory listings with new info — 30 min
- [ ] Comprehensive AI citation audit — 30 min
- [ ] Review and update oldest blog posts with new data — 30 min

---
---

# 🔄 SECTION C: HANDOFF CHECKLIST — WHAT FLOWS BETWEEN YOU AND ANTIGRAVITY

| You Provide → | Antigravity Implements |
|---------------|----------------------|
| Real founder names, bios, photos, LinkedIn URLs | Team pages, schema markup, About page update |
| Written blog posts (content) | Blog page build, schema injection, sitemap update, deployment |
| Written case studies (content) | Case study page build, schema, deployment |
| Social profile URLs (once created) | Footer link updates, schema `sameAs` updates |
| GA4 Measurement ID (once you create the property) | GA4 tracking code installation |
| Keywords and topics for new pages | Service page builds, on-page SEO implementation |
| Client testimonials (text, name, title) | Testimonial sections on service/case study pages |
| OG image concepts / branding assets | OG image creation, Open Graph tag implementation |
| Content for geographic landing pages | Landing page builds with schema and hreflang |
| Feedback on page speed / mobile experience | Core Web Vitals fixes, performance optimization |

---
---

# 📅 SECTION D: MASTER TIMELINE

| Week | Antigravity Tasks | Your Manual Tasks |
|------|------------------|-------------------|
| **1** | Deploy robots.txt + sitemap. Fix social links (remove placeholders). Add meta tags to all pages. Add Organization schema to all pages. Set up GA4 tracking. Fix any indexing blockers (noindex tags, SSR issues). | Create GSC + Bing Webmaster accounts. Submit sitemaps. Request indexing. Create LinkedIn company page + personal profiles. Create Twitter, Instagram, YouTube, GitHub accounts. Send all profile URLs to Antigravity. Connect Ahrefs + Peec AI in Claude. |
| **2** | Build 4 service pages (templates). Build blog infrastructure. Add FAQ schema to homepage. Add Service schema to service pages. Implement breadcrumb navigation. Update site navigation. | Write service page content (4 pages). Write first 2 blog posts. Create Google Business Profile. Submit to first 5 directories (Clutch, Crunchbase, DesignRush, GoodFirms, G2). Start Reddit/Quora engagement. |
| **3** | Deploy service pages with content. Deploy first blog posts with Article + FAQ schema. Build team/founder pages. Create 404 page. Page speed optimization pass. | Write blog posts 3-4. Write/expand first 2 detailed case studies. Submit to next 5 directories. Sign up for HARO/Connectively. Start LinkedIn posting (2x/week). Send founder info for team pages. |
| **4** | Deploy team pages. Deploy case studies. Deploy blog posts 3-4. Implement cross-linking. Build RSS feed. | Write blog posts 5-6. Submit to next 5 directories. Start guest post outreach (5 pitches). First HARO responses. First AI citation audit. Publish first Medium article. |
| **5-6** | Deploy blog posts 5-8. Performance tuning. Fix any GSC errors. | Write blog posts 7-8. Continue outreach. Continue engagement. First YouTube video. Submit to AI directories. Request first client reviews. |
| **7-8** | Build interactive tools (ROI calculator). Build geographic landing pages. | Write month 2 blog posts. Continue outreach cadence. First podcast pitch. Publish on Dev.to. Second AI citation audit. |
| **9-12** | Iterate based on GSC/analytics data. Build new content as written. Ongoing schema updates. | Continue 2 posts/week. Continue outreach. Continue engagement. Submit to awards. Monthly reporting cycle begins. |
| **13-24** | Build pillar content pages. Implement A/B tests. Advanced schema (Product, Review aggregates). | Continue cadence. Scale what works. Refine based on data. Target DR 30+. |

---

*Save this file. Share Section A with Antigravity. Keep Section B as your personal checklist. Review Section D weekly to stay on track.*
