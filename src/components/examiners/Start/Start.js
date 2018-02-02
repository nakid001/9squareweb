import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
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
      if (distance < 0) {
        clearInterval(x)
        document.getElementById('TimeCounter').innerHTML = 'EXPIRED'
        that.props.sendresult(that.props.test.num)
      }
    }, 1000)
  }
  render () {
    return (
      <div id='home_wrapper'>
        <div id="header">การทดสอบ</div>
        <div id="main-wrap">
          <div className="content-wrap">
            <button onClick={() => {this.countdown()}}>START!</button>
            <div> TimeLeft : 
              <div id='TimeCounter'> 
                    30 
              </div>
            </div>
          </div>
        </div>
        <div id="footer">Footer</div>
        <button> <Link to ='/test'>GO BACK</Link> </button>
      </div>   
    )
  }
}
