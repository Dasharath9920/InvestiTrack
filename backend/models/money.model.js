import mongoose from 'mongoose';

const amountSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
   },
   amount: {
      type: Number,
      required: [true, 'Amount is required']
   },
   spentOn: {
      type: String,
      required: [true, 'Spent on is required']
   },
   otherCategory: {
      type: String
   },
   expenditureDate: {
      type: String,
      required: [true, 'Expenditure date is required']
   }
}, {timestamps: true});

const Amount = mongoose.model('Amount', amountSchema);

export default Amount;