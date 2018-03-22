import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Register } from '../../components/users/Register/Register.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
class RegisterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repassword: '',
      mobile: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }
  handleChange (event) {
    if (event.target.name === 'User') {
      this.props.inputreg(
        event.target.value,
        this.props.user.password,
        this.props.user.repassword,
        this.props.user.mobile
      )
    } else if (event.target.name === 'Pass') {
      this.props.inputreg(
        this.props.user.username,
        event.target.value,
        this.props.user.repassword,
        this.props.user.mobile
      )
    } else if (event.target.name === 'REPass') {
      this.props.inputreg(
        this.props.user.username,
        this.props.user.password,
        event.target.value,
        this.props.user.mobile
      )
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.regisfire(this.props.user.username, this.props.user.password, this.props.user.repassword, this.props.user.mobile)
    }
  }
  render () {
    return (
      <div>
        <Register {...this.props} 
          handleChange = {this.handleChange.bind(this)}
          handlePress = {this.handlePress.bind(this)}
        />
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
