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
    this.props = {
        next : this.next.bind(this),
        previous : this.previous.bind(this),
        goToIndex : this.goToIndex.bind(this),
        onExiting : this.onExiting.bind(this),
        onExited : this.onExited.bind(this),
        handlePress : this.handlePress.bind(this),
        modalIsOpen: this.getCookie('username') != "",
        activeIndex: 0 
    }
    this.items = [{
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
    this.props.slides = this.items.map((item) => {
       <CarouselItem
        onExiting={this.props.onExiting}
        onExited={this.props.onExited}
        key={item.src}
      > 
        <img src={item.src} alt={item.altText}  width="100%" height="430px"/>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    })
  }

  
  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.props.activeIndex === this.items.length - 1 ? 0 : this.props.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.props.activeIndex === 0 ? this.items.length - 1 : this.props.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
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
        items = {this.items}
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

