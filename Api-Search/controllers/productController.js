const Product = require("../models/productModel.js");

exports.getAllTours = async (req, res) => {
  try {
    //BUILD A QUERY
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields", "s"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = queryStr.toLowerCase();
    let query = Product.find(JSON.parse(queryStr));

    if (req.query.s) {
      const temp = req.query.s;
      const regex = new RegExp(`${temp}`, "i");

      query = query.or([
        { title: regex },
        { description: regex },
        { category: regex },
      ]);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    const total = await Product.countDocuments(query);

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new Error("this page does not exist");
    }

    if (total < limit) lastPage = 1;
    else lastPage = Math.ceil(total / limit);
    const product = await query;

    res.status(200).json({
      status: "success",
      results: product.length,
      lastPage,
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: product.length,
      data: { product },
    });
  } catch (err) {
    res.status(404).json({ status: "failed", message: err });
  }
};
