import React from 'react'
import './App.css'
import {NavLink} from 'react-router-dom'
import Sidebar from 'react-sidebar'
import SidebarContent from './components/UI/Sidebar/sidebar_content'
import TitlePanel from './components/UI/Title_Panel/title-panel'
import menuIcon from './components/UI/Title_Panel/img/menuIcon.webp'
import brandLogo from './components/UI/Title_Panel/img/demo_brand.png'
import downArrow from './components/UI/Title_Panel/img/downArrow.png'
import { Provider } from 'react-redux'
import store from './stores/stores'
import * as firebase from 'firebase'


const sidebar = <SidebarContent />

let user = ''
let examiner = ''
class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    }

    this.onSetOpen = this.onSetOpen.bind(this)
    this.menuButtonClick = this.menuButtonClick.bind(this)
  }

  onSetOpen (open) {
    this.setState({open: open})
  }

  menuButtonClick (ev) {
    ev.preventDefault()
    this.onSetOpen(!this.state.open)
  }
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }

  signOut() {
    firebase.auth().signOut().then(function () {
      console.log('You have signed out.')
    }).catch(function () {
      alert('Sign out failed.')
    })
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'picture=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'examiner=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  checklogin () {
    const logOutBtn = <NavLink key='6' to='/login'
      onClick={ () => this.signOut()}
    >ลงชื่อออก</NavLink>
    const examlogOutBtn = <NavLink key='6' to='/examiner/login'
      onClick={ () => { this.signOut()}}
    >ลงชื่อออก</NavLink>
    user = this.getCookie('username')
    examiner = this.getCookie('examiner')
    
    let headerContent
    if (user === '') {    //  no user logged in
      console.log('no user logged in')
      headerContent = (
        <div className='header_wrapper'>
          <span>
            <NavLink key='5' id='brandLink' to='/'>
              <img className='brandLogo' src={brandLogo} alt=''/>
            </NavLink>
            <NavLink key='6'  to='/register'>
              <button id='signupButton' className='signupBtnText'>ลงทะเบียน</button>
            </NavLink>
            <NavLink key='7'  to='/login'>
              <button id='loginButton' className='loginBtnText'>ลงชื่อเข้าใช้</button>
            </NavLink>
          </span>
        </div>
      )
    } else if (!examiner) {
      let picture = ''
      picture = this.getCookie('picture')
      headerContent = (
        <span>
          { !this.state.docked &&
            <img src={menuIcon} onClick={this.menuButtonClick}
              className='menuIcon' alt=''/>
          }
          <NavLink key='5' id='brandLink2' to='/'>
            <img className='brandLogo' src={brandLogo} alt=''/>
          </NavLink>
          <div className='dropdown'>
            <img src={picture} className='titleUserIcon' alt=''/>
            <img src={downArrow} className='downArrow' alt=''/>
            <div className='dropdown-content'>
              <NavLink key='4'  to='/aboutus'>เกี่ยวกับเรา</NavLink>
              {logOutBtn}
            </div>
          </div>
          {/*<NavLink key='7' id='titleUserName'  to='/user'>{user}</NavLink>*/}
          <div id='titleUserName' >
            {user}
          </div>
        </span>
      )
    } else if (examiner) {
      let picture = ''
      picture = this.getCookie('picture')
      headerContent = (
        <span>
          { !this.state.docked &&
            <img src={menuIcon} onClick={this.menuButtonClick}
              className='menuIcon' alt=''/>
          }
          <NavLink key='5' id='brandLink2' to='/examiner'>
            <img className='brandLogo' src={brandLogo} alt=''/>
          </NavLink>
          <div className='dropdown'>
            <img src={picture} className='titleUserIcon' alt=''/>
            <img src={downArrow} className='downArrow' alt=''/>
            <div className='dropdown-content'>
              <NavLink key='4'  to='/aboutus'>เกี่ยวกับเรา</NavLink>
              {examlogOutBtn}
            </div>
          </div>
          {/*<NavLink key='7' id='titleUserName'  to='/examiner/user'>{user}</NavLink>*/}
          <div id='titleUserName' >
            {user}
          </div>
        </span>
      )
    }
    return headerContent
  }
  render () {
    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    }
    const sidebarStyles = {
      sidebar: {
        zIndex: 99,
      }
    }
    return (
      <Provider store={store}>
        <Sidebar className='Sidebar' {...sidebarProps} styles={sidebarStyles}>
          <TitlePanel title={this.checklogin()}/>
          {this.props.children}
        </Sidebar>
      </Provider>
    )
  }
}

export default App
