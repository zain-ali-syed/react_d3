import React, { Component } from 'react';
import d3Calc from './d3Calc';

const chartWidth = 500;
const chartHeight = 500;

class RadialChart extends Component {
  state = {
    d3Data: [],
    radiusScale: ''
  };

  componentDidMount() {
    this.calculateD3Data();
  }

  componentDidUpdate(nextProps) {
    if (this.props.data !== nextProps.data) this.calculateD3Data();
  }

  calculateD3Data = () => {
    const { d3Data } = d3Calc(this.props.data, chartWidth, chartHeight);
    this.setState({ d3Data });
  };

  setAxes = () => {};

  render() {
    const { d3Data } = this.state;
    if (!d3Data.length) return <div>Loading ..</div>;
    return (
      <svg width={chartWidth} height={chartHeight}>
        <g transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}>
          {this.state.d3Data.map(({ path, fill }) => (
            <path d={path} fill={fill} />
          ))}
        </g>
      </svg>
    );
  }
}

export default RadialChart;
