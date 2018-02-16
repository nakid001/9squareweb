import React from 'react'
import { Link } from 'react-router-dom'
import bg from './img/test_background.jpg'
import './style.css'

export class Test extends React.Component {

  render () {
    return (
      <div id='wrapper'>
        <div id="header" className="title_content">เลือกสถานที่ทดสอบ</div>
        <div className="test_body">
          <img src ={bg} alt ='' className="test_body_background"/>
          <div  className="test_content">
            {this.props.test.room}
            <div className="Exfooter">
              <button> <Link to ='/'>GO BACK</Link> </button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}
