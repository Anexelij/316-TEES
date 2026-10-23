/* ==========================================================
   316 TEES: behaviour
   1 Setup & helpers   2 Cart   3 Shop views   4 Gallery
   5 Forms & tools   6 Hero   7 Router & navigation   8 Start
   Plain scripts, no frameworks. Dynamic text is always added as
   text (never as markup), so nothing typed or stored can run as code.
   ========================================================== */
"use strict";

(function () {
  // Anti-framing fallback. The real defence is the frame-ancestors header.
  if (window.top !== window.self) {
    document.documentElement.hidden = true;
    return;
  }

  /* ---------- 1. Setup & helpers ---------- */
  const { contact, limits, sizeChart, products, models, tiles, gallery } = DATA;
  const SIZES = sizeChart.map(function (row) { return row.size; });
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = function (id) { return document.getElementById(id); };

  // Builds an element safely. Child strings and numbers become text nodes; arrays are flattened.
  function el(tag, attrs) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      const value = attrs[key];
      if (value === false || value == null) return;
      node.setAttribute(key, value === true ? "" : value);
    });
    Array.prototype.slice.call(arguments, 2).forEach(function (child) {
      if (Array.isArray(child)) node.append.apply(node, child); else node.append(child);
    });
    return node;
  }
  function setChildren(node, children) {
    node.textContent = "";
    node.append.apply(node, children);
  }
  // Removes control characters and angle brackets, collapses spaces, limits length.
  function clean(value, max) {
    return String(value).replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  }
  function money(value) { return "\u20A6" + value.toLocaleString("en-NG"); }
  function storeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function storeSet(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ } }
  function play(video) { const p = video.play(); if (p && p.catch) p.catch(function () {}); }

  /* ---------- 2. Cart ---------- */
  const CART_KEY = "316cart";
  let cart = loadCart();

  // Stored data is untrusted: every line is re-checked before use.
  function loadCart() {
    let raw;
    try { raw = JSON.parse(storeGet(CART_KEY) || "[]"); } catch (e) { raw = []; }
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, limits.maxLines).map(function (x) {
      return x && {
        product: parseInt(x.product, 10),
        size: String(x.size),
        qty: Math.min(limits.maxQty, parseInt(x.qty, 10) || 0),
      };
    }).filter(function (x) {
      return x && products[x.product] && SIZES.indexOf(x.size) > -1 && x.qty > 0;
    });
  }
  function saveCart() { storeSet(CART_KEY, JSON.stringify(cart)); }
  function cartCount() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (n, l) { return n + l.qty * products[l.product].price; }, 0); }

  function updateBadge() {
    const count = cartCount();
    $("cart-badge").textContent = count;
    $("cart-badge").hidden = !count;
    $("cart-btn").setAttribute("aria-label", count ? "Cart, " + count + (count > 1 ? " items" : " item") : "Cart, empty");
  }
  function addToCart(product, size) {
    const line = cart.filter(function (l) { return l.product === product && l.size === size; })[0];
    if (line) line.qty = Math.min(limits.maxQty, line.qty + 1);
    else if (cart.length < limits.maxLines) cart.push({ product: product, size: size, qty: 1 });
    saveCart();
    updateBadge();
  }

  // The order text sent to WhatsApp and email.
  function orderMessage(newline) {
    const lines = cart.map(function (l, k) {
      const p = products[l.product];
      return (k + 1) + ". " + p.name + " | Size " + l.size + " | Qty " + l.qty + " | " + money(l.qty * p.price);
    });
    return ["Hello 316 TEES, I would like to place an order:", ""].concat(lines, [
      "",
      "Total: " + money(cartTotal()) + " (delivery fee not included)",
      "",
      "Name: " + clean($("order-name").value, 80),
      "Phone: " + clean($("order-phone").value, 20),
      "Delivery address: " + clean($("order-address").value, 250),
    ]).join(newline);
  }
  function updateOrderLinks() {
    $("order-whatsapp").href = "https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent(orderMessage("\n"));
    $("order-email").href = "mailto:" + contact.email + "?subject=" + encodeURIComponent("316 TEES order") +
      "&body=" + encodeURIComponent(orderMessage("\r\n"));
  }
  function missingOrderField() {
    const checks = [
      ["order-name", "your name", function (v) { return v; }],
      ["order-phone", "your phone number", function (v) { return /^[0-9+()\s-]{7,20}$/.test(v); }],
      ["order-address", "your delivery address", function (v) { return v; }],
    ];
    return checks.filter(function (c) { return !c[2]($(c[0]).value.trim()); })[0];
  }

  function cartLine(line, index) {
    const p = products[line.product];
    const link = "#product-" + line.product;
    const button = function (action, label, text) {
      return el("button", { type: "button", "data-action": action, "data-index": index, "aria-label": label + " " + p.name }, text);
    };
    return el("div", { class: "cart-item" },
      el("a", { href: link }, el("img", { src: p.front, alt: p.name + " tee" })),
      el("div", { class: "cart-details" },
        el("a", { href: link }, p.name),
        el("small", {}, "Size: " + line.size),
        el("div", { class: "cart-price" }, money(line.qty * p.price),
          line.qty > 1 ? el("small", { class: "each" }, " (" + money(p.price) + " each)") : "")),
      el("div", { class: "qty" }, button("dec", "Decrease quantity of", "\u2212"), el("span", { "aria-live": "polite" }, line.qty), button("inc", "Increase quantity of", "+")),
      button("remove", "Remove", "Remove"));
  }
  function renderCart() {
    const empty = !cart.length;
    $("cart-empty").hidden = !empty;
    $("cart-layout").hidden = empty;
    $("cart-title").textContent = empty ? "Cart" : "Cart (" + cartCount() + ")";
    setChildren($("cart-lines"), cart.map(cartLine));
    $("cart-subtotal").textContent = money(cartTotal());
    updateOrderLinks();
    updateBadge();
  }
  function initCart() {
    $("cart-btn").addEventListener("click", function () { location.hash = "cart"; });
    $("cart-lines").addEventListener("click", function (e) {
      const button = e.target.closest("button[data-action]");
      const line = button && cart[+button.dataset.index];
      if (!line) return;
      if (button.dataset.action === "inc") line.qty = Math.min(limits.maxQty, line.qty + 1);
      else if (button.dataset.action === "dec" && line.qty > 1) line.qty -= 1;
      else cart.splice(+button.dataset.index, 1);
      saveCart();
      renderCart();
    });
    ["order-name", "order-phone", "order-address"].forEach(function (id) { $(id).addEventListener("input", updateOrderLinks); });
    [$("order-whatsapp"), $("order-email")].forEach(function (link) {
      link.addEventListener("click", function (e) {
        const missing = missingOrderField();
        if (!cart.length) { e.preventDefault(); $("order-msg").textContent = "Your cart is empty."; }
        else if (missing) { e.preventDefault(); $("order-msg").textContent = "Add " + missing[1] + " so we can process your order."; $(missing[0]).focus(); }
        else $("order-msg").textContent = "Your order message is ready to send. We will confirm availability, delivery fee and payment.";
      });
    });
    updateBadge();
  }

  /* ---------- 3. Shop views ---------- */
  function productCard(product, index, revealed) {
    const link = "#product-" + index;
    const card = el("div", { class: "card" + (revealed ? " is-in" : "") },
      el("a", { class: "card-image", href: link },
        el("div", { class: "media" },
          el("img", { src: product.front, alt: product.name + " tee, front view", decoding: "async" }),
          el("img", { class: "media-back", src: product.back, alt: product.name + " tee, back view", decoding: "async" }))),
      el("div", { class: "card-meta" },
        el("div", { class: "card-title" },
          el("a", { class: "size-link", href: "#size-guide" }, "Size guide"),
          el("a", { class: "card-name", href: link }, product.name)),
        el("span", { class: "card-price" }, money(product.price))));
    card.style.setProperty("--d", index);
    return card;
  }
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .1 });

  function renderShop() {
    const cards = products.map(function (p, i) { return productCard(p, i, false); });
    setChildren($("shop-grid"), cards);
    cards.forEach(function (card) { revealObserver.observe(card); });
  }
  function renderHomeGrid() {
    setChildren($("home-grid"), products.map(function (p, i) { return productCard(p, i, true); }));
  }

  function ripple(button, e) {
    const box = button.getBoundingClientRect();
    const size = Math.max(box.width, box.height) / 4;
    const x = e.clientX ? e.clientX - box.left : box.width / 2;
    const y = e.clientX ? e.clientY - box.top : box.height / 2;
    const dot = el("span", { class: "ripple" });
    Object.assign(dot.style, { width: size + "px", height: size + "px", left: x - size / 2 + "px", top: y - size / 2 + "px" });
    button.append(dot);
    setTimeout(function () { dot.remove(); }, 650);
  }
  function makeMagnetic(button) {
    button.addEventListener("mousemove", function (e) {
      const box = button.getBoundingClientRect();
      button.style.transform = "translate(" + (e.clientX - box.left - box.width / 2) * .15 + "px," + (e.clientY - box.top - box.height / 2) * .3 + "px)";
    });
    button.addEventListener("mouseleave", function () { button.style.transform = ""; });
  }

  function renderProduct(index) {
    const p = products[index];
    let size = null;
    const message = el("div", { class: "form-msg", "aria-live": "polite" });
    const sizeButtons = SIZES.map(function (name) {
      const button = el("button", { type: "button", "aria-pressed": "false" }, name);
      button.addEventListener("click", function () {
        size = name;
        sizeButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === button); });
      });
      return button;
    });
    const addButton = el("button", { class: "btn btn--add", type: "button" }, "Add to cart");
    addButton.addEventListener("click", function (e) {
      if (!size) { message.textContent = "Choose a size first."; return; }
      ripple(addButton, e);
      addToCart(index, size);
      setChildren(message, ["Added: " + p.name + ", size " + size + ". ", el("a", { href: "#cart" }, "View cart")]);
    });
    if (finePointer && !reduceMotion) makeMagnetic(addButton);

    setChildren($("product-view"), [
      el("div", { class: "gallery" },
        el("div", { class: "media" }, el("img", { src: p.front, alt: p.name + " tee, front view" })),
        el("div", { class: "media" }, el("img", { src: p.back, alt: p.name + " tee, back view" })),
        el("div", { class: "description" },
          el("h3", {}, "The Fashion Vibe"), el("p", {}, p.vibe),
          el("h3", {}, "The John 3:16 Meaning"), el("p", {}, p.meaning))),
      el("div", { class: "info" },
        el("h1", {}, p.name),
        el("div", { class: "price" }, money(p.price)),
        el("p", {}, "Relaxed, boxy cut with the 316 TEES logo on the front and a small mark at the back neck."),
        el("a", { class: "size-link size-link--pdp", href: "#size-guide" }, "Size guide"),
        el("div", { class: "size-options", role: "group", "aria-label": "Size" }, sizeButtons),
        addButton,
        message),
    ]);
  }

  /* ---------- 4. Gallery ---------- */
  function renderGalleryPage() {
    setChildren($("gallery-grid"), gallery.map(function (item) {
      if (item.hero) return el("div", { class: "tile-photo", role: "img", "aria-label": "Model in black tee and silver sunglasses" });
      if (item.tile !== undefined) return el("div", { class: "tile tile--" + tiles[item.tile].variant }, tiles[item.tile].text);
      const m = models[item.model];
      return el("img", { src: m.src, alt: m.alt, loading: "lazy", decoding: "async" });
    }));
  }

  // Home gallery strip: auto-scrolls, pauses on mouse hover, sideways wheel or drag moves it.
  function initMarquee() {
    const strip = $("marquee");
    const track = $("marquee-track");
    const images = [];
    for (let round = 0; round < 2; round++) { // two copies make the loop seamless
      models.forEach(function (m) {
        images.push(el("img", { src: m.src, alt: round ? "" : m.alt, "aria-hidden": round ? "true" : false }));
      });
    }
    setChildren(track, images);
    if (reduceMotion) return;

    let pos = 0, target = 0, hovering = false, dragging = false, last = 0, lastX = 0;
    function frame(time) {
      const dt = Math.min(.05, (time - last) / 1000 || 0);
      const half = track.scrollWidth / 2;
      last = time;
      if (track.offsetParent && half) {
        if (!hovering && !dragging) pos += half / 45 * dt;
        const step = target * .18; // eased wheel movement
        pos += step;
        target -= step;
        pos = ((pos % half) + half) % half;
        track.style.transform = "translate3d(" + -pos + "px,0,0)";
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    strip.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hovering = true; });
    strip.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hovering = false; });
    strip.addEventListener("wheel", function (e) {
      let delta = 0;
      if (e.shiftKey) delta = e.deltaX || e.deltaY;
      else if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = e.deltaX;
      else return; // up/down still scrolls the page
      if (e.deltaMode === 1) delta *= 16;
      target += delta;
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });
    strip.addEventListener("pointerdown", function (e) {
      dragging = true;
      lastX = e.clientX;
      strip.classList.add("is-dragging");
      try { strip.setPointerCapture(e.pointerId); } catch (err) { /* not supported */ }
    });
    strip.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      pos -= e.clientX - lastX;
      lastX = e.clientX;
    });
    function endDrag() { dragging = false; strip.classList.remove("is-dragging"); }
    strip.addEventListener("pointerup", endDrag);
    strip.addEventListener("pointercancel", endDrag);
    strip.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  /* ---------- 5. Forms & tools ---------- */
  function initSizeGuide() {
    setChildren($("size-rows"), sizeChart.map(function (row) {
      return el("tr", {}, el("td", {}, row.size), el("td", {}, row.chest[0] + "\u2013" + row.chest[1]), el("td", {}, row.length));
    }));
    $("chest-input").addEventListener("input", function () {
      const chest = +this.value;
      const match = sizeChart.filter(function (row) { return chest < row.chest[1]; })[0];
      $("size-result").textContent = !chest || chest < 70 ? "\u2013" : match ? match.size : sizeChart[sizeChart.length - 1].size;
    });
  }

  // Spam guards: hidden trap field, minimum fill time, send limit.
  // Browser-side checks only slow simple bots; see README before connecting a real backend.
  function initContactForm() {
    const opened = Date.now();
    const LAST_KEY = "316lastmsg";
    $("mail-link").href = "mailto:" + contact.email + "?subject=" + encodeURIComponent("316 TEES enquiry");
    $("mail-link").textContent = contact.email;
    $("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const now = Date.now();
      const out = $("contact-msg");
      if ($("contact-trap").value || now - opened < 3000) { out.textContent = "Please try again."; return; }
      if (now - (+storeGet(LAST_KEY) || 0) < 30000) { out.textContent = "Please wait a little before sending another message."; return; }
      if (!this.checkValidity()) { out.textContent = "Please fill in every field with a valid email."; return; }
      storeSet(LAST_KEY, String(now));
      out.textContent = "Thanks, " + clean($("contact-name").value, 60) + ". Your message is ready to send once the form is connected.";
      this.reset();
    });
  }

  /* ---------- 6. Hero ---------- */
  const hero = $("hero");
  const heroTitle = $("hero-title");
  const heroVideo = document.querySelector(".hero-video");
  let lenis = null;

  function initHeroVideo() {
    if (!heroVideo) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) { heroVideo.remove(); return; } // the still photo shows instead
    heroVideo.muted = true;
    play(heroVideo);
  }
  // Scales the headline so its longest line reaches the middle of the hero.
  function fitHeroTitle() {
    if (!heroTitle.offsetParent) return;
    heroTitle.style.fontSize = "100px";
    let widest = 0;
    heroTitle.querySelectorAll(".line span").forEach(function (s) { widest = Math.max(widest, s.offsetWidth); });
    if (!widest) return;
    const target = innerWidth / 2 - heroTitle.parentNode.offsetLeft;
    heroTitle.style.fontSize = Math.max(14, Math.min(150, 100 * target / widest)) + "px";
  }
  // Desktop only: the hero shrinks and fades as you scroll.
  let scrollTick = false;
  function updateHeroScroll() {
    scrollTick = false;
    if (!hero.offsetParent) return;
    if (innerWidth < 768) { hero.style.transform = ""; hero.style.opacity = ""; return; }
    const progress = Math.min(1, scrollY / (innerHeight * .8));
    hero.style.transform = "scale(" + (1 - .1 * progress) + ")";
    hero.style.opacity = 1 - progress;
  }

  /* ---------- 7. Router & navigation ---------- */
  const TITLES = { home: "316 TEES", shop: "Shop", gallery: "Gallery", "size-guide": "Size guide", about: "About", contact: "Contact", cart: "Cart" };
  let backTo = null; // where the Size guide "Back" arrow returns to

  // Only known routes are accepted; anything else falls back to home.
  function parseRoute(hash) {
    const name = hash.replace(/^#/, "") || "home";
    const match = /^product-(\d{1,2})$/.exec(name);
    if (match && products[+match[1]]) return { page: "product", index: +match[1], hash: name };
    if (Object.prototype.hasOwnProperty.call(TITLES, name)) return { page: name, hash: name };
    return { page: "home", hash: "home" };
  }
  function updateSizeBack() {
    const link = $("size-back");
    const route = backTo && parseRoute(backTo);
    link.hidden = !route;
    if (!route) return;
    link.href = "#" + route.hash;
    link.textContent = "\u2190 Back to " + (route.page === "product" ? "product" : route.page === "shop" ? "shop" : "home");
  }
  function showRoute() {
    const route = parseRoute(location.hash);
    document.querySelectorAll(".page").forEach(function (page) {
      page.classList.toggle("is-active", page.dataset.page === route.page);
    });
    $("nav-links").querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("href") === "#" + (route.page === "product" ? "shop" : route.hash)) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (route.page === "product") renderProduct(route.index);
    if (route.page === "shop") renderShop();
    if (route.page === "cart") renderCart();
    if (route.page === "size-guide") updateSizeBack();
    document.title = route.page === "home" ? TITLES.home : (TITLES[route.page] || "Product") + " | 316 TEES";
    $("nav-links").classList.remove("is-open");
    $("menu-btn").setAttribute("aria-expanded", "false");
    if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
    updateHeroScroll();
    fitHeroTitle();
    if (heroVideo && heroVideo.isConnected) { if (route.page === "home") play(heroVideo); else heroVideo.pause(); }
    if (route.page !== "home") $("main").focus({ preventScroll: true });
    if (route.page !== "size-guide") backTo = null;
  }
  function initNavigation() {
    $("menu-btn").addEventListener("click", function () {
      const open = $("nav-links").classList.toggle("is-open");
      this.setAttribute("aria-expanded", open);
    });
    // Remember where a "Size guide" link was clicked, so the Back arrow can return there.
    document.addEventListener("click", function (e) {
      const link = e.target.closest && e.target.closest("a");
      if (link) backTo = link.classList.contains("size-link") ? (location.hash || "#home") : null;
    });
    addEventListener("hashchange", showRoute);
    addEventListener("resize", function () { fitHeroTitle(); updateHeroScroll(); });
    addEventListener("scroll", function () {
      if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateHeroScroll); }
    }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeroTitle);
  }

  /* ---------- 8. Start ---------- */
  if (window.Lenis && !reduceMotion) {
    lenis = new Lenis();
    requestAnimationFrame(function raf(time) { lenis.raf(time); requestAnimationFrame(raf); });
  }
  $("about-photo").src = models[0].src;
  $("about-photo").alt = models[0].alt;
  renderHomeGrid();
  renderGalleryPage();
  initMarquee();
  initSizeGuide();
  initContactForm();
  initCart();
  initHeroVideo();
  initNavigation();
  showRoute();
})();
