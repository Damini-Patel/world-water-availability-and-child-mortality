// Define SVG area dimensions
var svgWidth = 1200;
var svgHeight = 660;
// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select(".graph-section")
  .append("div")
  .classed("graph", true)
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// Load data from hours-of-tv-watched.csv
d3.json("/api/v1.0/jwater")
  .then(function (d) {
    console.log(d);
    data = d.data;

    // Cast the hours value to a number for each piece of tvData
    data.forEach(function (d) {
      d.accessibility_percentage = +d.accessibility_percentage;
    });
    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, chartWidth])
      .padding(0.1);
    // Create a linear scale for the vertical axis.
    var yLinearScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.accessibility_percentage)])
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
      .attr("y", (d) => yLinearScale(d.accessibility_percentage))
      .attr("width", xBandScale.bandwidth())
      .attr(
        "height",
        (d) => chartHeight - yLinearScale(d.accessibility_percentage)
      );

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3
      .tip()
      .attr("class", "tooltip")
      .offset([-10, 0])
      .html(function (d) {
        console.log(d);
        return `<strong>${d.country}</strong><br><strong>Water Accessibility: </strong>${d.accessibility_percentage}%`;
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    chartGroup
      .on("mouseover", function (data) {
        toolTip.show(data, this);
      })
      // onmouseout event
      .on("mouseout", function (data, index) {
        toolTip.hide(data);
      });
  })
  .catch(function (error) {
    console.log(error);
  });
