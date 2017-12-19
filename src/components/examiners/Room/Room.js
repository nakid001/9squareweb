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
                    <td onClick={()=> {
                      this.props.pushorder(1).then(() => {
                      })              
                    }}> 1 </td>
                    <td onClick={()=> {
                      this.props.pushorder(2).then(() => {
                      })              
                    }}> 2 </td>
                    <td onClick={()=> {
                      this.props.pushorder(3).then(() => {
                      })              
                    }}> 3 </td>
                    </tr> 
                    
                    <tr>
                    <td onClick={()=> {
                      this.props.pushorder(4).then(() => {
                      })              
                    }}> 4 </td> 
                    <td onClick={()=> {
                      this.props.pushorder(5).then(() => {
                      })              
                    }}> 5 </td>
                    <td onClick={()=> {
                      this.props.pushorder(6).then(() => {
                      })              
                    }}> 6 </td>
                    </tr>
                    
                    <tr>
                    <td onClick={()=> {
                      this.props.pushorder(7).then(() => {
                      })              
                    }}> 7 </td>
                    <td onClick={()=> {
                      this.props.pushorder(8).then(() => {
                      })              
                    }}> 8 </td>
                    <td onClick={()=> {
                      this.props.pushorder(9).then(() => {
                      })              
                    }}> 9 </td>
                    </tr>
                </table> 
                </div>
                <div className='Modal_footer'>
                  <div>
                    <button className='Modal_btn' > Submit </button>
                    <button className='Modal_btn'  onClick={ () => { this.props.clearorder() } }> Clear order</button>
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
