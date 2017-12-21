import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './style.css'

export class Start extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.countdown = this.countdown.bind(this)
  }
  countdown() {
    let countDownDate = new Date()
    countDownDate = countDownDate.setSeconds(countDownDate.getSeconds() + 5);
    let that  = this
    // Update the count down every 1 second
    var x = setInterval(function() {
    
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds

        var seconds = distance % (1000 * 60) / 1000;
        
        // Output the result in an element with id="demo"
        document.getElementById("TimeCounter").innerHTML = seconds + "s ";
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("TimeCounter").innerHTML = "EXPIRED";
            that.props.sendresult(that.props.test.num)
        }
    }, 1000);
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
