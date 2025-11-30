let categories = [
  { id: 1, name: 'Computers', description: 'Laptops, desktops, and computer parts' },
  { id: 2, name: 'Mobile Devices', description: 'Smartphones, tablets, and mobile accessories' },
  { id: 3, name: 'Audio', description: 'Headphones, speakers, and audio equipment' },
  { id: 4, name: 'Wearables', description: 'Smartwatches and fitness trackers' },
  { id: 5, name: 'Computer Accessories', description: 'Monitors, keyboards, mice, and peripherals' },
  { id: 6, name: 'Gaming', description: 'Gaming consoles, controllers, and accessories' },
  { id: 7, name: 'Home Electronics', description: 'Smart home devices and appliances' }
];

const Category = {
  getAll: () => categories,
  
  findById: (id) => categories.find(c => c.id === parseInt(id)),
  
  create: (categoryData) => {
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      ...categoryData
    };
    categories.push(newCategory);
    return newCategory;
  },
  
  update: (id, categoryData) => {
    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;
    categories[index] = { ...categories[index], ...categoryData };
    return categories[index];
  },
  
  delete: (id) => {
    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  }
};

module.exports = Category;