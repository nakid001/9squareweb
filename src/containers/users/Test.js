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
      room: 'empty',
      currentUser: null
    }
  }

  componentWillUpdate() {
    let i = 0
    let that = this
    let content = []
    if (firebase.auth().currentUser) {
      firebase.database().ref('/rooms/').once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          const TestBtn = childSnapshot.val().ava ? 'roomBtn' : 'RoomNotAvaBtn'
          if (!childSnapshot.val().ava) {
            content.push(
              <div key={i}>
                <div>
                  <p className='col-12'/>
                  <div className={TestBtn}> สถานที่ทดสอบ:{childSnapshot.val().num} {'ปรับปรุง'}</div> 
                  
                </div>
              </div>
            )
          } else {
            content.push(
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
