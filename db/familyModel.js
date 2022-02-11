const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name'],
  },
  age: {
    type: String,
    required: [true, 'Set age'],
  },
  parents: {
    type: String,
  },
  owner: {
    type: String,
  }
})
const Tree = mongoose.model('tree', familySchema)
module.exports = { Tree }
