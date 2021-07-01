const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number,
    default: 21,
    min: 21
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(userRolesEnum),
    default: userRolesEnum.USER
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('User', userSchema);
