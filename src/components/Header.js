import React, { Component } from 'react';
import '../App.css';
import logo from '../assets/images/logo.png'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: 0,
      logoClass: "headerTextLarge",
      plusClass: "headerPlusLarge",
      filters: props.filters || []
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions(){
    // Screw Media Queries
    var width = window.innerWidth
    var logoClass = ''
    var plusClass = ''
    if(width > 600){
      logoClass = 'headerTextLarge'
      plusClass = 'headerPlusLarge'
    }else if( width >= 450 ){
      logoClass = 'headerTextMedium'
      plusClass = 'headerPlusMedium'
    }else{
      logoClass = 'headerTextSmall'
      plusClass = 'headerPlusSmall'
    }
    this.setState({ width: window.innerWidth, logoClass, plusClass })
  }
  componentDidMount(){
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateDimensions)
  }
  render() {
    var logoClass = this.state.logoClass
    var plusClass = this.state.plusClass
    if (this.props.filters !== this.state.filters){
      this.setState({ filters: this.props.filters })
    }
    var filters = this.state.filters
    console.log(filters, 'filters', this.props)
    return (
      <div className="col-12">

          <div className={"col-7"}>
             {
               // <div className={"col-8 " + logoClass}>
               // Theo James Franco Gatsby <br /> Mila Kunis Winfrey
            }
            <img src={logo} />
          </div>
          {
          // Top Filters:
        //   filters.map(filter => {
        //     console.log(imagesByFilter[filter[0]])
        //     return imagesByFilter[filter[0]].map(image => {
        //
        //       return <div>{filter[0]}<img src={image['image']} style={{width: "50px"}}/></div>
        //     })
        //   })
        //

        // <div className={plusClass}>
        // +
        // </div>
        }
      </div>
    );
  }
}

export default Header;
