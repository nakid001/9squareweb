import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const TitlePanel = (props) => {
  return (
    <div className='rootStyles'>
      <div className='empty_pannel'></div>
      <div className='headerStyle'>{props.title}</div>
      {props.children}
    </div>
  )
}

TitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  children: PropTypes.object
}

export default TitlePanel
