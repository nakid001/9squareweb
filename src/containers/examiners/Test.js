import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/examiners/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom, setActive, delRoom, getRoomNum } from '../../actions/test.js'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './style.css'
class ExTestContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let i = 0 
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
          room[i] = (
            <div key={i}>
              <div>
                <span><Link to ={'/examiner/test/room'} onClick={()=> {
                  that.props.getRoomNum(childSnapshot.val().num)
                }}>
                  <div className='roomBtn'> Room:{childSnapshot.val().num}</div> 
                </Link>
                <div className="buttonSet">
                  <button onClick={()=> {
                    that.props.setActive(childSnapshot.val().num)
                  }} > Active/Inactive</button>
                  <button onClick={()=> {
                    that.props.delRoom(childSnapshot.val().num)
                  }}> Delete room </button>
                </div>
                </span>
              </div>
              {/* <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, room, i) } }><img src={delBtn} alt=''/></div> */}
            </div>
          )
          i++
        })
      }).then(() => {
        this.props.showroom(room)
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
      inputreg, regisfire, showroom, addroom, setActive, delRoom, getRoomNum
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExTestContainer)
