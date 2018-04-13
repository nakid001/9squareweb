import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { History } from '../../components/users/History/History.js'
import { gethistory, goNext, goPrevious, canlogin, cannotlogin, addhistory } from  '../../actions/user'

import * as firebase from 'firebase'
class HistoryContainer extends React.Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        let history = []
        let type = ''
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
                        } else if (dataSnapshot.val().type[0] === '1L ' && dataSnapshot.val().type[1] == '3R ' && dataSnapshot.val().type[2] == '2L ' && dataSnapshot.val().type[3] == '2R ') {
                          type = 'แยกชิด'
                        } else if (dataSnapshot.val().type[0] === '5L ' && dataSnapshot.val().type[1] == '6R ' && dataSnapshot.val().type[2] == '8L ' && dataSnapshot.val().type[3] == '9R ' && dataSnapshot.val().type[4] == '5L ' && dataSnapshot.val().type[5] == '6R ' && dataSnapshot.val().type[6] == '2L ' && dataSnapshot.val().type[7] == '3R ') {
                          type = 'ขึ้นลง'    
                        } else if (dataSnapshot.val().type[0] === '5L ' && dataSnapshot.val().type[1] == '5R ' && dataSnapshot.val().type[2] == '7L ' && dataSnapshot.val().type[3] == '9R ' && dataSnapshot.val().type[4] == '5L ' && dataSnapshot.val().type[5] == '5R ' && dataSnapshot.val().type[6] == '1L ' && dataSnapshot.val().type[7] == '3R ') {
                          type = 'กากบาท'
                        }
                        
                        //  else if (dataSnapshot.val().type === ['1L ']) {
                        //   type = 'กากบาท'
                        //   alert('yayayayay')
                        //   alert('oo')
                        // }  
                        else {
                          type = dataSnapshot.val().type
                          console.log(dataSnapshot.val().type)
                        }
                        history[i] = (
                          <tr key={i}>
                            <td>{ childSnapshot.key + '.' + elderSnapshot.key + '.' + brotherSnapshot.key + '/' + timeSnapshot.key}</td>
                            <td>{dataSnapshot.val().set}</td>
                            <td>{dataSnapshot.val().step}</td>
                            <td>{type}</td>
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
        that.props.cannotlogin, addhistory()
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
      gethistory, goNext, goPrevious, canlogin, cannotlogin, addhistory
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)