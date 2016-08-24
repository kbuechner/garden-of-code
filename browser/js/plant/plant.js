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
	PlantFactory.getChallenge = function (userId, challengeId) {
		return $http.get('/api/userchallenges/' + userId + '/challenges/' + challengeId)
		.then(getData(res))
	}

	PlantFactory.getAll = function(id){
		return $http.get('/api/userchallenges/' + userId + '/challenges')
		.then(getData(res))
	}

	PlantFactory.getUserPath = function(userId, pathId){
		return $http.get('/api/userchallenges/' + userId + '/path/' + pathId)
		.then(getData(res))
		.then(function(data){
			console.log(data)
		})
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
			top: 40,
			right: 10,
			bottom: 40,
			left: 10
		}

			var width = 340 - margin.left - margin.right;
			var height = 340 - margin.top - margin.bottom;

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

			var svg = d3.select("#plant").selectAll("svg")
				.data(d3.entries(orientation))
				.enter().append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			var root = {
				"name": "0",
				"parent": "null",
				"children": [{
					"name:": "1",
					"parent": "0",
					"children": [{
						"parent": "1",
						"text": "Hello, World!",
						"imgSize": "50",
						"imgType": "leaf"
					}, {
						"parent": "1",
						"text": "Variables",
						"imgSize": "50",
						"imgType": "leaf"
					}, {

						"parent": "1",
						"name": "2",
						"text": "",
						"children": [{
							"parent": "2",
							"text": "Functions",
							"imgSize": "35",
						"imgType": "leaf"
						}, {
							"name": "3",
							"parent": "2",
							"children": [{
								"parent": "3",
								"text": "Booleans",
								"imgSize": "75",
								"imgType": "flower"
							}],
							"text": "",
							"imgSize": "0",
						"imgType": "leaf"
						}, {
							"parent": "2",
							"text": "Returning values",
							"imgSize": "35",
						"imgType": "leaf"
						}, {
							"parent": "2",
							"text": "Functions and Variables",
							"imgSize": "35",
						"imgType": "leaf"
						}],
						"imgSize": "0"
					}, {
						"parent": "1",
						"text": "Numbers and Math",
						"imgSize": "50",
						"imgType": "leaf"
					}],
					"text": "Welcome to Javascript!",
					"imgSize": "65",
						"imgType": "leaf"
				}],
				"text": "",
				"imgSize": "0",
						"imgType": "leaf"
			}

			svg.each(function(orientation) {
				var svg = d3.select(this);
				var o = orientation.value;

				// Compute the layout.
				var tree = d3.layout.tree().size(o.size);
				var nodes = tree.nodes(root);
				var links = tree.links(nodes);

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
					.attr('xlink:href', function(d){
						if(d.imgType==="leaf")
							return '../../images/small_leaf.png'
						else
							return '../../images/pink-flower-th.png'
					})
					.attr("height", function(d) {
						return d.imgSize
					})
					.attr("width", function(d) {
						return d.imgSize
					})
					.attr("x", o.x)
					.attr("y", o.y)
					.attr("transform", function(d){
						var x = -d.imgSize/2
						var y = -d.imgSize/2
						return "translate(" + x + ", " + y + ")"
					})
				// svg.selectAll("text")
				// 	.data(nodes)
				// 	.enter()
				// 	.append("text")
				// 	.attr("x", o.x)
				// 	.attr("y", o.y)
				// 	.attr("transform", function(d){
				// 		var x = -d.imgSize/2
				// 		var y = -d.imgSize/2
				// 		return "translate(" + x + ", " + y + ")"
				// 	})
				// 	.text(function(d) {
				// 		return d.text
				// });
		});
	}
	return PlantFactory;
})


app.directive('plantDirective', function(PlantFactory) {
	return {
		restrict: 'EA',
		scope: {},
		link: function(s, e, a) {
			console.log("HERE'S PLANT FACTORY: ", PlantFactory.buildTree())
		},
		templateUrl: 'js/plant/plant.html',
	}
})