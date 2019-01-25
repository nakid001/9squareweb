import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import {
    NavLink
} from 'react-router-dom'
import userIcon from './img/userIcon.png'

function getCookie (name) {
  let value = '; ' + document.cookie
  let parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  } else return ''
}
const SidebarContent = (props) => {
  let user = ''
  let picture = ''
  let examiner = getCookie('examiner')
  let navLinks = ''
  
  if (!examiner) {
    navLinks = [
      <span key='sb1' className='userSidebar'>
        <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/user' className='sidebarLink2'>{user}</NavLink>
        <img src={picture} className='userIcon' alt=''></img>
      </span>,
      <div key='sb7' className='sidebarDivider' />,
      <NavLink key='sb3' exact activeClassName='sbLinkActive' to='/test' className='sidebarLink'>การทดสอบ</NavLink>,
      <NavLink key='sb4' activeClassName='sbLinkActive' to='/history' className='sidebarLink'>ประวัติการทดสอบ</NavLink>,
      <NavLink key='sb5' activeClassName='sbLinkActive' to='/ranking' className='sidebarLink'>ลำดับ</NavLink>,
      <NavLink key='sb6' activeClassName='sbLinkActive' to='/aboutus' className='sidebarLink'>เกี่ยวกับเรา</NavLink>
    ]
  } else {
    navLinks = [
      <span key='sb1' className='userSidebar'>
        <NavLink activeClassName='sbLinkActive' style={ {visibility: 'hidden'} } to='/examiner/user' className='sidebarLink2'>{user}</NavLink>
        <img src={picture} className='userIcon' alt=''></img>
      </span>,
      <div key='sb7' className='sidebarDivider' />,
      <NavLink key='sb3' exact activeClassName='sbLinkActive' to='/examiner/test' className='sidebarLink'>การควบคุมทดสอบ</NavLink>,
      <NavLink key='sb4' activeClassName='sbLinkActive' to='/examiner/history' className='sidebarLink'>ตรวจสอบประวัติการทดสอบ</NavLink>,
      <NavLink key='sb6' activeClassName='sbLinkActive' to='/aboutus' className='sidebarLink'>เกี่ยวกับเรา</NavLink>  
    ] 
  }
  if (user === '') {
    picture = userIcon
  } else {
    user = getCookie('username')
    picture = getCookie('picture')
  }
  return (
    <div className='sidebar_container'>
      <div className='sidebarContent'>
        {navLinks}
      </div>
    </div>
  )
}

SidebarContent.propTypes = {
  style: PropTypes.object
}

export default SidebarContent
