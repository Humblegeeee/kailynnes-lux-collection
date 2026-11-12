const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

// Bump this whenever new sample products are added, so returning visitors
// (who already have a saved catalogue in localStorage) receive them too.
export const SEED_VERSION = 2;

const sampleProducts = [
  {
    id: '1',
    name: 'Classic Corporate Tote',
    category: 'Corporate Bags',
    description: 'Elegant tote bag suitable for work and professional settings.',
    price: 250,
    quantityInStock: 8,
    status: 'active',
    photos: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'],
  },
  {
    id: '2',
    name: 'Pink Fashion Handbag',
    category: 'Girlie Bags',
    description: 'Stylish handbag designed for casual outings and events.',
    price: 180,
    quantityInStock: 5,
    status: 'active',
    photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'],
  },
  {
    id: '3',
    name: 'Modern Lunch Box',
    category: 'Lunch Boxes',
    description: 'Practical and stylish lunch box for everyday use.',
    price: 120,
    quantityInStock: 0,
    status: 'active',
    photos: ['https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&q=80'],
  },

  // ── Clothes (sample pieces: replace names, prices and photos with real stock) ──
  {
    id: 'c1',
    name: 'Scarlet Column Dress',
    category: 'Dresses',
    description: 'A sleeveless column dress in a rich red, cut to skim the body and move with you from dinner to the dance floor.',
    price: 420,
    quantityInStock: 6,
    status: 'active',
    sizes: ['S', 'M', 'L', 'XL'],
    photos: [u('1595777457583-95e059d581b8'), u('1612336307429-8a898d10e223')],
  },
  {
    id: 'c2',
    name: 'Cocoa Long-Sleeve Dress',
    category: 'Dresses',
    description: 'A long-sleeve dress in a warm cocoa tone. Understated, polished and easy to dress up or down.',
    price: 380,
    quantityInStock: 4,
    status: 'active',
    sizes: ['S', 'M', 'L'],
    photos: [u('1612722432474-b971cdcea546')],
  },
  {
    id: 'c3',
    name: 'Pearl Off-Shoulder Dress',
    category: 'Dresses',
    description: 'A soft white off-shoulder dress for occasions that deserve a little ceremony.',
    price: 450,
    quantityInStock: 3,
    status: 'active',
    sizes: ['S', 'M', 'L'],
    photos: [u('1609505848912-b7c3b8b4beda')],
  },
  {
    id: 'c4',
    name: 'Noir Boardroom Blazer',
    category: 'Workwear',
    description: 'A sharply tailored black blazer that means business. Pair it with pearls for the full effect.',
    price: 520,
    quantityInStock: 5,
    status: 'active',
    sizes: ['S', 'M', 'L', 'XL'],
    photos: [u('1612731486606-2614b4d74921')],
  },
  {
    id: 'c5',
    name: 'Ivory Longline Coat',
    category: 'Workwear',
    description: 'A clean white longline coat that finishes any outfit with quiet authority.',
    price: 640,
    quantityInStock: 2,
    status: 'active',
    sizes: ['M', 'L'],
    photos: [u('1632149877166-f75d49000351')],
  },
  {
    id: 'c6',
    name: 'Ivory Two-Piece Set',
    category: 'Two-Piece Sets',
    description: 'A matching white shirt and trouser set. Effortless together, versatile apart.',
    price: 480,
    quantityInStock: 7,
    status: 'active',
    sizes: ['S', 'M', 'L', 'XL'],
    photos: [u('1619086303291-0ef7699e4b31')],
  },
  {
    id: 'c7',
    name: 'Tailored Jumpsuit',
    category: 'Two-Piece Sets',
    description: 'One piece, fully dressed. A tailored jumpsuit with a clean line from shoulder to hem.',
    price: 460,
    quantityInStock: 0,
    status: 'active',
    sizes: ['S', 'M', 'L'],
    photos: [u('1495385794356-15371f348c31')],
  },
];

export const BAG_CATEGORIES = ['Corporate Bags', 'Girlie Bags', 'Lunch Boxes'];
export const CLOTHING_CATEGORIES = ['Dresses', 'Workwear', 'Two-Piece Sets'];
export const CATEGORIES = [...BAG_CATEGORIES, ...CLOTHING_CATEGORIES];

export const DEPARTMENTS = {
  bags: { label: 'Bags', path: '/bags', categories: BAG_CATEGORIES },
  clothes: { label: 'Clothes', path: '/clothes', categories: CLOTHING_CATEGORIES },
};

export const departmentOf = (category) =>
  CLOTHING_CATEGORIES.includes(category) ? 'clothes' : 'bags';

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default sampleProducts;
