var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var url = "http://127.0.0.1:5000/api/v1.0/jmortality"

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var year = data.dataset.name;
    var mortality = data.dataset.dataset_code;
    var country = data.dataset.start_date;
    
chart = {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible");
  
    svg.append("g")
        .call(xAxis);
  
    svg.append("g")
        .call(yAxis);
  
    const path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data.series)
      .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("d", d => line(d.values));
  
    svg.call(hover, path);
  
    return svg.node();
}

data = Object {
    y: "Rate Mortality"
    series: Array(45) [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, …]
    dates: Array(166) [2000-01-01, 2000-02-01, 2000-03-01, 2000-04-01, 2000-05-01, 2000-06-01, 2000-07-01, 2000-08-01, 2000-09-01, 2000-10-01, 2000-11-01, 2000-12-01, 2001-01-01, 2001-02-01, 2001-03-01, 2001-04-01, 2001-05-01, 2001-06-01, 2001-07-01, 2001-08-01, …]
}
data = {
    const data = d3.tsvParse(await FileAttachment("unemployment.tsv").text());
    const columns = data.columns.slice(1);
    return {
      y: "Rate Mortality",
      series: data.map(d => ({
        name: d.name.replace(/, ([\w-]+).*/, " $1"),
        values: columns.map(k => +d[k])
      })),
      dates: columns.map(d3.utcParse("%Y-%m"))
    };
}
function hover(svg, path) {
  
    if ("ontouchstart" in document) svg
        .style("-webkit-tap-highlight-color", "transparent")
        .on("touchmove", moved)
        .on("touchstart", entered)
        .on("touchend", left)
    else svg
        .on("mousemove", moved)
        .on("mouseenter", entered)
        .on("mouseleave", left);
  
    const dot = svg.append("g")
        .attr("display", "none");
  
    dot.append("circle")
        .attr("r", 2.5);
  
    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8);
  
    function moved(event) {
      event.preventDefault();
      const pointer = d3.pointer(event, this);
      const xm = x.invert(pointer[0]);
      const ym = y.invert(pointer[1]);
      const i = d3.bisectCenter(data.dates, xm);
      const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
      path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
      dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
      dot.select("text").text(s.name);
    }
  
    function entered() {
      path.style("mix-blend-mode", null).attr("stroke", "#ddd");
      dot.attr("display", null);
    }
  
    function left() {
      path.style("mix-blend-mode", "multiply").attr("stroke", null);
      dot.attr("display", "none");
    }
}
height = 600

margin = ({top: 20, right: 20, bottom: 30, left: 30})

x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])


y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
   
yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))

d3 = require("d3@^6.1")    