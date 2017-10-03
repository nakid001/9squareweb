import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Login } from '../../components/examiners/Login/Login.js'
import { inputlog } from '../../actions/input'
import { loginfire, logingmail } from '../../actions/examiner'
// import {
//   LoginForm
// } from '../components'
class ExLoginContainer extends React.Component {

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
      loginfire, inputlog, logingmail
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExLoginContainer)
