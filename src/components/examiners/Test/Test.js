import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './style.css'

export class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: [],
      num: 0
    }
  }

  render () {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">ระบบควบคุมห้องทดสอบ</div>
        <div>
          <div className="header_content">
            {this.props.test.room}
          </div>
          <div id="content-wrap">
          </div>

        </div>
        <div>
          <button onClick={()=> {
            this.props.addroom()} } className="addRoom">ADD ROOM 
          </button>
          <button className="Exfooter"> <Link to ='/examiner/test'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
