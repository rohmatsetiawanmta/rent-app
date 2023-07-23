const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let typeSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Kategori minimal terdiri dari 3 karakter'],
      maxlength: [20, 'Kategori maksimal terdiri dari 20 karakter'],
      required: [true, 'Kategori harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Type', typeSchema);
