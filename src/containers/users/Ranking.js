import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Ranking } from '../../components/users/Ranking/Ranking.js'
import { inputreg } from '../../actions/input.js'
import { getranking } from '../../actions/user.js'
import {NavLink, Link} from 'react-router-dom'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
class RankingContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let set = []
    let mykey = []
    let myset = []
    let mystep = []
    let mypos = 0
    let data = []
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let i = 0
        firebase.database().ref('/history/').once('value',  (snapshot) => {
          snapshot.forEach( (childSnapshot) => {
            childSnapshot.forEach ( (youngSnapshot) =>{
              if (youngSnapshot.key === firebase.auth().currentUser.uid) {
                myset[i] = youngSnapshot.val().set
                mystep[i] = youngSnapshot.val().step
                mykey[i] = childSnapshot.key
                i++
              }
            })
          })
        }).then(() => {
          that.props.getranking(arr, mykey, user)
        }).then(() => {
          for (let j = 0, k = 0; j < that.props.user.key.length; j++) {
            firebase.database().ref('/history/' + that.props.user.key[j]).once('value', (snapshot) => {
              mykey = snapshot.key
              snapshot.forEach( (childSnapshot) => {
                set[j,k] = childSnapshot.val().set
                if (childSnapshot.val().set === myset[j] && childSnapshot.val().step === mystep[j]) {
                  mypos = k
                }
                k++
              })
            }).then(() => {
              let sorted = set.slice().sort((a,b) => {return b-a})
              let ranks = set.slice().map((v) => { return sorted.indexOf(v)+1 })
              set = set.sort()
              data = []
              for (let x = 0; x < set.length; x++) {
                data[x] = {set: set[j,x]}
              }
              set = []
              arr[j] = (
                <div key={j} style={{'width': '100%'}}>
                  <div>{'Test key: ' + mykey}</div>
                  <div>{' RANK NUMBER: ' + ranks[mypos]}</div>
                  <div>{'Step: ' + mystep[j] + ' Set: ' + myset[j]}</div>
                  <BarChart width={375} height={250} data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="set" />
                    <YAxis  value= "100"/>
                    <Bar dataKey="set" fill="#8884d8" />
                    <Tooltip />
                  </BarChart>
                </div>
              )
              i++
            }).then(() => {
              that.props.getranking(arr, mykey, user)
            })
          }
        })
      }
    })
  }
  render () {
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
        <div className="loader"></div>
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
