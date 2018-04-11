const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

const NewContact = mongoose.model("NewContact", contactSchema);

module.exports = NewContact;
