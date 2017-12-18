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
      num: 0
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
              <div className='Modal--matching--content'>
                <div className='Modal--matching--header'>
                  <div className='Modal--matching--close' onClick={this.closeModal}>&times;</div>
                </div>
                <div className='Modal--matching--body'>
                  <table>
                    <tr>
                    <td> 1 </td>
                    <td> 2 </td>
                    <td> 3 </td>
                    </tr> 
                    
                    <tr>
                    <td> 4 </td> 
                    <td> 5 </td>
                    <td> 6 </td>
                    </tr>
                    
                    <tr>
                    <td> 7 </td>
                    <td> 8 </td>
                    <td> 9 </td>
                    </tr>
                </table> 
                </div>
                <div className='Modal--matching--footer'>
                  <div>
                    <button className='Modal--matching--btn' onClick={this.closeModal}>Cancel</button>
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
