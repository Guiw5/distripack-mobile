import createReducer from '../createReducer'
import { getFilteredProducts } from './selectors'

const pageSize = 20

const initialState = {
  data: [],
  paginated: [],
  loading: false,
  error: null,
  searchText: null,
  page: 0,
  total: 0
}

const fetchProductsRequest = (state, action) => ({
  ...state,
  loading: true
})

const fetchProductsSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchProductsError = (state, action) => ({
  ...state,
  error: action.data,
  loading: false
})

const setSearchText = (state, action) => ({
  ...state,
  searchText: action.text,
  paginated: [],
  page: 0,
  loading: true
})

const fetchNewPage = (state, action) => {
  const filtered = getFilteredProducts({ products: state })
  if (state.page * pageSize > filtered.length) {
    return { ...state, loading: false }
  }

  return {
    ...state,
    page: state.page + 1,
    total: filtered.length,
    loading: false
  }
}

const products = createReducer((state = initialState), {
  ['FETCH_PRODUCTS_REQUEST']: fetchProductsRequest,
  ['FETCH_PRODUCTS_SUCCESS']: fetchProductsSuccess,
  ['FETCH_PRODUCTS_ERROR']: fetchProductsError,
  ['SET_SEARCH_TEXT']: setSearchText,
  ['FETCH_NEW_PAGE']: fetchNewPage
})

export default products
