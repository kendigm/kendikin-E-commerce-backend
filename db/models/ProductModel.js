export default (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.JSON,
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
  });

  return Product;
};
