import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Ranking } from '../../components/users/Ranking/Ranking.js'
import { getranking, goNext, goPrevious } from '../../actions/user.js'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'
class RankingContainer extends React.Component {
  componentWillMount() {
    let that = this
    let arr = []
    let set = []
    let naset = []
    let mykey = []
    let myset = []
    let mystep = []
    let mypos = []
    let data = []
    let num = 0
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let i = 0
        let userkey = []
        let j = 0, k = 0
        firebase.database().ref('/history').once('value', (snapshot) => {
          snapshot.forEach((yearSnapshot) => {
            yearSnapshot.forEach((monthSnapshot) => {
              monthSnapshot.forEach((daySnapshot) => {
                daySnapshot.forEach((timeSnapshot) => {
                  timeSnapshot.forEach((dataSnapshot) => {
                    set[k] = dataSnapshot.val().set
                    k++
                    userkey[k] = dataSnapshot.key
                    if (dataSnapshot.key === firebase.auth().currentUser.uid) {
                      mypos[i] = k-1
                      myset[i] = dataSnapshot.val().set
                      mystep[i] = dataSnapshot.val().step
                      mykey[i] = yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key
                      i++
                    }
                  })
                  k=0
                  naset.push(set)
                  set = []
                  num++
                  j++
                })
                j=0
              })
            })
          })
        }).then(() => {
          for (let j = 0; j < num; j++) {
            let sorted = naset[j].slice().sort((a,b) => {return b-a})
            let ranks = naset[j].slice().map((v) => { return sorted.indexOf(v)+1 })
            naset[j] = naset[j].sort()
            data = []
            for (let x = 0; x < naset[j].length; x++) {
              data[x] = {set: naset[j][x]}
            }
            arr[j] = (
              <div key={j} style={{'width': '100%'}}>
                <div>{'วันเวลาที่ทดสอบ : ' + mykey[j]}</div>
                <div>{' อันดับ : ' + ranks[mypos[j]]}</div>
                <div>{' ก้าว : ' + mystep[j] + ' เซต: ' + myset[j]}</div>
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
          }
        }).then(() => {
          that.props.getranking(arr, mykey, user)
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
      getranking, goNext, goPrevious 
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RankingContainer)
