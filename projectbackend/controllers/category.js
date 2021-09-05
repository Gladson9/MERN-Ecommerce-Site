const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category Not Found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  // console.log("BACKEND GET CATEGORY: ", req.category);
  return res.json(req.category); //gets values from getCategoryById
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, Categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories found",
      });
    }
    res.json(Categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category; //req.category is populated by the middleware
  category.name = req.body.name; //req.body.name comes fromt the front end

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: `Successfully deleted ${category.name}`,
    });
  });
};
