let users = [
  { id: 1, name: 'karim mustafa', email: 'karim@example.com', phone: '01233456879', address: 'Mansoura' },
  { id: 2, name: 'omar ahmed', email: 'omar@example.com', phone: '01233456879', address: 'Cairo' }
];

const User = {
  getAll: () => users,
  
  findById: (id) => users.find(u => u.id === parseInt(id)),
  
  findByEmail: (email) => users.find(u => u.email === email),
  
  create: (userData) => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...userData
    };
    users.push(newUser);
    return newUser;
  },
  
  update: (id, userData) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...userData };
    return users[index];
  },
  
  delete: (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};

module.exports = User;