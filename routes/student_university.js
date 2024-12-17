import express from 'express';
import StudentUniversity from '../models/student_university.js';
import Student from '../models/student.js';
import University from '../models/university.js';

const router = express.Router();

// Get all student-university associations
router.get('/', async (req, res) => {
  try {
    const associations = await StudentUniversity.find().populate('student').populate('university');
    res.json(associations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new student-university association
router.post('/', async (req, res) => {
  const { studentId, universityId } = req.body;

  try {
    // Check if the student exists
    const studentExists = await Student.exists({ _id: studentId });
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the university exists
    const universityExists = await University.exists({ _id: universityId });
    if (!universityExists) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Check if the association already exists
    const associationExists = await StudentUniversity.exists({ student: studentId, university: universityId });
    if (associationExists) {
      return res.status(400).json({ message: 'This student-university relationship already exists' });
    }

    const newAssociation = new StudentUniversity({ student: studentId, university: universityId });
    const savedAssociation = await newAssociation.save();
    res.status(201).json(savedAssociation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a student-university association
router.put('/:id', async (req, res) => {
  const { studentId, universityId } = req.body;

  try {
    // Check if the student exists
    const studentExists = await Student.exists({ _id: studentId });
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the university exists
    const universityExists = await University.exists({ _id: universityId });
    if (!universityExists) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Check if the association already exists
    const associationExists = await StudentUniversity.exists({ student: studentId, university: universityId });
    if (associationExists) {
      return res.status(400).json({ message: 'This student-university relationship already exists' });
    }

    const association = await StudentUniversity.findById(req.params.id);
    if (!association) return res.status(404).json({ message: 'Association not found' });

    association.student = studentId;
    association.university = universityId;
    const updatedAssociation = await association.save();
    res.json(updatedAssociation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student-university association
router.delete('/:id', async (req, res) => {
  try {
    const association = await StudentUniversity.findByIdAndDelete(req.params.id);
    if (!association) return res.status(404).json({ message: 'Association not found' });

    res.json({ message: 'Association deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
