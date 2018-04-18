import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/users/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, getRoomNum } from '../../actions/test.js'
import { Link } from 'react-router-dom'
import './style.css'
class TestContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: 'empty'
    }
  }

  componentWillMount() {
    let that = this
    let arr = []
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.props.showroom(arr)          
      }
    })
  }
  render () {
    let i = 0
    let that = this
    let room = []
    let content = ''
    if (firebase.auth().currentUser)
    {
      content = (
        <div>
          <Test {...this.props} />
        </div>
      )
      firebase.database().ref('/rooms/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const TestBtn = childSnapshot.val().ava ? 'roomBtn' : 'RoomNotAvaBtn'
          if (!childSnapshot.val().ava) {
            content = (
              <div key={i}>
                <div>
                  <p className='col-12'/>
                  <div className={TestBtn}> สถานที่ทดสอบ:{childSnapshot.val().num} {'ปรับปรุง'}</div> 
                  
                </div>
              </div>
            )
          } else {
            content = (
              <div key={i}>
                <div>
                  <Link to ={'/test/room'} onClick={()=> {
                    that.props.getRoomNum(childSnapshot.val().num)
                  }}>
                    <p className='col-12'/>
                    <div className={TestBtn}> สถานที่ทดสอบ:{childSnapshot.val().num} </div> 
                  </Link>
                  
                </div>
              </div>
            )
          }
          room[i] = content
          i++
        })
      }).then(() => {
        this.props.showroom(room)
      })
    } else
    {
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
      inputreg, regisfire, showroom, getRoomNum
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)
