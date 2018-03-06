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
    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange (event) {
  //   if (event.target.name === 'User') {
  //     this.props.inputlog(event.target.value, this.props.user.password)
  //   } else if (event.target.name === 'Pass') {
  //     this.props.inputlog(this.props.user.username, event.target.value)
  //   }
  // }

  render () {
    return (
      <div id="rank_wrapper">
        <div id="header" className="title_content">{'Ranking'}</div>
        <div className="rank_content">
          {this.props.user.ranking.slice(this.props.user.num,this.props.user.num+10)}
          <Button  color="danger" onClick={() => {this.props.goPrevious(this.props.user.num, this.props.user.ranking.length)}}>Previous!</Button>
          {Math.ceil(this.props.user.num/10) + 1} / {Math.ceil(this.props.user.ranking.length/10)}
          <Button  color="success" onClick={() => {this.props.goNext(this.props.user.num + 10,  this.props.user.ranking.length)}}>Next!</Button>
          <button className="rank_button"> <Link to ='/'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
