import { reduxForm } from 'redux-form'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { connect } from 'react-redux'
import NewClient from '../components/NewClient'

const mapStateToProps = state => ({
  clientError: selectors.getClientsError(state),
  isLoading: selectors.getClientsLoading(state),
  emails: selectors.getClientEmails(state)
})

const mapDispatchToProps = dispatch => ({
  createClient: client => {
    dispatch(actions.createClient(client))
  }
})

const validate = values => {
  const error = { email: '', nick: '', cuit: '' }
  const { email, nick, cuit } = values

  if (!nick) {
    error.nick = 'El campo Alias es obligatorio'
  }

  if (email) {
    let regex = new RegExp(/\S+@\S+\.\S+/)
    if (!regex.test(email) && email !== '') {
      error.email = 'Ingrese un Email válido'
    }
  }

  if (cuit) {
    if (cuit.split('-').join('').length !== 11)
      error.cuit = 'El Cuit debe contenter 11 digitos'
  }

  return error
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'client', validate })(NewClient))
