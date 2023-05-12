const { model, Schema } = require('mongoose')

const orderSchema = new Schema(
  {
    products: [
      {
        productId: { type: String },
        name: { type: String },
        barcode: { type: String },
        price: { type: Number },
        amount: { type: Number },
        image: { type: String, default: 'https://via.placeholder.com/100' }
      }
    ],
    paymentAmount: { type: Number },
    subTotal: { type: Number },
    total: { type: Number }
  },
  {
    timestamps: true
  }
)

module.exports = model('Order', orderSchema)
