import React from 'react'
import { Link } from 'react-router-dom'
import bg from './img/room_background.jpg'
import './style.css'

export class Room extends React.Component {

  render () {
    return (
      <div id='wrapper'>
        <div id="header" className="title_content">{'สถานที่ทดสอบ: '+this.props.num}</div>
        <div  className="room_body">
          <img src ={bg} alt='' className="room_body_background"/>
          <div className="room_content">
            {this.props.device}
            รูปแบบ : {this.props.order}
            <div className="Exfooter">
              <button> <Link to ='/test'>กลับ</Link> </button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}
