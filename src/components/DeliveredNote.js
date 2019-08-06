import React from 'react'
import moment from 'moment'
import { myColors } from '../lib/commons'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

const DeliveredNote = deliveredAt => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: myColors.danger }}>
      {`Pedido entregado el día ${moment(deliveredAt)
        .format('dddd, DD/MM HH:mm')
        .toUpperCase()}hs`}
    </Text>
  </View>
)

export default DeliveredNote
