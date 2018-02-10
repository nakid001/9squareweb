import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

import './style.css'

export class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: 'empty'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    if (event.target.name === 'User') {
      this.props.inputlog(event.target.value, this.props.user.password)
    } else if (event.target.name === 'Pass') {
      this.props.inputlog(this.props.user.username, event.target.value)
    }
  }

  render () {
    return (
      <div id='wrapper'>
        <div id="header" className="title_content">เลือกสถานที่ทดสอบ</div>
        <div className="test_body">
          <div className="test_content">
            <div>
              {this.props.test.room}
            </div>
          </div>
          <div className="Exfooter">
            <button> <Link to ='/'>GO BACK</Link> </button>
          </div>
        </div>
      </div>   
    )
  }
}
