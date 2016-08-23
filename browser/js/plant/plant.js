app.factory('PlantFactory', function() {
	return {
		getUserChallenge: function() {
			return {
				"name": "0",
				"parent": "null",
				"children": [{
					"name:": "1",
					"parent": "0",
					"children": [{
						"parent": "1",
						"text": "Hello, World!",
						"leafsize": "20"
					}, {
						"parent": "1",
						"text": "Variables",
						"leafsize": "20"
					}, {
						"name": "2",
						"text": "",
						"children": [{
							"parent": "2",
							"text": "Functions",
							"leafsize": "15"
						}, {
							"name": "3",
							"parent": "2",
							"children": [{
								"parent": "3",
								"text": "Booleans",
								"leafsize": "10"
							}],
							"text": "",
							"leafsize": "0"
						}, {
							"parent": "2",
							"text": "Returning values",
							"leafsize": "15"
						}, {
							"parent": "2",
							"text": "Functions and Variables",
							"leafsize": "15"
						}],
						"leaf-size": "0"
					}, {
						"parent": "1",
						"text": "Numbers and Math",
						"leafsize": "20"
					}],
					"text": "Welcome to Javascript!",
					"leafsize": "25"
				}],
				"text": "",
				"leafsize": "0"
			}
		}
	}
})

app.directive('plantDirective', function(PlantFactory) {
	return {
		restrict: 'EA',
		// scope: '=',
		link: function(s, e, a) {
			console.log("HERE'S PLANT FACTORY: ", PlantFactory.getUserChallenge());

			var margin = {
					top: 140,
					right: 10,
					bottom: 140,
					left: 10
				},
				width = 240 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

			var orientation = {
				"bottom-to-top": {
					size: [width, height],
					x: function(d) {
						return d.x;
					},
					y: function(d) {
						return height - d.y;
					}
				}
			};


			var svg = d3.selectAll("#plant")
				.data(d3.entries(orientation))
				.enter().append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



			var root = PlantFactory.getUserChallenge()

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
					.attr("d", d3.svg.diagonal().projection(function(d) {
						return [o.x(d), o.y(d)];
					}));

				// Create the node circles.

				svg.selectAll(".node")
					.data(nodes)
					.enter().append("image")
					.attr('xlink:href', '../../images/small_leaf.png')
					.attr("height", function(d) {
						return d.leafsize
					})
					.attr("width", function(d) {
						return d.leafsize
					})
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
					.text(function(d) {
						return d.text
					});

			});


		},
		templateUrl: 'js/plant/plant.html',
	}
})