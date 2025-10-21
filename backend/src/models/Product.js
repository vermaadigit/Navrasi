const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

/**
 * Product Model - Stores product information for e-commerce
 */
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
        len: {
          args: [3, 255],
          msg: "Title must be between 3 and 255 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description is required" },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Price must be positive" },
      },
    },
    sizeOptions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
      field: "size_options",
    },
    colorOptions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
      field: "color_options",
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
      validate: {
        isValidImages(value) {
          if (!Array.isArray(value)) {
            throw new Error("Images must be an array");
          }
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: "Stock cannot be negative" },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "General",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "products",
    timestamps: true,
    indexes: [
      { fields: ["title"] },
      { fields: ["category"] },
      { fields: ["price"] },
      { fields: ["createdAt"] },
    ],
  }
);

module.exports = Product;
