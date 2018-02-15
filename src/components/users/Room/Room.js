import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import bg from './img/room_background.jpg'
import './style.css'

export class Room extends React.Component {

  render () {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">{'ตารางเก้าช่อง '+this.props.test.num}</div>
        <div  className="room_body">
          <img src ={bg} className="room_body_background"/>
          <div className="room_content">
            {this.props.test.device}
            Current order : {this.props.test.order}
            <div className="Exfooter">
              <button> <Link to ='/test'>GO BACK</Link> </button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}
