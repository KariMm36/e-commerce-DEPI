let orders = [
  { 
    id: 1, 
    userId: 1, 
    items: [{ productId: 1, quantity: 1, price: 999.99 }], 
    total: 999.99, 
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

const Order = {
  getAll: () => orders,
  
  findById: (id) => orders.find(o => o.id === parseInt(id)),
  
  findByUserId: (userId) => orders.filter(o => o.userId === parseInt(userId)),
  
  create: (orderData) => {
    const newOrder = {
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      ...orderData,
      status: orderData.status || 'pending',
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    return newOrder;
  },
  
  update: (id, orderData) => {
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index === -1) return null;
    orders[index] = { ...orders[index], ...orderData };
    return orders[index];
  },
  
  delete: (id) => {
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  }
};

module.exports = Order;