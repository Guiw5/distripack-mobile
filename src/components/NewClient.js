import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ButtonFooter from './ButtonFooter'
import { Field, reduxForm } from 'redux-form'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { connect } from 'react-redux'

const validate = values => {
  const error = {}
  error.mail = ''
  error.nick = ''
  error.cuit = ''
  var ema = values.mail
  var nk = values.nick
  var ct = values.cuit
  if (values.mail === undefined) {
    ema = ''
  }
  if (values.nick === undefined) {
    nk = ''
  }
  if (values.cuit === undefined) {
    ct = ''
  }

  if (!ema.includes('@') && ema !== '') {
    error.mail = 'Ingrese un Email válido'
  }

  if (!ema.contains('.com') && ema !== '') {
    error.mail = 'Ingrese un Email válido'
  }

  if (!ema) {
    error.mail = 'El campo Email es obligatorio'
  }

  if (!nk) {
    error.nick = 'El campo Alias es obligatorio'
  }
  if (ct.split('-').join('').length !== 11)
    error.cuit = 'El Cuit debe contenter 11 digitos'

  return error
}

class NewClient extends React.Component {
  constructor(props) {
    super(props)
  }

  onSubmit = client => {
    this.props.createClient(client)
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

const mapStateToProps = state => ({
  error: selectors.getClientsError(state),
  isLoading: selectors.getClientsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  createClient: client => {
    dispatch(actions.createClient(client))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'client', validate })(NewClient))

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
