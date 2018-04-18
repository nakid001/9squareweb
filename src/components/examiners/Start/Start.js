import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import bg from './img/start_background.jpg'
import { Button } from 'reactstrap'
import ReactCountdownClock  from 'react-countdown-clock'
import './style.css'

export class Start extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: 0,
      start: -1,
      showData: [],
    }
    this.countdown = this.countdown.bind(this)
    this.showclock = this.showclock.bind(this)
  }
  countdown() {
    this.setState({start: 1})
    this.props.sendresult(this.props.test.num).then(() => {
      let device = []
      let i = 0
      let showData = []
      firebase.database().ref('/rooms/room' + this.props.test.num + '/devices/').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          device[i] = childSnapshot.key
          i++
        })
      }).then(() => {
        let i = 0
        showData = []
        let that = this
        setTimeout(function() {

          firebase.database().ref('/devices/').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.key === device[i] && i<device.length) {
                showData[i] = (
                  <tr key={i}>
                    <td>{childSnapshot.val().set}</td>
                    <td>{childSnapshot.val().step}</td>
                    <td>{childSnapshot.val().last_user}</td>
                  </tr>
                )
                i++
              }
            })
          }).then(() => {
            that.props.showSendingData(showData)
            console.log(showData)
          })
        }, 2000)

      })
    })
  }
  showclock() {
    if (this.state.start === 0) {
      if (!this.props.test.time) {
        this.setState({start: -1})
        alert ('กรุณากำหนดเวลาก่อน')
      } else {
        return (           
          <div >
            <div className="empty">
            </div>
            <div className ="ReactClock"> 
              <ReactCountdownClock seconds={this.props.test.time}
                color="#000"
                alpha={0.9}
                size={150}
                onComplete = {this.countdown = this.countdown.bind(this)} className="ReactClock"/>
            </div>
          </div>
        )        
      }
    } else if (this.state.start === 1) {
      return (
        <div>
          ทดสอบเสร็จสิ้น
          <table>
            <tr>
              <th>เซต</th>
              <th>ก้าว</th>
              <th>ผู้ใช้</th>
            </tr>
            {this.props.test.showData}
          </table> 
        </div>)
    }
    return ''
  }
  render () {
    return (
      <div id='home_wrapper'>
        <div id="header" className="title_content">ห้องเริ่มทดสอบ</div>
        <div className="start_body">
          <img src ={bg} alt= '' className="start_body_background"/>
          <div id="start_header "className="start_header">
          </div>
          <div className="start_content">
            <div id='start_status'>เตรียมตัวเริ่มการทดสอบ</div>
            <Button  outline color="success" onClick={() => { 
              firebase.database().ref('/rooms/room' + this.props.test.num).update({
                start: 'START'
              })
              this.setState({start: 0})
            }}>START!</Button>
            <div> เวลาที่กำหนดให้ : {this.props.test.time} วินาที
            <div id='TimeCounter'> 
            </div>
            <div >
              {this.showclock()}
            </div>
            <div className="start_config"> เปลี่ยนระยะเวลา  
            <button onClick={() => {this.props.setTime(30)}}> 30 วินาที</button>
            <button onClick={() => {this.props.setTime(10)}}> 10 วินาที</button>
            </div>
            <button className="Exfooter"> <Link to ='/examiner/test'>GO BACK</Link> </button>

            </div>
          </div>
        </div>
      </div>   
    )
  }
}
