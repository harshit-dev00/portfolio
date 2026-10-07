# Harshit Upadhyay — Portfolio

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx                # Root component
    ├── index.css              # Tailwind imports
    ├── pages/
    │   └── Home.jsx            # Home page — assembles all sections
    └── components/
        ├── Navbar.jsx           # Top navigation bar
        ├── Background.jsx       # Ambient background gradient
        ├── StatusBadge.jsx      # "Open to software roles" pill
        ├── HeroImage.jsx        # Right-side visual (currently blank)
        └── Hero.jsx             # Headline, copy, and CTA buttons
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
```

## Notes

- `HeroImage.jsx` is intentionally left blank — swap it out later with
  the 3D render / image / animation for the right side of the hero.
- New pages go in `src/pages/`, new reusable pieces go in `src/components/`.
  Add routing (e.g. react-router-dom) later if you need multiple pages
  like Projects, Work, About.
