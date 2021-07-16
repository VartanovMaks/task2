const { Schema, model } = require('mongoose');
const { dataBaseTablesEnum } = require('../constants');

const tokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTablesEnum.USER
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

tokenSchema.pre('find', function() {
  this.populate('user');
});

tokenSchema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(dataBaseTablesEnum.TOKEN, tokenSchema);

// module.exports = model('TokenBase', tokenSchema);
