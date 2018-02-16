import React, { Component } from 'react'
import './style.css'
import bg1 from './img/bg1.jpg'
import bg2 from './img/bg2.jpg'
import bg3 from './img/bg3.jpg'
import bg4 from './img/images.jpg'
import boximg1 from './img/images.png'
import boximg2 from './img/ic_history_48px-512.png'
import boximg3 from './img/graph_icon.png'
import { Link } from 'react-router-dom'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

const items = [
  {
    src: bg1,
    altText: 'Slide 1',
    caption: ''
  },
  {
    src: bg2,
    altText: 'Slide 2',
    caption: ''
  },
  {
    src: bg3,
    altText: 'Slide 3',
    caption: ''
  }
]
export class Home extends Component {
  constructor() {
    super()
 
    this.state = {
      modalIsOpen: this.getCookie('username'),
      activeIndex: 0 
    }
    this.handlePress = this.handlePress.bind(this)    
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }
  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 27) {
      this.closeModal()
    }
  }
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }

  render() {
    const { activeIndex } = this.state
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        > 
          <img src={item.src} alt={item.altText}  width="100%" height="470px"/>
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      )
    })

    return (
      <div id='wrapper'>
        <div id="header" className="title_content">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div >
          <div >
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
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
              <img src={boximg1} alt={'BOX IMAGE'}  className="box_image"/>
              <img src={boximg2} alt={'BOX IMAGE'}  className="box_image"/>
              <img src={boximg3} alt={'BOX IMAGE'}  className="box_image"/>
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
