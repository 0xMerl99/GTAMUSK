# GTA Musk — The Meme Edition

A fan-made, Vice City–style parody landing page. Plain HTML, CSS and JS — no build step, no dependencies.

> Parody for entertainment only. Not affiliated with or endorsed by Elon Musk, Rockstar Games or Take-Two Interactive.
> The cover and chase images are AI-generated parody art.

## Run locally

Open `index.html` in a browser (needs an internet connection for the Google Fonts).

## Host on Render

1. In Render, choose **New → Static Site** and connect this repo.
2. **Build Command:** leave empty
3. **Publish Directory:** `.`
4. Deploy.

## Edit

| What | Where |
| --- | --- |
| Click-to-copy word in the hero | `index.html` → `<span class="chip__text">` |
| Button links | `index.html` → the two `<a class="btn …">` in `.cta` |
| Mission text | `index.html` → `#missions` |
| Colours | `styles.css` → `:root` variables |
| Cover / wide images | `assets/gta-musk-cover.jpg`, `assets/gta-musk-wide.jpg` |

`assets/gta-musk-cover.svg` and `assets/gta-musk-wide.svg` are earlier vector artwork and are not used by the page.
