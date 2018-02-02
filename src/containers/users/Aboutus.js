import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Aboutus } from '../../components/users/Aboutus/Aboutus'
// import {
//   LoginForm
// } from '../components'
class AboutusContainer extends React.Component {

  render () {
    return (
      <div>
        <Aboutus {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutusContainer)
