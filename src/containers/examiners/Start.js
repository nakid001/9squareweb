import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Start } from '../../components/examiners/Start/Start.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom, setActive, delRoom, getRoomNum, sendresult } from '../../actions/test.js'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

class ExStartContainer extends React.Component {
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
          <Start {...this.props} />
        </div>
      )                
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
      inputreg, regisfire, showroom, addroom, setActive, delRoom, getRoomNum, sendresult
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExStartContainer)
