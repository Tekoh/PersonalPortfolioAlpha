# mahdr.co.uk — Personal Portfolio

A cybersecurity-themed personal portfolio built with React, TypeScript, and Tailwind CSS. Features a matrix rain animation, CRT overlay effect, and terminal-style boot sequence.

**Live site:** [mahdr.co.uk](https://mahdr.co.uk)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
├── src/
│   ├── App.tsx        # Main application — all sections and components
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles
├── public/
│   ├── favicon.svg    # Site icon
│   └── CNAME          # Custom domain for GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy.yml # Automated build and deploy to GitHub Pages
├── index.html         # HTML entry point with CSP and font preloads
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow, which builds the site and deploys to GitHub Pages. The custom domain `mahdr.co.uk` is configured via the `public/CNAME` file.

---

## Security

The site is statically generated with no backend, no user input fields, and no third-party scripts beyond Google Fonts. Security measures applied:

- **Content Security Policy** — restricts resource loading to known-good origins
- **Referrer Policy** — `strict-origin-when-cross-origin` to prevent URL leakage
- **`rel="noopener noreferrer"`** — applied to all external links
- **React's default output escaping** — no `dangerouslySetInnerHTML` used anywhere

---

## License

This project is personal and not licensed for reuse. Feel free to draw inspiration, but please do not copy the design or content directly.
