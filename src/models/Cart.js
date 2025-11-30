let carts = [];

const Cart = {
  findByUserId: (userId) => carts.find(c => c.userId === parseInt(userId)),
  
  create: (userId) => {
    const newCart = {
      id: carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1,
      userId: parseInt(userId),
      items: []
    };
    carts.push(newCart);
    return newCart;
  },
  
  addItem: (userId, productId, quantity) => {
    let cart = Cart.findByUserId(userId);
    if (!cart) {
      cart = Cart.create(userId);
    }
    
    const existingItem = cart.items.find(i => i.productId === parseInt(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId: parseInt(productId), quantity });
    }
    return cart;
  },
  
  updateItem: (userId, productId, quantity) => {
    const cart = Cart.findByUserId(userId);
    if (!cart) return null;
    
    const item = cart.items.find(i => i.productId === parseInt(productId));
    if (!item) return null;
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== parseInt(productId));
    } else {
      item.quantity = quantity;
    }
    return cart;
  },
  
  removeItem: (userId, productId) => {
    const cart = Cart.findByUserId(userId);
    if (!cart) return null;
    
    cart.items = cart.items.filter(i => i.productId !== parseInt(productId));
    return cart;
  },
  
  clear: (userId) => {
    const cart = Cart.findByUserId(userId);
    if (!cart) return null;
    cart.items = [];
    return cart;
  }
};

module.exports = Cart;