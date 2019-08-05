import { createSelector } from 'reselect'

export const getProductsLoading = state => state.products.loading

export const getProducts = state => state.products.data

export const getProductId = (_, productId) => productId

export const getSkuId = (_, skuId) => skuId

export const getProduct = createSelector(
  getProducts,
  getProductId,
  (products, productId) => products.find(p => p.id === productId)
)

export const getSkus = createSelector(
  getProducts,
  products => products.reduce((skus, prod) => skus.concat(prod.skus), [])
)

export const getSkusByProduct = createSelector(
  getProduct,
  product => product.skus
)

export const getSkusMap = createSelector(
  getSkus,
  skus =>
    skus.reduce((dict, sku) => {
      dict[sku.id] = sku
      return dict
    }, {})
)

export const getSku = createSelector(
  getSkusMap,
  getSkuId,
  (skus, skuId) => skus[skuId]
)
