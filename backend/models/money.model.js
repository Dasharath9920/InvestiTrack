import mongoose from 'mongoose';

const amountSchema = new mongoose.Schema({
   amount: {
      type: Number,
      required: [true, 'Amount is required']
   },
   spentOn: {
      type: String,
      required: [true, 'Spent on is required']
   }
}, {timestamps: true});

const Amount = mongoose.model('Amount', amountSchema);

export default Amount;