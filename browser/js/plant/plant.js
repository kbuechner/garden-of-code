app.config(function ($stateProvider) {
	$stateProvider.state('plant', {
		url: '/challenges/:id/plant',
		templateUrl: 'js/plant/plant-template.html',
		controller: 'PlantCtrl'
    });
});

app.controller('PlantCtrl', function ($scope, $stateParams, PlantFactory){
	
	let id = $stateParams.id;

	PlantFactory.getChallenge(id)
	.then(function (challenge) {
		$scope.challenge = challenge;
	});
})

app.factory('PlantFactory', function ($http) {

	var PlantFactory = {};
	var treeData = [{
	    "name": "1",
	    "parent": "null",
	    "children": [
	      {
	        "name": "2-1",
	        "parent": "1",
	        "children": [
	          {
	            "name": "3-1",
	            "parent": "2-1",
	            "text": "Hello, world!"
	          },
	          {
	            "name": "3-2",
	            "parent": "2-1",
	            "text": "Say hi!"
	          }],
	        "text": "Getting Started"
	      },
	      {
	        "name": "2-2",
	        "parent": "1",
	        "text": "True and False",
	      }],
	    "text": "Welcome to Coding!",
	  }];

	PlantFactory.getChallenge = function (id) {
		return $http.get('/api/challenges/' + id)
		.then(function (res) {
			console.log(res);
			return;
		});
	};
	PlantFactory.buildPlant = function(treeData){
		var margin = {top: 40, right: 120, bottom: 20, left: 120},
		  width = 960 - margin.right - margin.left,
		  height = 500 - margin.top - margin.bottom;
		  
		var i = 0;
		var tree = d3.layout.tree()
		  .size([height, width]);
		var diagonal = d3.svg.diagonal()
		  .projection(function(d) { return [d.x, d.y]; });
		var svg = d3.select("#plant").append("svg")
		  .attr("width", width + margin.right + margin.left)
		  .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		var root = treeData[0];
		  
		update(root);
		function update(source) {
		  // Compute the new tree layout.
		  var nodes = tree.nodes(root).reverse(),
		    links = tree.links(nodes);
		  // Normalize for fixed-depth.
		  nodes.forEach(function(d) { d.y = d.depth * 100; });
		  // Declare the nodes…
		  var node = svg.selectAll("g.node")
		    .data(nodes, function(d) { return d.id || (d.id = ++i); });
		  // Enter the nodes.
		  var nodeEnter = node.enter().append("g")
		    .attr("class", "node")
		    .attr("transform", function(d) { 
		      return "translate(" + d.x + "," + d.y + ")"; });
		  nodeEnter.append("circle")
		    .attr("r", 10)
		  nodeEnter.append("text")
		    .attr("y", function(d) { 
		      return d.children || d._children ? -18 : 18; })
		    .attr("dy", ".35em")
		    .attr("text-anchor", "center")
		    .text(function(d) { return d.text; })
		    .style("fill-opacity", 1);
		  // Declare the links…
		  var link = svg.selectAll("path.link")
		    .data(links, function(d) { return d.target.id; });
		  // Enter the links.
		  link.enter().insert("path", "g")
		    .attr("class", "link")
		    .attr("d", diagonal);
		}
	}

	return PlantFactory;


});