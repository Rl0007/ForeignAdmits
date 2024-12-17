import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

universitySchema.pre('findOneAndDelete', async function (next) {
  const universityId = this.getQuery()._id;

  try {
    // Find all StudentUniversity entries related to the university
    const studentUniversityDocs = await mongoose
      .model('StudentUniversity')
      .find({ university: universityId });

    // Extract StudentUniversity IDs
    const studentUniversityIds = studentUniversityDocs.map((doc) => doc._id);

    //  Delete related StudentUniversityBank entries
    await mongoose
      .model('StudentUniversityBank')
      .deleteMany({ studentUniversity: { $in: studentUniversityIds } });

    // Delete StudentUniversity entries
    await mongoose
      .model('StudentUniversity')
      .deleteMany({ university: universityId });

    next();
  } catch (error) {
    next(error);
  }
});



export default mongoose.model('University', universitySchema);
