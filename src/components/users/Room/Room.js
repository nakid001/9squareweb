import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'

import './style.css'

export class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: [],
      num: 0
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
        <div id="header" className="title_content">{'ROOM '+this.props.test.num}</div>
        <div className="room_content">
          <div>
            {this.props.test.device}
            Current order : {this.props.test.order}
          </div>
        </div>
        <div className="Exfooter">
          <button> <Link to ='/test'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
