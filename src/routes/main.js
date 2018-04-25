import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// import { IndexRoute } from 'react-router'
import App from '../App'

import HomeContainer from '../containers/users/Home'
import LoginContainer from '../containers/users/Login.js'
import RegisterContainer from '../containers/users/Register.js'
import TestContainer from '../containers/users/Test.js'
import RoomContainer from '../containers/users/Room.js'
import HistoryContainer from '../containers/users/History.js'
import RankingContainer from '../containers/users/Ranking.js'
import AboutusContainer from '../containers/users/Aboutus.js'

import ExLoginContainer from '../containers/examiners/Login.js'
import ExRegisterContainer from '../containers/examiners/Register.js'
import ExHomeContainer from '../containers/examiners/Home.js'
import ExTestContainer from '../containers/examiners/Test.js'
import ExRoomContainer from '../containers/examiners/Room.js'
import ExStartContainer from '../containers/examiners/Start.js'
import ExHistoryContainer from '../containers/examiners/History.js'

class main extends React.Component {
  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path='/' component={HomeContainer}/>
            <Route path = '/login' component={LoginContainer}/>
            <Route path = '/register' component={RegisterContainer}/>
            <Route path = '/history' component={HistoryContainer}/>
            <Route path = '/ranking' component={RankingContainer}/>
            <Route exact path = '/test' component={TestContainer}/>
            <Route path = {'/test/room'} component={RoomContainer}/>'}
            <Route path = '/aboutus' component={AboutusContainer}/>
            
            <Route exact path='/examiner' component={ExHomeContainer}/>
            <Route path ='/examiner/login' component={ExLoginContainer}/>
            <Route path ='/examiner/register' component={ExRegisterContainer}/>
            <Route exact path='/examiner/test/' component={ExTestContainer}/>
            <Route path={'/examiner/test/room'} component={ExRoomContainer}/>
            <Route path = '/examiner/start' component={ExStartContainer}/>
            <Route path = '/examiner/history' component={ExHistoryContainer}/>
          </Switch>
        </App>
      </Router>
    )
  }
}
export default main
