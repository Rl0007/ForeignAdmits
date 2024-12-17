import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

});

// Middleware to handle cascade delete

studentSchema.pre('findOneAndDelete', async function(next) {
  const studentId = this.getQuery()._id;

  // Find student-university relationships
  const studentUniversities = await mongoose.model('StudentUniversity').find({ student: studentId });
  const studentUniversityIds = studentUniversities.map(su => su._id);

  // Delete student-university-bank relationships
  await mongoose.model('StudentUniversityBank').deleteMany({ studentUniversity: { $in: studentUniversityIds } });

  // Now delete student-university relationships
  await mongoose.model('StudentUniversity').deleteMany({ student: studentId });

  next();
});


export default mongoose.model('Student', studentSchema);
