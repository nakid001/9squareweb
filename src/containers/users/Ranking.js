import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Ranking } from '../../components/users/Ranking/Ranking.js'
import { getranking, goNext, goPrevious } from '../../actions/user.js'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts'
import * as commonConstant from '../../commonConstant'
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
    let type = []
    let time = []
    let dateTime = []
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userList = []
        let userDetail = {}
        let roundDetail = []
        firebase.database().ref('/history').once('value', (snapshot) => {
          snapshot.forEach((yearSnapshot) => {
            yearSnapshot.forEach((monthSnapshot) => {
              monthSnapshot.forEach((daySnapshot) => {
                daySnapshot.forEach((timeSnapshot) => {
                  timeSnapshot.forEach((dataSnapshot) => {
                    // set[k] = dataSnapshot.val().set
                    // userkey[k] = dataSnapshot.key
                    // k++
                    // if (dataSnapshot.key === firebase.auth().currentUser.uid) {
                    //   mypos[i] = k-1
                    //   myset[i] = dataSnapshot.val().set
                    //   mystep[i] = dataSnapshot.val().step
                    //   mykey[i] = yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key
                    //   if (!dataSnapshot.val().type) {
                    //     type[i] = 'ไม่มีข้อมูล'
                    //   } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.split[index])) {
                    //     type[i] = 'แยกชิด'
                    //   } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.upDown[index])) {
                    //     type[i] = 'ขึ้นลง'
                    //   } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.xCross[index])) {
                    //     type[i] = 'กากบาท'
                    //   } else {
                    //     type[i] = dataSnapshot.val().type
                    //   }
                    //   if (!dataSnapshot.val().time) {
                    //     time[i] = 'ไม่มีข้อมูล'
                    //   } else {
                    //     time[i] = dataSnapshot.val().time
                    //   }
                    //   i++
                    //   k=0
                    //   naset.push(set)
                    //   set = []
                    //   num++
                    // }
                    userDetail.set = dataSnapshot.val().set
                    userDetail.step = dataSnapshot.val().step
                    userDetail.userId = dataSnapshot.key

                    console.log(dataSnapshot.val())

                    // SET TYPE
                    if (!dataSnapshot.val().type) {
                      user.type = ('ไม่มีข้อมูล')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.split[index])) {
                      user.type = ('แยกชิด')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.upDown[index])) {
                      user.type = ('ขึ้นลง')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.xCross[index])) {
                      user.type = ('กากบาท')
                    } else {
                      user.type = (dataSnapshot.val().type)
                    }

                    // SET TIME
                    if (!dataSnapshot.val().time) {
                      userDetail.time = 'ไม่มีข้อมูล'
                    } else {
                      userDetail.time = dataSnapshot.val().time
                    }
                    userList.push(userDetail)
                    userDetail = {}
                  })
                  dateTime.push(yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key)
                  roundDetail.push(userList)
                  userList = []
                })
              })
            })
          })
        })
        // .then(() => {
        //   for (let j = 0; j < num; j++) {
        //     let sorted = naset[j].slice().sort((a,b) => {return b-a})
        //     let ranks = naset[j].slice().map((v) => { return sorted.indexOf(v)+1 })
        //     naset[j] = naset[j].sort()
        //     data = []
        //     for (let x = 0; x < naset[j].length; x++) {
        //       data[x] = {set: naset[j][x]}
        //     }
        //     console.log(sorted)
        //     arr[j] = (
        //       <div key={j} style={{'width': '100%'}}>
        //         <div>{'วัน/เวลา : ' + mykey[j]}</div>
        //         <div>{' อันดับ : ' + ranks[mypos[j]] + ' ชนิด: ' + type[j] + ' เวลา ' + time[j]}</div>
        //         <div>{ ' เซต: ' + myset[j] + ' ก้าว : ' + mystep[j] }</div>
        //         <BarChart width={375} height={250} data={data} >
        //           <CartesianGrid strokeDasharray="3 3" />
        //           <Tooltip />
        //           <XAxis dataKey="set" />
        //           <YAxis  value= "100"/>
        //           <Bar dataKey="set" fill="#8884d8" />
        //         </BarChart>
        //       </div>
        //     )
        //     i++
        //   }
        .then(() => {
          roundDetail.forEach((dataSorted) => {
            dataSorted = dataSorted.sort((a, b) => {
              return a.set - b.set
            })
            // need to sort step
            dataSorted.forEach((dataDetail, index) => {
              console.log(dataDetail, firebase.auth().currentUser.uid)
              if (dataDetail.userId === firebase.auth().currentUser.uid) {
                let rank = index + 1
                arr.push(
                  <div key={index} style={{'width': '100%'}}>
                    <div>{'วัน/เวลา : ' + dateTime[index]}</div>
                    <div>{' อันดับ : ' + rank + ' ชนิด: ' + dataDetail.type + ' เวลา ' + dataDetail.time}</div>
                    <div>{ ' เซต: ' + dataDetail.set + ' ก้าว : ' + dataDetail.step }</div>
                    <BarChart width={375} height={250} data={data} >
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <XAxis dataKey="set" />
                      <YAxis  value= "100"/>
                      <Bar dataKey="set" fill="#8884d8" />
                    </BarChart>
                  </div>
                )
              }
            }) 
          })
        }).then(() => {
          console.log(arr)
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
