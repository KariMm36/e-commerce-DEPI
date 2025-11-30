const User = require('../models/User');

const userController = {
  getAllUsers: (req, res) => {
    const users = User.getAll();
    res.json({ success: true, count: users.length, data: users });
  },

  getUser: (req, res) => {
    const user = User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  },

  createUser: (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Check if email already exists
    if (User.findByEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = User.create({ name, email, phone, address });
    res.status(201).json({ success: true, data: newUser });
  },

  updateUser: (req, res) => {
    const updatedUser = User.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: updatedUser });
  },

  deleteUser: (req, res) => {
    const deleted = User.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  }
};

module.exports = userController;