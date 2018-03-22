import React from 'react'
import './style.css'

export class Login extends React.Component {
  render () {
    return (
      <div id='wrapper'>
        <div ></div>
        <div className='log_in_content'>
          <p className='login_headerText'>EXAMINER Log In</p>
          <div style={ {marginTop: '24px'} }>
            <input type="text" className="form-input" placeholder="Phone number or email" style={ {width: '100%'} }name='User' onChange={this.props.handleChange} onKeyPress={this.props.handlePress}/>
            <div className='space'> </div>
            <input type="password" className="form-input" placeholder="Password" style={ {width: '100%'} } name='Pass' onChange={this.props.handleChange} onKeyPress={this.props.handlePress}/>
          </div>
          <button className='col-12 emailLoginBtn' onClick={ () => { this.props.loginfire(this.props.exam.username, this.props.exam.password,'examiner') } }><span className='loginBtn--text'>Log In</span></button>
          <p className='col-12 loginDivider'/>
          <div className= 'guideText'>No account ? Please contact admin to get new account</div>
        </div>
        <div ></div>
      </div>
    )
  }
}
