import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import Modal from 'react-modal';
import { Link } from 'react-router-dom'

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
  render () {
      return (
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
          <div >
            <div>
            <div id="showgrid">
              <div class="row">
                <div class="column">1x1</div>
                <div class="column">1x2</div>
                <div class="column">1x3</div>
              </div>
              <div class="row">
                <div class="column">2x1</div>
                <div class="column">2x2</div>
                <div class="column">2x3</div>
              </div>
              <div class="row">
                <div class="column">3x1</div>
                <div class="column">3x2</div>
                <div class="column">3x3</div>
              </div>
            </div>
            </div> 
          </div>
          <div className='Modal--matching--footer'>
            <div>
              <button className='Modal--matching--btn' onClick={this.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
        </Modal>
      )
  }
}