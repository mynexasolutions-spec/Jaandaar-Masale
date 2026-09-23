import { SPICE_ASSETS } from './assets'

export type FallbackProduct = {
  id: string
  name: string
  slug: string
  short_description: string
  description: string
  featured_image_url: string
  average_rating: number
  review_count: number
  use_global_faqs: boolean
  is_featured: boolean
  is_active: boolean
  categories: {
    id: string
    name: string
    slug: string
  }
  product_images: {
    id: string
    image_url: string
    sort_order: number
  }[]
  product_variants: {
    id: string
    variant_name: string
    price: number
    original_price: number
    stock_quantity: number
    is_active: boolean
  }[]
  product_information: {
    id: string
    title: string
    content: string
    display_order: number
  }[]
  product_faqs: {
    id: string
    question: string
    answer: string
    display_order: number
  }[]
}

export const FALLBACK_PRODUCTS: Record<string, FallbackProduct> = {
  'turmeric-powder': {
    id: 'prod-turmeric-01',
    name: 'Pure Turmeric Powder (Haldi)',
    slug: 'turmeric-powder',
    short_description:
      '100% pure, single-origin Salem turmeric powder with guaranteed high curcumin content. Natural healing, rich golden color, and earthy aroma without any added starch or preservatives.',
    description: `Jaandaar Masale Pure Turmeric Powder is sourced directly from the finest turmeric farms in Salem and Alleppey. Our turmeric roots are sun-dried and slow cold-ground using traditional methods to preserve their natural essential oils and maximum curcumin levels (3.5%+). 

Free from artificial food coloring (such as lead chromate or metanil yellow), fillers, and chemical preservatives, our haldi brings authentic warmth, vibrant golden color, and profound Ayurvedic wellness to your everyday cooking.`,
    featured_image_url: SPICE_ASSETS.turmeric,
    average_rating: 4.9,
    review_count: 38,
    use_global_faqs: true,
    is_featured: true,
    is_active: true,
    categories: {
      id: 'cat-ground-spices',
      name: 'Ground Spices',
      slug: 'ground-spices',
    },
    product_images: [
      { id: 'img-t-1', image_url: SPICE_ASSETS.turmeric, sort_order: 1 },
      { id: 'img-t-2', image_url: '/images/whole-spices.jpg', sort_order: 2 },
      { id: 'img-t-3', image_url: SPICE_ASSETS.recipes.naturalHealing, sort_order: 3 },
    ],
    product_variants: [
      {
        id: 'var-t-100',
        variant_name: '100g Pouch',
        price: 55,
        original_price: 70,
        stock_quantity: 120,
        is_active: true,
      },
      {
        id: 'var-t-250',
        variant_name: '250g Pouch',
        price: 120,
        original_price: 150,
        stock_quantity: 85,
        is_active: true,
      },
      {
        id: 'var-t-500',
        variant_name: '500g Value Pack',
        price: 220,
        original_price: 280,
        stock_quantity: 60,
        is_active: true,
      },
      {
        id: 'var-t-1000',
        variant_name: '1kg Family Pack',
        price: 410,
        original_price: 520,
        stock_quantity: 40,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-t-1',
        title: 'Specifications & Origin',
        content: 'Origin: Salem & Erode, Tamil Nadu, India\nForm: Fine Ground Powder\nCurcumin Content: > 3.5%\nMoisture Content: < 10%\nShelf Life: 12 Months from packing date',
        display_order: 1,
      },
      {
        id: 'info-t-2',
        title: 'Ingredients & Purity',
        content: '100% Pure Whole Dried Turmeric Finger Rhizomes (Curcuma Longa). No added colors, preservatives, anti-caking agents, or artificial additives.',
        display_order: 2,
      },
      {
        id: 'info-t-3',
        title: 'Storage & Usage Tips',
        content: 'Store in a cool, dry place away from direct sunlight in an airtight container. Use clean and dry spoons. Ideal for golden milk (haldi doodh), curries, dals, and marinades.',
        display_order: 3,
      },
    ],
    product_faqs: [
      {
        id: 'faq-t-1',
        question: 'Is this turmeric powder tested for artificial colors?',
        answer: 'Yes! Every batch of Jaandaar Masale Turmeric Powder is rigorously lab-tested to ensure zero adulteration, zero lead chromate, and zero artificial colors.',
        display_order: 1,
      },
      {
        id: 'faq-t-2',
        question: 'What is the natural curcumin percentage?',
        answer: 'Our turmeric is selected for high natural curcumin potency, averaging between 3.5% to 4.2% naturally.',
        display_order: 2,
      },
    ],
  },

  'red-chilly-powder': {
    id: 'prod-chilly-01',
    name: 'Special Kashmiri & Guntur Red Chilly Powder',
    slug: 'red-chilly-powder',
    short_description:
      'Vibrant ruby red color with balanced appetizing heat. Sun-dried Guntur and Kashmiri chillies gently ground to lock in natural pungency and fiery aroma.',
    description: `Jaandaar Masale Red Chilly Powder combines the rich natural red hue of premium Kashmiri chillies with the zesty kick of Andhra Guntur chillies. Stem-removed, sun-cured, and slowly ground to preserve the natural capsaicin oils.

Never blended with brick dust, artificial dyes (Sudan red), or seed fillers. Delivers rich natural color and rich spicy depth to every curry, tandoori, and gravy.`,
    featured_image_url: SPICE_ASSETS.redChilly,
    average_rating: 4.8,
    review_count: 52,
    use_global_faqs: true,
    is_featured: true,
    is_active: true,
    categories: {
      id: 'cat-ground-spices',
      name: 'Ground Spices',
      slug: 'ground-spices',
    },
    product_images: [
      { id: 'img-c-1', image_url: SPICE_ASSETS.redChilly, sort_order: 1 },
      { id: 'img-c-2', image_url: '/images/whole-spices.jpg', sort_order: 2 },
      { id: 'img-c-3', image_url: SPICE_ASSETS.recipes.energyBooster, sort_order: 3 },
    ],
    product_variants: [
      {
        id: 'var-c-100',
        variant_name: '100g Pouch',
        price: 65,
        original_price: 85,
        stock_quantity: 110,
        is_active: true,
      },
      {
        id: 'var-c-250',
        variant_name: '250g Pouch',
        price: 145,
        original_price: 180,
        stock_quantity: 90,
        is_active: true,
      },
      {
        id: 'var-c-500',
        variant_name: '500g Value Pack',
        price: 270,
        original_price: 340,
        stock_quantity: 50,
        is_active: true,
      },
      {
        id: 'var-c-1000',
        variant_name: '1kg Family Pack',
        price: 520,
        original_price: 650,
        stock_quantity: 35,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-c-1',
        title: 'Specifications & Origin',
        content: 'Origin: Guntur, Andhra Pradesh & Kashmir Valley\nForm: Fine Ground Red Powder\nHeat Scale: Medium-Hot (Balanced)\nShelf Life: 12 Months',
        display_order: 1,
      },
    ],
    product_faqs: [
      {
        id: 'faq-c-1',
        question: 'Does this contain added color or oil?',
        answer: 'No, our red chilly powder derives 100% of its vibrant color and pungency naturally from whole sun-dried chillies.',
        display_order: 1,
      },
    ],
  },

  'coriander-powder': {
    id: 'prod-coriander-01',
    name: 'Freshly Ground Coriander Powder (Dhaniya)',
    slug: 'coriander-powder',
    short_description:
      'Gently slow-roasted whole green coriander seeds. Delivers sweet, citrusy aroma and rich body to gravies without bitter aftertaste.',
    description: `Jaandaar Masale Coriander Powder is crafted from plump, aroma-rich green coriander seeds sourced from Rajasthan and Madhya Pradesh. Roasted lightly before stone-grinding, retaining the volatile natural linalool essential oils.`,
    featured_image_url: SPICE_ASSETS.coriander,
    average_rating: 4.9,
    review_count: 27,
    use_global_faqs: true,
    is_featured: false,
    is_active: true,
    categories: {
      id: 'cat-ground-spices',
      name: 'Ground Spices',
      slug: 'ground-spices',
    },
    product_images: [
      { id: 'img-cor-1', image_url: SPICE_ASSETS.coriander, sort_order: 1 },
      { id: 'img-cor-2', image_url: SPICE_ASSETS.recipes.betterDigestion, sort_order: 2 },
    ],
    product_variants: [
      {
        id: 'var-cor-100',
        variant_name: '100g Pouch',
        price: 50,
        original_price: 65,
        stock_quantity: 130,
        is_active: true,
      },
      {
        id: 'var-cor-250',
        variant_name: '250g Pouch',
        price: 110,
        original_price: 140,
        stock_quantity: 95,
        is_active: true,
      },
      {
        id: 'var-cor-500',
        variant_name: '500g Value Pack',
        price: 205,
        original_price: 260,
        stock_quantity: 70,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-cor-1',
        title: 'Specifications',
        content: 'Origin: Ramganj Mandi, Rajasthan\nForm: Stone-Ground Powder\nShelf Life: 12 Months',
        display_order: 1,
      },
    ],
    product_faqs: [],
  },

  'cumin-powder': {
    id: 'prod-cumin-01',
    name: 'Aromatic Cumin Powder (Jeera)',
    slug: 'cumin-powder',
    short_description:
      'Warm, nutty, and intensely fragrant. Sourced from the premium cumin belt of Gujarat, perfectly roasted and stone-ground.',
    description: `Jaandaar Masale Jeera Powder is celebrated for its deep earthy aroma and warm, savory punch. Hand-cleaned whole cumin seeds roasted to exact temperature to release maximum aromatics before grinding.`,
    featured_image_url: SPICE_ASSETS.cumin,
    average_rating: 4.8,
    review_count: 24,
    use_global_faqs: true,
    is_featured: false,
    is_active: true,
    categories: {
      id: 'cat-ground-spices',
      name: 'Ground Spices',
      slug: 'ground-spices',
    },
    product_images: [
      { id: 'img-cum-1', image_url: SPICE_ASSETS.cumin, sort_order: 1 },
      { id: 'img-cum-2', image_url: SPICE_ASSETS.recipes.betterDigestion, sort_order: 2 },
    ],
    product_variants: [
      {
        id: 'var-cum-100',
        variant_name: '100g Pouch',
        price: 75,
        original_price: 95,
        stock_quantity: 100,
        is_active: true,
      },
      {
        id: 'var-cum-250',
        variant_name: '250g Pouch',
        price: 160,
        original_price: 200,
        stock_quantity: 80,
        is_active: true,
      },
      {
        id: 'var-cum-500',
        variant_name: '500g Value Pack',
        price: 300,
        original_price: 380,
        stock_quantity: 45,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-cum-1',
        title: 'Specifications',
        content: 'Origin: Unjha, Gujarat\nForm: Fine Ground Roasted Cumin\nShelf Life: 12 Months',
        display_order: 1,
      },
    ],
    product_faqs: [],
  },

  'garam-masala': {
    id: 'prod-garam-01',
    name: 'Master Crafted Royal Garam Masala',
    slug: 'garam-masala',
    short_description:
      'A royal heritage blend of whole roasted whole spices — black cardamom, cloves, cinnamon, mace, nutmeg, and black pepper.',
    description: `Jaandaar Masale Shahi Garam Masala is our master culinary masterpiece. Handcrafted from an authentic North Indian royal family recipe containing over 14 aromatic whole spices. Just a pinch transforms any everyday curry, biryani, or dal into an unforgettable feast.`,
    featured_image_url: SPICE_ASSETS.garamMasala,
    average_rating: 5.0,
    review_count: 46,
    use_global_faqs: true,
    is_featured: true,
    is_active: true,
    categories: {
      id: 'cat-spice-blends',
      name: 'Spice Blends',
      slug: 'spice-blends',
    },
    product_images: [
      { id: 'img-gm-1', image_url: SPICE_ASSETS.garamMasala, sort_order: 1 },
      { id: 'img-gm-2', image_url: '/images/whole-spices.jpg', sort_order: 2 },
      { id: 'img-gm-3', image_url: SPICE_ASSETS.recipes.healthyHeart, sort_order: 3 },
    ],
    product_variants: [
      {
        id: 'var-gm-100',
        variant_name: '100g Pouch',
        price: 85,
        original_price: 110,
        stock_quantity: 115,
        is_active: true,
      },
      {
        id: 'var-gm-250',
        variant_name: '250g Pouch',
        price: 180,
        original_price: 230,
        stock_quantity: 75,
        is_active: true,
      },
      {
        id: 'var-gm-500',
        variant_name: '500g Value Pack',
        price: 340,
        original_price: 430,
        stock_quantity: 40,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-gm-1',
        title: 'Master Blend Composition',
        content: 'Coriander, Cumin, Black Cardamom, Green Cardamom, Cloves, Cinnamon, Star Anise, Mace, Nutmeg, Bay Leaf, Black Pepper, Dry Ginger, Fennel.\nShelf Life: 12 Months',
        display_order: 1,
      },
    ],
    product_faqs: [],
  },

  'black-pepper': {
    id: 'prod-pepper-01',
    name: 'Malabar Black Pepper (Kali Mirch)',
    slug: 'black-pepper',
    short_description:
      'Bold, pungent Tellicherry black pepper with high piperine content for unmatched aroma and medicinal wellness.',
    description: `Jaandaar Masale Tellicherry Black Pepper is sourced from the pristine hills of Malabar, Kerala. Known as the King of Spices, it delivers a sharp, clean bite with complex woody aromatics.`,
    featured_image_url: '/images/black-pepper.jpg',
    average_rating: 4.9,
    review_count: 19,
    use_global_faqs: true,
    is_featured: false,
    is_active: true,
    categories: {
      id: 'cat-whole-spices',
      name: 'Whole Spices',
      slug: 'whole-spices',
    },
    product_images: [
      { id: 'img-bp-1', image_url: '/images/black-pepper.jpg', sort_order: 1 },
    ],
    product_variants: [
      {
        id: 'var-bp-100',
        variant_name: '100g Pouch',
        price: 90,
        original_price: 115,
        stock_quantity: 90,
        is_active: true,
      },
      {
        id: 'var-bp-250',
        variant_name: '250g Pouch',
        price: 210,
        original_price: 270,
        stock_quantity: 60,
        is_active: true,
      },
    ],
    product_information: [
      {
        id: 'info-bp-1',
        title: 'Origin & Details',
        content: 'Origin: Wayanad, Kerala\nGrade: TGSEB (Tellicherry Garbled Special Extra Bold)\nShelf Life: 18 Months',
        display_order: 1,
      },
    ],
    product_faqs: [],
  },
}
