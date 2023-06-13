const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db,
//        { useNewUrlParser: true, 
//         useUnifiedTopology: false,
//         useCreateIndex:true});
//     console.log('MongoDB connected...');
//   } catch (err) {
//     console.log(err.message);
//     process.exit(1);
//   }
// };

const DB = "mongodb+srv://ignacio:spain@atlascluster.cdc0jte.mongodb.net/test?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB;
