import React, { Component } from 'react'
import './style.css'
import temp from './img/template.png'
import Modal from 'react-modal';
import TestIcon from './img/start.png'
import { Link } from 'react-router-dom'

// import { Link } from 'react-router'
export class Home extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: true
    }
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    return (
      <div id='home_wrapper'>
        <div id="header">ระบบจัดการทักษะกลไกการเคลื่อนไหว</div>
        <div id="main-wrap">
            <div id="sidebar" className="header_content">
              <div><img src={temp} width="100%" height="400" alt=""/><h4></h4></div>
            </div>
            <div id="content-wrap">
              เพียงเข้ารับการทดสอบของเรา แล้วเราจะช่วยคุณประมวลผลและแสดงข้อมูลของคุณอย่างรวดเร็ว โดยจะแสดงให้เห็นถึง
              ความแม่นยำ ความรวดเร็ว ในการตอบสนองของคุณ และยังแสดงให้คุณเห็นถึง ranking ของคุณเทียบกับคนอื่นอีกด้วย
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
              <div className='Modal--matching--content'>
                <div className='Modal--matching--header'>
                  <div className='Modal--matching--close' onClick={this.closeModal}>&times;</div>
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
