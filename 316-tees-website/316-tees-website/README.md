# 316 TEES website

Plain HTML, CSS and JavaScript. No build step, no database, no server code.

## Folders
- `index.html` – all pages (Home, Shop, Product, Gallery, Size guide, About, Contact, Cart)
- `css/styles.css` – all styling, including the phone layout
- `js/data.js` – **edit this** for prices, product text, sizes, contact details
- `js/app.js` – pages, cart, order messages, hero, gallery strip, forms
- `js/vendor/lenis.min.js` – smooth scrolling (MIT licence), hosted on your own site
- `assets/` – images, hero video (no sound) and Cabinet Grotesk fonts
- `_headers` (Netlify / Cloudflare Pages) or `.htaccess` (Apache / cPanel) – security headers. **Use only the one that matches your host.**
- `.well-known/security.txt`, `robots.txt`

## Run it on your computer
`python3 -m http.server 8000` inside this folder, then open http://localhost:8000

## Publish it
Upload the folder to Netlify, Cloudflare Pages or any cPanel host (HTTPS must be on).
Pages use `#` addresses (for example `/#shop`). When you move to Next.js, give each page its own route.

## Security measures built in
- **Strict Content-Security-Policy** (in `index.html`): only your own files can load. No outside scripts, styles, fonts or images, no inline code, no network calls, no plugins, no form posts.
- **Everything is self-hosted**, including the font and the scroll library, so a hacked outside server cannot inject code.
- **No `innerHTML` anywhere.** Names, sizes, addresses and stored cart data are added as plain text only.
- **Cart data from the browser is treated as untrusted**: every line is re-checked (product, size, quantity limits).
- **Router whitelist**: unknown or tampered `#` addresses fall back to Home.
- **Order messages**: inputs are cleaned (no control characters or `<>`), length-limited and URL-encoded. Phone numbers are format-checked.
- **Spam guards on the Contact form**: hidden trap field, minimum fill time, and a 30-second send limit.
- **Headers** (`_headers` / `.htaccess`): HTTPS only (HSTS), blocks being embedded in other sites (clickjacking), `nosniff`, strict referrer policy, camera/microphone/location disabled, cross-origin isolation.
- **Outside links** open with `noopener noreferrer`.
- **Hidden files, backups and folder listings** are blocked on Apache.

## What a static site cannot do (be honest with yourself)
- Browser-side spam checks only slow simple bots. The Contact form does not send anywhere yet. When you connect it (Formspree, Netlify Forms, your own API) add a server-side check such as Cloudflare Turnstile, and validate everything again on the server.
- Orders are only messages: nothing is recorded until the customer presses Send in WhatsApp or email. Add Paystack plus an order database when volume grows, and never put secret keys in this folder.
- The cart is saved in the visitor's own browser.

## Keep your accounts safe (most real attacks target these)
1. Turn on two-step login for your host, domain registrar, Instagram, TikTok, WhatsApp and the connect316tees@gmail.com mailbox.
2. Use long unique passwords from a password manager. Lock the domain at the registrar.
3. Put the domain behind Cloudflare (free plan) for DDoS protection and bot filtering.
4. Replace `Expires` in `.well-known/security.txt` every year.
5. After editing, check the site at securityheaders.com and the CSP in your browser's console.
