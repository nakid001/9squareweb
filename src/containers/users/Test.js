import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/users/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom } from '../../actions/test.js'
class TestContainer extends React.Component {

    componentWillMount() {
      let that = this
      let arr = []
      let i = 0 
      firebase.database().ref('/Room/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            arr[i] = childSnapshot.val()
            i++
          })
          that.props.showroom(arr)
        }).then(() => {
            console.log(this.props.test.room[0])
        })
    }
  render () {
    if (firebase.auth().currentUser) {
      return (
        <div>
          <Test {...this.props} />
        </div>
      )    } else {
      alert('PLEASE LOGIN')
      window.location = '/login'
      return (
        <div>
          Loading...
        </div>
      )      
    }

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
      inputreg, regisfire, showroom
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)
