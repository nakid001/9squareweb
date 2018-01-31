import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Ranking } from '../../components/users/Ranking/Ranking.js'
import { inputreg } from '../../actions/input.js'
import { getranking } from '../../actions/user.js'
import {NavLink, Link} from 'react-router-dom'

class RankingContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let set = []
    let i = 0 
    let mykey = []
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let i = 0
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/history/').once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val())
            arr[i] = (
                <tr key={i}>
                  <td>{childSnapshot.key}</td>
                </tr>
              )
            mykey[i] = childSnapshot.key
            i++
          })
        }).then(() => {
          that.props.getranking(arr, mykey, user)
        }).then(() => {
          for (let j = 0, k = 0; j < that.props.user.key.length; j++) {
            firebase.database().ref('/history/' + that.props.user.key[j]).once('value', (snapshot) => {
              snapshot.forEach(function (childSnapshot) {
                set[j,k] = childSnapshot.val().set
                k++
              })
            }).then(() => {
              console.log(set)  
            })
          }
        })
      }
    })
  }
  render () {
    let i = 0
    let that = this
    let content = ''
    if (firebase.auth().currentUser)
    {
      content = (
        <div>
          <Ranking {...this.props} />
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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getranking
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RankingContainer)
