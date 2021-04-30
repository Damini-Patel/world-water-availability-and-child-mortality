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

// Import Data
//Read the data
d3.json("/api/v1.0/jcomparison")
  .then(function (d) {
    console.log(d);
    data = d.data;

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function (d) {
      d.country = d.country;
      d.accessibility_percentage = +d.accessibility_percentage;
      d.mortality_rate = +d.mortality_rate;
    });

    // Step 2: Create scale functions
    // ==============================
    var width = 1000;
    var height = 500;

    var xLinearScale = d3
      .scaleLinear()
      .domain([20, d3.max(data, (d) => d.accessibility_percentage)])
      .range([0, width]);

    var yLinearScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.mortality_rate)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xLinearScale(d.accessibility_percentage))
      .attr("cy", (d) => yLinearScale(d.mortality_rate))
      .attr("r", "15")
      .attr("fill", "teal")
      .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3
      .tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function (d) {
        return `${d.country}<br>Water Accessibility: ${d.accessibility_percentage}<br>Mortality Rate: ${d.mortality_rate}`;
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup
      .on("click", function (data) {
        toolTip.show(data, this);
      })
      // onmouseout event
      .on("mouseout", function (data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Hair Metal Band Hair Length (inches)");
  })
  .catch(function (error) {
    console.log(error);
  });
