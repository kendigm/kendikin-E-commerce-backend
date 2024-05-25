import { Sequelize, DataTypes } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import Product from "../db/models/ProductModel.js";

const AddProduct = async (req, res, next) => {
  try {
    let { title, category, img, price, size, quantity } = req.body;

    if (!title || !category || !img || !price || !size) {
      return res.status(400).json({
        message: "Please provide all details of the product",
      });
    }

    const existProduct = await Product.findOne({ where: { title } });
    if (existProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Upload image to cloudinary
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
      quantity,
      price,
      size,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
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
    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(singleProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let { title, category, img, price, size, quantity } = req.body;
    if (!title || !category || !img || !price || !size) {
      return res.status(400).json({
        message: "Please provide all details of the product",
      });
    }

    // Upload new image to cloudinary
    let result = await cloudinary.uploader.upload(img, {
      folder: "products",
    });

    img = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };

    const updated = await Product.update(
      { title, category, img, price, size, quantity },
      { where: { id: req.params.id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: `Product has been updated` });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.img.public_id);
    await product.destroy();

    return res.json({ message: `Product has been deleted` });
  } catch (error) {
    next(error);
  }
};

export { AddProduct, getProduct, getALLProducts, deleteProduct, updateProduct };
