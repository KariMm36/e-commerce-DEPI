const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API Documentation:`);
  console.log(`   Products: http://localhost:${PORT}/api/products`);
  console.log(`   Users: http://localhost:${PORT}/api/users`);
  console.log(`   Orders: http://localhost:${PORT}/api/orders`);
  console.log(`   Categories: http://localhost:${PORT}/api/categories`);
  console.log(`   Cart: http://localhost:${PORT}/api/cart/:userId`);
});