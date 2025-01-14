const mongoose = require('mongoose')

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected...')
  } catch (err) {
    console.log(err)
  }
}
