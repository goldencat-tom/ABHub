import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from 'routes/validate'
import auth from 'routes/auth'
import * as productService from 'services/product.service'
import * as serverService from 'services/server.service'

const router = Router()

router.get('/', auth.required, productService.getProducts)

router.post(
  '/store',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  productService.storeProduct
)

router.put(
  '/:id',
  auth.required,
  body('name').notEmpty(),
  body('code').notEmpty(),
  validate,
  productService.updateProduct
)

router.delete('/:id', auth.required, productService.deleteProduct)

router.get('/:id/servers', auth.required, serverService.getServers)

export default router