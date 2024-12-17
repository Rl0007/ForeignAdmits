import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

// Middleware to handle cascade delete for student-university-bank relationships
bankSchema.pre('findOneAndDelete', async function(next) {
  const bankId = this.getQuery()._id;
  await mongoose.model('StudentUniversityBank').deleteMany({ bank: bankId });
  next();
});

export default mongoose.model('Bank', bankSchema);
