

app.factory('PlantFactory', function($http) {
	var PlantFactory = {}
	var root = {
		name: "0",
		parent: null,
		children: [],
		text: "",
		imgSize: 0,
		imgType: "leaf",
		show: true,
		level: 0
	}
	var firstStem = {
		name: "1",
		parent: "0",
		children: [],
		text: "",
		imgSize: 0,
		imgType: "leaf",
		show: true,
		level: 1
	}
	var secondStem = {
		name: "2",
		parent: "1",
		children: [],
		text: "",
		imgSize: 0,
		imgType: "leaf",
		show: false,
		level: 2
	}
	var thirdStem = {
		name: "3",
		parent: "2",
		children: [],
		text: "",
		imgSize: 0,
		imgType: "leaf",
		show: false,
		level: 3
	}
	var fourthStem = {
		name: "4",
		parent: "3",
		children: [],
		text: "",
		imgSize: 0,
		imgType: "leaf",
		show: false,
		level: 4
	}
	var blossomNode = {
		name: "blossom",
		text: "",
		imgSize: 40,
		imgType: "flower",
		show: false,
	}

	PlantFactory.getData = function(res){
		return res;
	}

	PlantFactory.getAll = function(id){
		var url = '/api/userchallenges/'
	}

	PlantFactory.getUserPath = function(id){
		var url = '/api'
	}

	PlantFactory.getUserChallenge = function(challengeId){

	}
	PlantFactory.parseData = function(userChallenges) {
			var levelOne = [];
			var levelTwo = [];
			var levelThree = [];
			var levelFour = [];
			var treeObj = {};


		function makeNode(challengeData, level) {
			var returnObj = {}
			returnObj.parent = level.toString(),
			returnObj.text = challengeData.title;
			returnObj.imgSize = (4 - level) * 7;
			returnObj.imgType = "leaf",
			returnObj.show = challengeData.complete;

			return returnObj
		}

		for (var x = 0; x < userChallenges.length; x++) {
			if (userChallenges[x].level === 1) {
				firstStem.children.push(makeNode(userChallenges[x], 1))
				if (x === userChallenges.length - 1) {
					blossomNode.parent = "1"
				}
			} else if (userChallenges[x].level === 2) {
				secondStem.children.push(makeNode(userChallenges[x], 2))

				if (x === userChallenges.length - 1) {
					blossomNode.parent = "2"
				}
			} else if (userChallenges[x].level === 3) {
				thirdStem.children.push(makeNode(userChallenges[x], 3))

				if (x === userChallenges.length - 1) {
					blossomNode.parent = "3"
				}
			} else if (userChallenges[x].level === 4) {
				fourthStem.children.push(makeNode(userChallenges[x], 4))

				if (x === userChallenges.length - 1) {
					blossomNode.parent = "3"
				}
			}
		}
	return angular.toJson(treeObj, true, 4)
	}

	PlantFactory.buildTree = function(challengeData) {
		var margin = {
			top: 140,
			right: 10,
			bottom: 140,
			left: 10
		}

			var width = 240 - margin.left - margin.right;
			var height = 500 - margin.top - margin.bottom;

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

			var svg = d3.select("body").selectAll("svg")
				.data(d3.entries(orientation))
				.enter().append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var root = challengeData;

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
						return d.imgSize
					})
					.attr("width", function(d) {
						return d.imgSize
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
	}
	return PlantFactory;
})


app.directive('plantDirective', function(PlantFactory) {
	return {
		restrict: 'A',
		// scope: '=',
		link: function(s, e, a) {
			console.log("HERE'S PLANT FACTORY: ", PlantFactory.getUserChallenge())
		},
		templateUrl: 'js/plant/plant.html',
	}
})