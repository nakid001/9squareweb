import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { History } from '../../components/users/History/History.js'
import { gethistory, canlogin, cannotlogin } from  '../../actions/user'

import * as firebase from 'firebase'
class HistoryContainer extends React.Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        let history = []
        if (firebase.auth().currentUser) {
          let i = 0
          firebase.database().ref('/history').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              childSnapshot.forEach((youngSnapshot) => {
                if (youngSnapshot.key === firebase.auth().currentUser.uid) {
                  history[i] = (
                    <tr key={i}>
                      <td>{ childSnapshot.key}</td>
                      <td>{youngSnapshot.val().set}</td>
                      <td>{youngSnapshot.val().step}</td>
                    </tr>
                  )
                  i++
                }
              })
            })
          }).then(() => {
            that.props.gethistory(history, userF)
            that.props.canlogin(userF)
          })
        } else {
          console.log('please wait')
        }
      } else {
        that.props.cannotlogin()
      }
    })
  }
  
  redirect () {
    window.location = '/login'
  }

  render () {
    if (this.props.user.loading) {
      return <div className="loader"></div>

    } else if (this.props.user.username) {
      return (
        <History {...this.props}/>
      )
    } else {
      alert('Please login first!')
      return (this.redirect())
    }
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
      gethistory, canlogin, cannotlogin
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)