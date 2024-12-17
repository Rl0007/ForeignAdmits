import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import universityRoutes from './routes/universities.js';
import bankRoutes from './routes/banks.js';
import studentRoutes from './routes/student.js';
import studentUniversityRoutes from './routes/student_university.js'
import studentUniversityBankRoutes from './routes/student_university_bank.js';
dotenv.config();

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
});

// Check connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});



app.use('/universities', universityRoutes);
app.use('/banks', bankRoutes);
app.use('/students', studentRoutes);
app.use('/student-universities', studentUniversityRoutes);
app.use('/student-university-banks', studentUniversityBankRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
