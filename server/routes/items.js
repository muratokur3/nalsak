const express = require('express');
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');
const Item = require('../models/Item');

const router = express.Router();

// Tüm öğeleri getir
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Yeni öğe ekle
router.post('/', authenticateToken, async (req, res) => {
  const { text } = req.body;
  const newItem = new Item({
    text,
    completed: false,
    userId: req.user.id,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Öğeyi güncelle
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { text, completed }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Öğeyi sil
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;