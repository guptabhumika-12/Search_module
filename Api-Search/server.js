const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".config.env" });
const app = require("./app");

mongoose
  .connect("mongodb://localhost:27017/product_search", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  });
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
