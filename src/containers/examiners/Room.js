import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Room } from '../../components/examiners/Room/Room.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showDevice, addDevice, setActive, delDevice, setDeviceActive, getRoomNum, pushOrder, clearOrder, submitOrder, getOrder } from '../../actions/test.js'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

class ExRoomContainer extends React.Component {
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
          <Room {...this.props} />
        </div>
        )
      if (!this.props.test.num) {
        window.location = '/examiner/test'
      }
      firebase.database().ref('/rooms/room'+this.props.test.num+'/devices/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          device[i] = (
            <div className='col-8 payment_itemDiv' key={i}>
              <div className='payment_itemDiv--mid'>
                <span><Link to ={'/examiner/test/room'+that.props.test.num+'/device'+childSnapshot.val().num}>Device:{childSnapshot.val().num}: {childSnapshot.val().ava+' '}</Link>
                  <button onClick={()=> {
                    that.props.setDeviceActive(childSnapshot.val().num, that.props.test.num)
                    }}> Active/Inactive</button>
                  <button onClick={()=> {
                    that.props.delDevice(childSnapshot.val().num, that.props.test.num)
                    }}> Delete device </button>
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
      inputreg, regisfire, showDevice, addDevice, setActive, delDevice, setDeviceActive, pushOrder, clearOrder, submitOrder, getOrder
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExRoomContainer)
