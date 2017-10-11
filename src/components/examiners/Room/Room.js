import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

export class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: []
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange (event) {
  //   if (event.target.name === 'User') {
  //     this.props.inputlog(event.target.value, this.props.user.password)
  //   } else if (event.target.name === 'Pass') {
  //     this.props.inputlog(this.props.user.username, event.target.value)
  //   }
  // }

  render () {
    return (
      <div id='home_wrapper'>
        <div id="header">Room num</div>
        <div id="main-wrap">
            <div className="header_content">
            Device List
            {this.props.test.device}
            </div>
            <div id="content-wrap">
            </div>
            <button onClick={()=> {
              this.props.addDevice()}}>ADD DEVICE </button>
        </div>
        <div id="footer">Footer</div>
      </div>   
    )
  }
}
