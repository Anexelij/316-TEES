# 316 TEES website

Static site: no build step, no database, no third-party scripts.

```
index.html          all pages (hash routes: #shop, #gallery, #size-guide, #about, #contact, #cart)
css/styles.css      all styling
js/app.js           shop, cart, ordering, gallery, hero video
js/lenis.min.js     smooth scroll (self-hosted, v1.1.13)
assets/             logo, product and model photos, fonts, hero video
_headers            security headers (Netlify, Cloudflare Pages)
vercel.json         same headers for Vercel
.well-known/security.txt
```

## Deploy
Upload the whole folder to Netlify, Cloudflare Pages or Vercel (all give free HTTPS). The headers file only works on those hosts. On nginx or Apache, copy the same headers from `_headers` into the server config.

## Security built in
- **Content Security Policy:** only this site's own files can load or run. No inline scripts, no inline styles, no outside connections. A page-injected script is blocked.
- **No third-party code:** Lenis and the fonts are self-hosted, so a hacked CDN cannot reach the site.
- **Security headers:** HTTPS-only (HSTS), no framing (clickjacking), no content-type guessing, strict referrer and permissions policies.
- **Cart and forms:** stored cart data is re-validated on load (sizes, quantities, item limits), all typed text is cleaned and length-limited before it goes into an order message, router input is whitelisted.
- **Spam:** hidden honeypot field, 3-second minimum fill time and a 30-second send limit on the contact form. Emails and the WhatsApp number are assembled in code, so simple scrapers do not find them.
- **Links:** every new-tab link uses `noopener noreferrer`.

## What this cannot do alone
Browser-side checks can be bypassed by a bot that skips the page. Before the contact form sends real messages, or before taking payments:
1. Send form data to a server or form service, and verify a Cloudflare Turnstile (or reCAPTCHA) token there.
2. Put the domain behind Cloudflare (free WAF, bot and DDoS protection).
3. Turn on 2-factor login for the host, domain registrar, email, WhatsApp, Instagram and TikTok accounts. Most real attacks start with a stolen password.
4. Use Paystack's hosted checkout for payments. Never store card details yourself.
5. Keep the order inbox and WhatsApp account locked down: orders include customers' names, phones and addresses.
