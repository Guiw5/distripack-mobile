import React, { PureComponent } from 'react'
import { Linking, ScrollView, StyleSheet } from 'react-native'
import { myColors } from '../lib/commons'
import IconCard from './IconCard'

export class DetailsTab extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let { client, getClient } = this.props.screenProps
    if (client == null) getClient()
  }

  handleWhatsapp = phone => async () => {
    var phoneString = phone.replace(/-/g, '')
    const url = `whatsapp://send?phone=54${phoneString}`
    return await Linking.openURL(url)
  }

  handleCall = phone => async () => {
    var phoneString = phone.replace(/-/g, '')
    const url = `tel:${phoneString}`
    return await Linking.openURL(url)
  }

  handleEmail = email => async () => {
    const url = `mailto:${email}`
    return await Linking.openURL(url)
  }

  render() {
    const { client } = this.props.screenProps
    if (!client) return null

    let fullName = client.firstName + ' ' + client.lastName
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <IconCard
          title="Comercio"
          fields={[
            { name: 'Nombre Fantasía', value: client.fantasyName },
            { name: 'Razón Social', value: client.businessName },
            { name: 'CUIT', value: client.cuit },
            { name: 'Dirección', value: client.address }
          ]}
          iconProps={{
            name: 'home',
            color: myColors.green
          }}
        />
        <IconCard
          title={'Contacto'}
          fields={[
            {
              name: 'Nombre Cliente',
              value: fullName,
              icon: { name: 'person' },
              onPress: this.handleCall(client.celPhone)
            },
            {
              name: 'Teléfono',
              value: client.phone,
              icon: { name: 'phone' },
              onPress: this.handleCall(client.phone)
            },
            {
              name: 'Celular',
              value: client.celPhone,
              icon: { name: 'phone-android' },
              onPress: this.handleWhatsapp(client.celPhone)
            },
            {
              name: 'E-Mail',
              value: client.email,
              icon: { name: 'email' },
              onPress: this.handleEmail(client.email)
            }
          ]}
          iconProps={{
            name: 'person',
            color: myColors.green
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: { backgroundColor: myColors.greenBg }
})
