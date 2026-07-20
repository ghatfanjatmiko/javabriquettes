# Java Briquettes Co. — Website

Premium Indonesian coconut shell charcoal briquette exporter website.
Modern Industrial Premium style, built with vanilla HTML5/CSS3/JS (no frameworks).

## Structure
```
/
├── index.html            Home
├── about.html             About
├── products.html          Products listing (tabs + spec table)
├── product-detail.html    Single product detail
├── quality.html           Quality Control process
├── export.html            Export process & Incoterms
├── gallery.html           Facility gallery (lightbox)
├── faq.html                FAQ (grouped, schema.org FAQPage)
├── contact.html           Contact + RFQ form
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css          Full design system (CSS variables, components)
├── js/
│   └── main.js             Nav, reveal animations, counters, FAQ, tabs, form validation, lightbox
└── assets/
    ├── images/            (placeholder — drop real product/factory photos here)
    └── icons/
        └── favicon.svg
```

## Notes
- All imagery is a placeholder (`.ph` divs with a diagonal pattern + icon). Replace with real photography in `/assets/images` and swap the `<div class="ph">...</div>` blocks for `<img>` tags.
- WhatsApp number and email are placeholders — update in every page's WhatsApp link and footer.
- Fonts: Poppins (display) + Inter (body), loaded via Google Fonts.
- Colors are defined as CSS custom properties at the top of `css/style.css` for easy re-theming.
- Fully responsive (mobile nav drawer under 980px), keyboard-accessible (visible focus states, skip link), and respects `prefers-reduced-motion`.
