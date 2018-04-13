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
                        } else if (dataSnapshot.val().type === ['1L ']) {
                          type = 'แยกชิด'
                          alert('yaya')
                        } else if (dataSnapshot.val().type === ['5L ', '6R ', '8L ', '9R ', '5L ', '6R ', '2L ', '3R ']) {
                          type[i] = 'ขึ้นลง'    
                        } else if (dataSnapshot.val().type === ['5L ', '5R ', '7L ', '9R ', '5L ', '5R ', '1L ', '3R ']) {
                          type = 'กากบาท'
                        } else {
                          type = dataSnapshot.val().type
                          console.log(dataSnapshot.val().type[0])
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