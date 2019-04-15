import * as d3 from 'd3';

const d3Calc = (data, width, height, margin) => {
  const perSliceAngle = (2 * Math.PI) / data.length;
  const radiusScale = d3
    .scaleLinear()
    .domain([d3.min(data, ({ low }) => low), d3.min(data, ({ high }) => high)])
    .range([0, width / 2]);

  const colorExtent = d3.extent(data, d => d.avg).reverse();

  const colorScale = d3
    .scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu);

  const arcs = data.map((d, i) => {
    const pie = {
      startAngle: i * perSliceAngle,
      endAngle: (i + 1) * perSliceAngle,
      innerRadius: radiusScale(d.low),
      outerRadius: radiusScale(d.high)
    };

    const arc = d3
      .arc()
      .innerRadius(d => d.innerRadius)
      .outerRadius(d => d.outerRadius)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);

    return { path: arc(pie), fill: colorScale(d.avg) };
  });

  return { d3Data: arcs };
};

export default d3Calc;
