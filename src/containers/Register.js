import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Register } from '../components/Register/Register.js'
import { inputreg } from '../actions/input.js'
import { regisfire } from '../actions/user.js'
class RegisterContainer extends React.Component {

  render () {
    return (
      <div>
        <Register {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputreg, regisfire
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
