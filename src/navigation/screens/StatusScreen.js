import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import Notification from '../../components/Notification'
import selectors from '../../store/selectors'
import actions from '../../store/actions'

class StatusScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.props.status.map(status => (
          <Notification
            key={status.key}
            id={status.key}
            msg={status.msg}
            onPress={() => this.props.clearStatus(status.key)}
          />
        ))}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: selectors.getPrinterStatus(state)
})

const mapDispatchToProps = dispatch => ({
  clearStatus: key => dispatch(actions.clearStatus(key))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusScreen)
