export const BRAND = "Kailynne's";
export const BRAND_SUB = 'Lux Collection';

export const FREE_DELIVERY_THRESHOLD = 800;
export const DELIVERY_FEE = 30;

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80';

export const formatPrice = (value) => `GH₵ ${Number(value || 0).toLocaleString()}`;

export const deliveryFeeFor = (subtotal) =>
  subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

export const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
