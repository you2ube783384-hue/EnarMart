---
Task ID: 1
Agent: main
Task: Add show/hide category visibility controls for navbar and hero section with horizontal scroll

Work Log:
- Updated Prisma schema: Added `showInNav` (Boolean, default true) and `showInHero` (Boolean, default true) fields to Category model
- Ran `bun run db:push` to sync schema with database
- Updated GET /api/categories to return showInNav and showInHero fields
- Updated POST /api/categories to accept showInNav and showInHero when creating categories
- Updated PUT /api/categories/[id] to handle showInNav and showInHero updates
- Updated seed route to include showInNav and showInHero in default categories
- Created shared /src/lib/icon-helpers.ts module with getIconDefinition, FA_ICON_MAP, and FA_ICON_OPTIONS exports
- Updated admin panel (control/page.tsx): Added showInNav and showInHero to CategoryItem interface, form state, and reset/submit handlers
- Added inline toggle badges (Nav/Hero) to each category row in the admin panel with quick-toggle functionality via handleCatToggle
- Added Switch toggles for "Show in Navbar" and "Show in Hero Section" in the Add/Edit Category form
- Rewrote Header.tsx: Now fetches categories from /api/categories, filters by showInNav, dynamically renders both top nav and sub-nav bar
- Added horizontal scroll with left/right arrow buttons to sub-nav bar when categories overflow
- Rewrote HeroSection.tsx: Now fetches categories from /api/categories, filters by showInHero, dynamically renders category cards
- Added horizontal scroll with left/right circular arrow buttons and fade edges when categories overflow
- Added scrollbar-none CSS class to globals.css for hiding scrollbars on horizontal scroll containers
- All changes pass ESLint lint check
- Tested API endpoints: GET returns showInNav/showInHero, PUT successfully updates them

Stage Summary:
- Categories can now be toggled visible/hidden in the navbar (showInNav) and hero section (showInHero) from the admin panel
- Both the navbar sub-nav and hero section category cards support horizontal scrolling with arrow buttons when overflow occurs
- Shared icon helper module prevents code duplication between admin panel, Header, and HeroSection
