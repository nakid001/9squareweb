import React, { Component } from 'react'
import './style.css'
import bg1 from './img/bg1.jpg'
import bg2 from './img/bg2.jpg'
import bg3 from './img/bg3.jpg'
import boximg1 from './img/images.png'
import boximg2 from './img/ic_history_48px-512.png'
import boximg3 from './img/graph_icon.png'
import { MyModal } from './MyModal'
import TestIcon from './img/start.png'
import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

// import { Link } from 'react-router'
export class Home extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  render() {
    return (
      <div id='wrapper'>
        <div id="header" className="title_content">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div >
          <div >
            {/* <Carousel
              activeIndex={this.props.activeIndex}
              next={this.props.next}
              previous={this.props.previous}
              interval={4000}
            >
              <CarouselIndicators items={this.items} activeIndex={this.props.activeIndex} onClickHandler={this.props.goToIndex} />
              {this.props.slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.props.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.props.next} />
            </Carousel> */}
          </div>
          <div>
            <MyModal 
              closeModal = {this.props.closeModal}
              openModal = {this.props.openModal}
              handlePress = {this.props.handlePress}
              modalIsOpen = {this.props.modalIsOpen}
            />
          </div>
        </div>
        <div id="main-wrap" className="">
          <div className='box_content'>
            <div className = 'box_content_head'>
              ระบบตรวจวัดการทดสอบ
            </div>
            <div className = 'box_content_head'>
              ระบบเก็บประวัติ
            </div>
            <div className = 'box_content_head'>
              ระบบแสดงผลกราฟ
            </div>
            <div className = 'box_content_image'>
              <img src={boximg1} alt={'BOX'} className="box_image"/>
              <img src={boximg2} alt={'BOX'} className="box_image"/>
              <img src={boximg3} alt={'BOX'} className="box_image"/>
            </div>
            <div className = 'box_content_head'>
              <div className = 'box_content_text'>
              เรามีระบบที่จะช่วยให้นักกีฬา และผู้คุมการทดสอบได้ใช้ในการประเมิณศักยภาพของนักกีฬาอย่างถูกต้องและเหมาะสม
              </div>
            </div>
            <div className = 'box_content_head'>
              <div className = 'box_content_text'>
              นอกจากระบบตรวจสอบการประเมิณศักยภาพแล้ว เรายังมีระบบที่ช่วยในการจัดเก็บข้อมูลผลลัพธ์การทดสอบ เพื่อที่จะนำมาใช้ดูพัฒนาการของผู้ทดสอบได้อีกด้วย
              </div>
            </div>
            <div className = 'box_content_head'>
              <div className = 'box_content_text'>
              เรายังมีระบบที่จะช่วยในการเปรียบเทียบและคาดคะเน ความสามารถของนักกีฬากับผู้ร่วมทดสอบท่านอื่นๆซึ่งทำให้นักกีฬาคนนั้นๆสามารถรับรู้ได้ถึงความสามารถของตนเองทียบกับผู้อื่น
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='footer'>
            <div className='head_footer_content'> About us </div>
            <div className='footer_content'> Create and develop by Parut Singhapun </div> 
          </div>
        </div>
      </div>    
    )
  }
}
