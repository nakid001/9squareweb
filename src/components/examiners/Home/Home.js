import React, { Component } from 'react'
import './style.css'
import temp from './img/template.png'
// import { Link } from 'react-router'
export class Home extends Component {
  render() {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div id="main-wrap">
          <div id="sidebar">
            <div><img src={temp} width="100%" height="400" alt=""/><h4></h4></div>
          </div>
          <div id="content-wrap" className="box_content_background">
            <div className="box_content">
              เพียงเข้ารับการทดสอบของเรา แล้วเราจะช่วยคุณประมวลผลและแสดงข้อมูลของคุณอย่างรวดเร็ว โดยจะแสดงให้เห็นถึง
              ความแม่นยำ ความรวดเร็ว ในการตอบสนองของคุณ และยังแสดงให้คุณเห็นถึง ranking ของคุณเทียบกับคนอื่นอีกด้วย
            </div>
          </div>
        </div>
        <div id="main-wrap">
          <div id="sidebar" className="header_content">
            <div><img src={temp} width="100%" height="400" alt=""/><h4></h4></div>
          </div>
          <div id="content-wrap">
            ความพยายามอยู่ที่ไหนความสำเร็จอยู่ที่นั่น
          </div>
        </div>
        <div id="footer">Footer</div>
      </div>    
    )
  }
}
