import { Sequelize, DataTypes } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import Product from "../db/models/ProductModel.js";

const AddProduct = async (req, res, next) => {
  try {
    let { title, category, img, price, size } = req.body;

    if (!title || !category || !img || !price || !size) {
      return res.json({
        message: "Please provide all details of the product",
      });
    }

    const existProduct = await Product.findOne({ where: { title } });
    if (existProduct) {
      return res.json({ message: "Product already exists" });
    }

    // cloudinary
    let result = await cloudinary.uploader.upload(img, {
      folder: "products",
    });

    img = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    const newProduct = await Product.create({
      title,
      category,
      img,
      price,
      size,
    });

    return res.status(200).json({
      message: "Product added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getALLProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    return res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  let { title, category, img, price, size } = req.body;
  if (!title || !category || !img || !price || !size) {
    return res.json({
      message: "Please provide all details of the product",
    });
  }

  // cloudinary
  let result = await cloudinary.uploader.upload(img, {
    folder: "products",
  });

  img = {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };

  try {
    await Product.update(
      { title, category, img, price, size },
      { where: { id: req.params.id } }
    );
    return res.json({ message: `Product has been updated` });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    const deleteImg = await cloudinary.uploader.destroy(product.img.public_id);
    await product.destroy();

    return res.json({ message: `Product has been deleted` });
  } catch (error) {
    next(error);
  }
};

export { AddProduct, getProduct, getALLProducts, deleteProduct, updateProduct };
