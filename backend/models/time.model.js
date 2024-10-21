import mongoose from 'mongoose';

const timeSchema = new mongoose.Schema({
   time: {
      type: String,
      required: [true, 'Time is required']
   },
   investedIn: {
      type: String,
      required: [true, 'Invested in is required']
   }
}, {timestamps: true});

const Time = mongoose.model('Time',timeSchema);

export default Time;