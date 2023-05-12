const { Router } = require('express')
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  apiProduct,
  changeImage
} = require('../controllers/product.controllers')

const router = Router()

router.patch('/change-image/:id', changeImage)
router.post('/', addProduct)
router.get('/fetch/:code', apiProduct)
router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
