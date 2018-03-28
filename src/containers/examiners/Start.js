import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Start } from '../../components/examiners/Start/Start.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom, setActive, delRoom, getRoomNum, sendresult, setTime } from '../../actions/test.js'

class ExStartContainer extends React.Component {
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
    let content = ''
    if (!this.props.test.num) {
      // window.location = '/examiner/test'
    }
    if (firebase.auth().currentUser)
    {
      content = (
        <div>
          <Start {...this.props} />
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
      inputreg, regisfire, showroom, addroom, setActive, delRoom, getRoomNum, sendresult, setTime
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExStartContainer)
