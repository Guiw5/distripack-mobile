import moment from 'moment'
import { myColors } from '../lib/commons'

const DeliveredNote = props => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: myColors.danger }}>
      {`Pedido entregado el día ${moment(props.deliveredAt)
        .format('dddd, DD/MM HH:mm')
        .toUpperCase()}hs`}
    </Text>
  </View>
)

export default DeliveredNote
