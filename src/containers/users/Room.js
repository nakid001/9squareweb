import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Room } from '../../components/users/Room/Room.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showDevice, addDevice, setActive, delDevice, setDeviceActive, getOrder, matchUserDevice } from '../../actions/test.js'
import ReactTooltip from 'react-tooltip'

class RoomContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      device: [],
      currentUser: null
    }
  }
  componentWillUpdate() {
    let i = 0
    let that = this
    let device = []
    let content = ''
    let ava = ''
    let order = []
    if (firebase.auth().currentUser)
    {
      firebase.database().ref('/rooms/room'+this.props.test.num+'/devices/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const DeviceBtn = childSnapshot.val().ava ? 'DeviceAvaBtn' : 'DeviceNotAvaBtn'   
          if (childSnapshot.val().ava) {
            ava = 'ว่าง'
          } else {
            ava = 'จอง '
          }
          const userID = childSnapshot.val().user       
          device[i] = (
            <div className='' key={i}>
              <div>
                <span>
                  <p className='col-12'/>
                  <div className={DeviceBtn} onClick={ () => {
                    if (DeviceBtn === 'DeviceAvaBtn') {
                      let answer = window.confirm('จับคู่กับอุปกรณ์หมายเลข ' + childSnapshot.val().num + ' ?')
                      if (answer) {
                        that.props.matchUserDevice(firebase.auth().currentUser.email, firebase.auth().currentUser.uid, that.props.test.num, childSnapshot.val().num)
                      }
                      else {
                        //some code
                      }
                    } else {  
                      alert('อุปกรณ์ยังไม่พร้อม !!')
                    }
                  }   
                  } data-tip data-for={userID} > อุปกรณ์หมายเลข:{childSnapshot.val().num}: {ava} 
                    {userID}
                  </div> 
                </span>
              </div>
            </div>
          )
          i++
        })
      }).then(() => {
        that.props.showDevice(device) 
      })
    } else {
      content = (
        <div className="loader"></div>
      )
    }
    return content    
  }

  componentDidMount() {
    let that = this
    let order = []
    firebase.database().ref('/rooms/room'+that.props.test.num).once('value', function (snapshot) {
      if (snapshot.val().order) {
        order = snapshot.val().order
      }
    }).then(() => {
      that.props.getOrder(order)                
    })  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  render () {
    let content = ''
    if ( this.state.currentUser) {
      content = (
        <div>
          <Room 
            num = {this.props.test.num}
            device = {this.props.test.device}
            order = {this.props.test.order}
          />
        </div>
      )
      if (!this.props.test.num) {
        window.location = '/test'
      } 
    } else {
      content = (
        <div className="loader"></div>
      )
    }
    return content
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
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