import { http } from '../../http/client'

export const getProducts = () => ({
  type: 'FETCH_PRODUCTS'
})

export const getSkus = () => ({
  type: 'FETCH_SKUS'
})

export const fetchProducts = () => ({
  type: 'FETCH_PRODUCTS_REQUEST',
  payload: true
})

export const fetchProductsSuccess = data => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  data
})

export const fetchProductsError = data => ({
  type: 'FETCH_PRODUCTS_ERROR',
  data
})

export const setSearchText = text => ({
  type: 'SET_SEARCH_TEXT',
  text
})

export const fetchNewPage = () => ({
  type: 'FETCH_NEW_PAGE'
})

export const loadProducts = () => async dispatch => {
  try {
    dispatch(fetchProducts())
    let { data } = await http.get('/products')
    dispatch(fetchProductsSuccess(data))
  } catch (error) {
    dispatch(fetchProductsError(error))
  }
}

export const filterProducts = text => async dispatch => {
  dispatch(setSearchText(text))
  dispatch(fetchNewPage())
}
