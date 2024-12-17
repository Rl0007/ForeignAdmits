import express from 'express';
import Bank from '../models/bank.js';

const router = express.Router();

// Get all banks
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bank
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the bank name already exists
    const bankExists = await Bank.exists({ name });
    if (bankExists) {
      return res.status(400).json({ message: 'Bank name already exists' });
    }

    const newBank = new Bank({ name });
    const savedBank = await newBank.save();
    res.status(201).json(savedBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a bank by ID
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name cannot be empty.' });
  }

  try {
    // Check if the bank name already exists
    const bankExists = await Bank.exists({ name });
    if (bankExists) {
      return res.status(400).json({ message: 'Bank name already exists' });
    }

    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bank) return res.status(404).json({ message: 'Bank not found' });
    res.json(bank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bank
router.delete('/:id', async (req, res) => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);
    if (!bank) return res.status(404).json({ message: 'Bank not found' });

    res.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
