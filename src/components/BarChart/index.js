import React, { Component } from 'react';
import * as d3 from 'd3';
import d3Calc from './d3Calc';

const chartWidth = 650;
const chartHeight = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BarChart extends Component {
  state = {
    d3Data: [],
    xScale: '',
    yScale: ''
  };

  xAxis = d3.axisBottom();

  yAxis = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};
    const { d3Data, xScale, yScale } = d3Calc(
      data,
      chartWidth,
      chartHeight,
      margin
    );

    console.log('----- ', { d3Data, xScale, yScale });
    return { d3Data, xScale, yScale };
  }

  componentDidMount() {
    this.setAxes();
  }

  componentDidUpdate() {
    this.setAxes();
  }

  setAxes = () => {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  };

  render() {
    const { d3Data } = this.state;
    if (!d3Data.length) return <div>Loading..</div>;

    return (
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ backgroundColor: 'white' }}
      >
        {d3Data.map(({ width = 2, height, x, y, fill }) => (
          <rect width={width} height={height} x={x} y={y} fill={fill} key={x} />
        ))}
        <g
          ref="xAxis"
          transform={`translate(0, ${chartHeight - margin.bottom})`}
        />
        <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
      </svg>
    );
  }
}

export default BarChart;
