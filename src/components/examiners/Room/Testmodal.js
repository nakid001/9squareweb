import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

export class TestModal extends React.Component {
  constructor (props) {
    super(props)
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

   
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
   
  closeModal() {
    this.setState(this.props.modalIsOpen= false)
  }
  cancelModal() {
    this.setState(this.props.modalIsOpen= false)
    this.props.clearOrder() 
    this.props.pushOrder(this.state.temporder)
  }

  modalContent() {
    if (this.props.manual) {
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
            <p> รูปแบบ : {this.props.order} </p>
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
            <button className='Modal_btn' onClick={() => {this.props.submitOrder(this.props.num, this.props.order).then(this.closeModal())}}> ยืนยัน </button>
            <button className='Modal_btn'  onClick={ () => { this.props.clearOrder() } }> ล้างรูปแบบ</button>
            <div>
              <button className='Modal_btn'  onClick={ () => { this.setState(this.props.manual=false) } }>ท่ามาตราฐาน</button>
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
            <p> รูปแบบ : {this.props.order} </p>
            <div className='Modal_list'>
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(['1L ', '3R ', '2L ', '2R '])
              }}> แยก-ชิด </button> 
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(['5L ', '6R ', '8L ', '9R ', '5L ', '6R ', '2L ', '3R '])
              }}> ขึ้น-ลง </button> 
              <button className="Modal_list_btn" onClick={() => {
                this.props.clearOrder() 
                this.props.pushOrder(['5L ', '5R ', '7L ', '9R ', '5L ', '5R ', '1L ', '3R '])
              }}> กากบาท </button> 
            </div>
          </div>
          <div className='Modal_footer'>
            <div>
              <button className='Modal_btn' onClick={() => {this.props.submitOrder(this.props.num, this.props.order[0]).then(this.closeModal())}}> ยืนยัน </button>
              <button className='Modal_btn'  onClick={ () => { this.props.clearOrder() } }> ล้างรูปแบบ</button>
            </div>
            <div>
              <button className='Modal_btn'  onClick={ () => { this.setState(this.props.manual= true) } }> กำหนดใหม่</button>
              <button className='Modal_btn' onClick={this.cancelModal}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        className='Modal--matching'
        overlayClassName='Modal--matching--overlay'
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
        role='dialog'
      >
        {this.modalContent()}
      </Modal>
    )
  }
}