import React from 'react'
// import TitlePanel from '../Title_Panel/title-panel'
import PropTypes from 'prop-types'
import './style.css'
import {
    NavLink
} from 'react-router-dom'
import userIcon from './img/userIcon.png'
// import * as firebase from 'firebase'

// let userIcon = './img/userIcon.png'
// const styles = {
//   sidebar: {
//     width: '16em',
//     minHeight: '100%',
//     overflow: 'hidden'
//   },
//   sidebarLink: {
//     display: 'block',
//     padding: '16px 0px',
//     color: '#54585a',
//     textDecoration: 'none'
//   },
//   sidebarLink2: {
//     display: 'inline-block',
//     padding: '1em 0em 1em 0.5em ',
//     color: '#54585a',
//     textDecoration: 'none'
//   },
//   divider: {
//     margin: '8px 0',
//     height: 1,
//     backgroundColor: '#757575'
//   },
//   content: {
//     padding: '2em',
//     minHeight: '100%',
//     backgroundColor: 'white'
//   }
// }
function getCookie (cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
const SidebarContent = (props) => {
  // const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar
  let user = ''
  let picture = ''
  var navLinks = [
    <span key='sb1' className='userSidebar'>
      <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/user' className='sidebarLink2'>{user}</NavLink>
      <img src={picture} className='userIcon' alt=''></img>
    </span>,
    <div key='sb7' className='sidebarDivider' />,
    <NavLink key='sb3' exact activeClassName='sbLinkActive' to='/test' className='sidebarLink'>Test</NavLink>,
    <NavLink key='sb4' activeClassName='sbLinkActive' to='/history' className='sidebarLink'>History</NavLink>,
    <NavLink key='sb5' activeClassName='sbLinkActive' to='/ranking' className='sidebarLink'>Ranking</NavLink>,
    <NavLink key='sb5' activeClassName='sbLinkActive' to='/aboutus' className='sidebarLink'>About us</NavLink>    
    // <NavLink key='sb6' activeClassName='active' to='/notification' className='sidebarLink' >Notification</NavLink>,
    // <div key='sb7' className='sidebarDivider' />,
    // <NavLink key='sb8' activeClassName='sbLinkActive' to='/settings' className='sidebarLink' >Settings</NavLink>,
    // <NavLink key='sb62' className='sidebarLink' activeClassName='sbLinkActive2' to='/'
    //     onClick={ () => {
    //       firebase.auth().signOut().then(function () {
    //         alert('You have signed out.')
    //       }).catch(function () {
    //         alert('Sign out failed.')
    //       })
    //       document.cookie = 'username=; picture=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    //     }}
    //   >Logout</NavLink>
  ]
  if (user === '') {
    picture = userIcon
  } else {
    user = getCookie('username')
    picture = getCookie('picture')
  }
  return (
    // <TitlePanel title='Menu'>
    <div className='sidebar_container'>
      <div className='sidebarContent'>
        {navLinks}
      </div>
    </div>
    // </TitlePanel>
  )
}

SidebarContent.propTypes = {
  style: PropTypes.object
}

export default SidebarContent
