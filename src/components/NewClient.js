import React from 'react'
import { Field } from 'redux-form'
import { View, StyleSheet, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ButtonFooter from './ButtonFooter'

export default class NewClient extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = client => {
    if (this.props.emails.includes(client.mail)) {
      Alert.alert('Pepitooo', 'El email ingresado ya se encuentra asociado')
    } else this.props.createClient(client)
  }

  renderNick = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <Input
        {...input}
        placeholder="Ingrese Alias"
        leftIcon={{ type: 'simple-line-icon', name: 'user' }}
        autoCapitalize="words"
        errorMessage={touched && error ? error : null}
      />
    )
  }

  renderMail = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <Input
        {...input}
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
        leftIcon={{ type: 'font-awesome', name: 'address-card-o' }}
        keyboardType="numeric"
        placeholder="Ingrese cuit: 22-88888888-1"
        errorMessage={touched && error ? error : null}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Field name="nick" component={this.renderNick} />
        <Field name="mail" component={this.renderMail} />
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
