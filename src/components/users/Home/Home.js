import React, { Component } from 'react'
import './style.css'
import img from './img/template2.jpg'
import img2 from './img/template2.jpg'
import bg1 from './img/bg1.jpg'
import bg2 from './img/bg2.jpg'
import bg3 from './img/bg3.jpg'
import bg4 from './img/images.jpg'
import Modal from 'react-modal'
import TestIcon from './img/start.png'
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
    // caption: '     เพียงเข้ารับการทดสอบของเรา แล้วเราจะช่วยคุณประมวลผลและแสดงข้อมูลของคุณอย่างรวดเร็ว โดยจะแสดงให้เห็นถึงความแม่นยำ ความรวดเร็ว ในการตอบสนองของคุณ และยังแสดงให้คุณเห็นถึง ranking ของคุณเทียบกับคนอื่นอีกด้วย'
  },
  {
    src: bg2,
    altText: 'Slide 2',
    // caption: 'Slide 2'
  },
  {
    src: bg3,
    altText: 'Slide 3',
    // caption: 'Slide 3'
  }
]
// import { Link } from 'react-router'
export class Home extends Component {
  constructor() {
    super()
 
    this.state = {
      modalIsOpen: this.getCookie('username'),
      activeIndex: 0 
    }
 
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handlePress = this.handlePress.bind(this)    
    this.getScroll = this.getScroll.bind(this)
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
  openModal() {
    this.setState({modalIsOpen: true})    
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  closeModal() {
    this.setState({modalIsOpen: false})
  }
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }
  getScroll () {
    let sc = document.scrollingElement
    console.log(sc.scrollTop)
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
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              className='Modal--matching'
              overlayClassName='Modal--matching--overlay'
              contentLabel='Example Modal'
              shouldCloseOnOverlayClick={true}
              role='dialog'
            >
              <div className='Modal--matching--content' >
                <div className='Modal--matching--header'>
                  <div className='Modal--matching--close' onClick={this.closeModal}  onKeyPress={this.handlePress}>&times;</div>
                </div>
                <div className='Modal--matching--body'>
                  <Link to= '/test'><img src={TestIcon} className='TestIcon' alt=''  /></Link>
                </div>
                <div className='Modal--matching--footer'>
                  <div>
                    <button className='Modal--matching--btn' onClick={this.closeModal}>Cancel</button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div id="main-wrap" className="">
          <div className='box_content'>
              ด้วยกระบวนการรับผลตรวจสอบและแสดงผลที่เห็นได้ชัดทำให้เกิดการพัฒนาที่รวดเร็วต่อผู้ทดสอบ
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
