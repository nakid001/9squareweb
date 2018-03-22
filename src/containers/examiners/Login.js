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
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange (event) {
    if (event.target.name === 'User') {
      this.props.inputlog(event.target.value, this.props.exam.password)
    } else if (event.target.name === 'Pass') {
      this.props.inputlog(this.props.exam.username, event.target.value)
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.loginfire(this.props.exam.username, this.props.exam.password, 'examiner')
    }
  }

  render () {
    return (
      <div>
        <Login {...this.props} 
          handleChange = {this.handleChange.bind(this)}
          handlePress = {this.handlePress.bind(this)}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    exam: state.exam
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginfire, inputlog, logingmail
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExLoginContainer)
