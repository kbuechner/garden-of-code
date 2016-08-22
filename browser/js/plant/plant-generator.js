var margin = {top: 140, right: 10, bottom: 140, left: 10},
    width = 240 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var orientations = {
  "bottom-to-top": {
    size: [width, height],
    x: function(d) { return d.x; },
    y: function(d) { return height - d.y; }
  }
};


var svg = d3.select("body").selectAll("svg")
    .data(d3.entries(orientations))
  .enter().append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.json("graph.json", function(error, root) {
  if (error) throw error;

  svg.each(function(orientation) {
    var svg = d3.select(this),
        o = orientation.value;

    // Compute the layout.
    var tree = d3.layout.tree().size(o.size),
        nodes = tree.nodes(root),
        links = tree.links(nodes);

    // Create the link lines.
    svg.selectAll(".link")
        .data(links)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.svg.diagonal().projection(function(d) { return [o.x(d), o.y(d)]; }));

    // Create the node circles.

    svg.selectAll(".node")
        .data(nodes)
        .enter().append("image")
        .attr('xlink:href','../../images/small_leaf.png')
        .attr("height", function(d){ return d.leafsize})
        .attr("width", function(d){ return d.leafsize})
        .attr("x", o.x)
        .attr("y", o.y)
        .attr("transform", "translate(0, -10)");
    svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("x", o.x)
        .attr("y", o.y)
        .attr("transform", "translate(0, 20)")
        .text(function(d){return d.text});
  });
});

