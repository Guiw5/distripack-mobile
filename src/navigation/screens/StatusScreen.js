import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Notification from '../../components/Notification'
import selectors from '../../store/selectors'
import actions from '../../store/actions'
import { Text } from 'react-native-elements'

class StatusScreen extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.status.length === 0)
      return (
        <View style={styles.notificationList}>
          <Text>No tiene notificaciones recientes</Text>
        </View>
      )

    return (
      <View style={styles.notificationList}>
        {this.props.status.map(item => {
          return (
            <Notification
              key={item.key}
              msg={item.msg}
              onPress={() => this.props.clearStatus(item.key)}
            />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  notificationList: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

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
