/* ==========================================================
   316 TEES: site content.
   Edit prices, product copy, sizes and contact details here.
   ========================================================== */
const DATA = Object.freeze({

  // Contact details are joined in code so simple scrapers do not pick them up.
  contact: {
    email: ["connect316tees", "gmail.com"].join("@"),
    whatsapp: ["234", "907", "497", "1209"].join(""),
  },

  // Hard limits for the cart (also used to clean stored data).
  limits: { maxLines: 20, maxQty: 10 },

  // Single source for the size table and the "find your size" tool.
  // chest = [from, to] in cm. The finder picks the first size whose "to" is above the chest.
  sizeChart: [
    { size: "S",   chest: [92, 97],   length: 69 },
    { size: "M",   chest: [97, 102],  length: 71 },
    { size: "L",   chest: [102, 108], length: 73 },
    { size: "XL",  chest: [108, 114], length: 75 },
    { size: "XXL", chest: [114, 120], length: 77 },
  ],

  products: [
    {
      name: "ONYX BLACK",
      price: 12000,
      front: "assets/img/tee-onyx-front.jpg",
      back: "assets/img/tee-onyx-back.jpg",
      vibe: "Sleek, bold, and modern. Onyx is a heavyweight descriptor often used in high-end streetwear and luxury brands to denote a deep, impenetrable black.",
      meaning: "The onyx stone was one of the precious stones set firmly into the breastpiece of the High Priest, bearing the names of God’s people over his heart (Exodus 28). For this verse, Onyx Black represents the weight and depth of the phrase “For God so loved the world.” It stands for the dark, fallen state of the world that Christ stepped into, and the firm, unmovable foundation of God’s love that reaches us even in our darkest moments.",
    },
    {
      name: "EVERGREEN",
      price: 12000,
      front: "assets/img/tee-evergreen-front.jpg",
      back: "assets/img/tee-evergreen-back.jpg",
      vibe: "A timeless, rich dark green that works beautifully across all seasons. It implies durability and staple wardrobe pieces.",
      meaning: "Green is the universal color of life and flourishing. Evergreen specifically represents foliage that never dies or fades, no matter the season or harshness of winter. This ties directly to the culminating promise of John 3:16: “but have eternal life.” It is the color of the believer’s enduring soul, rooted in Christ, promised a life that will never perish.",
    },
    {
      name: "ALABASTER WHITE",
      price: 12000,
      front: "assets/img/tee-alabaster-front.jpg",
      back: "assets/img/tee-alabaster-back.jpg",
      vibe: "Sounds premium, pure, and intentional. It moves away from standard, flat white into something that feels historically rich and high-quality.",
      meaning: "Alabaster references the precious, costly perfume poured out in absolute devotion to Jesus (Mark 14:3). In the context of John 3:16, Alabaster White represents the pure, unblemished nature of the “one and only Son” who was given. It also symbolizes the washing away of sin: the cleansing grace that ensures whoever believes “shall not perish.” It is the color of the ultimate, costly sacrifice made out of love.",
    },
  ],

  models: [
    { src: "assets/img/model-1.jpg", alt: "Model pointing to the 316 TEES logo on a navy tee" },
    { src: "assets/img/model-2.jpg", alt: "Model seated on a stool in a navy 316 TEES tee" },
    { src: "assets/img/model-3.jpg", alt: "Model standing in a navy 316 TEES tee and grey trousers" },
    { src: "assets/img/model-4.jpg", alt: "Back of a navy tee printed Wear your message boldly" },
  ],

  // Text tiles used on the Gallery page. "variant" maps to a .tile--<variant> class.
  tiles: [
    { text: "For God so loved", variant: "ink" },
    { text: "Wear it quietly",  variant: "gold" },
    { text: "Live it loud",     variant: "navy" },
  ],

  // Order of the Gallery page: model photos, text tiles and the hero still.
  gallery: [
    { model: 0 }, { tile: 0 }, { model: 1 }, { hero: true },
    { model: 3 }, { tile: 1 }, { model: 2 }, { tile: 2 },
  ],
});
