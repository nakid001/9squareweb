import React, { Component } from 'react'
import './style.css'
import boximg1 from './img/images.png'
import boximg2 from './img/ic_history_48px-512.png'
import boximg3 from './img/graph_icon.png'
import { MyModal } from './MyModal'
import { NavLink } from 'react-router-dom'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

export class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='wrapper'>
        <div id="header" className="title_content">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div >
          <div >
            <Carousel
              activeIndex={this.props.activeIndex}
              next={this.props.next}
              previous={this.props.previous}
              interval={4000}
            >
              <CarouselIndicators items={this.props.items} activeIndex={this.props.activeIndex} onClickHandler={this.props.goToIndex} />
              {this.props.slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.props.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.props.next} />
            </Carousel>
          </div>
          <div onKeyPress = {this.props.handlePress}>
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
              <NavLink key='m14' activeClassName='sbLinkActive' to='/test' className='sidebarLink'>ระบบตรวจวัดการทดสอบ</NavLink>
            </div>
            <div className = 'box_content_head'>
              <NavLink key='m2' activeClassName='sbLinkActive' to='/history' className='sidebarLink'>ระบบเก็บประวัติ</NavLink>
            </div>
            <div className = 'box_content_head'>
              <NavLink key='m3' activeClassName='sbLinkActive' to='/ranking' className='sidebarLink'>ระบบแสดงผลกราฟ</NavLink>
            </div>
            <div className = 'box_content_image'>
              <img src={boximg1} alt={'BOX'} className="box_image" onClick={() => {this.props.history.push('/test')} }/>
              <img src={boximg2} alt={'BOX'} className="box_image" onClick={() => {this.props.history.push('/history')} }/>
              <img src={boximg3} alt={'BOX'} className="box_image" onClick={() => {this.props.history.push('/ranking')} }/>
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
