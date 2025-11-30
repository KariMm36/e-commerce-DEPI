const Product = require('../models/Product');

const productController = {
  getAllProducts: (req, res) => {
    const { category, minPrice, maxPrice, search, brand } = req.query;
    let products = Product.getAll();

    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (brand) {
      products = products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    res.json({ success: true, count: products.length, data: products });
  },

  getProduct: (req, res) => {
    const product = Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  },

  createProduct: (req, res) => {
    const { name, price, category, stock, description, brand, specs, image } = req.body;

    if (!name || !price || !category || !brand) {
      return res.status(400).json({ success: false, message: 'Name, price, category, and brand are required' });
    }

    const newProduct = Product.create({
      name,
      price: parseFloat(price),
      category,
      stock: stock || 0,
      description: description || '',
      brand,
      specs: specs || {},
      image: image || 'default.jpg'
    });

    res.status(201).json({ success: true, data: newProduct });
  },

  updateProduct: (req, res) => {
    const updatedProduct = Product.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updatedProduct });
  },

  deleteProduct: (req, res) => {
    const deleted = Product.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  }
};

module.exports = productController;