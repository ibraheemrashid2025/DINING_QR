import { AdminMenuRow, Branch, MenuCategory, MenuItem, MockOrder, RestaurantTable } from '../types/demo';

export const restaurantProfile = {
  name: 'Ember & Oak Grill',
  tagline: 'Flame-grilled steaks, stacked burgers, and table-side ordering with a premium edge.',
  location: 'Main Branch',
  rating: 4.8,
  heroImage:
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
};

export const menuCategories: MenuCategory[] = [
  { id: 'steaks', name: 'Steaks' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'drinks', name: 'Drinks' },
];

export const menuItems: MenuItem[] = [
  {
    id: 'ribeye-flame',
    name: 'Charred Ribeye Steak',
    categoryId: 'steaks',
    description: 'Ribeye seared over open flame with smoked butter, sea salt, and roasted garlic.',
    price: 3950,
    imageUrl:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'peppercorn-filet',
    name: 'Peppercorn Filet',
    categoryId: 'steaks',
    description: 'Tender filet with cracked pepper crust, cream jus, and grilled seasonal greens.',
    price: 4250,
    imageUrl:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
    isNew: true,
  },
  {
    id: 'ember-burger',
    name: 'Ember Double Burger',
    categoryId: 'burgers',
    description: 'Two smashed beef patties, molten cheddar, caramelized onions, and ember sauce.',
    price: 1850,
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'smoked-brisket-burger',
    name: 'Smoked Brisket Burger',
    categoryId: 'burgers',
    description: 'Ground beef patty, smoked brisket, pickles, aged cheese, and toasted brioche.',
    price: 2150,
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
    isNew: true,
  },
  {
    id: 'fire-wings',
    name: 'Fire Roasted Wings',
    categoryId: 'appetizers',
    description: 'Charred chicken wings tossed in warm chili glaze with ranch crema.',
    price: 1250,
    imageUrl:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Steak Fries',
    categoryId: 'appetizers',
    description: 'Crisp fries layered with steak bites, cheese sauce, jalapenos, and scallions.',
    price: 1150,
    imageUrl:
      'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'smoked-alfredo',
    name: 'Smoked Chicken Alfredo',
    categoryId: 'pasta',
    description: 'Creamy parmesan pasta with smoked chicken, mushrooms, and chili oil.',
    price: 1950,
    imageUrl:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
  },
  {
    id: 'citrus-smoke',
    name: 'Citrus Smoke Cooler',
    categoryId: 'drinks',
    description: 'Orange, lime, mint, smoked salt rim, and sparkling soda over crushed ice.',
    price: 650,
    imageUrl:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
    isAvailable: true,
    isNew: true,
  },
];

export const restaurantTables: RestaurantTable[] = [
  { id: 'table_1', number: 1, seats: 2, branchId: 'main_branch' },
  { id: 'table_2', number: 2, seats: 4, branchId: 'main_branch' },
];

export const branches: Branch[] = [
  {
    id: 'main_branch',
    name: 'Main Branch',
    location: 'Main Dining Floor',
    manager: 'Ayesha Khan',
    phone: '+92 300 1111111',
  },
];

export const mockOrders: MockOrder[] = [];

export const adminMenuRows: AdminMenuRow[] = [
  { id: 'M-01', name: 'Charred Ribeye Steak', category: 'Steaks', price: 3950, availability: 'Available' },
  { id: 'M-02', name: 'Ember Double Burger', category: 'Burgers', price: 1850, availability: 'Available' },
  { id: 'M-03', name: 'Loaded Steak Fries', category: 'Appetizers', price: 1150, availability: 'Low stock' },
  { id: 'M-04', name: 'Smoked Chicken Alfredo', category: 'Pasta', price: 1950, availability: 'Available' },
];

export const adminStats = [
  { label: 'Today orders', value: '128', change: '+18%' },
  { label: 'Active tables', value: '21', change: '+6' },
  { label: 'Avg. prep time', value: '14m', change: '-2m' },
  { label: 'Demo revenue', value: 'Rs 286k', change: '+12%' },
];
