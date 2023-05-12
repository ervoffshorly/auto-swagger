const Order = require('../models/order.model')
const Product = require('../models/product.model')

module.exports.getAllOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })

  return res.json(orders)
}

module.exports.addOrder = async (req, res) => {
  const order = new Order({ ...req.body })

  // Deduct amount from quantity
  for (let i = 0; i < order.products.length; i++) {
    const product = order.products[i]

    const dbProduct = await Product.findOne({ _id: product.productId })

    const updateProduct = await Product.findOneAndUpdate(
      { _id: product.productId },
      { quantity: dbProduct.quantity - product.amount }
    )

    await updateProduct.save()
  }

  await order.save()

  return res.status(200).json(order)
}
