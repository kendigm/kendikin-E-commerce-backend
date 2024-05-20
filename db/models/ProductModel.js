import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./db.js"; // Ensure the path is correct

const Product = sequelize.define(
  "Product",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.JSONB, // To store image data as JSON
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Product;
