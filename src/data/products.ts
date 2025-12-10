import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Acme Circles T-Shirt',
    description: 'A comfortable t-shirt with Acme circles design',
    price: 20.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop&q=80',
    ],
    category: 'shirts',
    slug: 'acme-circles-tshirt',
    colors: ['Black', 'White', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
  },
  {
    id: '2',
    name: 'Acme Drawstring Bag',
    description: 'A versatile drawstring bag for everyday use',
    price: 12.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&q=80',
    ],
    category: 'accessories',
    slug: 'acme-drawstring-bag',
    colors: ['Black', 'Navy', 'Gray', 'Red'],
    stock: 30,
  },
  {
    id: '3',
    name: 'Acme Cup',
    description: 'A durable cup for your daily beverages',
    price: 15.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop&q=80',
    ],
    category: 'accessories',
    slug: 'acme-cup',
    colors: ['White', 'Black', 'Blue'],
    stock: 25,
  },
  {
    id: '4',
    name: 'Acme Mug',
    description: 'A classic mug for your morning coffee',
    price: 15.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=800&fit=crop&q=80',
    ],
    category: 'accessories',
    slug: 'acme-mug',
    colors: ['White', 'Black', 'Red', 'Blue'],
    stock: 40,
  },
  {
    id: '5',
    name: 'Acme Hoodie',
    description: 'A cozy hoodie perfect for any season',
    price: 50.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&q=80',
    ],
    category: 'shirts',
    slug: 'acme-hoodie',
    colors: ['Black', 'Gray', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 35,
  },
  {
    id: '6',
    name: 'Acme Baby Onesie',
    description: 'An adorable onesie for your little one',
    price: 10.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop&q=80',
    ],
    category: 'shirts',
    slug: 'acme-baby-onesie',
    colors: ['White', 'Pink', 'Blue', 'Yellow'],
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    stock: 20,
  },
  {
    id: '7',
    name: 'Acme Baby Cap',
    description: 'A cute cap to protect your baby',
    price: 10.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&q=80',
    ],
    category: 'accessories',
    slug: 'acme-baby-cap',
    colors: ['White', 'Pink', 'Blue', 'Beige'],
    sizes: ['Newborn', '0-6M', '6-12M'],
    stock: 15,
  },
  {
    id: '8',
    name: 'Acme Sticker Pack',
    description: 'A collection of Acme branded stickers',
    price: 5.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1625772452859-1c032693bbd3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625772452859-1c032693bbd3?w=800&h=800&fit=crop&q=80',
    ],
    category: 'stickers',
    slug: 'acme-sticker-pack',
    stock: 100,
  },
];

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Shirts', slug: 'shirts' },
  { name: 'Stickers', slug: 'stickers' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') {
    return products;
  }
  return products.filter((product) => product.category === category);
}

