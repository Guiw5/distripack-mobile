import React from 'react'
import { ListItem } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Select from './Select'
import selectors from '../store/selectors'

class SelectClient extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadClients()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.name.toLowerCase().includes(text.toLowerCase())

  onPress = client => {
    this.props.setClient(client)
    this.props.navigation.navigate('Products')
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.onPress(item)}
    />
  )

  goToClient = () => this.props.navigation.navigate('Client')

  render() {
    return (
      <Select
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        data={this.props.clients}
        renderItem={this.renderItem}
        button={{ title: 'Agregar Cliente', onPress: this.goToClient }}
      />
    )
  }
}

const mapStateToProps = state => {
  return { clients: selectors.getClients(state) }
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: id => {
      dispatch(actions.setClient(id))
    },
    loadClients: () => {
      dispatch(actions.loadClients())
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
