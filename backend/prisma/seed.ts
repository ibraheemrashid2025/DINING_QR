import bcrypt from 'bcrypt';

import { MenuItemAvailability, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roleSeeds = [
  { name: 'SUPER_ADMIN', description: 'Full platform administration access' },
  { name: 'RESTAURANT_OWNER', description: 'Restaurant owner administration access' },
  { name: 'BRANCH_MANAGER', description: 'Branch management access' },
  { name: 'COUNTER_STAFF', description: 'Counter staff order access' },
  { name: 'KITCHEN_STAFF', description: 'Kitchen staff preparation access' },
] as const;

async function main() {
  const roles = await Promise.all(
    roleSeeds.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {
          description: role.description,
          isActive: true,
        },
        create: role,
      }),
    ),
  );

  const roleByName = new Map(roles.map((role) => [role.name, role]));

  const restaurant = await prisma.restaurant.upsert({
    where: { slug: 'casa-lumiere' },
    update: {
      name: 'Casa Lumiere',
      description: 'Modern dining, effortless table ordering.',
      phone: '+92 300 0000000',
      email: 'hello@casalumiere.test',
      address: 'Gulberg, Lahore',
      isActive: true,
    },
    create: {
      name: 'Casa Lumiere',
      slug: 'casa-lumiere',
      description: 'Modern dining, effortless table ordering.',
      phone: '+92 300 0000000',
      email: 'hello@casalumiere.test',
      address: 'Gulberg, Lahore',
    },
  });

  const branch = await prisma.branch.upsert({
    where: {
      restaurantId_slug: {
        restaurantId: restaurant.id,
        slug: 'gulberg',
      },
    },
    update: {
      name: 'Gulberg Branch',
      address: 'Gulberg III, Lahore',
      phone: '+92 300 1111111',
      city: 'Lahore',
      isActive: true,
    },
    create: {
      name: 'Gulberg Branch',
      slug: 'gulberg',
      address: 'Gulberg III, Lahore',
      phone: '+92 300 1111111',
      city: 'Lahore',
      restaurantId: restaurant.id,
    },
  });

  const demoPasswordHash = await bcrypt.hash('DemoPass@123', 12);
  const demoUsers = [
    {
      fullName: 'Casa Lumiere Admin',
      email: 'admin@casalumiere.test',
      roleName: 'SUPER_ADMIN',
    },
    {
      fullName: 'Casa Lumiere Counter',
      email: 'counter@casalumiere.test',
      roleName: 'COUNTER_STAFF',
    },
    {
      fullName: 'Casa Lumiere Kitchen',
      email: 'kitchen@casalumiere.test',
      roleName: 'KITCHEN_STAFF',
    },
  ] as const;

  await Promise.all(
    demoUsers.map((user) => {
      const role = roleByName.get(user.roleName);

      if (!role) {
        throw new Error(`Missing role for seed user: ${user.email}`);
      }

      return prisma.user.upsert({
        where: { email: user.email },
        update: {
          fullName: user.fullName,
          passwordHash: demoPasswordHash,
          isActive: true,
          status: 'ACTIVE',
          roleId: role.id,
          restaurantId: restaurant.id,
          branchId: branch.id,
        },
        create: {
          fullName: user.fullName,
          email: user.email,
          passwordHash: demoPasswordHash,
          roleId: role.id,
          restaurantId: restaurant.id,
          branchId: branch.id,
        },
      });
    }),
  );

  const categorySeeds = [
    { name: 'Signature', slug: 'signature', sortOrder: 1 },
    { name: 'Mains', slug: 'mains', sortOrder: 2 },
    { name: 'Pizza', slug: 'pizza', sortOrder: 3 },
    { name: 'Desserts', slug: 'desserts', sortOrder: 4 },
    { name: 'Drinks', slug: 'drinks', sortOrder: 5 },
  ];

  const categories = await Promise.all(
    categorySeeds.map((category) =>
      prisma.category.upsert({
        where: {
          restaurantId_slug: {
            restaurantId: restaurant.id,
            slug: category.slug,
          },
        },
        update: {
          name: category.name,
          sortOrder: category.sortOrder,
          isActive: true,
        },
        create: {
          ...category,
          restaurantId: restaurant.id,
        },
      }),
    ),
  );

  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

  const menuItemSeeds = [
    {
      name: 'Truffle Alfredo Pasta',
      slug: 'truffle-alfredo-pasta',
      description: 'Creamy parmesan sauce, wild mushrooms, basil oil, and black truffle.',
      price: '1850.00',
      categorySlug: 'signature',
      isPopular: true,
      isNew: false,
    },
    {
      name: 'Double Smash Burger',
      slug: 'double-smash-burger',
      description: 'Two seared beef patties, cheddar, caramelized onions, and house sauce.',
      price: '1650.00',
      categorySlug: 'mains',
      isPopular: true,
      isNew: false,
    },
    {
      name: 'Wood-Fired Margherita',
      slug: 'wood-fired-margherita',
      description: 'San Marzano tomato, mozzarella, fresh basil, and olive oil.',
      price: '1450.00',
      categorySlug: 'pizza',
      isPopular: false,
      isNew: true,
    },
    {
      name: 'Molten Lava Cake',
      slug: 'molten-lava-cake',
      description: 'Warm chocolate cake with vanilla bean ice cream and berries.',
      price: '850.00',
      categorySlug: 'desserts',
      isPopular: true,
      isNew: false,
    },
    {
      name: 'Berry Mint Cooler',
      slug: 'berry-mint-cooler',
      description: 'Mixed berries, fresh mint, lime, and sparkling water.',
      price: '520.00',
      categorySlug: 'drinks',
      isPopular: false,
      isNew: true,
    },
  ];

  await Promise.all(
    menuItemSeeds.map((item) => {
      const category = categoryBySlug.get(item.categorySlug);

      if (!category) {
        throw new Error(`Missing category for seed item: ${item.name}`);
      }

      return prisma.menuItem.upsert({
        where: {
          restaurantId_slug: {
            restaurantId: restaurant.id,
            slug: item.slug,
          },
        },
        update: {
          name: item.name,
          description: item.description,
          price: item.price,
          categoryId: category.id,
          branchId: branch.id,
          availability: MenuItemAvailability.AVAILABLE,
          isPopular: item.isPopular,
          isNew: item.isNew,
          isActive: true,
        },
        create: {
          name: item.name,
          slug: item.slug,
          description: item.description,
          price: item.price,
          categoryId: category.id,
          restaurantId: restaurant.id,
          branchId: branch.id,
          availability: MenuItemAvailability.AVAILABLE,
          isPopular: item.isPopular,
          isNew: item.isNew,
        },
      });
    }),
  );

  await Promise.all(
    [1, 2, 3, 4, 5, 6].map((number) =>
      prisma.restaurantTable.upsert({
        where: {
          branchId_number: {
            branchId: branch.id,
            number,
          },
        },
        update: {
          seats: number <= 2 ? 2 : 4,
          qrCodeUrl: `/menu?table=${number}`,
          isActive: true,
        },
        create: {
          number,
          seats: number <= 2 ? 2 : 4,
          qrCodeUrl: `/menu?table=${number}`,
          branchId: branch.id,
        },
      }),
    ),
  );

  console.log('Seed completed: restaurant, branch, roles, demo users, categories, menu items, and tables.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
