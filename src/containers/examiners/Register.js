import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Register } from '../../components/examiners/Register/Register.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/examiner.js'
class ExRegisterContainer extends React.Component {

  render () {
    return (
      <div>
        <Register {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    exam: state.exam
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputreg, regisfire
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExRegisterContainer)
