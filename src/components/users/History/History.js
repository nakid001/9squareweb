import React from 'react'
import { Link } from 'react-router-dom'
import bg from './img/history_background.jpg'
import './style.css'
import { Button } from 'reactstrap'

export class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [],
      num: 0
    }
  }
  render () {
    return (
      <div id='history_wrapper'>
        <div id="header" className="title_content">ประวัติการทดสอบ</div>
        <div className="history_body">
          <img src ={bg} alt = '' className="history_body_background"/>
          <div className="history_content">
            <table>
              <tr>
                <th>วัน/เวลา</th>
                <th>วงรอบ</th>
                <th>ก้าว</th>
              </tr>
              { this.props.user.history.slice(this.props.user.num,this.props.user.num+10) }
            </table> 
            <div>
              <Button  color="danger" onClick={() => {this.props.goPrevious(this.props.user.num - 10, this.props.user.history.length, 10)}}>Previous!</Button>
              {Math.ceil(this.props.user.num/10) + 1} / {Math.ceil(this.props.user.history.length/10)}
              <Button  color="success" onClick={() => {this.props.goNext(this.props.user.num + 10,  this.props.user.history.length, 10)}}>Next!</Button>
              {/* <Button  color="success" onClick={() => {this.props.addhistory()}}>add temp his</Button> */}
            </div>
            <div className="history_footer">
              <button> <Link to ='../'>GO BACK</Link> </button>
            </div>
          </div>
        </div>
      </div>   
    )
  }
}
