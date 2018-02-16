import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import bg from './img/start_background.jpg'
import { Button } from 'reactstrap';

import './style.css'

export class Start extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.countdown = this.countdown.bind(this)
  }
  countdown() {
    let that = this
    firebase.database().ref('/rooms/room' + that.props.test.num).update({
      start: 'START'
    })
    console.log(that.props.test.num)
    let countDownDate = new Date()
    countDownDate = countDownDate.setSeconds(countDownDate.getSeconds() + 30)
    let x = setInterval(function() {
      let now = new Date().getTime()
      let distance = countDownDate - now
      let seconds = distance % (1000 * 60) / 1000
      document.getElementById('TimeCounter').innerHTML = seconds + 's '
      document.getElementById('start_status').innerHTML = 'เริ่มการทดสอบ!'
      if (distance < 0) {
        clearInterval(x)
        document.getElementById('TimeCounter').innerHTML = 'หมดเวลา!'
        document.getElementById('start_status').innerHTML = ''
        that.props.sendresult(that.props.test.num)
      }
    }, 1000)
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
            <Button  outline color="success" onClick={() => {this.countdown()}}>START!</Button>
            <div> TimeLeft : 
            <div id='TimeCounter'> 
                    30 
            </div>
            <button className="Exfooter"> <Link to ='/examiner/test'>GO BACK</Link> </button>

            </div>
          </div>
        </div>
      </div>   
    )
  }
}
