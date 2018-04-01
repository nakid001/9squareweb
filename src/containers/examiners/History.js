import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { History } from '../../components/examiners/History/History.js'
import { goNext, goPrevious, canlogin, cannotlogin, addhistory } from  '../../actions/user'
import { gethistory, getid, setDate, clearDate } from  '../../actions/examiner'

import * as firebase from 'firebase'
class HistoryContainer extends React.Component {

  componentDidMount() {
    let that = this
    firebase.auth().onAuthStateChanged(function (userF) {
      if (userF) {
        let history = []
        let id = []
        if (firebase.auth().currentUser) {
          let i = 0
          if (that.props.exam.date === '') {
            firebase.database().ref('/history').once('value', (snapshot) => {
              snapshot.forEach((yearSnapshot) => {
                yearSnapshot.forEach((monthSnapshot) => {
                  monthSnapshot.forEach((daySnapshot) => {
                    daySnapshot.forEach((timeSnapshot) => {
                      timeSnapshot.forEach((dataSnapshot) => {
                        id[i] = (
                          <tr key={i}>
                            <td><button onClick = {() => {
                              that.props.setDate(yearSnapshot.key + '/' + monthSnapshot.key + '/' + daySnapshot.key + '/' + timeSnapshot.key + '/')
                            }}> {yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key} </button></td>
                          </tr>
                        )
                        i++
                      })
                    })
                  })
                })
              })
            }).then(() => {
              that.props.getid(id)
              that.props.canlogin(userF)
            })
          } else {
            i = 0
            alert(this.props.exam.date)
            firebase.database().ref('/history/'+that.props.exam.date).once('value', (snapshot) => {
              snapshot.forEach((dataSnapshot) => {
                history[i] = (
                  <tr key={i}>
                    <td>{that.props.exam.date}</td>
                    <td>{dataSnapshot.val().set}</td>
                    <td>{dataSnapshot.val().step}</td>
                  </tr>
                )
                i++
              }
              )} 
            ).then(() => {
              this.props.gethistory(history)
              that.props.canlogin(userF)
            })}
          
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
    user: state.user,
    exam: state.exam,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      gethistory, getid, goNext, goPrevious, canlogin, cannotlogin, addhistory, setDate, clearDate
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)