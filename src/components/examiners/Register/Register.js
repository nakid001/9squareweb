import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

export class Register extends React.Component {
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
        this.props.exam.password,
        this.props.exam.repassword,
        this.props.exam.mobile
      )
    } else if (event.target.name === 'Pass') {
      this.props.inputreg(
        this.props.exam.username,
        event.target.value,
        this.props.exam.repassword,
        this.props.exam.mobile
      )
    } else if (event.target.name === 'REPass') {
      this.props.inputreg(
        this.props.exam.username,
        this.props.exam.password,
        event.target.value,
        this.props.exam.mobile
      )
    }
  }

  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 13) {
      this.props.regisfire(this.props.exam.username, this.props.exam.password, this.props.exam.repassword, this.props.exam.mobile)
    }
  }

  render () {
    return (
      <div id='wrapper'>
        <div className='col-4'></div>
        <div className='col-4 sign_up_content'>
          <p className='signup_headerText'>Sign Up</p>
          {/* <form action='' id='uesr_login_form'>
            <input type='text' placeholder='E-mail or username' className='typebox' name='User' onChange={this.handleChange}/>
            <input type='password' placeholder='Password' className='typebox'name='Pass' onChange={this.handleChange}/>
            <input type='password' placeholder='Re-enter password' className='typebox'name='REPass' onChange={this.handleChange}/>
          </form> */}
          <div style={ {marginTop: '24px'} }>
            <input type="text" className="form-input" placeholder="Email" style={{'width': '100%'}} name='User' onChange={this.handleChange}/>
            <input type="password" className="form-input" placeholder="Password" style={{'width': '100%'}} name='Pass' onChange={this.handleChange}/>
            <input type="password" className="form-input" placeholder="Re enter password" style={{'width': '100%'}} name='REPass' onChange={this.handleChange}/>
          </div>
          <button className='col-12 signupBtn' onClick={ () => { this.props.regisfire(this.props.exam.username, this.props.exam.password, this.props.exam.repassword, this.props.exam.mobile) } }><span className='signup--text'>Sign Up</span></button>
          <p className='col-12 signUpDivider'/>
          <div className='col-12'><p className='guideText'>Already have an account? <span><NavLink key='10' activeClassName='active' to='/login' id='signUpLink'>Log In</NavLink></span></p></div>
        </div>
        <div className='col-4'></div>
      </div>
    )
  }
}
