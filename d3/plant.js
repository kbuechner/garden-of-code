'use strict'
var dummyData = [
{
  "name": "Top Level" ,
  "parent": "null",
  "children": [{
    "name":  "Level 2: A",
    "parent": "Top Level",
    "children": [
      {
      "name":  "Son of A",
      "parent": "Level 2: A",
      },
      {
      "name": "Daughter of A",
      "parent": "Level 2: A"
      }
    ]
  },{
    "name": "Level 2: B",
    "parent": "Top Level"
  }]
}];

var margin = {top: 20, right: 120, bottom: 20, left: 120};
var width = 960 - margin.right - margin.left; 
var height = 500 - margin.top - margin.bottom;

var i = 0;


var tree = d3.tree()
              .size([height, width]);
var diagonal = d3.path()
                  .lineTo(function(d){
                    return [d.x, d.y];
                  })
var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var root = dummyData[0];
update(root);

function update(source){
    var nodes = tree.nodes(root).reverse()
    var links = tree.links(nodes)

    nodes.forEach(function(d){
      d.y = d.depth * 180
    })
    var nodeEnter = node.enter()
    nodeEnter.append("g")
              .attr("class", "node")
              .attr("transform", function(d){
                return "translate (" + d.x + ", " + d.y + ")"; 
              })
              .append("circle")
              .attr("r", 10)
              .style("fill", "#fff")
    var link = svg.selectAll ("path.link")
                  .data(links, function(d){
                    return d.target.id
                  });
    link.enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal)
                        
}