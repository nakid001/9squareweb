import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../users/History/img/history_background.jpg'
import './style.css'
import { Button } from 'reactstrap'

export class History extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [],
      num: 0,
      id: 0,
      date: ''
    }
    this.historyContent = this.historyContent.bind(this)
  }
  historyContent() {
    if (this.props.exam.date !== '') {
      return (
        <div className="exhistory_sub_content">
          <table>
            <tr>
              <th>วัน/เวลา</th>
              <th>ผู้ใช้</th>
              <th>เซต</th>
              <th>ก้าว</th>
              <th>ชนิดทดสอบ </th>
              <th>เวลาการทดสอบ</th>
            </tr>
            { this.props.user.history.slice(this.props.user.num,this.props.user.num+10) }
          </table> 
          <div>
            <Button  color="danger" onClick={() => {this.props.goPrevious(this.props.user.num - 10, this.props.user.history.length, 10)}}>Previous!</Button>
            {Math.ceil(this.props.user.num/10) + 1} / {Math.ceil(this.props.user.history.length/10)}
            <Button  color="success" onClick={() => {this.props.goNext(this.props.user.num + 10,  this.props.user.history.length, 10)}}>Next!</Button>
          </div>
          <div className="history_footer">
            <button onClick={() => {this.props.clearDate()}}>>GO BACK </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="exhistory_content">
          { this.props.exam.id.slice(this.props.user.num,this.props.user.num+10) }
          <div>
            <Button  color="danger" onClick={() => {this.props.goPrevious(this.props.user.num - 10, this.props.exam.id.length, 10)}}>Previous!</Button>
            {Math.ceil(this.props.user.num/10) + 1} / {Math.ceil(this.props.exam.id.length/10)}
            <Button  color="success" onClick={() => {this.props.goNext(this.props.user.num + 10,  this.props.exam.id.length, 10)}}>Next!</Button>
          </div>
          <div className="history_footer">
            <button className="back_button"> <Link to ='../'>GO BACK</Link> </button>
          </div>   
        </div>
      )
    }
  }
  render () {
    return (
      <div id='history_wrapper'>
        <div id="header" className="title_content">ประวัติการทดสอบ</div>
        <div className="history_body">
          <img src ={bg} alt = '' className="history_body_background"/>
          {this.historyContent()}
        </div>
      </div>   
    )
  }
}
