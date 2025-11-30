const Category = require('../models/Category');

const categoryController = {
  getAllCategories: (req, res) => {
    const categories = Category.getAll();
    res.json({ success: true, count: categories.length, data: categories });
  },

  getCategory: (req, res) => {
    const category = Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  },

  createCategory: (req, res) => {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const newCategory = Category.create({ name, description: description || '' });
    res.status(201).json({ success: true, data: newCategory });
  },

  updateCategory: (req, res) => {
    const updatedCategory = Category.update(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: updatedCategory });
  },

  deleteCategory: (req, res) => {
    const deleted = Category.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  }
};

module.exports = categoryController;