import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Room } from '../../components/examiners/Room/Room.js'
import { inputlog } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showDevice, addDevice, setActive, delDevice, setDeviceActive, getRoomNum, pushOrder, clearOrder, submitOrder, getOrder, matchDevice } from '../../actions/test.js'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

class ExRoomContainer extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      roomtest: '',
      device: [],
      num: 0,
      order: [],
      deviceNumber: 0
    }
    this.state = {
        
    }
  }

  handleChange (event) {
    if (event.target.name === 'Device_number') {
      this.props.inputlog(event.target.value, '')
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
  componentWillMount() {
    let that = this
    let arr = []
    let i = 0 
    let order = []
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.props.showDevice(arr)
        firebase.database().ref('/rooms/room'+that.props.test.num).once('value', function (snapshot) {
          if (snapshot.val().order) {
            order = snapshot.val().order
          }
        }).then(() => {
          that.props.getOrder(order)                
        })
      }
    })
  }
  render () {
    let i = 0
    let that = this
    let device = []
    let content = ''
    if (firebase.auth().currentUser)
    {
      content = (
        <div>
          <Room {...this.props}   
            openModal = {this.openModal.bind(this)}
            afterOpenModal = {this.afterOpenModal.bind(this)}
            closeModal = {this.closeModal.bind(this)}
            handleChange = {this.handleChange.bind(this)} />
        </div>
      )
      if (!this.props.test.num) {
        window.location = '/examiner/test'
      }
      firebase.database().ref('/rooms/room'+this.props.test.num+'/devices/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const RoomeBtn = childSnapshot.val().ava ? 'RoomAvaBtn' : 'RoomNotAvaBtn'   
          const userID = childSnapshot.val().user       

          device[i] = (
            <div className='' key={i}>
              <div className=''>
                <span>
                  <div className={RoomeBtn}>
                    Device:{childSnapshot.val().num}: {childSnapshot.val().ava+' '} {userID}
                  </div> 
                  <div className="buttonSet">
                    <button onClick={()=> {
                      that.props.setDeviceActive(childSnapshot.val().num, that.props.test.num)
                    }}> Active/Inactive</button>
                    <button onClick={()=> {
                      that.props.delDevice(childSnapshot.val().num, that.props.test.num)
                    }}> Delete device </button>
                  </div>
                </span>
              </div>
              {/* <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, room, i) } }><img src={delBtn} alt=''/></div> */}
            </div>
          )
          i++
        })
      }).then(() => {
        this.props.showDevice(device)
      })
    } else {
      content = (
        <div>
          Loading . . .
        </div>
      )
    }
    return content    
  }
}
const mapStateToProps = (state) => {
  return {
    exam: state.exam,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputlog, regisfire, showDevice, addDevice, setActive, delDevice, setDeviceActive, pushOrder, clearOrder, submitOrder, getOrder, matchDevice
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExRoomContainer)
