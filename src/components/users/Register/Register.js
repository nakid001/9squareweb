import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

export class Register extends React.Component {
  render () {
    return (
      <div id='wrapper'>
        <div className=''></div>
        <div className=' sign_up_content'>
          <p className='signup_headerText'>Sign Up</p>
          <div style={ {marginTop: '24px'} }>
            <input type="text" className="form-input" placeholder="Email" style={{'width': '100%'}} name='User' onChange={this.props.handleChange}  onKeyPress={this.props.handlePress}/>
            <div className='space'></div>
            <input type="password" className="form-input" placeholder="Password" style={{'width': '100%'}} name='Pass' onChange={this.props.handleChange}  onKeyPress={this.props.handlePress}/>
            <div className='space'></div>
            <input type="password" className="form-input" placeholder="Re enter password" style={{'width': '100%'}} name='REPass' onChange={this.props.handleChange}  onKeyPress={this.props.handlePress}/>
          </div>
          <button className='col-12 registerBtn' onClick={ () => { this.props.regisfire(this.props.user.username, this.props.user.password, this.props.user.repassword, this.props.user.mobile) } }><span className='signup--text'>Sign Up</span></button>
          <p className='col-12 signUpDivider'/>
          <div className='col-12'><p className='guideText'>Already have an account? <span><NavLink key='10' activeClassName='active' to='/login' id='signUpLink'>Log In</NavLink></span></p></div>
        </div>
        <div className=''></div>
      </div>
    )
  }
}
