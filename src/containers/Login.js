import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Login } from '../components/Login/Login.js'
import { inputlog } from '../actions/input'
import { loginfire } from '../actions/user'
// import {
//   LoginForm
// } from '../components'
class LoginContainer extends React.Component {

  render () {
    return (
      <div>
        <Login {...this.props} />
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
      loginfire, inputlog
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
