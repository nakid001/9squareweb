import React, { Component } from 'react'
import './style.css'
import img from './img/template2.jpg'
import img2 from './img/template2.jpg'
import Modal from 'react-modal';
import TestIcon from './img/start.png'
import { Link } from 'react-router-dom'

// import { Link } from 'react-router'
export class Home extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: this.getCookie('username')
    }
 
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handlePress = this.handlePress.bind(this)    
  }
  handlePress (event) {
    alert('yaya')
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
    this.setState({modalIsOpen: false});
  }
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }
  render() {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div id="main-wrap">
            <div id="sidebar">
              <div><img src={img} width="100%" height="400" alt=""/><h4></h4></div>
            </div>
            <div id="content-wrap" className="box_content_background">
              <div className="box_content">
                เพียงเข้ารับการทดสอบของเรา แล้วเราจะช่วยคุณประมวลผลและแสดงข้อมูลของคุณอย่างรวดเร็ว โดยจะแสดงให้เห็นถึง
                ความแม่นยำ ความรวดเร็ว ในการตอบสนองของคุณ และยังแสดงให้คุณเห็นถึง ranking ของคุณเทียบกับคนอื่นอีกด้วย
              </div>
            </div>
            <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              className='col-6 Modal--matching'
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
                   <div>
                    <Link to= '/test'><img src={TestIcon} className='TestIcon' alt=''/></Link>
                  </div> 
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
        <div id="main-wrap">
            <div id="sidebar">
              <div><img src={img2} width="100%" height="400" alt=""/><h4></h4></div>
            </div>
            <div id="content-wrap">
             ด้วยกระบวนการรับผลตรวจสอบและแสดงผลที่เห็นได้ชัดทำให้เกิดการพัฒนาที่รวดเร็วต่อผู้ทดสอบ
            </div>
        </div>
        <div id="footer">Footer</div>
      </div>    
    )
  }
}
