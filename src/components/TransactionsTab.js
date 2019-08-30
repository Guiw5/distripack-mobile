import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import {
  TransactionsHeader,
  TransactionsRows,
  TransactionsFooter
} from './TransactionsRows'

export class TransactionsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { getAccount, getTransactions } = this.props.screenProps
    getAccount()
    getTransactions()
  }

  render() {
    const { account, transactions, loading } = this.props.screenProps
    if (loading || !account) return null
    return (
      <ScrollView style={{ paddingHorizontal: 5 }}>
        <TransactionsHeader
          col1={'Fecha'}
          col2={'Operación'}
          col3={'Débito'}
          col4={'Crédito'}
          col5={'Saldo'}
        />
        <TransactionsRows transactions={transactions} />
        <TransactionsFooter
          label={`Saldo Actual: $ ${account.currentBalance}`}
        />
      </ScrollView>
    )
  }
}
