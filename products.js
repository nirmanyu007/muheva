/* ===== Muheva — product catalog data ===== */
const PRODUCTS = {

  // Kurtis //

  "NEER": {
    name: "NEER",
    price: "₹799",
    oldPrice: "₹1330",
    tag: "40% off",
    images: [ "images/kurtis/NEER4.jpg" ,"images/kurtis/NEER2.jpg", "images/kurtis/NEER3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "An effortless silhouette in printed cotton, perfect for day-to-evening wear.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Olive": {
    name: "Olive",
    price: "₹749",
    oldPrice: "₹ 1250",
    tag: "40% off",
    images: ["images/kurtis/Olive1.jpg", "images/kurtis/Olive2.jpg", "images/kurtis/Olive3.jpg", "images/kurtis/Olive4.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "A relaxed-fit kurti in breathable cotton, hand block-printed for everyday elegance.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Ruhani": {
    name: "Ruhani",
    price: "₹799",
    oldPrice: "₹1330",
    tag: "40% off",
    images: ["images/kurtis/Ruhani1.jpg", "images/kurtis/Ruhani2.jpg", "images/kurtis/Ruhani3.jpg", "images/kurtis/Ruhani4.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "Soft cotton kurti with a traditional print, cut for comfort and easy movement.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Katha": {
    name: "Katha",
    price: "₹799",
    oldPrice: "₹1330",
    tag: "40% off",
    images: ["images/kurtis/Katha1.jpg", "images/kurtis/Katha2.jpg", "images/kurtis/Katha3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A relaxed-fit kurti in breathable cotton, hand block-printed for everyday elegance.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Mehar": {
    name: "Mehar",
    price: "₹699",
    oldPrice: "₹1400",
    tag: "50% off",
    images: ["images/kurtis/Mehar1.jpg", "images/kurtis/Mehar2.jpg", "images/kurtis/Mehar3.jpg", "images/kurtis/Mehar4.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "A relaxed-fit kurti in breathable cotton, hand block-printed for everyday elegance.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Morni": {
    name: "Morni",
    price: "₹699",
    oldPrice: "₹1400",
    tag: "50% off",
    images: ["images/kurtis/Morni1.jpg", "images/kurtis/Morni2.jpg", "images/kurtis/Morni3.jpg", "images/kurtis/Morni4.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "Soft cotton kurti with a traditional print, cut for comfort and easy movement.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Vanaja": {
    name: "Vanaja",
    price: "₹699",
    oldPrice: "₹1400",
    tag: "50% off",
    images: ["images/kurtis/Vanaja1.jpg", "images/kurtis/Vanaja2.jpg", "images/kurtis/Vanaja3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "An effortless silhouette in printed cotton, perfect for day-to-evening wear.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "IRA": {
    name: "IRA",
    price: "₹799",  oldPrice: "₹2220",
    tag: "45% off",
    images: ["images/kurtis/IRA1.jpg", "images/kurtis/IRA2.jpg", "images/kurtis/IRA3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "An effortless silhouette in printed cotton, perfect for day-to-evening wear.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Lohit": {
    name: "Lohit",
    price: "₹899",
    oldPrice: "₹1650",
    tag: "45% off",
    images: ["images/kurtis/Lohit1.jpg", "images/kurtis/Lohit2.jpg", "images/kurtis/Lohit3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "Soft cotton kurti with a traditional print, cut for comfort and easy movement.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Alya": {
    name: "Alya",
    price: "₹749",
    oldPrice: "₹1660",
    tag: "55% off",
    images: ["images/kurtis/Alya1.jpg", "images/kurtis/Alya2.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A relaxed-fit kurti in breathable cotton, hand block-printed for everyday elegance.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },

  "Neel": {
    name: "Neel",
    price: "₹749",
    oldPrice: "₹1250",
    tag: "40% off",
    images: ["images/kurtis/Neel1.jpg", "images/kurtis/Neel2.jpg", "images/kurtis/Neel3.jpg"],
    category: "Kurtis",
    categoryUrl: "kurtis.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "An effortless silhouette in printed cotton, perfect for day-to-evening wear.",
    details: ["Fabric: Pure cotton", "Fit: Relaxed, true to size", "Care: Hand wash cold, line dry"]
  },


// Co-ord Sets //

  "Siyah": {
    name: "Siyah",
    price: "₹1269",
    oldPrice: "₹2300",
    tag: "40% off",
    images: ["images/co-ord-sets/Siyah1.jpg", "images/co-ord-sets/Siyah2.jpg", "images/co-ord-sets/Siyah3.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A matching two-piece co-ord set designed to be worn together or styled separately.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

   "Rusty": {
    name: "Rusty",
    price: "₹1199",
    oldPrice: "₹2180",
    tag: "45% off",
    images: ["images/co-ord-sets/Rusty1.jpg", "images/co-ord-sets/Rusty2.jpg", "images/co-ord-sets/Rusty3.jpg", "images/co-ord-sets/Rusty4.jpg", "images/co-ord-sets/Rusty5.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "Effortless, put-together co-ord in printed cotton — top and bottom in one set.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

  "Aasma": {
    name: "Aasma",
    price: "₹1399",
    oldPrice: "₹2300",
    tag: "40% off",
    images: ["images/co-ord-sets/Aasma1.jpg", "images/co-ord-sets/Aasma2.jpg", "images/co-ord-sets/Aasma3.jpg", "images/co-ord-sets/Aasma4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["M", "XL"],
    sleeve: "Bell sleeves",
    description: "Effortless, put-together co-ord in printed cotton — top and bottom in one set.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },
 
  "Surkh": {
    name: "Surkh",
    price: "₹1199",
    oldPrice: "₹1990",
    tag: "40% off",
    images: ["images/co-ord-sets/Surkh1.jpg", "images/co-ord-sets/Surkh2.jpg", "images/co-ord-sets/Surkh4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "A breezy co-ord set with hand block-print detailing, made for easy dressing.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  }, 


    "Kiara": {
    name: "Kiara",
    price: "₹1199",
    oldPrice: "₹2180",
    tag: "45% off",
    images: ["images/co-ord-sets/Kiara1.jpg", "images/co-ord-sets/Kiara2.jpg", "images/co-ord-sets/Kiara3.jpg", "images/co-ord-sets/Kiara4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    description: "A matching two-piece co-ord set designed to be worn together or styled separately.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },


  "Gulab": {
    name: "Gulab",
    price: "₹1269",
    oldPrice: "₹2100",
    tag: "40% off",
    images: ["images/co-ord-sets/Gulab1.jpg", "images/co-ord-sets/Gulab2.jpg", "images/co-ord-sets/Gulab3.jpg", "images/co-ord-sets/Gulab4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A breezy co-ord set with hand block-print detailing, made for easy dressing.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

  "Sana": {
    name: "Sana",
    price: "₹1199",
    oldPrice: "₹2300",
    tag: "40% off",
    images: ["images/co-ord-sets/Sana1.jpg", "images/co-ord-sets/Sana2.jpg", "images/co-ord-sets/Sana3.jpg", "images/co-ord-sets/Sana4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A matching two-piece co-ord set designed to be worn together or styled separately.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

  "Adah": {
    name: "Adah",
    price: "₹1269",
    oldPrice: "₹2300",
    tag: "45% off",
    images: ["images/co-ord-sets/Adah1.jpg", "images/co-ord-sets/Adah2.jpg", "images/co-ord-sets/Adah3.jpg", "images/co-ord-sets/Adah4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Bell sleeves",
    description: "A matching two-piece co-ord set designed to be worn together or styled separately.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

  

  "Aadhya": {
    name: "Aadhya",
    price: "₹1269",
    oldPrice: "₹2300",
    tag: "45% off",
    images: ["images/co-ord-sets/Aadhya1.jpg", "images/co-ord-sets/Aadhya2.jpg", "images/co-ord-sets/Aadhya3.jpg", "images/co-ord-sets/Aadhya4.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    length: "45",
    description: "Effortless, put-together co-ord in printed cotton — top and bottom in one set.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

  "Bhuri": {
    name: "Bhuri",
    price: "₹1149",
    oldPrice: "₹1900",
    tag: "40% off",
    images: ["images/co-ord-sets/Bhuri1.jpg", "images/co-ord-sets/Bhuri2.jpg", "images/co-ord-sets/Bhuri3.jpg"],
    category: "Co-ord Sets",
    categoryUrl: "co-ord-sets.html",
    size: ["S", "M", "L", "XL"],
    sleeve: "Sleeveless",
    length: "55",
    description: "A breezy co-ord set with hand block-print detailing, made for easy dressing.",
    details: ["Fabric: Cotton blend", "Fit: Relaxed, includes top + bottom", "Care: Hand wash cold, line dry"]
  },

// jewellery //  


  "Moti": {
    name: "Moti",
    price: "₹899",
    oldPrice: "₹1200",
    tag: "25% off",
    images: ["images/jewellery/1 (2).png", "images/jewellery/1.jpg",  "images/jewellery/1 (3).jpg", "images/jewellery/1 (4).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "An ornate pearl-strand necklace and earring set, finished with a detailed gold pendant.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Swarna": {
    name: "Swarna",
    price: "₹899",
    oldPrice: "₹1380",
    tag: "35% off",
    images: ["images/jewellery/2.jpg", "images/jewellery/2 (2).jpg", "images/jewellery/2 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A layered gold-beaded bracelet paired with matching drop earrings.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Jhanak": {
    name: "Jhanak",
    price: "₹799",
    oldPrice: "₹1046",
    tag: "15% off",
    images: ["images/jewellery/3 (3).jpg" , "images/jewellery/3.jpg", "images/jewellery/3 (2).jpg" ],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Mirror-work gold jhumkas with a delicate pearl trim.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Rangeen": {
    name: "Rangeen",
    price: "₹799",
    oldPrice: "₹1230",
    tag: "35% off",
    images: ["images/jewellery/4.jpg", "images/jewellery/4 (2).jpg", "images/jewellery/4 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Statement chandelier earrings set with a mix of vivid coloured stones.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Anaar": {
    name: "Anaar",
    price: "₹799",
    oldPrice: "₹1230",
    tag: "35% off",
    images: ["images/jewellery/5 (2).png", "images/jewellery/5.jpg",  "images/jewellery/5 (3).jpg", "images/jewellery/5 (4).jpg", "images/jewellery/5 (5).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Tiered drop earrings in deep red stones with fine bell detailing.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Ratna": {
    name: "Ratna",
    price: "₹799",
    oldPrice: "₹1230",
    tag: "35% off",
    images: ["images/jewellery/6.png","images/jewellery/6 (3).jpg", "images/jewellery/6 (2).jpg" ],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Tiered drop earrings in smoky purple-grey stones with an antique gold finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Heera": {
    name: "Heera",
    price: "₹699",
    oldPrice: "₹1075",
    tag: "35% off",
    images: ["images/jewellery/7(3).jpg" , "images/jewellery/7.jpg", "images/jewellery/7(2).jpg", "images/jewellery/7 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Clear stone drop earrings with delicate dangling accents.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Panna": {
    name: "Panna",
    price: "₹699",
    oldPrice: "₹1075",
    tag: "35% off",
    images: ["images/jewellery/8.jpg", "images/jewellery/8 (2).jpg", "images/jewellery/7(2).jpg", "images/jewellery/8 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Emerald-cluster drop earrings finished with a beaded halo.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Feroz": {
    name: "Feroz",
    price: "₹599",
    oldPrice: "₹1075",
    tag: "35% off",
    images: ["images/jewellery/9.jpg", "images/jewellery/9 (2).jpg", "images/jewellery/9 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Clean teardrop stud earrings in a rich green stone.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Harit": {
    name: "Harit",
    price: "₹599",
    oldPrice: "₹1075",
    tag: "35% off",
    images: ["images/jewellery/10.jpg", "images/jewellery/10 (2).jpg", "images/jewellery/10 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Oval stud drop earrings in a deep green hue.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Gulnar": {
    name: "Gulnar",
    price: "₹899",
    oldPrice: "₹1075",
    tag: "35% off",
    images: ["images/jewellery/11.jpg", "images/jewellery/11 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Soft rose-toned stud earrings with a delicate gold setting.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Zeenat": {
    name: "Zeenat",
    price: "₹799",
    oldPrice: "₹999",
    tag: "20% off",
    images: ["images/jewellery/12 (2).jpg", "images/jewellery/12.jpg", "images/jewellery/12 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Ornate gold jhumkas, photographed styled with a printed ensemble.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Manik": {
    name: "Manik",
    price: "₹799",
    oldPrice: "₹999",
    tag: "20% off",
    images: ["images/jewellery/13.png" , "images/jewellery/13 (2).jpg", "images/jewellery/15 (2).png"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Ornate tiered drop earrings in red and gold with fine detailing.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Chandi": {
    name: "Chandi",
    price: "₹799",
    oldPrice: "₹999",
    tag: "20% off",
    images: ["images/jewellery/111.png", "images/jewellery/14 (2).jpg", "images/jewellery/14.jpg", "images/jewellery/14 (3).jpg", "images/jewellery/15 (2).png"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Ornate tiered drop earrings in clear stones with an antique finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Gulabi": {
    name: "Gulabi",
    price: "₹799",
    oldPrice: "₹999",
    tag: "20% off",
    images: ["images/jewellery/15.jpg", "images/jewellery/15 (2).png", "images/jewellery/15 (3).jpg", "images/jewellery/15 (4).png"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Soft pastel pink tiered drop earrings with a cream-gold finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Rajat": {
    name: "Rajat",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/16.jpg", "images/jewellery/16 (2).jpg", "images/jewellery/16 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A delicate silver floral bracelet finished with a single pearl.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Roopa": {
    name: "Roopa",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/17.jpg", "images/jewellery/17 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A silver floral bracelet, a companion piece with subtle detailing.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Kola": {
    name: "Kola",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/18.jpg", "images/jewellery/18 (2).jpg", "images/jewellery/18 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "An adjustable bracelet in deep blue-black stones with a pearl accent.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Manjari": {
    name: "Manjari",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/19.jpg", "images/jewellery/19 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A colourful gemstone bracelet with an adjustable chain.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Tanha": {
    name: "Tanha",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/20.jpg", "images/jewellery/20 (2).jpg", "images/jewellery/20 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A minimal silver bar-link bracelet, adjustable to fit.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Dwiti": {
    name: "Dwiti",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/21.jpg", "images/jewellery/21 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A dual-tone beaded bracelet with a delicate adjustable chain.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Varna": {
    name: "Varna",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/22.jpg", "images/jewellery/22 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A crystal-cluster bracelet with a soft adjustable chain.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Chandra": {
    name: "Chandra",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/23.jpg", "images/jewellery/23 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A multicoloured gemstone bracelet finished with a pearl detail.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Tarangini": {
    name: "Tarangini",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/24.jpg", "images/jewellery/24 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A deep red gemstone bracelet with a delicate pearl accent.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Kastoori": {
    name: "Kastoori",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/25.jpg", "images/jewellery/25 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A simple silver chain bracelet with subtle stone accents.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Heer": {
    name: "Heer",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/26 (4).jpg" , "images/jewellery/26.jpg", "images/jewellery/26 (2).jpg", "images/jewellery/26 (3).jpg", ],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A sleek silver cuff bracelet with rounded bead ends.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Sonal": {
    name: "Sonal",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/27.jpg", "images/jewellery/27 (2).jpg", "images/jewellery/27 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A sleek gold cuff bracelet with rounded bead ends.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Heerak": {
    name: "Heerak",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/28.jpg", "images/jewellery/28 (2).jpg", "images/jewellery/28 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A gold cuff bracelet finished with cushion-cut stone ends.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Lavanya": {
    name: "Lavanya",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/29.jpg", "images/jewellery/29 (2).jpg", "images/jewellery/29 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A silver cuff bracelet finished with cushion-cut stone ends.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Aabha": {
    name: "Aabha",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/30.jpg", "images/jewellery/30 (2).jpg", "images/jewellery/30 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A gold cuff bracelet with a textured disc finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Titli": {
    name: "Titli",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/31.jpg", "images/jewellery/31 (2).jpg", "images/jewellery/31 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "A silver cuff bracelet finished with star and flower motifs.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Diya": {
    name: "Diya",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/32.jpg", "images/jewellery/32 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Silver drop earrings shaped in an elegant peacock motif.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Ujjwal": {
    name: "Ujjwal",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/33.jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Silver floral cluster drop earrings with a delicate finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Noor": {
    name: "Noor",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/34.jpg", "images/jewellery/34 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Clustered crystal flower stud earrings in silver.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Rupali": {
    name: "Rupali",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/35.jpg", "images/jewellery/35 (2).jpg", "images/jewellery/35 (3).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Flower stud earrings in silver with an asymmetric detail.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Swati": {
    name: "Swati",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/36.jpg", "images/jewellery/36 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Dense floral cluster stud earrings in silver.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Gulnaz": {
    name: "Gulnaz",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/37.jpg", "images/jewellery/37 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Leaf-shaped drop earrings in a soft rose gold finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },

  "Sunhera": {
    name: "Sunhera",
    price: "₹499",
    oldPrice: "₹769",
    tag: "35% off",
    images: ["images/jewellery/38.jpg", "images/jewellery/38 (2).jpg"],
    category: "Jewellery",
    categoryUrl: "jewelry.html",
    description: "Leaf-shaped drop earrings in a warm gold finish.",
    details: ["Material: Alloy with stone/bead work", "Closure: Push-back / adjustable", "Care: Store in a dry pouch, avoid perfume contact"]
  },


};
