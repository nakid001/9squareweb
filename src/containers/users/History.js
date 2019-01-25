import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { History } from '../../components/users/History/History.js'
import { gethistory, goNext, goPrevious, canlogin, cannotlogin } from  '../../actions/user'

import * as firebase from 'firebase'
class HistoryContainer extends React.Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        let history = []
        let type = '', time = ''
        if (firebase.auth().currentUser) {
          let i = 0
          firebase.database().ref('/history').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              childSnapshot.forEach((elderSnapshot) => {
                elderSnapshot.forEach((brotherSnapshot) => {
                  brotherSnapshot.forEach((timeSnapshot) => {
                    timeSnapshot.forEach((dataSnapshot) => {
                      if (dataSnapshot.key === firebase.auth().currentUser.uid) {
                        if (!dataSnapshot.val().type) {
                          type = 'ไม่มีข้อมูล'
                        } else if (dataSnapshot.val().type[0] === '1' && dataSnapshot.val().type[1] === '3' && dataSnapshot.val().type[2] === '2' && dataSnapshot.val().type[3] === '2') {
                          type = 'แยกชิด'
                        } else if (dataSnapshot.val().type[0] === '5' && dataSnapshot.val().type[1] === '6' && dataSnapshot.val().type[2] === '8' && dataSnapshot.val().type[3] === '9' && dataSnapshot.val().type[4] === '5' && dataSnapshot.val().type[5] === '6' && dataSnapshot.val().type[6] === '2' && dataSnapshot.val().type[7] === '3') {
                          type = 'ขึ้นลง'    
                        } else if (dataSnapshot.val().type[0] === '5' && dataSnapshot.val().type[1] === '5' && dataSnapshot.val().type[2] === '7' && dataSnapshot.val().type[3] === '9' && dataSnapshot.val().type[4] === '5' && dataSnapshot.val().type[5] === '5' && dataSnapshot.val().type[6] === '1' && dataSnapshot.val().type[7] === '3') {
                          type = 'กากบาท'
                        }
                        
                        //  else if (dataSnapshot.val().type === ['1']) {
                        //   type = 'กากบาท'
                        //   alert('yayayayay')
                        //   alert('oo')
                        // }  
                        else {
                          type = dataSnapshot.val().type
                        }
                        if (!dataSnapshot.val().time) {
                          time = 'ไม่มีข้อมูล'
                        } else {
                          time = dataSnapshot.val().time
                        }
                        history[i] = (
                          <tr key={i}>
                            <td>{ childSnapshot.key + '.' + elderSnapshot.key + '.' + brotherSnapshot.key + '/' + timeSnapshot.key}</td>
                            <td>{dataSnapshot.val().set}</td>
                            <td>{dataSnapshot.val().step}</td>
                            <td>{type}</td>
                            <td>{time}</td>
                          </tr>
                        )
                        i++
                      }
                    })
                  })
                })
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
        that.props.cannotlogin
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
      gethistory, goNext, goPrevious, canlogin, cannotlogin
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)