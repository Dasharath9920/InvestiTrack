import mongoose from "mongoose";

export const connectToDb = async () => {
   try {
      const connection = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log(`Connected to MongoDB: ${connection.connection.host}`);
   } catch(err) {
      console.log('error connecting to MongoDB', err);
   }
}

process.on('SIGINT', async() => {
   await mongoose.connection.close();
   console.log('Disconnected from MongoDB');
   process.exit(0);
})