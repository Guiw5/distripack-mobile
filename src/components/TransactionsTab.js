import React, { PureComponent } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { Text } from 'react-native-elements'
import {
  TransactionsHeader,
  TransactionsRows,
  TransactionsFooter
} from './TransactionsRows'
import moment from 'moment'

export class TransactionsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { account, getAccount, getTransactions } = this.props
    if (!account) getAccount()
    getTransactions()
  }

  onTransactionPress = async t => {
    const { loadOrder, navigation } = this.props
    await loadOrder(t.orderId)
    navigation.navigate('Order')
  }

  render() {
    const { account, transactions, loading, getTransactions } = this.props
    return (
      <ScrollView
        style={{ paddingHorizontal: 5 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTransactions} />
        }
      >
        <AccountBalance {...account} />
        <TransactionsHeader
          col1={'Fecha'}
          col2={'Operación'}
          col3={'Débito'}
          col4={'Crédito'}
          col5={'Saldo'}
        />
        <TransactionsRows
          transactions={transactions}
          onPress={this.onTransactionPress}
        />
        <TransactionsFooter
          label={`Saldo Actual: $ ${account.currentBalance}`}
        />
      </ScrollView>
    )
  }
}

export const AccountBalance = ({
  currentBalance,
  initialAmount,
  updatedAt,
  createdAt
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 350
        }}
      >
        <Text>{`Saldo Actual: `}</Text>
        <Text>{`$${currentBalance.toFixed(2)}`}</Text>
        <Text>{`Monto Inicial: `}</Text>
        <Text>{`$${initialAmount.toFixed(2)}`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 350
        }}
      >
        <Text>{`Fecha de Inicio: `}</Text>
        <Text>{`${moment(createdAt).format('DD/MM/YY')}`}</Text>
        <Text>{`Ultima Op: `}</Text>
        <Text>{`${moment(updatedAt).format('DD/MM HH:mm')}hs`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 250
        }}
      ></View>
    </View>
  )
}
