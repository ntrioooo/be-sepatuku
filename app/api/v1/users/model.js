const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { model, Schema } = mongoose;

let userSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name harus diisi'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name harus diisi'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email harus diisi'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password harus diisi'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

module.exports = model('User', userSchema);
