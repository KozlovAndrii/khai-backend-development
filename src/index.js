const express = require("express");
const dotenv = require("dotenv");

const productsRouter = require("./products.routes");
const { logRequest } = require("./middleware");
const { errorResponder } = require("./error.middleware");

dotenv.config();

const port = process.env.PORT;

const app = express();
app
  .use(logRequest)
  .use(productsRouter)
  .use(errorResponder)
  .listen(port, () => console.log(`Server started on port: ${port}`));
