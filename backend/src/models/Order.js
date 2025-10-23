const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id", // This maps userId to user_id
    },
    orderNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "order_number",
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_amount",
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "shipping_address",
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_method",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    underscored: true, // ADD THIS LINE - converts createdAt to created_at
    indexes: [
      {
        name: "orders_user_id",
        fields: ["user_id"], // Use the actual column name, not the model property
      },
      {
        name: "orders_order_number",
        fields: ["order_number"],
      },
      {
        name: "orders_status",
        fields: ["status"],
      },
      {
        name: "orders_created_at",
        fields: ["created_at"], // Use snake_case
      },
    ],
  }
);

module.exports = Order;
