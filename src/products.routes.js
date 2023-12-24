const express = require("express");
const products = require("./products");
const { blockSpecialBrand } = require("./middleware");

const productsRouter = express.Router();

productsRouter.get("/products", (req, response) => {
  return response.json(products);
});

productsRouter.get(
  "/products/by-brand/:brand",
  blockSpecialBrand,
  (req, res) => {
    const { brand } = req.params;

    const filteredProducts = products.filter(
      (product) => product.brand === brand
    );

    res.json(filteredProducts);
  }
);

productsRouter.get("/products/by-id/:productId", (req, res) => {
  const { productId } = req.params;

  const specificProduct = products.find((product) => product.id === +productId);

  res.json(specificProduct);
});

productsRouter.get("/productswitherror", () => {
  let err = new Error("processing error ");
  err.statusCode = 400;
  throw err;
});

module.exports = productsRouter;
