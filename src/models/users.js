const mongoose = require("mongoose");
const validator = require("validator");

//user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Email already exist"],
    validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
  },
});

//creating new collection
const Users = new mongoose.model('User', userSchema);

//exporting
module.exports = Users;