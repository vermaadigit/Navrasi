const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "session_id",
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "carts",
    timestamps: true,
    underscored: true, // ADD THIS LINE
    indexes: [
      {
        name: "carts_user_id",
        fields: ["user_id"], // Use snake_case
      },
      {
        name: "carts_session_id",
        fields: ["session_id"], // Use snake_case
      },
    ],
  }
);

module.exports = Cart;
