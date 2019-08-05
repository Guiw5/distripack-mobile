import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { myColors } from '../lib/commons'

const LongLines = props => {
  return props.line.map(({ label, value }, index) => {
    return (
      <View key={index} style={styles.longline}>
        <Text style={styles.label}>{label}</Text>
        <Text>{value}</Text>
      </View>
    )
  })
}

const Line = props => {
  return (
    <View style={styles.lineContainer}>
      {props.line.map(({ label, value }, index) => {
        return (
          <View key={index} style={styles.inline}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <Text>{value ? value : 'NS/NC'}</Text>
          </View>
        )
      })}
    </View>
  )
}

const SkuInfo = props => {
  return (
    <View style={styles.infoContainer}>
      <LongLines line={props.info[1]} />
      <Line line={props.info[2]} />
      <Line line={props.info[3]} />
    </View>
  )
}

const SkuTitle = ({ title, subtitle }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text h4>{subtitle}</Text>
    </View>
  )
}

const SkuSubtotal = ({ value }) => {
  return (
    <View style={styles.subtotalSection}>
      <View style={styles.subtotalLine}>
        <Text style={styles.subtotalLbl}>{'Subtotal: '}</Text>
        <Text style={styles.subtotalNr}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100
  },
  longline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  title: { fontSize: 18, fontWeight: '800' },
  titleContainer: { alignItems: 'center' },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inline: { flexDirection: 'row' },
  label: { fontWeight: 'bold' },
  subtotalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 80
  },
  subtotalLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minWidth: 150
  },
  subtotalLbl: {
    fontSize: 16,
    fontWeight: '400'
  },
  subtotalNr: {
    fontSize: 16,
    fontWeight: '600',
    color: myColors.green
  }
})

export { SkuInfo, SkuTitle, SkuSubtotal }
