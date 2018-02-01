import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Ranking } from '../../components/users/Ranking/Ranking.js'
import { inputreg } from '../../actions/input.js'
import { getranking } from '../../actions/user.js'
import {NavLink, Link} from 'react-router-dom'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
class RankingContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let set = []
    let i = 0 
    let mykey = []
    let myset = []
    let mystep = []
    let mypos = 0
    let data = []
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let i = 0
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/history/').once('value',  (snapshot) => {
          snapshot.forEach( (childSnapshot) => {
            myset[i] = childSnapshot.val().set
            mystep[i] = childSnapshot.val().step
            mykey[i] = childSnapshot.key
            i++
          })
        }).then(() => {
          that.props.getranking(arr, mykey, user)
        }).then(() => {
          for (let j = 0, k = 0; j < that.props.user.key.length; j++) {
            firebase.database().ref('/history/' + that.props.user.key[j]).once('value', (snapshot) => {
              mykey = snapshot.key
              snapshot.forEach( (childSnapshot) => {
                set[j,k] = childSnapshot.val().set
                data[j,k] = {set: set[j,k]}
                if (childSnapshot.val().set === myset[j] && childSnapshot.val().step === mystep[j]) {
                  console.log(childSnapshot.val().set + ' ' +myset[j] + ' ' + j + ' ' + k) 
                  mypos = k
                }
                k++
              })
            }).then(() => {
              set = set.sort()
              data[k] = {set: set[j, k]}
              let sorted = set.slice().sort((a,b) => {return b-a})
              let ranks = set.slice().map((v) => { return sorted.indexOf(v)+1 })
              arr[i] = (
                <div key={i} style={{'width': '100%'}}>
                  <td>{mykey}</td>
                  <td>{ranks[mypos]}</td>
                  <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  value= "100"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="set" fill="#8884d8" />
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
