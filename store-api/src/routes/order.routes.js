const { Router } = require('express')
const { getAllOrders, addOrder } = require('../controllers/order.controllers')

const router = Router()

router.get('/', getAllOrders)
router.post('/', addOrder)

module.exports = router
