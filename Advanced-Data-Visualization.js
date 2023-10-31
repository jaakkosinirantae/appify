/*
Filename: Advanced-Data-Visualization.js

This code is an advanced data visualization script. It demonstrates sophisticated techniques to create dynamic and interactive visualizations using JavaScript.
*/

// Import external libraries
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Global variables
const width = 800;
const height = 600;

// Select the SVG container
const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Load data asynchronously
Promise.all([
  d3.json('world.json'),
  d3.csv('data.csv')
]).then((data) => {
  const world = data[0];
  const csvData = data[1];

  // Define projection
  const projection = d3.geoMercator()
    .fitSize([width, height], topojson.feature(world, world.objects.countries));

  // Create GeoPath generator
  const path = d3.geoPath().projection(projection);

  // Color scale for data
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.value)])
    .range(['#fff', '#0066ff']);

  // Draw world map
  svg.append('g')
    .selectAll('path')
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append('path')
    .attr('class', 'map-path')
    .attr('d', path)
    .style('fill', d => {
      // Lookup value based on country code
      const countryData = csvData.find(item => item.code === d.properties.ISO_A3);
      return countryData ? colorScale(countryData.value) : '#ccc';
    })
    .on('mouseover', (event, d) => {
      // Show tooltip on mouseover
      tooltip.style('visibility', 'visible')
        .html(`Country: ${d.properties.NAME}<br>Value: ${countryData.value}`)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY}px`);
    })
    .on('mouseout', () => {
      // Hide tooltip on mouseout
      tooltip.style('visibility', 'hidden');
    });

  // Create tooltip
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip');

  // Add legend
  const legend = svg.append('g')
    .attr('transform', `translate(${width - 100}, ${height - 150})`);

  legend.append('text')
    .text('Legend')
    .attr('transform', 'translate(10, -10)')
    .attr('class', 'legend-title');

  // Generate gradient for legend
  const gradient = legend.append('defs')
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#fff');

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#0066ff');

  // Draw legend color bar
  legend.append('rect')
    .attr('width', 20)
    .attr('height', 100)
    .style('fill', 'url(#gradient)');

  // Create scale for legend
  const legendScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.value)])
    .range([0, 100]);

  // Draw legend axis
  const legendAxis = d3.axisRight(legendScale)
    .ticks(5)
    .tickFormat(d3.format('.1s'));

  legend.append('g')
    .attr('transform', 'translate(25, 0)')
    .call(legendAxis);
}).catch((error) => {
  console.log('An error occurred:', error);
});