import express from 'express';
import StudentUniversityBank from '../models/student_university_bank.js';
import StudentUniversity from '../models/student_university.js';
import Bank from '../models/bank.js';

const router = express.Router();

// Get all student-university-bank associations
router.get('/', async (req, res) => {
  try {
    const associations = await StudentUniversityBank.find().populate('studentUniversity').populate('bank');
    res.json(associations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new student-university-bank association
router.post('/', async (req, res) => {
  const { studentUniversity, bank, loanAmount, status } = req.body;

  try {
    // Check if the student-university association exists
    const studentUniversityExists = await StudentUniversity.exists({ _id: studentUniversity });
    if (!studentUniversityExists) {
      return res.status(404).json({ message: 'Student-university association not found' });
    }

    // Check if the bank exists
    const bankExists = await Bank.exists({ _id: bank });
    if (!bankExists) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    // Check if the association already exists
    const associationExists = await StudentUniversityBank.exists({ studentUniversity: studentUniversity, bank: bank });
    if (associationExists) {
      return res.status(400).json({ message: 'This student-university-bank relationship already exists' });
    }

    const newAssociation = new StudentUniversityBank({ studentUniversity: studentUniversity, bank: bank, loanAmount: loanAmount, status: status });
    const savedAssociation = await newAssociation.save();
    res.status(201).json(savedAssociation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a student-university-bank association
router.put('/:id', async (req, res) => {
  const { studentUniversity, bank, loanAmount, status } = req.body;

  try {
    const association = await StudentUniversityBank.findById(req.params.id);
    if (!association) return res.status(404).json({ message: 'Association not found' });

    // Use original values if not provided
    const updatedStudentUniversity = studentUniversity || association.studentUniversity;
    const updatedBank = bank || association.bank;

    // Check if the student-university association exists
    const studentUniversityExists = await StudentUniversity.exists({ _id: updatedStudentUniversity });
    if (!studentUniversityExists) {
      return res.status(404).json({ message: 'Student-university association not found' });
    }

    // Check if the bank exists
    const bankExists = await Bank.exists({ _id: updatedBank });
    if (!bankExists) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    // Check if the association already exists, excluding the current one
    const associationExists = await StudentUniversityBank.exists({
      _id: { $ne: req.params.id },
      studentUniversity: updatedStudentUniversity,
      bank: updatedBank
    });
    if (associationExists) {
      return res.status(400).json({ message: 'This student-university-bank relationship already exists' });
    }

    association.studentUniversity = updatedStudentUniversity;
    association.bank = updatedBank;
    association.loanAmount = loanAmount !== undefined ? loanAmount : association.loanAmount;
    association.status = status !== undefined ? status : association.status;
    const updatedAssociation = await association.save();
    res.json(updatedAssociation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student-university-bank association
router.delete('/:id', async (req, res) => {
  try {
    const association = await StudentUniversityBank.findByIdAndDelete(req.params.id);
    if (!association) return res.status(404).json({ message: 'Association not found' });

    res.json({ message: 'Association deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
