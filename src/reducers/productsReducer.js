import { tassign } from 'tassign'
import Products from '../data/test-products.json'
import ProductsDB from '../data/productsDB.json'

const mappedProducts = []
const products = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return mappedProducts.length > 0 ? mappedProducts : MemoryMapProducts()
    case 'FETCH_SKUS':
      return MemoryMapSkus()
    case 'FETCH_SKUS_BY_PRODUCT':
      return MemoryMapSkus()
    default:
      return state
  }
}
export default products

const getCode = text => {
  let words = text.split(' ')
  let code = words.length == 1 ? text : words.map(x => x[0]).join()
  return code.substring(0, 3)
}
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
        sku.code = `${getCode(mapped.name) + skuId}`
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
