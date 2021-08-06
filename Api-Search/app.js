const express = require("express");
const morgan = require("morgan");
const productRouter = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  next();
});
app.use("/api/v1/products", productRouter);

module.exports = app;
