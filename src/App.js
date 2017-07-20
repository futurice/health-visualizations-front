import React, { Component } from 'react';
import './App.css';
import Piechart from './Piechart.js';
import QueryForm from './QueryForm.js';
import axios from 'axios';

const URL = 'http://localhost:5000/'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      queryValue: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.getDrugJSON = this.getDrugJSON.bind(this);
  }

  onSubmit(text) {
    text = text.toLowerCase()

    this.setState({
      queryValue: text
    });

    this.getDrugJSON(text);
  }

  getDrugJSON(drug) {
      axios.get(URL + "drugs/" + drug).then( res => {
          let drugInfo = res.data
          this.setState({
            queryDrug: drugInfo
          });
      }).catch (e => {
        console.error(e);
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nettipuoskari</h2>
        </div>
        <p className="intro">
          Start making queries by typing into the box
        </p>

        <QueryForm 
          onSubmit={this.onSubmit}
        />

        <h2> {this.state.queryValue} </h2>

        { this.state.queryDrug && 
          <Piechart 
            data={this.state.queryDrug.dosages} 
            title="Drug dosages"
          />
        }

      </div>
    );
  }
}

export default App;
