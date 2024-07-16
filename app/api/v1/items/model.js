const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  color: {
    type: String,
    required: [true, 'Warna harus diisi'],
  },
  size: {
    type: String,
    required: [true, 'Ukuran harus diisi'],
  },
  quantity: {
    type: Number,
    required: [true, 'Jumlah stok harus diisi'],
    default: 0,
  },
});

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama item harus diisi'],
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: [stockSchema],
    merk: {
      type: Schema.Types.ObjectId,
      ref: 'Merk',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
