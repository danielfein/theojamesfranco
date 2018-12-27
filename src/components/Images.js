import React, { Component } from 'react';
import '../App.css';
import timeago from 'epoch-timeago';
import imagesData from '../assets/data.json'
class Images extends Component {
  constructor(props){
    super(props)
    this.state = {
      images: [],
      lastIndex: 0,
      isLoading: false,
      applicationApproved: false, //Can only get more than 20 images if approved
      width: 0,
      filters: {}
    }
    this.getInsta = this.getInsta.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.hoverOverImage = this.hoverOverImage.bind(this);
    this.removeHover = this.removeHover.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount(){
    this.getImages(imagesData)
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) &&
      this.state.images.length && !this.state.isLoading && this.state.applicationApproved) {
      // this.getInsta();
    }
  }
  getImages(data, lastIndex){
    var returnedImages = data['data']
    var images = this.state.images
    var imagesLength = returnedImages.length - 3
    while(imagesLength % 4 !== 0){
      imagesLength -= 1
    }
    var filters = {}
    var imagesByFilter = {}
    for (var i = 0; i < imagesLength + 3; i++) {
      var tempImage = returnedImages[i]
      var imageData = {
        'image' : tempImage['images']['standard_resolution']['url'],
        'caption' : tempImage['caption']['text'],
        'comments' : tempImage['comments']['count'],
        'likes' : tempImage['likes']['count'],
        'link' : tempImage['link'],
        'type' : tempImage['type'],
        'time' : tempImage['created_time'],
        'filter' : tempImage['filter']
      }
      console.log(tempImage['type'])
      if (tempImage['filter'] in filters){
        filters[tempImage['filter']] += 1
      }else{
        filters[tempImage['filter']] = 1
        imagesByFilter[tempImage['filter']] = []
      }
      if(tempImage['type'] !== 'video'){
        imagesByFilter[tempImage['filter']].push(imageData)
        images.push(imageData)
        lastIndex = tempImage['id']
      }else{
        imagesLength++
      }
    }
    var orderedFilters = Object.keys(filters).map( key => {
      return [key, filters[key]]
    })
    orderedFilters.sort((first, second) => {
      return second[1] - first[1];
    })
    this.props.filters(orderedFilters, imagesByFilter)
    this.setState({ images, lastIndex , isLoading: false})
  }

  getInsta(){
    var userId = '207035588'
    var accessToken = '207035588.15832e1.1af8a16d29b641909730ac92a4fd210a'
    var lastIndex = this.state.lastIndex
    var url = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?access_token=' + accessToken
    if(lastIndex !== 0){
      url += '&max_id=' + lastIndex
    }
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      this.getImages(data, lastIndex)

    })
  }

  removeHover(index){
    document.getElementById(index).style.display = 'none';
  }

  hoverOverImage(index){
    document.getElementById(index).style.display = 'flex';
  }

  render() {
    var images = this.state.images;
    return (
        <div className="row">
          {
            images.map((image, index) => {
              var colNum = '0'
              if(index < 3){
                colNum = '4'
              }else{
                colNum = '6'
              }
              return (<div className={"col-lg-" + colNum + " col-xs-12 col-sm-6 nopadding"} key={index} onMouseOut={() => this.removeHover(index)} onMouseOver={() => this.hoverOverImage(index)}>
              <a href={image.link}><div className="imageDiv"><img src={image.image} alt="theojamesfranco"/></div>
              <div className="cover" id={index}>
                <div className="col-12 coverText">
                {image.caption}<br /><br />
                👍 &nbsp;&nbsp;{image.likes}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;💬 &nbsp;&nbsp;{image.comments}
                <br />
                <div className="timeText">{ timeago(image.time * 1000)}</div><br/><br/>
                <div className="filter">{image.filter}</div>
                </div>
              </div></a>
              </div>)
            })
          }

      </div>
    );
  }
}

export default Images;
