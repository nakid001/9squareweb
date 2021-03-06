import React from 'react'
import { Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import './style.css'
import bg from './img/room_background.jpg'
import * as commonConstant from '../../../commonConstant'
export class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomtest: '',
      device: [],
      num: 0,
      order: [],
      deviceNumber: 0,
      manual: false,
      temporder: [],
    }
   
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.cancelModal = this.cancelModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.modalContent = this.modalContent.bind(this)
  }

  handleChange (event) {
    if (event.target.name === 'Device_number') {
      this.props.inputlog(event.target.value, '')
    } 
  }
  openModal() {
    this.setState({modalIsOpen: true})
    this.setState({temporder: this.props.test.order})
  }
   
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
   
  closeModal() {
    this.setState({modalIsOpen: false})
  }
  cancelModal() {
    this.setState({modalIsOpen: false})
    this.props.clearOrder() 
    this.props.pushOrder(this.state.temporder)
  }

  modalContent() {
    if (this.state.manual) {
      return (
        <div className='Modal_content'>
          <div className='Modal_header'>
            <div className='Modal_close' onClick={this.cancelModal}>&times;</div>
            สร้างรูปแบบ
            <div className='Modal_header_detail'>
              คลิ้กที่ช่องซ้ายขวาในแต่ละตัวเลขเพื่อกำหนดรูปแบบใหม่
            </div>
          </div>
          <div className='Modal_body'>
            <p> รูปแบบ : {this.props.test.order} </p>
            <table className='Modal_table'>
            <tr>
                <td > 
              7
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('7L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('7R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              8
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('8L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('8R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              9
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('9L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('9R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
              </tr> 
            
              <tr>
                <td > 
              4
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('4L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('4R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              5
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('5L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('5R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              6
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('6L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('6R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
              </tr>
            
              <tr>
                <td > 
              1
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('1L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('1R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              2
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('2L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('2R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
                <td > 
              3
                  <div>
                    <div id="left" onClick={()=> {
                      this.props.pushOrder('3L ').then(() => {
                      })              
                    }}>ซ้าย</div>
                    <div id="right" onClick={()=> {
                      this.props.pushOrder('3R ').then(() => {
                      })              
                    }}>ขวา</div>
                  </div>
                </td>
              </tr>
            </table> 
          </div>
          <div className='Modal_footer'>
            <button className='Modal_btn' onClick={() => {this.props.submitOrder(this.props.test.num, this.props.test.order).then(this.closeModal())}}> ยืนยัน </button>
            <button className='Modal_btn'  onClick={ () => { this.props.clearOrder() } }> ล้างรูปแบบ</button>
            <div>
              <button className='Modal_btn'  onClick={ () => { this.setState({manual:false}) } }>ท่ามาตราฐาน</button>
              <button className='Modal_btn' onClick={this.cancelModal}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='Modal_content'>
          <div className='Modal_header'>
            <div className='Modal_close' onClick={this.cancelModal}>&times;</div>
            เลือกรูปแบบการเล่น
          </div>
          <div className='Modal_body'>
            <p> รูปแบบ : {this.props.test.order} </p>
            <div className='Modal_list'>
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(commonConstant.splitWithDirection)
              }}> แยก-ชิด </button> 
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(commonConstant.upDownWithDirection)
              }}> ขึ้น-ลง </button> 
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(commonConstant.xCrossWithDirection)
              }}> กากบาท </button> 
            </div>
          </div>
          <div className='Modal_footer'>
            <div>
              <button className='Modal_btn' onClick={() => {this.props.submitOrder(this.props.test.num, this.props.test.order[0]).then(this.closeModal())}}> ยืนยัน </button>
              <button className='Modal_btn'  onClick={ () => { this.props.clearOrder() } }> ล้างรูปแบบ</button>
            </div>
            <div>
              <button className='Modal_btn'  onClick={ () => { this.setState({manual: true}) } }> กำหนดใหม่</button>
              <button className='Modal_btn' onClick={this.cancelModal}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">สถานที่ทดสอบ: {this.props.test.num}</div>
        <div  className="room_body">
          <img src ={bg} alt='' className="room_body_background"/>
          <div className="room_content">
            {this.props.test.device}
            <div className = 'room_bottom_content'>
              <div> 
                รูปแบบ : {this.props.test.order}
                <button onClick={this.openModal}>เลือกรูปแบบ</button>   
              </div>
              <div className="Matching_Device">
                จับคู่กับอุปกรณ์หมายเลข : 
                <input type="text" placeholder="Device number" style={ {width: '50%'} }name='Device_number' onChange={this.handleChange}/>
                <button className="Matching_Device_Button" onClick={()=> {this.props.matchDevice(this.props.test.num, this.props.exam.username)}}>จับคู่อุปกรณ์ </button>
              </div>
              <button className="Exfooter"> <Link to ='/examiner/test'>กลับ</Link> </button>
              <button className="Exfooter"> <Link to ='/examiner/start'>เตรียมพร้อมทดสอบ</Link> </button> 
            </div>
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
              {this.modalContent()}
            </Modal>
          </div>
        </div>
      </div>   
    )
  }
}
