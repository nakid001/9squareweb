import React from 'react'
import  { Home } from '../../components/users/Home/Home.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import bg1 from './img/bg1.jpg'
import bg2 from './img/bg2.jpg'
import bg3 from './img/bg3.jpg'
// import {
//   LoginForm
// } from '../components'

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'
class HomeContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      next : this.next.bind(this),
      previous : this.previous.bind(this),
      goToIndex : this.goToIndex.bind(this),
      onExiting : this.onExiting.bind(this),
      onExited : this.onExited.bind(this),
      handlePress : this.handlePress.bind(this),
      modalIsOpen : this.getCookie('username') != "",
      closeModal : this.closeModal.bind(this),
      openModal : this.openModal.bind(this),
      activeIndex : 0 ,
      items : [{
        src: bg1,
        altText: 'Slide 1',
        caption: ''
      },
      {
        src: bg2,
        altText: 'Slide 2',
        caption: ''
      },
      {
        src: bg3,
        altText: 'Slide 3',
        caption: ''
      }]
    }
     this.state.slides = this.state.items.map((item) => {
      return <CarouselItem
        onExiting={this.onExiting(this.state)}
        onExited={this.onExited(this.state)}
        key={item.src}
      > 
        <img src={item.src} alt={item.altText}  width="100%" height="430px"/>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
     })
  }

  
  onExiting(state) {
    state.animating = true
  }

  onExited(state) {
    state.animating = false
  }

  next() {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.state.animating) return
    this.setState({ activeIndex: newIndex })
  }
  handlePress (event) {
    event.which = event.which || event.keyCode
    if (event.which === 27) {
      this.closeModal()
    }
  }
  openModal() {
    this.setState({modalIsOpen: true})    
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  closeModal() {
    this.setState({modalIsOpen: false})
  }
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }

  render () {
    return (
      <div>
        <Home 
        closeModal = {this.closeModal}
        openModal = {this.openModal}
        {...this.state}
        {...this.props} 
        />
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

