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
                                that.props.setDate(yearSnapshot.key + '/' + monthSnapshot.key + '/' + daySnapshot.key + '/' + timeSnapshot.key + '/')
                                that.props.clearNum()
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

  render () {
    let i = 0 
    let history = []
    let that = this
    let type = ''
    if (firebase.auth().currentUser)  {
      i = 0
      firebase.database().ref('/history/'+that.props.exam.date).once('value', (snapshot) => {
        snapshot.forEach((dataSnapshot) => {
          if (!dataSnapshot.val().type) {
            type = 'ไม่มีข้อมูล'
          } else if (dataSnapshot.val().type[0] === '1' && dataSnapshot.val().type[1] == '3' && dataSnapshot.val().type[2] == '2' && dataSnapshot.val().type[3] == '2') {
            type = 'แยกชิด'
          } else if (dataSnapshot.val().type[0] === '5' && dataSnapshot.val().type[1] == '6' && dataSnapshot.val().type[2] == '8' && dataSnapshot.val().type[3] == '9' && dataSnapshot.val().type[4] == '5' && dataSnapshot.val().type[5] == '6' && dataSnapshot.val().type[6] == '2' && dataSnapshot.val().type[7] == '3') {
            type = 'ขึ้นลง'    
          } else if (dataSnapshot.val().type[0] === '5' && dataSnapshot.val().type[1] == '5' && dataSnapshot.val().type[2] == '7' && dataSnapshot.val().type[3] == '9' && dataSnapshot.val().type[4] == '5' && dataSnapshot.val().type[5] == '5' && dataSnapshot.val().type[6] == '1' && dataSnapshot.val().type[7] == '3') {
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
          history[i] = (
            <tr key={i}>
              <td>{that.props.exam.date}</td>
              <td>{dataSnapshot.key}</td>
              <td>{dataSnapshot.val().set}</td>
              <td>{dataSnapshot.val().step}</td>
              <td>{type}</td>              
            </tr>
          )
          i++
        }
        )} 
      ).then(() => {
        this.props.gethistory(history, this.props.user.username)
      })
    }
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