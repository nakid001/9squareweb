import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import Modal from 'react-modal';

import { Link } from 'react-router-dom'

import './style.css'

export class Room extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomtest: '',
      device: [],
      num: 0,
      order: []
    }
      this.state = {
        
    }
   
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
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
  

  // handleChange (event) {
  //   if (event.target.name === 'User') {
  //     this.props.inputlog(event.target.value, this.props.user.password)
  //   } else if (event.target.name === 'Pass') {
  //     this.props.inputlog(this.props.user.username, event.target.value)
  //   }
  // }

  render () {
    let arr = []
    return (
      <div id='home_wrapper'>
        <div id="header">{'ROOM '+this.props.test.num}</div>
        <div id="main-wrap">
          <div className="header_content">
            Device List
            {this.props.test.device}
          </div>
          <div id="content-wrap">  
          <button onClick={this.openModal}>ADD TEST METHOD</button>   
          <Modal
            isOpen={this.state.modalIsOpen}
            className='col-6 Modal--matching'
            overlayClassName='Modal--matching--overlay'
            contentLabel='Example Modal'
            shouldCloseOnOverlayClick={true}
            role='dialog'
          >
            <div className='Modal_content'>
              <div className='Modal_header'>
                <div className='Modal_close' onClick={this.closeModal}>&times;</div>
                Setup Order
              </div>
              <div className='Modal_body'>
                <p> Order : {this.props.test.order} </p>
                <table className='Modal_table'>
                    <tr>
                    <td > 
                      1
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('1L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('1R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      2
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('2L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('2R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      3
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('3L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('3R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    </tr> 
                    
                    <tr>
                    <td > 
                      4
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('4L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('4R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      5
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('5L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('5R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      6
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('6L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('6R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    </tr>
                    
                    <tr>
                    <td > 
                      7
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('7L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('7R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      8
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('8L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('8R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    <td > 
                      9
                      <div>
                        <div id="left" onClick={()=> {
                      this.props.pushOrder('9L').then(() => {
                      })              
                    }}>left</div>
                        <div id="right" onClick={()=> {
                      this.props.pushOrder('9R').then(() => {
                      })              
                    }}>right</div>
                      </div>
                    </td>
                    </tr>
              </table> 
              </div>
              <div className='Modal_footer'>
                <div>
                  <button className='Modal_btn' onClick={() => {this.props.submitOrder(this.props.test.num, this.props.test.order)}}> Submit </button>
                  <button className='Modal_btn'  onClick={ () => { this.props.clearOrder() } }> Clear order</button>
                </div>
                <div>
                  <button className='Modal_btn' onClick={this.closeModal}>Cancel</button>
                </div>
              </div>
            </div>
            </Modal>
          </div>
          <button onClick={()=> {this.props.addDevice(this.props.test.num)}}>ADD DEVICE </button>
          <button> <Link to ='/examiner/test'>GO BACK</Link> </button>
        </div>
        <div id="footer">Footer</div>
      </div>   
    )
  }
}
