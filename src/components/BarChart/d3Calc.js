import * as d3 from 'd3';

const d3Calc = (data, chartWidth, chartHeight, margin) => {
  console.log('data ', data);
  const dateExtent = d3.extent(data, d => new Date(d.dt * 1000));
  const [minHigh, maxHigh] = d3.extent(data, d => d.main.temp_max);

  console.log(dateExtent);
  console.log([minHigh, maxHigh]);

  const xScale = d3
    .scaleTime()
    .domain(dateExtent)
    .range([margin.left, chartWidth - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(minHigh, 0), maxHigh])
    .range([chartHeight - margin.bottom, margin.top]);

  return {
    d3Data: data.map(d => ({
      x: xScale(new Date(d.dt * 1000)),
      y: yScale(d.main.temp_max),
      height: yScale(d.main.temp_min) - yScale(d.main.temp_max)
    })),
    xScale,
    yScale
  };
};

export default d3Calc;
