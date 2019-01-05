import createReducer from '../createReducer'

const initialState = {
  data: [],
  loading: false,
  error: null
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

const fetchSkus = (state, action) => MemoryMapSkus()

const fetchSkusByProducts = (state, action) => MemoryMapSkus()

const products = createReducer((state = initialState), {
  ['FETCH_PRODUCTS_REQUEST']: fetchProductsRequest,
  ['FETCH_PRODUCTS_SUCCESS']: fetchProductsSuccess,
  ['FETCH_PRODUCTS_ERROR']: fetchProductsError,
  ['FETCH_SKUS']: fetchSkus,
  ['FETCH_SKUS_BY_PRODUCT']: fetchSkusByProducts
})
export default products

const mappedProducts = []
const MemoryMapProducts = () => {
  let id = 1
  let skuId = 1001
  let last = ''

  ProductsDB.forEach(prod => {
    let mapped = {}
    mapped.name = prod.Nombre
    mapped.nick = prod.Alias
    mapped.id = id
    if (prod.Nombre !== last) {
      mapped.skus = []
      last = prod.Nombre
      let skus = ProductsDB.filter(x => x.Nombre === mapped.name)
      skuId = 1
      skus.forEach(skuProd => {
        let sku = {}
        sku.code = `${id}` + `${skuId}`
        skuId++
        sku.nick = skuProd['Alias SKU']
        sku.description = skuProd['Descripcion']
        sku.quantity = parseFloat(skuProd.Cantidad)
        sku.color = skuProd.color
        sku.brand = skuProd.marca
        sku.price = parseFloat(skuProd.precio)
        mapped.skus.push(sku)
      })
      mappedProducts.push(mapped)
      id++
    }
  })

  return mappedProducts
}

const MemoryMapSkus = () => {
  let last = ''
  let mappedProducts = []
  let id = 1
  let sku = 1001
  ProductsDB.forEach(prod => {
    let mapped = {}
    mapped.id = id
    mapped.name = prod.Nombre
    mapped.nick = prod.Alias
    last = prod.Alias
    if (prod.Alias === last) {
      mapped.sku = sku++
      mapped.skuNick = prod['Alias SKU']
      mapped.description = prod['Descripcion']
      mapped.quantity = parseFloat(prod.Cantidad)
      mapped.color = prod.color
      mapped.brand = prod.marca
      mapped.price = parseFloat(prod.precio)
      mappedProducts.push(mapped)
    } else {
      mapped.id = id++
    }
  })

  return mappedProducts
}

const getCode = text => {
  let words = text
    .replace('/', ' ')
    .replace(/\d+x\d+/i, 'X')
    .replace(/\d+cm/i, '')
    .replace(/\d+cc/i, '')
    .replace(/\d+kg/i, '')
    .replace(/\d+u/i, '')
    .split(' ')
  words = words.filter(
    w =>
      isNaN(w) &&
      ![
        'a',
        'al',
        'de',
        'del',
        'en',
        'con',
        'para',
        'chico',
        'grande'
      ].includes(w.toLowerCase())
  )
  let code = words.length == 1 ? words[0] : words.map(x => x[0]).join('')
  console.log(text, words, code)
  return code.substring(0, 3)
}
