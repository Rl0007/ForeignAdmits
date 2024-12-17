import mongoose from 'mongoose';

const studentUniversitySchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  },
  { timestamps: true }
);

// Middleware to handle cascade delete for student-university-bank relationships
studentUniversitySchema.pre('findOneAndDelete', async function(next) {
  const studentUniversityId = this.getQuery()._id;
  await mongoose.model('StudentUniversityBank').deleteMany({ studentUniversity: studentUniversityId });
  next();
});

export default mongoose.model('StudentUniversity', studentUniversitySchema);
