import { AdminMenuRow, MenuCategory, MenuItem, MockOrder } from '../types/demo';

export const restaurantProfile = {
  name: 'Casa Lumiere',
  tagline: 'Modern dining, effortless table ordering.',
  location: 'Gulberg, Lahore',
  rating: 4.8,
  heroImage:
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
};

export const menuCategories: MenuCategory[] = [
  { id: 'signature', name: 'Signature' },
  { id: 'mains', name: 'Mains' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'truffle-pasta',
    name: 'Truffle Alfredo Pasta',
    categoryId: 'signature',
    description: 'Creamy parmesan sauce, wild mushrooms, basil oil, and black truffle.',
    price: 1850,
    imageUrl:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
  },
  {
    id: 'smash-burger',
    name: 'Double Smash Burger',
    categoryId: 'mains',
    description: 'Two seared beef patties, cheddar, caramelized onions, and house sauce.',
    price: 1650,
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
  },
  {
    id: 'margherita',
    name: 'Wood-Fired Margherita',
    categoryId: 'pizza',
    description: 'San Marzano tomato, mozzarella, fresh basil, and olive oil.',
    price: 1450,
    imageUrl:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    isNew: true,
  },
  {
    id: 'grilled-salmon',
    name: 'Citrus Grilled Salmon',
    categoryId: 'mains',
    description: 'Herb rice, grilled vegetables, lemon butter, and micro greens.',
    price: 2450,
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lava-cake',
    name: 'Molten Lava Cake',
    categoryId: 'desserts',
    description: 'Warm chocolate cake with vanilla bean ice cream and berries.',
    price: 850,
    imageUrl:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
  },
  {
    id: 'berry-cooler',
    name: 'Berry Mint Cooler',
    categoryId: 'drinks',
    description: 'Mixed berries, fresh mint, lime, and sparkling water.',
    price: 520,
    imageUrl:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    isNew: true,
  },
];

export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-1048',
    tableNumber: 5,
    status: 'new',
    createdAt: '2 min ago',
    notes: 'No onions in the burger.',
    items: [
      { id: 'smash-burger', name: 'Double Smash Burger', quantity: 2 },
      { id: 'berry-cooler', name: 'Berry Mint Cooler', quantity: 2 },
    ],
  },
  {
    id: 'ORD-1047',
    tableNumber: 9,
    status: 'accepted',
    createdAt: '7 min ago',
    notes: 'Serve dessert after mains.',
    items: [
      { id: 'truffle-pasta', name: 'Truffle Alfredo Pasta', quantity: 1 },
      { id: 'lava-cake', name: 'Molten Lava Cake', quantity: 1 },
    ],
  },
  {
    id: 'ORD-1046',
    tableNumber: 3,
    status: 'preparing',
    createdAt: '12 min ago',
    items: [
      { id: 'margherita', name: 'Wood-Fired Margherita', quantity: 1 },
      { id: 'grilled-salmon', name: 'Citrus Grilled Salmon', quantity: 1 },
    ],
  },
  {
    id: 'ORD-1045',
    tableNumber: 12,
    status: 'ready',
    createdAt: '18 min ago',
    notes: 'Guest requested extra cutlery.',
    items: [{ id: 'truffle-pasta', name: 'Truffle Alfredo Pasta', quantity: 2 }],
  },
];

export const adminMenuRows: AdminMenuRow[] = [
  { id: 'M-01', name: 'Truffle Alfredo Pasta', category: 'Signature', price: 1850, availability: 'Available' },
  { id: 'M-02', name: 'Double Smash Burger', category: 'Mains', price: 1650, availability: 'Available' },
  { id: 'M-03', name: 'Wood-Fired Margherita', category: 'Pizza', price: 1450, availability: 'Low stock' },
  { id: 'M-04', name: 'Molten Lava Cake', category: 'Desserts', price: 850, availability: 'Paused' },
];

export const adminStats = [
  { label: 'Today orders', value: '128', change: '+18%' },
  { label: 'Active tables', value: '21', change: '+6' },
  { label: 'Avg. prep time', value: '14m', change: '-2m' },
  { label: 'Demo revenue', value: 'Rs 286k', change: '+12%' },
];

