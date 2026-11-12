# Vo Minh Tri · Portfolio

Personal portfolio for **Vo Minh Tri**, Data Engineer in Da Nang, Vietnam.
It's a static site built with plain HTML, CSS and JS. There is no build step and no dependencies.

```
index.html                          page markup (English content + SEO/Open Graph tags)
styles.css                          all styles (dark default, light theme, responsive, reduced motion)
script.js                           theme + EN/VI toggle, mobile menu, scroll reveal, count-up, copy email
favicon.svg                         site icon
og-image.svg / og-image.png         1200x630 link-preview image (PNG is what LinkedIn uses)
CV_Vo_Minh_Tri_Data_Engineer.pdf    the "Download CV" target
assets/profile.jpg                  (optional, not included) profile photo
```

## Preview locally

```bash
cd /home/tridz/portfolio
python3 -m http.server 8000
# open http://localhost:8000  (add ?lang=vi to open in Vietnamese)
```

## Deploy to GitHub Pages

### Option A: user site at `https://trivodac.github.io/` (recommended)

1. On GitHub, create a **public** repo named exactly `trivodac.github.io`.
2. Push this folder (the `.gitignore` already leaves out `.venv/`):
   ```bash
   cd /home/tridz/portfolio
   git init -b main
   git add .
   git commit -m "Portfolio site"
   git remote add origin git@github.com:trivodac/trivodac.github.io.git
   git push -u origin main
   ```
3. Go to repo **Settings → Pages**. Under **Build and deployment**, set *Source: Deploy from a branch*, then *Branch: `main` / `(root)`*.
4. After a minute or two, the site is live at `https://trivodac.github.io/`.

### Option B: project site at `https://trivodac.github.io/portfolio/`

1. Create a public repo named `portfolio`, push the same way, and enable Pages (`main` / root).
2. **Update the absolute URLs** in `index.html` from `https://trivodac.github.io/` to
   `https://trivodac.github.io/portfolio/`. These are in `canonical`, `og:url`, `og:image`, `twitter:image` and the JSON-LD `url`.
   LinkedIn needs an absolute `og:image` URL.

### After deploying

- Check the LinkedIn preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
  It also refreshes LinkedIn's cache if you change the image later.
- Add the URL to LinkedIn: **Profile → Contact info → Website**, and/or the *Featured* section.

## Customising

- **Profile photo:** save a square image (about 400x400) as `assets/profile.jpg`. It appears automatically in place of the "VT" monogram.
- **CV:** replace `CV_Vo_Minh_Tri_Data_Engineer.pdf` and keep the same file name.
- **Text:** English is in `index.html`. Vietnamese is in the `VI` object at the top of `script.js`, keyed by each element's `data-i18n` attribute.
  If you add a translatable element, give it a `data-i18n="some.key"` and add `'some.key': '...'` to `VI`.
- **Colours:** CSS variables at the top of `styles.css` (`--accent` teal, `--accent-2` amber), with a separate set for each theme.
- **OG image:** edit `og-image.svg`, then regenerate the PNG, for example:
  ```bash
  python3 -m venv .venv && .venv/bin/pip install cairosvg
  .venv/bin/python -c "import cairosvg; cairosvg.svg2png(url='og-image.svg', write_to='og-image.png', output_width=1200, output_height=630)"
  ```
  You can also open the SVG in a browser and take a 1200x630 screenshot.

## Notes

- Theme and language choices are saved in `localStorage`. `?lang=vi` forces Vietnamese, which is useful for sharing a VI link.
- Content is fully readable without JavaScript, because reveal animations only apply when JS adds the `js` class.
- `prefers-reduced-motion` disables the pipeline animation, the scroll reveals and the counters.
