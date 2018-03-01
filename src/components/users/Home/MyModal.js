import React, {Component} from 'react'
import { Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import TestIcon from './img/start.png'

export class MyModal extends Component {
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
        <div className='Modal--matching--content' >
          <div className='Modal--matching--header'>
            <div className='Modal--matching--close' onClick={this.props.closeModal}  onKeyPress={this.props.handlePress}>&times;</div>
          </div>
          <div className='Modal--matching--body'>
            <Link to= '/test'><img src={TestIcon} className='TestIcon' alt=''  /></Link>
          </div>
          <div className='Modal--matching--footer'>
            <div>
              <button className='Modal--matching--btn' onClick={this.props.closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
