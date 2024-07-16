const mongoose = require('mongoose');

const { model, Schema } = mongoose;

let merkSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Panjang nama merk minimal 3 karakter'],
      maxlength: [20, 'Panjang nama merk maksimal 20 karakter'],
      required: [true, 'Nama merk harus diisi'],
    },
    // merk: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Merk',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Merk', merkSchema);
