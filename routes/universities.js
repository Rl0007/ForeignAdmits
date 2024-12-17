import express from 'express';
import University from '../models/university.js';

const router = express.Router();

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new university
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the university name already exists
    const universityExists = await University.exists({ name });
    if (universityExists) {
      return res.status(400).json({ message: 'University name already exists' });
    }

    const newUniversity = new University({ name });
    const savedUniversity = await newUniversity.save();
    res.status(201).json(savedUniversity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a university by ID
router.put('/:id', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name cannot be empty.' });
  }

  try {
    // Check if the university name already exists
    const universityExists = await University.exists({ name });
    if (universityExists) {
      return res.status(400).json({ message: 'University name already exists' });
    }

    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!university) return res.status(404).json({ message: 'University not found' });
    res.json(university);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a university
router.delete('/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ message: 'University not found' });

    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
