import React from 'react'
import  { Home } from '../../components/users/Home/Home.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import {
//   LoginForm
// } from '../components'
class HomeContainer extends React.Component {
  render () {
    return (
      <div>
        <Home {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
