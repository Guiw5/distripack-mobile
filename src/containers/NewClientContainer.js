import { reduxForm } from 'redux-form'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { connect } from 'react-redux'
import NewClient from '../components/NewClient'

const mapStateToProps = state => ({
  error: selectors.getClientsError(state),
  isLoading: selectors.getClientsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  createClient: client => {
    dispatch(actions.createClient(client))
  }
})

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

  let regex = new RegExp(/\S+@\S+\.\S+/)
  if (!regex.test(ema) && ema !== '') {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'client', validate })(NewClient))
