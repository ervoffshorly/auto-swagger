const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./src/routes/auth.routes')
const productRoutes = require('./src/routes/product.routes')
const orderRoutes = require('./src/routes/order.routes')

const main = async () => {
  const app = express()

  app.use(
    cors({
      origin: true,
      credentials: true
    })
  )
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))

  // MongoDB Connection
  await mongoose.connect('mongoDB conntection string')
  console.log('MongoDB Connected')

  app.use('/api/auth', authRoutes)
  app.use('/api/product', productRoutes)
  app.use('/api/order', orderRoutes)

  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

main()
