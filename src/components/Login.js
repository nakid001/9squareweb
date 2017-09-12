import React, { Component } from 'react'

// import { Link } from 'react-router'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.props.inputlog(event.target.value, this.props.user.password, this.props.user.repassword)
    } else if (event.target.name === 'password') {
      this.props.inputlog(this.props.user.username, event.target.value, this.props.user.repassword)      
    } 
  }
  render() {
    return (
        <div className='container'>
          <div>
            Login
          </div>
          <div>
            <div>Username            
              <input type="text" name="username" value={this.state.value} onChange={this.handleChange}/> 
            </div>
            <div>Password
            <input type="password" name="password" value={this.state.value} onChange={this.handleChange}/>
          </div>
            <button onClick={()=>{
                this.props.loginfire(this.props.user.username, this.props.user.password)
              }
            }>SUBMIT</button>
          </div>
        </div>
        
    )
  }
}
