import React from 'react'
import SelectClientContainer from '../../containers/SelectClientContainer'

export default class ClientsScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <SelectClientContainer navigation={this.props.navigation} />
  }
}
