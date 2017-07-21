import React, { Component } from 'react';
import './App.css';
import ChartTemplate from './ChartTemplate.js';
import QueryForm from './QueryForm.js';
import axios from 'axios';
import { URL, parse, parseAssociations } from './util.js';
import MostCommon from './MostCommon.js';
import QuoteModal from './QuoteModal.js';

const SLICE = 20;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      queryValue: '',
      minCount: 30,
      modalIsOpen: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.getDrugJSON = this.getDrugJSON.bind(this);
    this.getMostCommon = this.getMostCommon.bind(this);
    this.handleMinCount = this.handleMinCount.bind(this);
    this.chartClicked = this.chartClicked.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onSubmit(text) {
    text = text.toLowerCase()

    this.setState({
      queryValue: text
    });

    this.getDrugJSON(text);
  }

  handleMinCount(event) {
    let value = event.target.value;

    this.setState({
      minCount: value
    })
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

  getMostCommon(resource) {
    axios.get(URL + "most_common/" + resource).then( res => {
            let mostCommon = res.data
            this.setState({
              [resource]: mostCommon
            });
        }).catch (e => {
          console.error(e);
        })    
  }

  chartClicked(Chart) {
    let selected = Chart.chart.getSelection()[0].row + 1; // Row that user clicked on
    let title = Chart.props.data[selected][0]; // Title of that row

    // TODO request quotes from backend

    this.setState({
      modalIsOpen: true,
      modalResourceTitle: `Quotes from posts with ${this.state.queryValue} and ${title}`
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  componentWillMount() {
    this.getMostCommon("drugs");
    this.getMostCommon("symptoms")
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nettipuoskari</h2>
        </div>

        <QuoteModal
          isOpen={this.state.modalIsOpen}
          resourceName={this.state.modalResourceTitle}
          data={this.state.modalData}
          closeModal={this.closeModal}
        />

        <p className="intro">
          Start making queries by typing into the box
        </p>

        <QueryForm 
          onSubmit={this.onSubmit}
          handleMinCount={this.handleMinCount}
          minCount={this.state.minCount}
        />

        <h2> {this.state.queryValue} </h2>

      <table className="charts">
          <tr>
              <td>
                { this.state.queryDrug && 
                  <ChartTemplate 
                    data={parse(this.state.queryDrug.dosages, ["Dosages", "Count"])} 
                    title="Drug dosages"
                    chartType="PieChart"
                    graph_id="dosages"
                    height={"700px"}
                  /> 
                }
              </td>
              <td>
                { this.state.queryDrug &&
                  <ChartTemplate 
                    data={parseAssociations(this.state.queryDrug.associated_drugs, ["Drug", "Value"], SLICE, this.state.minCount)} 
                    title="Associated drugs"
                    chartType="BarChart"
                    graph_id="drugs"
                    chartClicked={this.chartClicked}
                  />
                }
              </td>
              <td>
                { this.state.queryDrug &&
                  <ChartTemplate 
                    data={parseAssociations(this.state.queryDrug.associated_symptoms, ["Symptom", "Value"], SLICE, this.state.minCount)} 
                    title="Associated symptoms"
                    chartType="BarChart"
                    graph_id="symptoms"
                    chartClicked={this.chartClicked}
                  />
                }
              </td>
          </tr>
      </table>
      
      { this.state.drugs && this.state.symptoms &&
        <MostCommon 
          drugData={this.state.drugs}
          symptomData={this.state.symptoms}
        />
      }
      </div>
    );
  }
}

export default App;
