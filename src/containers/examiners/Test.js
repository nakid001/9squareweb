import React from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { Test } from '../../components/examiners/Test/Test.js'
import { inputreg } from '../../actions/input.js'
import { regisfire } from '../../actions/user.js'
import { showroom, addroom } from '../../actions/test.js'
class ExTestContainer extends React.Component {

  render () {
    let i = 0
    let that = this
    let room = []
    firebase.database().ref('/Room/').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        room[i] = (
            <div className='col-8 payment_itemDiv' key={i}>
              <div className='payment_itemDiv--mid'>
                <span><span className=''>Room:{i+1}: {childSnapshot.val()+''}</span></span>
              </div>
              {/* <div className='payment_itemDiv--after' onClick={() => { that.props.deletepay(id, room, i) } }><img src={delBtn} alt=''/></div> */}
            </div>
          )
        i++
      })
    }).then(() => {
      this.props.showroom(room)
    })
    return (
      <div>
        <Test {...this.props} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    test: state.test
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      inputreg, regisfire, showroom, addroom
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ExTestContainer)
