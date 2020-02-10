import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Room } from '../../components/examiners/Room/Room.js'
import { inputlog } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showDevice, addDevice, setActive, delDevice, setDeviceActive, pushOrder, clearOrder, submitOrder, getOrder, matchDevice, matchUserDevice } from '../../actions/test.js'

class ExRoomContainer extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      roomtest: '',
      device: [],
      num: 0,
      order: [],
      deviceNumber: 0,
      currentUser: null
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

  componentWillUpdate() {
    let i = 0
    let that = this
    let device = []
    let content = ''
    let ava = ''
    if (firebase.auth().currentUser)
    {

      firebase.database().ref('/rooms/room'+this.props.test.num+'/devices/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const RoomeBtn = childSnapshot.val().ava ? 'RoomAvaBtn' : 'RoomNotAvaBtn'   
          const userID = childSnapshot.val().user       
          if (childSnapshot.val().ava) {
            ava = 'พร้อม'
          } else {
            ava = 'จอง '
          }
          device[i] = (
            <div className='' key={i}>
              <div className=''>
                <span>
                  <div className={RoomeBtn} onClick ={() => {
                    let person = prompt('กำหนดผู้ใช้ให้อุปกรณ์เบอร์ ' + childSnapshot.val().num)
                    let uid = ''
                    firebase.database().ref('users').once('value', (snapshot) => {
                      snapshot.forEach((childSnapshot) => {
                        if (childSnapshot.val().email === person) {
                          uid = childSnapshot.key
                        }
                      })
                    }).then(() => {
                      if (!person) {
                        return null
                      }
                      if (uid === '') {
                        alert('ไม่มีEmailนี้')
                      } else {
                        that.props.matchUserDevice(person, uid, that.props.test.num, childSnapshot.val().num)
                      }
                    })
                  }} data-tip data-for={userID} > อุปกรณ์หมายเลข:{childSnapshot.val().num}: {ava} 
                    {userID}
                  </div> 
                  <div className="buttonSet">
                    <button onClick={()=> {
                      that.props.setDeviceActive(childSnapshot.val().num, that.props.test.num)
                    }}> เปิด/ปิด</button>
                    <button onClick={()=> {
                      let answer = window.confirm('คำเตือน!: คุณกำลังจะลบอุปกรณ์หมายเลข ' + childSnapshot.val().num + ' ยืนยัน?')
                      if (answer) {
                        that.props.delDevice(childSnapshot.val().num, that.props.test.num)
                      }
                    }}> ลบอุปกรณ์</button>
                  </div>
                </span>
              </div>
            </div>
          )
          i++
        })
      }).then(() => {
        this.props.showDevice(device)
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
        <Room {...this.props}   
          openModal = {this.openModal.bind(this)}
          afterOpenModal = {this.afterOpenModal.bind(this)}
          closeModal = {this.closeModal.bind(this)}
          handleChange = {this.handleChange.bind(this)} />
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
    exam: state.exam,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputlog, regisfire, showDevice, addDevice, setActive, delDevice, setDeviceActive, pushOrder, clearOrder, submitOrder, getOrder, matchDevice, matchUserDevice
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExRoomContainer)
