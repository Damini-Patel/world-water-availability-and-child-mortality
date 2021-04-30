// Define SVG area dimensions
var svgWidth = 1200;
var svgHeight = 660;
// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 30,
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("/api/v1.0/jmortality")
  .then(function (d) {
    console.log(d);
    data = d.data;

    // Cast the hours value to a number for each piece of tvData
    data.forEach(function (d) {
      d.mortality_rate = +d.mortality_rate;
    });
    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, chartWidth])
      .padding(0.05);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.mortality_rate)])
      .range([chartHeight, 0]);
    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);
    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g").call(leftAxis);
    chartGroup
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xBandScale(d.country))

      .attr("y", (d) => yLinearScale(d.mortality_rate))
      .attr("width", xBandScale.bandwidth())
      .attr("height", (d) => chartHeight - yLinearScale(d.mortality_rate));

    // Step 1: Initialize Tooltip
    var toolTip = d3
      .tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function (d) {
        return `Country: <strong>${d.country}</strong><hr> Mortality Rate:${d.mortality_rate}
       %`;
      });

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    chartGroup
      .on("mouseover", function (d) {
        toolTip.show(d, this);
      })
      // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function (d) {
        toolTip.hide(d);
      });
  })
  .catch(function (error) {
    console.log(error);
  });