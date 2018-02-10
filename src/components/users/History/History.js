import React from 'react'
import {NavLink, HashRouter} from 'react-router-dom'
import { Link } from 'react-router-dom'

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
        <div id="header"></div>
        <div id="main-wrap">
          <div id="sidebar" className="header_content">
          </div>
          <div id="content-wrap">
            <table>
              <tr>
                <th>Test ID</th>
                <th>Set</th>
                <th>Step</th>
              </tr>
              { this.props.user.history }
            </table>
          </div>
        </div>
        <div className="Exfooter">
          <button> <Link to ='../'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
