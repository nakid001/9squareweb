import React, { Component } from 'react'

// import { Link } from 'react-router'

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.props.inputreg(event.target.value, this.props.user.password, this.props.user.repassword)
    } else if (event.target.name === 'password') {
      this.props.inputreg(this.props.user.username, event.target.value, this.props.user.repassword)      
    } else if (event.target.name === 'repassword') {
      this.props.inputreg(this.props.user.username, this.props.user.password, event.target.value)      
    }
  }
  render() {
    return (
        <div className='container'>
          <div>
            Register
          </div>
          <div>
            <div>Username            
              <input type="text" name="username" value={this.state.value} onChange={this.handleChange}/> 
            </div>
            <div>Password
            <input type="password" name="password" value={this.state.value} onChange={this.handleChange}/>
          </div>
          <div>Re-Password
              <input type="password" name="repassword" value={this.state.value} onChange={this.handleChange}/>
            </div>
            <button onClick={()=>{
              if (this.props.user.password === this.props.user.repassword) {
                this.props.regisfire(this.props.user.username, this.props.user.password)
              } else {
                alert('PASSWORD NOT MATCH WITH REPASSWORD')
              }
            }}>SUBMIT</button>
          </div>
        </div>
        
    )
  }
}
