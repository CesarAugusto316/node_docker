const { mongoose } = require('../config/connectDb.js');


const userSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
  }
}, { timestamps: true });

exports.User = mongoose.model('User', userSchemma);
