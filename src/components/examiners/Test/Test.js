import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './style.css'

export class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: [],
      num: 0
    }
  }

  render () {
    return (
      <div id='home_wrapper'>
        <div id="header">การทดสอบ</div>
        <div id="main-wrap">
            <div className="header_content">
            Room List
            {this.props.test.room}
            </div>
            <div id="content-wrap">
            </div>
            <button onClick={()=> {
              this.props.addroom()}}>ADD ROOM </button>
            <button> <Link to ='/'>GO BACK</Link> </button>
        </div>
        <div id="footer">Footer</div>
      </div>   
    )
  }
}
