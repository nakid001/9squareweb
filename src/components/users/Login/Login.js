import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

export class Login extends React.Component {
  render () {
    return (
      <div id='wrapper'>
        <div className='log_in_content'>
          <p className='login_headerText'>ลงชื่อเข้าใช้</p>
          <div style={ {marginTop: '24px'} }>
            <input type="text" className="form-input" placeholder="Phone number or email" style={ {width: '100%'} }name='User' onChange={this.props.handleChange} onKeyPress={this.props.handlePress}/>
            <div className='space'> </div>
            <input type="password" className="form-input" placeholder="Password" style={ {width: '100%'} } name='Pass' onChange={this.props.handleChange} onKeyPress={this.props.handlePress}/>
          </div>
          <button className='col-12 emailLoginBtn' onClick={ () => { this.props.loginfire(this.props.user.username, this.props.user.password) } }><span className='loginBtn--text'>Submit</span></button>
          <p className='col-12 loginDivider'/>
          <button className='col-12 loginBtn loginBtn--google' onClick={ () => { this.props.logingmail() } }><span className='loginBtn--texts'>Google</span></button>
          <p className='col-12 loginDivider'/>
          <div className='col-12'><p className='guideText'>ยังไม่มีแอคเคาท์? <span><NavLink key='10' activeClassName='active' to='/register' id='signUpLink'>สมัครเลย</NavLink></span></p></div>
        </div>
      </div>
    )
  }
}
