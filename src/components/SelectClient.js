import React from 'react'
import { ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { setClient, getClients } from '../actions/index'
import Select from './Select'

class SelectClient extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.clients.length === 0) this.props.getClients()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.name.toLowerCase().includes(text.toLowerCase())

  onPress = client => {
    this.props.setClient(client.mail)
    this.props.navigation.navigate('Products')
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.onPress(item)}
    />
  )

  render() {
    return (
      this.props.clients.length > 0 && (
        <Select
          keyExtractor={item => item.mail}
          placeholder="Escriba nombre, alias o mail del cliente"
          filter={this.filter}
          data={this.props.clients}
          renderItem={this.renderItem}
          button={{ title: 'Agregar Cliente' }}
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return { clients: state.clients }
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: id => {
      dispatch(setClient(id))
    },
    getClients: () => {
      dispatch(getClients())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectClient)

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 14
  }
})
