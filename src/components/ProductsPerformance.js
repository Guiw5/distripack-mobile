import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'

import React, { PureComponent } from 'react'
import { Keyboard, View, FlatList, StyleSheet } from 'react-native'
import { ListItem, SearchBar, Text } from 'react-native-elements'
import ButtonFooter from './ButtonFooter'
import { myColors } from '../lib/commons'
import { RightPriceIcon } from './RightPriceIcon'
import { pageSize } from '../store/products/selectors'
import { FooterList } from './Select'

const mapStateToProps = state => ({
  // data: selectors.getFilteredProducts(state),
  paginated: selectors.getPaginatedProducts(state),
  totalProducts: selectors.getProductsTotal(state),
  totalFiltered: selectors.getTotalFiltered(state),
  page: selectors.getPageNr(state),
  searchText: selectors.getSearchText(state),
  orderItems: selectors.getOrderItems(state),
  loading: selectors.getProductsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(actions.loadProducts()),
  filterProducts: text => dispatch(actions.filterProducts(text)),
  fetchNewPage: () => dispatch(actions.fetchNewPage())
})

class ProductsPerformance extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.paginated.length === 0) this.props.fetchNewPage()
  }

  goToDetails = ({ id, price }) => () => {
    Keyboard.dismiss()
    const item = { skuId: id, price, quantity: 1 }
    this.props.navigation.navigate('Details', { item })
  }

  fetchNewPage = () => {
    this.props.fetchNewPage()
  }

  renderSection = ({ item }) => (
    <View>
      {this.renderProduct(item)}
      {item.skus.map(this.renderSku)}
    </View>
  )

  renderSku = ({ id, nick, price }) => (
    <ListItem
      key={id}
      title={nick}
      rightElement={<RightPriceIcon price={price} />}
      containerStyle={{ paddingVertical: 10 }}
      onPress={this.goToDetails({ id, price })}
      bottomDivider
    />
  )

  renderProduct = ({ name }) => (
    <ListItem
      title={name.toUpperCase()}
      titleStyle={{ textAlign: 'center', color: myColors.primary }}
      containerStyle={styles.containerSectionTitle}
      contentContainerStyle={{ marginLeft: 0 }}
      bottomDivider
    />
  )

  onChangeText = text => {
    this.props.filterProducts(text)
    this.flatList.scrollToOffset({ animated: true, offset: 0 })
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  onRefresh = () => {
    this.props.fetchNewPage()
  }

  render() {
    const {
      orderItems,
      navigation,
      paginated,
      totalProducts,
      totalFiltered,
      searchText,
      page
    } = this.props
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          autoCompleteType="off"
          inputStyle={{ fontSize: 14 }}
          placeholder={`Ingrese nombre o alias del producto`}
          onChangeText={this.onChangeText}
          value={searchText}
        />
        {paginated && (
          <FlatList
            ref={ref => (this.flatList = ref)}
            keyboardShouldPersistTaps={'handled'}
            keyExtractor={item => `${item.id}`}
            data={paginated}
            // legacyImplementation={true}
            renderItem={this.renderSection}
            initialNumToRender={8}
            onEndReachedThreshold={200}
            onEndReached={this.fetchNewPage}
            refreshing={this.props.loading}
            onRefresh={this.onRefresh}
            // windowSize={91}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={5}
            ListHeaderComponent={
              <HeaderList
                totalFiltered={totalFiltered}
                totalProducts={totalProducts}
                page={page}
                size={pageSize}
              />
            }
            ListFooterComponent={<FooterList />}
            stickyHeaderIndices={[0]}
          />
        )}
        <ButtonFooter
          title={`${navigation.getParam('client')} (${orderItems.length})`}
          onPress={this.goToOrder}
          disabled={orderItems.length == 0}
        />
      </View>
    )
  }
}

export const HeaderList = ({ totalProducts, totalFiltered, page, size }) => (
  <View style={styles.headerList}>
    <Text
      style={{
        color: myColors.grey5,
        fontWeight: '600',
        fontFamily: 'sans-serif-light'
      }}
    >{`Cant total: ${totalProducts}`}</Text>
    <Text
      style={{
        color: myColors.grey5,
        fontWeight: '600',
        fontFamily: 'sans-serif-light'
      }}
    >{`En pantalla: ${
      totalFiltered === 0
        ? 0
        : page * size > totalFiltered
        ? totalFiltered
        : page * size
    }/${totalFiltered} `}</Text>
  </View>
)

const styles = StyleSheet.create({
  containerSectionTitle: {
    paddingVertical: 5,
    paddingHorizontal: 1,
    backgroundColor: myColors.primaryBg
  },
  headerList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 25,
    backgroundColor: myColors.grey0
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPerformance)
