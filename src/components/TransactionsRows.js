import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { myColors } from '../lib/commons'
import moment from 'moment'

export const TransactionsHeader = ({ col1, col2, col3, col4, col5 }) => (
  <View
    style={[
      styles.row,
      {
        height: 40,
        borderTopColor: myColors.primary,
        borderBottomColor: myColors.primary,
        borderTopWidth: 1,
        borderBottomWidth: 1
      }
    ]}
  >
    <Text style={{ color: myColors.primary }}>{col1}</Text>
    <Text style={{ color: myColors.primary }}>{col2}</Text>
    <Text style={styles.headerColumn}>{col3}</Text>
    <Text style={styles.headerColumn}>{col4}</Text>
    <Text style={styles.headerColumn}>{col5}</Text>
  </View>
)

const getProps = t =>
  t.type === 'Payment'
    ? {
        date: t.paymentAt,
        operation: 'Pago',
        debited: null,
        credited: t.amount,
        currentBalance: t.currentBalance
      }
    : {
        date: t.createdAt,
        operation: t.amount > 0 ? 'Remito' : 'NC',
        debited: t.amount > 0 ? t.amount : null,
        credited: t.amount < 0 ? t.amount : null,
        currentBalance: t.currentBalance
      }

/**
 * returns a list of <TransactionRow />
 * @param {transactions} param0
 */
export const TransactionsRows = ({ transactions, onPress }) => {
  return transactions.map(t => (
    <TransactionRow key={t.id} {...getProps(t)} onPress={() => onPress(t)} />
  ))
}

export const TransactionRow = ({
  onPress,
  date,
  operation,
  debited,
  credited,
  currentBalance
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text style={{ fontSize: 12, width: 40 }}>
          {moment(date).format('DD-MMM')}
        </Text>
        <Text style={{ fontWeight: '600' }}>{operation}</Text>
        <Text style={styles.column}>{debited ? `$ ${debited}` : '-'}</Text>
        <Text style={[styles.column, { color: myColors.danger }]}>
          {credited ? `$ ${credited}` : '-'}
        </Text>
        <Text
          style={[
            styles.column,
            { color: currentBalance < 0 ? myColors.danger : null }
          ]}
        >
          {`$ ${currentBalance}`}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const TransactionsFooter = ({ label }) => (
  <View style={styles.footerRow}>
    <Text style={styles.footerLabel}>{label}</Text>
  </View>
)

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 45,
    alignItems: 'center'
  },
  footerLabel: {
    color: myColors.green,
    fontWeight: '600'
  },
  column: {
    textAlign: 'right',
    width: 60,
    fontWeight: '600'
  },
  headerColumn: {
    color: myColors.primary,
    textAlign: 'right',
    width: 60
  }
})
