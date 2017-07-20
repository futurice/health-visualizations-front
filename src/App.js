import React, { Component } from 'react';
import './App.css';
import ChartTemplate from './ChartTemplate.js';
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



      <table className="charts">
          <tr>
              <td>
                { this.state.queryDrug && 
                  <ChartTemplate 
                    data={this.state.queryDrug.dosages} 
                    title="Drug dosages"
                    labels={["Dosages", "Count"]}
                    chartType="PieChart"
                    graph_id="dosages"
                  /> 
                }
              </td>
              <td>
                { this.state.queryDrug &&
                  <ChartTemplate 
                    data={this.state.queryDrug.associated_drugs} 
                    title="Associated drugs"
                    labels={["Drug", "Count"]}
                    chartType="BarChart"
                    graph_id="drugs"
                    slice={20}
                  />
                }
              </td>
              <td>
                { this.state.queryDrug &&
                  <ChartTemplate 
                    data={this.state.queryDrug.associated_symptoms} 
                    title="Associated symptoms"
                    labels={["Symptom", "Count"]}
                    chartType="BarChart"
                    graph_id="symptoms"
                    slice={20}
                  />

                }
              </td>
          </tr>
      </table>
      </div>
    );
  }
}

export default App;
