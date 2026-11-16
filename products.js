// products.js — Mock product catalog (local fallback)
// These show immediately on page load. Products added from admin come from
// Supabase and are merged in by each page, tagged as "new".

const MOCK_PRODUCTS = [
  {
    id: 'local-1',
    name: "Mamba Sewed Loafers",
    price: 70000,
    description: "Handcrafted with premium leather and meticulous stitching, the Mamba Sewed Loafer is the perfect blend of elegance and comfort. Ideal for work, dinners, or any occasion that demands style.",
    images: ["IMG/sewed.jpeg", "IMG/mamba br.jpeg"],
    category: "Loafers",
    colours: [{ hex: "#1a1a1a", label: "Black" }, { hex: "#808080", label: "Grey" },  { hex: "#7B4F2E", label: "Brown" }],
    sizes: [
      { size: "39", stock: 3 }, { size: "40", stock: 2 }, { size: "41", stock: 5 },
      { size: "42", stock: 0 }, { size: "43", stock: 4 }, { size: "44", stock: 2 }, { size: "45", stock: 1 }
    ],
    is_new: false
  },
  {
    id: 'local-2',
    name: "Chass brown shoe",
    price: 60000,
    description: "Rich brown leather with a hand-sewed finish. These loafers bring warmth and sophistication to any outfit, from tailored trousers to smart casuals.",
    images: ["IMG/chas loaf br.jpeg", "IMG/chas loaf bl.jpeg"],
    category: "Loafers",
    colours: [{ hex: "#7B4F2E", label: "Brown" }, { hex: "#1a1a1a", label: "Black" }],
    sizes: [
      { size: "39", stock: 1 }, { size: "40", stock: 3 }, { size: "41", stock: 0 },
      { size: "42", stock: 4 }, { size: "43", stock: 2 }, { size: "44", stock: 3 }, { size: "45", stock: 0 }
    ],
    is_new: false
  },
  {
    id: 'local-3',
    name: "Two tone Phina Slide",
    price: 25000,
    description: "Light, breathable, and effortlessly stylish. The Phina Slide is your go-to for warm days, poolside outings, or relaxed weekends. Cushioned footbed for all-day comfort.",
    images: ["IMG/phina 01.jpeg"],
    category: "Slides",
    colours: [
      { hex: "#1a1a1a", label: "Black" }, { hex: "#ffffff", label: "White" }, { hex: "#7B4F2E", label: "Brown" }
    ],
    sizes: [
      { size: "36", stock: 5 }, { size: "37", stock: 4 }, { size: "38", stock: 3 },
      { size: "39", stock: 2 }, { size: "40", stock: 0 }, { size: "41", stock: 6 }, { size: "42", stock: 2 }
    ],
    is_new: false
  },
  {
    id: 'local-4',
    name: "Comfort Oxford",
    price: 50000,
    description: "A polished Oxford with a cushioned insole built for long hours on your feet. The clean silhouette and durable sole make this a wardrobe staple for every professional.",
    images: ["IMG/black oxford 1.jpeg", "IMG/com ox b.jpeg"],
    category: "Oxfords",
    colours: [
      { hex: "#1a1a1a", label: "Black" }, { hex: "#7B4F2E", label: "Brown" }, { hex: "#ffffff", label: "White" }
    ],
    sizes: [
      { size: "39", stock: 2 }, { size: "40", stock: 0 }, { size: "41", stock: 4 },
      { size: "42", stock: 3 }, { size: "43", stock: 1 }, { size: "44", stock: 2 }, { size: "45", stock: 3 }
    ],
    is_new: false
  },
  {
    id: 'local-5',
    name: "Cozy Chelsea Boot",
    price: 60000,
    description: "Supportive and stylish, the Cozy Chelsea Boot transitions seamlessly from the office to the weekend. Hand-stitched brown leather with elastic side panels for an easy slip-on fit.",
    images: ["IMG/brown chelsea 1.jpeg"],
    category: "Boots",
    colours: [{ hex: "#7B4F2E", label: "Brown" }, { hex: "#1a1a1a", label: "Black" }],
    sizes: [
      { size: "39", stock: 0 }, { size: "40", stock: 2 }, { size: "41", stock: 3 },
      { size: "42", stock: 1 }, { size: "43", stock: 4 }, { size: "44", stock: 0 }, { size: "45", stock: 2 }
    ],
    is_new: false
  },
  {
    id: 'local-6',
    name: "Roam Slide",
    price: 25000,
    description: "Built for movement and comfort. The Roam Slide features a contoured footbed and durable rubber sole, making it perfect for everyday casual wear.",
    images: ["IMG/black p,.jpeg", "IMG/roam brown.jpeg"],
    category: "Slides",
    colours: [{ hex: "#1a1a1a", label: "Black" }, { hex: "#ffffff", label: "White" }],
    sizes: [
      { size: "36", stock: 4 }, { size: "37", stock: 3 }, { size: "38", stock: 0 },
      { size: "39", stock: 5 }, { size: "40", stock: 2 }, { size: "41", stock: 1 }, { size: "42", stock: 3 }
    ],
    is_new: false
  },
  {
    id: 'local-7',
    name: "WA Classic Female",
    price: 35000,
    description: "A sleek and feminine design crafted for everyday elegance. Lightweight with a cushioned sole, perfect for work or casual outings.",
    images: ["IMG/WA 1.jpeg", "IMG/WA 2.jpeg"],
    category: "Female",
    colours: [{ hex: "#1a1a1a", label: "Black" }, { hex: "#ffffff", label: "White" }],
    sizes: [
      { size: "36", stock: 4 }, { size: "37", stock: 3 }, { size: "38", stock: 2 },
      { size: "39", stock: 5 }, { size: "40", stock: 1 }
    ],
    is_new: false
  },
  {
    id: 'local-8',
    name: "WA Nude Female",
    price: 38000,
    description: "Elegant nude tones meet premium craftsmanship. This pair transitions effortlessly from day to night, complementing any outfit.",
    images: ["IMG/WA 3.jpeg", "IMG/WA 1.jpeg"],
    category: "Female",
    colours: [{ hex: "#c8a882", label: "Nude" }, { hex: "#7B4F2E", label: "Brown" }],
    sizes: [
      { size: "36", stock: 2 }, { size: "37", stock: 4 }, { size: "38", stock: 3 },
      { size: "39", stock: 1 }, { size: "40", stock: 3 }
    ],
    is_new: false
  },
  {
    id: 'local-9',
    name: "Brown 093 Female",
    price: 42000,
    description: "Rich warm tones and a refined silhouette make this one of our most loved female styles. Comfortable enough for all-day wear, stylish enough for every occasion.",
    images: ["IMG/brown 093.jpeg", "IMG/WA 2.jpeg"],
    category: "Female",
    colours: [{ hex: "#7B4F2E", label: "Brown" }, { hex: "#1a1a1a", label: "Black" }],
    sizes: [
      { size: "36", stock: 3 }, { size: "37", stock: 2 }, { size: "38", stock: 4 },
      { size: "39", stock: 2 }, { size: "40", stock: 0 }
    ],
    is_new: false
  }
];
