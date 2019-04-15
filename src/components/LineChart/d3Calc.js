import * as d3 from 'd3';

const d3Calc = (data, width, height, margin) => {
  const dateExtent = d3.extent(data, d => new Date(d.dt * 1000));
  const [minHigh, maxHigh] = d3.extent(data, d => d.main.humidity);

  const xScale = d3
    .scaleTime()
    .domain(dateExtent)
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(minHigh, 0), maxHigh])
    .range([height - margin.bottom, margin.top]);

  const highLine = d3
    .line()
    .x(d => xScale(new Date(d.dt * 1000)))
    .y(d => yScale(d.main.humidity));

  const lowLine = d3
    .line()
    .x(d => xScale(new Date(d.dt * 1000)))
    .y(d => yScale(d.main.temp_min));

  return {
    d3Data: [
      { path: highLine(data), fill: 'none', stroke: 'red', strokeWidth: '1.5' },
      { path: lowLine(data), fill: 'none', stroke: 'blue', strokeWidth: '1.5' }
    ],
    xScale,
    yScale
  };
};

export default d3Calc;
