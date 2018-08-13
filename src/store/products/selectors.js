import createSelector from 'reselect'

export const getProducts = state => state.products.data

export const getProduct = (state, props) =>
  state.products.find(p => p.id === props.idProduct)

// export const getAllSkus = createSelector(getProducts, products =>
//   products.reduce((skus, prod) => skus.concat(prod.skus), [])
// )

// export const getSkus = createSelector(getProducts, products =>
//   products.reduce((skus, prod) => skus.concat(prod.skus), [])
// )

// export const getFullProducts = createSelector(
//   getProducts,
//   getSkus,
//   (products, skus) => products.map(p => p.skus.map(s => skus[s]))
// )
