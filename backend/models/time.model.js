import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
   },
   time: {
      type: Number,
      required: [true, 'Time is required']
   },
   investedIn: {
      type: String,
      required: [true, 'Invested in is required']
   },
   otherCategory: {
      type: String
   },
   activityDate: {
      type: String,
      required: [true, 'Activity date is required']
   }
}, {timestamps: true});

const Time = mongoose.model('Time',timeSchema);

export default Time;