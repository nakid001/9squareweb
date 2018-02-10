import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'
import bg from './img/history_background.jpg'
import './style.css'

export class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: []
    }
  }
  render () {
    return (
      <div id='history_wrapper'>
        <div id="header" className="title_content">ประวัติการทดสอบ</div>
        <div className="history_body">
          <img src ={bg} className="history_body_background"/>
          <div className="history_content">
            <table>
              <tr>
                <th>Test ID</th>
                <th>Set</th>
                <th>Step</th>
              </tr>
              { this.props.user.history }
            </table> 
            <div className="history_footer">
              <button> <Link to ='../'>GO BACK</Link> </button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}
