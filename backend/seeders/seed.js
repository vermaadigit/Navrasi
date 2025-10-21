const { User, Product, sequelize } = require("../src/models");
require("dotenv").config();

/**
 * Seed database with initial admin user and sample products
 */
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Sync database (this will create tables if they don't exist)
    await sequelize.sync({ force: true }); // WARNING: This drops all tables
    console.log("✅ Database synchronized");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@navrasi.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
    const adminName = process.env.ADMIN_NAME || "Admin User";

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

    // Create sample products
    const sampleProducts = [
      {
        title: "Classic Cotton T-Shirt",
        description:
          "Premium quality 100% cotton t-shirt with comfortable fit. Perfect for everyday wear with breathable fabric and modern design.",
        price: 29.99,
        stock: 50,
        category: "T-Shirts",
        sizeOptions: ["S", "M", "L", "XL", "XXL"],
        colorOptions: ["White", "Black", "Navy", "Gray"],
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
        ],
      },
      {
        title: "Slim Fit Denim Jeans",
        description:
          "Modern slim fit jeans crafted from premium stretch denim. Features a contemporary cut with comfortable waistband and durable construction.",
        price: 79.99,
        stock: 35,
        category: "Jeans",
        sizeOptions: ["28", "30", "32", "34", "36", "38"],
        colorOptions: ["Blue", "Black", "Light Blue", "Dark Blue"],
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800",
        ],
      },
      {
        title: "Hooded Sweatshirt",
        description:
          "Cozy pullover hoodie made from soft cotton blend. Features adjustable drawstring hood, kangaroo pocket, and ribbed cuffs for ultimate comfort.",
        price: 49.99,
        stock: 40,
        category: "Hoodies",
        sizeOptions: ["S", "M", "L", "XL", "XXL"],
        colorOptions: ["Black", "Gray", "Navy", "Burgundy", "Olive"],
        images: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
        ],
      },
      {
        title: "Casual Linen Shirt",
        description:
          "Lightweight linen shirt perfect for warm weather. Features button-down collar, chest pocket, and breathable natural fabric for all-day comfort.",
        price: 59.99,
        stock: 30,
        category: "Shirts",
        sizeOptions: ["S", "M", "L", "XL"],
        colorOptions: ["White", "Beige", "Light Blue", "Sage Green"],
        images: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
        ],
      },
      {
        title: "Athletic Joggers",
        description:
          "Comfortable jogger pants designed for active lifestyle. Features elastic waistband with drawstring, zippered pockets, and tapered fit.",
        price: 44.99,
        stock: 45,
        category: "Pants",
        sizeOptions: ["S", "M", "L", "XL", "XXL"],
        colorOptions: ["Black", "Gray", "Navy", "Charcoal"],
        images: [
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
          "https://images.unsplash.com/photo-1612681621975-76d2a2e8d6a8?w=800",
        ],
      },
    ];

    for (const productData of sampleProducts) {
      await Product.create(productData);
    }

    console.log(`✅ ${sampleProducts.length} sample products created`);
    console.log("\n🎉 Database seeding completed successfully!\n");
    console.log("Admin Credentials:");
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
