# Jomari Lomtong — Portfolio

A fast, responsive, dependency-free portfolio website built with HTML, CSS, and vanilla JavaScript.

## Preview

Open `index.html` directly in a browser, or serve the folder locally:

```powershell
# From this folder
npx serve .
```

Or with Python:

```powershell
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Files

```text
portfolio/
├─ index.html          # Page structure and content
├─ styles.css          # Design system, layout, responsive styles
├─ main.js             # Theme toggle, menu, filters, animations
├─ assets/
│  └─ favicon.svg      # Browser tab icon
└─ README.md
```

## Customize

Everything is in `index.html` unless noted.

| What to change | Where |
| --- | --- |
| Name, role, tagline | Hero section (`#home`) |
| Bio and stats | `#about` |
| Skills and tags | `#skills` |
| Projects, categories, links | `#projects` |
| Work history | `#experience` |
| Email and social links | `#contact` and hero social links |
| Colors and fonts | `styles.css` → `:root` and `[data-theme="light"]` |
| Rotating hero phrases | `main.js` → `roles` array |

### Replace the placeholder links

Project links use `data-placeholder` so the site shows a helpful toast instead of
jumping to the top of the page. Replace them with real URLs:

```html
<!-- Before -->
<a href="#" data-placeholder="Add your live demo link in index.html" aria-label="TaskFlow live demo">

<!-- After -->
<a href="https://taskflow.example.com" target="_blank" rel="noopener noreferrer" aria-label="TaskFlow live demo">
```

Also update the GitHub and LinkedIn URLs in the hero and contact sections:

```html
https://github.com/jemerenglomtong2001-boop
https://www.linkedin.com/in/jomarilomtong
```

### Update the email

Search for `jomarilomtong2001@gmail.com` and replace every occurrence (hero icon,
contact button, contact row, and the `data-email` attribute on the copy button).

### Change the profile photo

The hero uses `assets/profile.jpg`. To swap it, overwrite that file with a new
photo (keep the same filename), or update the `src` on the `.portrait-photo`
image in `index.html`. The photo is cropped to fill the card with
`object-fit: cover`; adjust `object-position` in `styles.css` if you want a
different crop.

## Features

- Dark and light themes with saved preference
- Responsive layout with a mobile navigation menu
- Scroll-reveal animations with reduced-motion support
- Animated hero role text and technology marquee
- Filterable project grid
- Copy-email button with clipboard fallback
- Accessible focus states, skip link, and ARIA labels
- No frameworks, no build step, no dependencies

## Deploy

### GitHub Pages

1. Create a repository and push the contents of this folder.
2. In the repository, go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`, choose `main` and `/ (root)`.
4. Save; the site will be published at `https://<username>.github.io/<repo>/`.

### Netlify / Vercel

Drag the `portfolio` folder into Netlify Drop, or import the repository in
Vercel and deploy it as a static site. No build command is needed.

## Notes

- Content such as projects, experience, and statistics is sample copy. Replace
  it with your real details before publishing.
- The site uses Google Fonts (Inter and Space Grotesk). If you need fully
  offline hosting, download the fonts and self-host them, or remove the
  `<link>` tags in `index.html` to fall back to system fonts.
