const { model, Schema } = require('mongoose')

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    barcode: {
      type: String,
      required: true
    },
    price: {
      type: String,
      default: 0
    },
    quantity: {
      type: Number,
      default: 1
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/100'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = model('Product', productSchema)
