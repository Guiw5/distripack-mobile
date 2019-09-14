import React from 'react'
import { SearchBar, Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { ListView as SearchList } from './ListView'
import ButtonFooter from './ButtonFooter'
import { myColors } from '../lib/commons'

export default class Select extends React.Component {
  constructor(props) {
    super(props)

    this.filterCriteria = this.props.filter('')
    this.state = {
      query: ''
    }
  }

  onChangeText = query => {
    this.filterCriteria = this.props.filter(query)
    this.setState({ query: query || '' })
  }

  filterData = () => this.props.data.filter(this.filterCriteria).slice(0, 50)

  render() {
    return (
      <View style={styles.searchContent}>
        <SearchBar
          autoCompleteType="off"
          autoFocus={this.props.autoFocus}
          inputStyle={styles.searchBarInput}
          placeholder={this.props.placeholder}
          onChangeText={this.onChangeText}
          value={this.state.query}
        />
        {this.props.data && (
          <SearchList
            onRefresh={this.props.onRefresh}
            refreshing={this.props.refreshing}
            ListHeaderComponent={this.props.headerComponent}
            keyExtractor={this.props.keyExtractor}
            renderItem={this.props.renderItem}
            data={this.filterData()}
            ListFooterComponent={<FooterList />}
          />
        )}
        {this.props.button && <ButtonFooter {...this.props.button} />}
      </View>
    )
  }
}

export const FooterList = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}> ----o---- </Text>
  </View>
)

const styles = StyleSheet.create({
  searchBarInput: {
    fontSize: 14
  },
  searchContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  footer: {
    width: '100%',
    height: 60
  },
  footerText: {
    textAlign: 'center',
    color: myColors.grey4,
    fontSize: 18,
    padding: 7
  }
})
