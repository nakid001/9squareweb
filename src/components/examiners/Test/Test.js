import React from 'react'
import { Link } from 'react-router-dom'
import bg from './img/test_background.jpg'

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
      <div>
        <div id="header" className="title_content">ระบบควบคุมห้องทดสอบ</div>
        <div className="test_body">
          <img src ={bg} alt='' className="test_body_background"/>
          <div  className="test_content">
            {this.props.test.room}
            <button onClick={()=> {
              this.props.addroom()} } className="addRoom">เพิ่มสถานที่ทดสอบ
            </button>
            <button className="Exfooter"> <Link to ='/examiner/test'>กลับ</Link> </button>
          </div>
        </div>
      </div>   
    )
  }
}
