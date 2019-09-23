import { createSelector } from 'reselect'

export const pageSize = 20

export const getProductId = (_, productId) => productId

export const getSkuId = (_, skuId) => skuId

export const getProductsLoading = state => state.products.loading

export const getProducts = state => state.products.data

export const getProductsTotal = state => state.products.data.length

export const getSearchText = state => state.products.searchText

export const getPageNr = state => state.products.page

export const getTotalFiltered = state => state.products.total

export const getPaginated = state => state.products.paginated

export const filterBySearchText = (products, searchText) =>
  products.filter(item => {
    const desc = item.skus[0].description.toLowerCase()
    const nick = item.skus[0].nick.replace('/', ' ').toLowerCase()
    const query = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const searchWords = query.split(' ')

    return (
      desc.contains(query) ||
      nick.contains(query) ||
      searchWords.every(word => desc.contains(word) || nick.contains(word))
    )
  })

export const getFilteredProducts = createSelector(
  getProducts,
  getSearchText,
  (products, searchText) => {
    if (!searchText || searchText.length < 2) return products
    searchText = searchText.replace('/', ' ').toLowerCase()
    return filterBySearchText(products, searchText)
  }
)

export const getPage = (list, number) =>
  list.slice((number - 1) * pageSize, number * pageSize)

export const getPageProducts = createSelector(
  getFilteredProducts,
  getPageNr,
  (filtered, page) => getPage(filtered, page)
)

/** This product list should be mutable to handle the silent load in flatlist */
export const getPaginatedProducts = createSelector(
  getPaginated,
  getPageProducts,
  (products, newItems) => {
    newItems.forEach(newItem => products.push(newItem))
    return products
  }
)

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
