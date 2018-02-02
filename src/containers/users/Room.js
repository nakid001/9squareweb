import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Room } from '../../components/users/Room/Room.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showDevice, addDevice, setActive, delDevice, setDeviceActive, getRoomNum, getOrder, matchUserDevice } from '../../actions/test.js'
import {NavLink, Link} from 'react-router-dom'

class RoomContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let order = []
    let device = []

    let i = 0 
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
    firebase.database().ref('/rooms/room'+this.props.test.num+'/devices/').on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const DeviceBtn = childSnapshot.val().ava ? 'DeviceAvaBtn' : 'DeviceNotAvaBtn'   
        const userID = childSnapshot.val().user       
        device[i] = (
          <div className='col-8' key={i}>
            <div className='payment_itemDiv--mid'>
              <span>
                <p className='col-12'/>
                <button className={DeviceBtn} onClick={ () => {
                  if (DeviceBtn === 'DeviceAvaBtn') {
                    let answer = window.confirm('Match to device ' + childSnapshot.val().num + ' ?')
                    if (answer) {
                      that.props.matchUserDevice(firebase.auth().currentUser.email, firebase.auth().currentUser.uid, that.props.test.num, childSnapshot.val().num)
                    }
                    else {
                      //some code
                    }
                  } else {  
                    alert('DEVICE IS NOT READY!!')
                  }
                } 
                }> Device:{childSnapshot.val().num}: {childSnapshot.val().ava+' '} {userID}</button> 
              </span>
            </div>
          </div>
        )
        i++
      })
      that.props.showDevice(device)
      console.log(device)
      device = []
    })
    
  }
  render () {
    let i = 0
    let that = this
    let content = ''
    if (firebase.auth().currentUser)
    {
      content = (
        <div>
          <Room {...this.props} />
        </div>
      )
      if (!this.props.test.num) {
        window.location = '/test'
      } 
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
      inputreg, regisfire, showDevice, addDevice, setActive, delDevice, setDeviceActive, getOrder, matchUserDevice
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer)
