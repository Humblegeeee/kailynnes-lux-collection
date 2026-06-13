const sampleProducts = [
  {
    id: '1',
    name: 'Classic Corporate Tote',
    category: 'Corporate Bags',
    description: 'Elegant tote bag suitable for work and professional settings.',
    price: 250,
    quantityInStock: 8,
    status: 'active',
    photos: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'
    ]
  },
  {
    id: '2',
    name: 'Pink Fashion Handbag',
    category: 'Girlie Bags',
    description: 'Stylish handbag designed for casual outings and events.',
    price: 180,
    quantityInStock: 5,
    status: 'active',
    photos: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'
    ]
  },
  {
    id: '3',
    name: 'Modern Lunch Box',
    category: 'Lunch Boxes',
    description: 'Practical and stylish lunch box for everyday use.',
    price: 120,
    quantityInStock: 0,
    status: 'active',
    photos: [
      'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&q=80'
    ]
  }
];

export const CATEGORIES = [
  'Corporate Bags',
  'Girlie Bags',
  'Lunch Boxes'
];

export default sampleProducts;