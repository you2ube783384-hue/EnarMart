# 🌐 EnarMart SEO & Indexing Guide

This guide walks you through getting your EnarMart store indexed by Google and Bing after deployment.

---

## 📋 Pre-Deployment Checklist

Your site already has these SEO features built-in:

- [x] **Dynamic sitemap** → `/sitemap.xml` (auto-generated)
- [x] **robots.txt** → `/robots.txt` (auto-generated)
- [x] **Open Graph meta tags** (for social sharing)
- [x] **Twitter Card meta tags**
- [x] **JSON-LD structured data** (WebSite schema with search action)
- [x] **Canonical URLs** on all pages
- [x] **Semantic HTML** (proper heading hierarchy, meta descriptions)
- [x] **robots meta** allowing index/follow on all public pages
- [x] **Blocked crawling** on `/control` (admin) and `/api/` routes

---

## 🔧 Step 1: Google Search Console Setup

1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Click **"Add Property"**
3. Enter your domain: `enarmart.com`
4. Choose **"HTML tag"** verification method
5. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123xyz456" />
   ```
6. Copy just the **content value** (e.g., `abc123xyz456`)
7. Open `src/app/layout.tsx` in your project
8. Find this line (near the top):
   ```typescript
   const GOOGLE_SITE_VERIFICATION = ""; // e.g., "abc123xyz456"
   ```
9. Paste your verification code:
   ```typescript
   const GOOGLE_SITE_VERIFICATION = "abc123xyz456";  // ← YOUR CODE HERE
   ```
10. **Redeploy** your site
11. Go back to Google Search Console and click **"Verify"**
12. ✅ Done! Google will start crawling your site

### After Verification:
- Submit your sitemap URL: `https://enarmart.com/sitemap.xml`
- In Search Console → **Sitemaps** → Enter sitemap URL → Submit
- Use **"URL Inspection"** tool to request indexing of important pages

---

## 🔧 Step 2: Bing Webmaster Tools Setup

1. Go to **[Bing Webmaster Tools](https://www.bing.com/webmasters)**
2. Click **"Add a site"**
3. Enter your URL: `https://enarmart.com`
4. Choose **"HTML tag"** verification method
5. Bing will give you a meta tag like:
   ```html
   <meta name="msvalidate.01" content="789def012ghi" />
   ```
6. Copy just the **content value** (e.g., `789def012ghi`)
7. Open `src/app/layout.tsx` in your project
8. Find this line:
   ```typescript
   const BING_SITE_VERIFICATION = ""; // e.g., "789def012ghi"
   ```
9. Paste your verification code:
   ```typescript
   const BING_SITE_VERIFICATION = "789def012ghi";  // ← YOUR CODE HERE
   ```
10. **Redeploy** your site
11. Go back to Bing Webmaster Tools and click **"Verify"**
12. ✅ Done!

### After Verification:
- Submit your sitemap: `https://enarmart.com/sitemap.xml`
- Bing also imports data from Google Search Console if you connect them

---

## 📄 What's Already Configured

### `src/app/robots.ts`
```
User-agent: *
Allow: /
Disallow: /control
Disallow: /api/

Sitemap: https://enarmart.com/sitemap.xml
```

### `src/app/sitemap.ts`
Auto-generated sitemap with all public pages:
- `/` (homepage, priority 1.0)
- `/shop` (priority 0.9)
- `/about`, `/contact` (priority 0.5)
- `/help`, `/faq` (priority 0.4)
- `/privacy`, `/terms`, `/refund`, `/license` (priority 0.3)

### `src/app/layout.tsx`
- Full Open Graph tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data with search action
- Google & Bing verification placeholders (where you paste codes)

---

## 🚀 Quick Deploy Steps

After adding your verification codes:

```bash
# 1. Commit your changes
git add .
git commit -m "Add Google & Bing verification codes"

# 2. Push to trigger deployment
git push origin main

# 3. Wait for deployment to complete (usually 1-2 minutes on Vercel)

# 4. Verify in Google Search Console
# 5. Verify in Bing Webmaster Tools
# 6. Submit sitemap to both
```

---

## 📊 Monitoring Your SEO

### Google Search Console
- Check **"Coverage"** report for indexing issues
- Monitor **"Performance"** for search queries & clicks
- Use **"URL Inspection"** to check specific pages

### Bing Webmaster Tools
- Check **"Index Explorer"** for indexed pages
- Monitor **"Search Keywords"** for performance

### Tips for Better Rankings
1. **Keep adding products** - more content = more indexed pages
2. **Use descriptive titles** - product names should be specific
3. **Write good descriptions** - include relevant keywords naturally
4. **Get backlinks** - share your store on social media, forums
5. **Keep content fresh** - add new templates regularly

---

## 🆘 Troubleshooting

### Site not showing up in Google?
- Wait 1-2 weeks after verification
- Submit sitemap in Search Console
- Use "Request Indexing" in URL Inspection tool

### Verification failed?
- Make sure you deployed AFTER adding the verification code
- Check the meta tag is in the page source (View Source)
- Clear any caches

### Sitemap not loading?
- Visit `https://enarmart.com/sitemap.xml` directly
- Should show XML with all your pages
- If blank, check `src/app/sitemap.ts` for errors
