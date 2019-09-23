import React from 'react'
import { Field } from 'redux-form'
import { View, StyleSheet, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ButtonFooter from './ButtonFooter'
import moment from 'moment'

export default class NewClient extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = client => {
    if (!client.email) {
      client.email = `${+moment()}@gmail.com`
    }
    if (this.props.emails.includes(client.email)) {
      Alert.alert('Pepitooo', 'El email ingresado ya se encuentra asociado')
    } else {
      let ct = client.cuit
      if (ct) {
        ct.split('-').join()
        client.cuit = ct.replace(/^(\d{2})(\d{8})(\d{1}).*/, '$1-$2-$3')
      }
      this.props.createClient(client)
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading) {
      if (!nextProps.clientError) {
        Alert.alert('Pepitooo', 'El cliente ha sido creado correctamente', [
          { text: 'ok', onPress: () => this.props.navigation.goBack() }
        ])
      } else {
        Alert.alert(
          'Ups',
          'El cliente no se pudo crear, intente de nuevo mas tarde'
        )
      }
    }
  }

  renderNick = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <Input
        {...input}
        blurOnSubmit={false}
        onSubmitEditing={() => this.email.focus()}
        placeholder="Ingrese Alias"
        leftIcon={{ type: 'simple-line-icon', name: 'user' }}
        autoCapitalize="words"
        errorMessage={touched && error ? error : null}
      />
    )
  }

  renderEmail = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <Input
        {...input}
        blurOnSubmit={false}
        ref={input => (this.email = input)}
        onSubmitEditing={() => this.cuit.focus()}
        placeholder="Ingrese Email"
        leftIcon={{ type: 'material-community', name: 'email-outline' }}
        keyboardType="email-address"
        placeholder="pepito@gmail.com"
        autoCapitalize="none"
        errorMessage={touched && error ? error : null}
      />
    )
  }

  renderCuit = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <Input
        {...input}
        ref={input => (this.cuit = input)}
        leftIcon={{ type: 'font-awesome', name: 'address-card-o' }}
        keyboardType="numeric"
        placeholder="Ingrese cuit: 22-88888888-1"
        errorMessage={touched && error ? error : null}
        required={false}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Field name="nick" component={this.renderNick} />
        <Field name="email" component={this.renderEmail} />
        <Field name="cuit" component={this.renderCuit} />
        <ButtonFooter
          title="Crear Cliente"
          onPress={this.props.handleSubmit(this.onSubmit)}
          containerStyle={styles.buttonContainer}
          loading={this.props.isLoading}
          loadingLeft
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    alignItems: 'center',
    paddingBottom: 20
  }
})
