let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Computers', stock: 50, description: 'High-performance laptop', brand: 'Dell', specs: { ram: '16GB', storage: '512GB SSD', processor: 'Intel i7' }, image: 'laptop.jpg' },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Mobile Devices', stock: 100, description: 'Latest smartphone', brand: 'Samsung', specs: { ram: '8GB', storage: '256GB', screen: '6.5 inch' }, image: 'phone.jpg' },
  { id: 3, name: 'Wireless Headphones', price: 149.99, category: 'Audio', stock: 75, description: 'Noise-cancelling headphones', brand: 'Sony', specs: { battery: '30 hours', wireless: true }, image: 'headphones.jpg' },
  { id: 4, name: 'Smart Watch', price: 299.99, category: 'Wearables', stock: 60, description: 'Fitness tracking smartwatch', brand: 'Apple', specs: { display: 'OLED', waterproof: true }, image: 'watch.jpg' },
  { id: 5, name: '4K Monitor', price: 449.99, category: 'Computer Accessories', stock: 40, description: '27-inch 4K display', brand: 'LG', specs: { resolution: '3840x2160', refresh: '60Hz' }, image: 'monitor.jpg' }
];

const Product = {
  getAll: () => products,
  
  findById: (id) => products.find(p => p.id === parseInt(id)),
  
  findByCategory: (category) => products.filter(p => p.category.toLowerCase() === category.toLowerCase()),
  
  create: (productData) => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...productData,
      stock: productData.stock || 0
    };
    products.push(newProduct);
    return newProduct;
  },
  
  update: (id, productData) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...productData };
    return products[index];
  },
  
  delete: (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
  
  updateStock: (id, quantity) => {
    const product = Product.findById(id);
    if (!product) return null;
    product.stock += quantity;
    return product;
  }
};

module.exports = Product;