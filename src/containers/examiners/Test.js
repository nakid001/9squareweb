import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/examiners/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom, setActive, delRoom } from '../../actions/test.js'
import {NavLink} from 'react-router-dom'

class ExTestContainer extends React.Component {

  render () {
    let i = 0
    let that = this
    let room = []
    let content = ''
    if (firebase.auth().currentUser)
    {
      i = 0
      content = (
        <div>
          <Test {...this.props} />
        </div>
        )
      firebase.database().ref('/rooms/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          room[i] = (
              <div className='col-8 payment_itemDiv' key={i}>
                <div className='payment_itemDiv--mid'>
                  <span><span className='' href ='/room'>Room:{childSnapshot.val().num}: {childSnapshot.val().ava+' '}</span>
                  <button onClick={()=> {
                    that.props.setActive(i)
                    }}> Active/Inactive</button>
                  <button onClick={()=> {
                    that.props.delRoom(i)
                    }}> Delete room </button>
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
    } else if (firebase.auth().onAuthStateChanged) {
      content = (
        <div>
          <Test {...this.props} />
        </div>
        )
      firebase.database().ref('/rooms/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          room[i] = (
              <div className='col-8 payment_itemDiv' key={i}>
                <div className='payment_itemDiv--mid'>
                  <span><span className='' href ='/room'>Room:{i+1}: {childSnapshot.val().ava+''}</span></span>
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
    user: state.user,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputreg, regisfire, showroom, addroom, setActive, delRoom
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExTestContainer)
