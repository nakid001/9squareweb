import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
// import { IndexRoute } from 'react-router'
import App from '../App'

import { HomeContainer } from '../containers/users/Home'
import LoginContainer from '../containers/users/Login.js'
import RegisterContainer from '../containers/users/Register.js'
import TestContainer from '../containers/users/Test.js'
import RoomContainer from '../containers/users/Room.js'
import HistoryContainer from '../containers/users/History.js'

import ExLoginContainer from '../containers/examiners/Login.js'
import ExRegisterContainer from '../containers/examiners/Register.js'
import ExHomeContainer from '../containers/examiners/Home.js'
import ExTestContainer from '../containers/examiners/Test.js'
import ExRoomContainer from '../containers/examiners/Room.js'

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

            <Route exact path = '/test' component={TestContainer}/>
            <Route path = {'/test/room'} component={RoomContainer}/>'}
            <Route exact path='/examiner' component={ExHomeContainer}/>
            <Route path ='/examiner/login' component={ExLoginContainer}/>
            <Route path ='/examiner/register' component={ExRegisterContainer}/>
            <Route exact path='/examiner/test/' component={ExTestContainer}/>
            <Route path={'/examiner/test/room'} component={ExRoomContainer}/>
         </Switch>
        </App>
      </Router>
    )
  }
}
export default main
/*   <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="admin" component={RequireAuth(App)}>
          <IndexRoute component={Main}/>

          <Route path="services">
            <IndexRoute component={ServiceDetail} />
            <Route path="log" component={ServiceLog} />
          </Route>

          <Route path="mechanics">
            <IndexRoute component={MechanicIndex} />
            <Route path="add" component={MechanicAdd} />
            <Route path="edit/:id" component={MechanicEdit} />
          </Route>

          <Route path="parts">
            <IndexRoute component={PartIndex} />
            <Route path="add" component={PartAdd}/>
            <Route path="edit/:id" component={PartEdit}/>
          </Route>

          <Route path="garages">
            <IndexRoute component={GarageIndex} />
            <Route path="add" component={GarageAdd}/>
            <Route path="edit/:id" component={GarageEdit}/>
          </Route>

          <Route path="cars">
            <IndexRoute component={CarIndex} />
            <Route path="add" component={CarAdd} />
            <Route path="edit/:id" component={CarEdit} />
          </Route>
        </Route>

        <Route path="mechanic" component={RequireAuthMechanic(App)}>
          <IndexRoute component={DashboardMechanic} />
          <Route path="services">
            <IndexRoute component={ServiceLog} />
            <Route path="add" component={ServiceAdd} />
            <Route path="edit/:id" component={ServiceEdit} />
            <Route path="detail/:id" component={ServiceDetail} />
          </Route>
          <Route path="profile" component={MechanicProfile} />
        </Route>

        <Route path="garage" component={RequireAuthGarage(App)}>
          <IndexRoute component={DashboardGarage} />
          <Route path="mechanics">
            <IndexRoute component={MechanicIndex} />
            <Route path="add" component={MechanicAdd} />
            <Route path="edit/:id" component={MechanicEdit} />
          </Route>
          <Route path="parts">
            <IndexRoute component={PartIndex} />
            <Route path="add" component={PartAdd}/>
            <Route path="edit/:id" component={PartEdit}/>
          </Route>
          <Route path="services">
            <IndexRoute component={ServiceLog} />
            <Route path="edit/:id" component={ServiceEdit} />
            <Route path="detail/:id" component={ServiceDetail} />
          </Route>
          <Route path="profile" component={GarageProfile} />
        </Route>
      </Route>

      <Route path="backend/login" component={BackendLogin} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="map" component={MapContainer} />
    </Router>
  </Provider>,
  */
