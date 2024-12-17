
import mongoose from 'mongoose';

const studentUniversityBankSchema = new mongoose.Schema({
    studentUniversity: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentUniversity', required: true },
    bank: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true },
    loanAmount: { type: Number }, // Optional: Track loan amounts per bank
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Optional
  
  },
  { timestamps: true }
);

export default mongoose.model('StudentUniversityBank', studentUniversityBankSchema);
