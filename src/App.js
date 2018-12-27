import React, { Component } from 'react';
import './App.css';


import Header from './components/Header.js'
import Images from './components/Images.js'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      filters: [],
      imagesByFilter: {}
    }
    this.filters = this.filters.bind(this)
  }

  filters(orderedFilters, imagesByFilter){
    this.setState({filters: orderedFilters, imagesByFilter})
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 nopadding">
            <Header filters={this.state.filters} imagesByFilter={this.state.imagesByFilter} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 nopadding">
          <Images filters={this.filters} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
