const { mongoose } = require('../config/connectDb.js');


const postSchemma = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'a post must have a title'],
  },
  description: {
    type: String,
    required: [true, 'a post must have a description'],
  }
}, { timestamps: true });

exports.Post = mongoose.model('Post', postSchemma);
