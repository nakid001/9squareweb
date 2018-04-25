import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { History } from '../../components/examiners/History/History.js'
import { goNext, goPrevious, canlogin, cannotlogin, addhistory, gethistory, clearNum } from  '../../actions/user'
import {  getid, setDate, clearDate } from  '../../actions/examiner'

import * as firebase from 'firebase'
class HistoryContainer extends React.Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        let id = []
        let temp = ''
        if (firebase.auth().currentUser) {
          let i = 0
          if (that.props.exam.date === '') {
            firebase.database().ref('/history').once('value', (snapshot) => {
              snapshot.forEach((yearSnapshot) => {
                yearSnapshot.forEach((monthSnapshot) => {
                  monthSnapshot.forEach((daySnapshot) => {
                    daySnapshot.forEach((timeSnapshot) => {
                      timeSnapshot.forEach((dataSnapshot) => {
                        if (yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key !== temp) {
                          id[i] = (
                            <tr key={i}>
                              <td><button onClick = {() => {
                                that.props.setDate(yearSnapshot.key + '/' + monthSnapshot.key + '/' + daySnapshot.key + '/' + timeSnapshot.key + '/').then(() => {
                                  that.historySubContent()
                                })
                              }}> {yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key} </button></td>
                            </tr>
                          )
                          temp = yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key
                          i++
                        }
                      })
                    })
                  })
                })
              })
            }).then(() => {
              that.props.getid(id)
              that.props.canlogin(userF)
            })
          }           
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
  historySubContent () {
    let i = 0 
    let history = []
    let that = this
    let type = '', time = '', email ='ไม่มีข้อมูล '
    if (firebase.auth().currentUser)  {
      i = 0
      firebase.database().ref('/history/'+that.props.exam.date).once('value', (Multishot) => {
        Multishot.forEach((dataMultishot) => {
          if (!dataMultishot.val().type) {
            type = 'ไม่มีข้อมูล'
          } else if (dataMultishot.val().type[0] === '1' && dataMultishot.val().type[1] === '3' && dataMultishot.val().type[2] === '2' && dataMultishot.val().type[3] === '2') {
            type = 'แยกชิด'
          } else if (dataMultishot.val().type[0] === '5' && dataMultishot.val().type[1] === '6' && dataMultishot.val().type[2] === '8' && dataMultishot.val().type[3] === '9' && dataMultishot.val().type[4] === '5' && dataMultishot.val().type[5] === '6' && dataMultishot.val().type[6] === '2' && dataMultishot.val().type[7] === '3') {
            type = 'ขึ้นลง'    
          } else if (dataMultishot.val().type[0] === '5' && dataMultishot.val().type[1] === '5' && dataMultishot.val().type[2] === '7' && dataMultishot.val().type[3] === '9' && dataMultishot.val().type[4] === '5' && dataMultishot.val().type[5] === '5' && dataMultishot.val().type[6] === '1' && dataMultishot.val().type[7] === '3') {
            type = 'กากบาท'
          }
          else {
            type = dataMultishot.val().type
          }
          if (!dataMultishot.val().time) {
            time = 'ไม่มีข้อมูล'
          } else {
            time = dataMultishot.val().time
          }
          firebase.database().ref('/users/' + dataMultishot.key).once('value', (userSnapshot) => {
            if(userSnapshot.val()) {
              email = userSnapshot.val().email
            }
          }).then(() => {
            history[i] = (
              <tr key={i}>
                <td>{that.props.exam.date}</td>
                <td>{email}</td>
                <td>{dataMultishot.val().set}</td>
                <td>{dataMultishot.val().step}</td>
                <td>{type}</td>
                <td>{time}</td>         
              </tr>
            )
            i++
          }).then(() => {
            that.props.clearNum()
            this.props.gethistory(history, this.props.user.username)
          })
        }
        )} 
      )
    }
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
    user: state.user,
    exam: state.exam,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      gethistory, clearNum, getid, goNext, goPrevious, canlogin, cannotlogin, addhistory, setDate, clearDate
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)