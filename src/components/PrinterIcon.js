import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon, Text } from 'react-native-elements'

import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'

const Circle = ({ text }) => {
  return text > 0 ? (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#eb3f3f',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 20,
        width: 20,
        right: 4,
        top: -6
      }}
    >
      <Text style={{ fontSize: 14, color: '#fff' }}>{text}</Text>
    </View>
  ) : null
}

class PrinterIcon extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.checkPrinterStatus()
  }

  onPress = () => {
    this.props.navigation.navigate('Status')
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}>
        <TouchableOpacity
          onPress={this.onPress}
          style={{ paddingVertical: 20, paddingHorizontal: 10 }}
        >
          <View>
            <Icon name="print" containerStyle={{ paddingHorizontal: 15 }} />
            <Circle text={this.props.total} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  total: selectors.getPrinterStatus(state).length
})
const mapDispatchToProps = dispatch => ({
  checkPrinterStatus: () => dispatch(actions.checkPrinterStatus())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrinterIcon)
