/* eslint-disable */
import React, { Component } from 'react';
import * as d3 from 'd3';
import d3Calc from './d3Calc';


const chartWidth = 650;
const chartHeight = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const xAxis = d3.axisBottom();
const yAxis = d3.axisLeft();
const xAxisOffset = chartHeight - margin.bottom;
const yAxisOffset = margin.left;

class LineChart extends Component {
  state = {
    d3Data: [],
    xScale: '',
    yScale: ''
  };
  
  componentDidMount() {
    this.calculateD3Data();
  }

  componentDidUpdate(nextProps) {
    if (this.props.data !== nextProps.data) this.calculateD3Data();
  }

  calculateD3Data = () => {
    const { d3Data, xScale, yScale } = d3Calc(
      this.props.data,
      chartWidth,
      chartHeight,
      margin
    );
    this.setState({ d3Data, xScale, yScale }, this.setAxes);
  };

  setAxes = () => {
    const { xScale, yScale } = this.state;
    xAxis.scale(xScale);
    yAxis.scale(yScale);
    d3.select(this.xAxis).call(xAxis);
    d3.select(this.yAxis).call(yAxis);
  };

  render() {
    const { d3Data } = this.state;
    if (!d3Data.length) return <div>Loading ..</div>;
    return (
      <svg width={chartWidth} height={chartHeight}  style={{ backgroundColor: 'white' }}>
        {d3Data.map(({ path, fill, stroke, strokeWidth }) => {
          return (
            <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
          );
        })}
        <g ref={c => { this.xAxis = c; }} transform={`translate(0, ${xAxisOffset})`}/>
        <g ref={d => { this.yAxis = d; }} transform={`translate(${yAxisOffset}, 0)`} />
      </svg>
    );
  }
}

export default LineChart;
