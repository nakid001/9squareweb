import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export class Ranking extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ranking: [],
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
          {this.props.user.ranking}
          <button className="rank_button"> <Link to ='/'>GO BACK</Link> </button>
        </div>
      </div>   
    )
  }
}
