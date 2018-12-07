import React from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import SearchList from './ListView'
import ButtonFooter from './ButtonFooter'

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

  filterData = () => this.props.data.filter(this.filterCriteria)

  render() {
    return (
      <View style={styles.searchContent}>
        <SearchBar
          autoFocus={this.props.autoFocus}
          inputStyle={styles.searchBarInput}
          placeholder={this.props.placeholder}
          onChangeText={this.onChangeText}
          value={this.state.query}
        />
        <SearchList
          onRefresh={this.props.onRefresh}
          refreshing={this.props.refreshing}
          ListHeaderComponent={this.props.headerComponent}
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}
          data={this.filterData()}
        />
        {this.props.button ? <ButtonFooter {...this.props.button} /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBarInput: {
    fontSize: 14
  },
  searchContent: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#FFF'
  }
})
