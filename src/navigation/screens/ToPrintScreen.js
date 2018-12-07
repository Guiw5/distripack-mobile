import React from 'react'
import ToPrintContainer from '../../containers/ToPrintContainer'

export default class ToPrintScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <ToPrintContainer navigation={this.props.navigation} />
  }
}
