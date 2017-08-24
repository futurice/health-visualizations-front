import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

export default class MostCommon extends React.Component {
  
  render() {  

    let options = {
      title: this.props.title,
      sliceVisibilityThreshold: 1/50
    };

    let drugLabels = ["Drug", "Count"];
    let symptomLabels = ["Symptom", "Count"];
    let drugData = [drugLabels, ...this.props.drugData].slice(0, 20);
    let symptomData = [symptomLabels, ...this.props.symptomData].slice(0, 20);

    return (
      <div className="mostCommon">
        <h2> Most common drugs and symptoms </h2>
          <table>
            <tr>
              <td>
              <Chart
                chartType="BarChart"
                data={drugData}
                options={options}
                graph_id="common_drugs"
                width="600px"
                height={this.props.height || "800px"} 
                legend_toggle
              />
              </td>
              <td>
              <Chart
                chartType="BarChart"
                data={symptomData}
                options={options}
                graph_id="common_symptoms"
                width="600px"
                height={this.props.height || "800px"} 
                legend_toggle
              />
              </td>
              </tr>
          </table>
        </div>
    );
  }
}