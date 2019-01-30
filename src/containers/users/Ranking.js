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
    let mykey = []
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

                    userDetail.set = dataSnapshot.val().set
                    userDetail.step = dataSnapshot.val().step
                    userDetail.userId = dataSnapshot.key

                    // SET TYPE
                    if (!dataSnapshot.val().type) {
                      userDetail.type = ('ไม่มีข้อมูล')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.split[index])) {
                      userDetail.type = ('แยกชิด')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.upDown[index])) {
                      userDetail.type = ('ขึ้นลง')
                    } else if (dataSnapshot.val().type.map((i, index) => i == commonConstant.xCross[index])) {
                      userDetail.type = ('กากบาท')
                    } else {
                      userDetail.type = (dataSnapshot.val().type)
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

                  // SET DATE TIME
                  dateTime.push(yearSnapshot.key + '.' + monthSnapshot.key + '.' + daySnapshot.key + '/' + timeSnapshot.key)
                  roundDetail.push(userList)
                  userList = []
                })
              })
            })
          })
        }).then(() => {
          roundDetail.forEach((dataSorted, indexRound) => {
            let dataShow = []
            dataSorted = dataSorted.sort((a, b) => {
              return a.set - b.set
            })
            // need to sort step
            let temp = 0
            let tempNum = 0
            dataSorted.forEach((dataDetail, index) => {
              if (dataDetail.set === temp && dataDetail.set !== 0) {
                dataShow[tempNum-1].count +=1
              } else {
                temp = dataDetail.set
                tempNum += 1
                dataShow.push({set: dataDetail.set, count: 1})
              }
              if (dataDetail.userId === firebase.auth().currentUser.uid) {
                let rank = index + 1
                arr.push(
                  <div key={indexRound+index} style={{'width': '100%'}}>
                    <div>{'วัน/เวลา : ' + dateTime[indexRound]}</div>
                    <div>{' อันดับ : ' + rank + ' ชนิด: ' + dataDetail.type + ' เวลา ' + dataDetail.time}</div>
                    <div>{ ' เซต: ' + dataDetail.set + ' ก้าว : ' + dataDetail.step }</div>
                    <BarChart width={375} height={250} data={dataShow} >
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <XAxis dataKey="set" />
                      <YAxis  value= "100"/>
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </div>
                )
              }
            })
          })
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
