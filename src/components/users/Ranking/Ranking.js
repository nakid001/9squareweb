import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Button } from 'reactstrap'

export class Ranking extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ranking: [1,2],
      num: 0
    }
  }

  render () {
    return (
      <div id="rank_wrapper">
        <div id="header" className="title_content">{'ลำดับ'}</div>
        <div className="rank_content">
          {this.props.user.ranking.slice(this.props.user.num,this.props.user.num+5)}
          <Button  color="danger" onClick={() => {this.props.goPrevious(this.props.user.num - 5, this.props.user.ranking.length, 5)}}>Previous!</Button>
          {Math.ceil(this.props.user.num/5) + 1} / {Math.ceil(this.props.user.ranking.length/5)}
          <Button  color="success" onClick={() => {this.props.goNext(this.props.user.num + 5,  this.props.user.ranking.length, 5)}}>Next!</Button>
          <button className="rank_button"> <Link to ='/'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
