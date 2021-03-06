import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/examiners/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom, setActive, delRoom, getRoomNum } from '../../actions/test.js'
import { Link } from 'react-router-dom'
import './style.css'
class ExTestContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentUser: null
    }
  }

  componentWillUpdate() {
    let i = 0
    let that = this
    let content = []
    let ava = ''
    if (firebase.auth().currentUser)
    {
      firebase.database().ref('/rooms/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const TestBtn = childSnapshot.val().ava ? 'RoomAvaBtn' : 'RoomNotAvaBtn'
          if (childSnapshot.val().ava) {
            ava = 'พร้อม'
          } else {
            ava = 'ปรับปรุง'
          }
          content.push(
            <div key={i}>
              <div>
                <span><Link to ={'/examiner/test/room'} onClick={()=> {
                  that.props.getRoomNum(childSnapshot.val().num)
                }}>
                  <div className={TestBtn}> สถานที่ทดสอบ:{childSnapshot.val().num}: {ava}</div> 
                </Link>
                <div className="buttonSet">
                  <button onClick={()=> {
                    that.props.setActive(childSnapshot.val().num)
                  }} > เปิด/ปิด</button>
                  <button onClick={()=> {
                    let answer = window.confirm('คำเตือน!: คุณกำลังจะลบสถานที่หมายเลข ' + childSnapshot.val().num + ' ยืนยัน?')
                    if (answer) {
                      that.props.delRoom(childSnapshot.val().num)
                    }
                  }}>ลบสถานที่ทดสอบ </button>
                </div>
                </span>
              </div>
              {/* <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, room, i) } }><img src={delBtn} alt=''/></div> */}
            </div>
          )
          i++
        })
      }).then(() => {
        this.props.showroom(content)
      })
    } else {
      content = (
        <div className="loader"></div>
      )
    }
  }

  componentDidMount() {
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
          <Test {...this.props} />
        </div>
      )
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
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputreg, regisfire, showroom, addroom, setActive, delRoom, getRoomNum
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExTestContainer)
