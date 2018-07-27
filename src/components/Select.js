import React from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import SearchList from './ListView'
import ButtonFooter from './ButtonFooter'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  onChangeText = query => {
    this.setState({ query: query || '' })
  }

  getData = () => {
    let { filter } = this.props
    return filter(this.state.query)
  }

  render() {
    return (
      <View style={styles.searchContent}>
        <SearchBar
          autoFocus
          inputStyle={styles.searchBarInput}
          placeholder={this.props.placeholder}
          onChangeText={this.onChangeText}
          value={this.state.query}
        />
        <SearchList
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}
          data={this.getData()}
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
