const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    chars: { type: Array },
    isAuth: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('Users', userSchema);
module.exports = User;