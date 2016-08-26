app.factory('PlantFactory', function($http, $q) {
	var PlantFactory = {}

	PlantFactory.getUserPath = function(userId, pathId) {
		return $http.get('/api/userchallenges/' + userId + '/path/' + pathId)
			.then(function(res) {
				return res.data
			})
			// .then(function(challenges) {
			// 	var returnChallenges = [];
			// 	for (var x = 0; x < challenges.length; x++) {
			// 		returnChallenges.push($http.get('api/userChallenges/' + userId + '/challenges/' + challenges[x].challengeId))
			// 	}
			// 	return $q.all(returnChallenges)
			// })
	}

	PlantFactory.buildTree = function(userChallenges, pathId) {
		// console.log(userChallenges)
		var createNodes = userChallenges.forEach(function(item, index){
			console.log(item)
			item.parent = item.challenge.level ? item.challenge.level-1 : null,
			item.show = item.complete,
			item.name = item.challenge.title,
			item.imgSize = 65,
			item.imgType = "leaf"
		})

		var levels = _.groupBy(userChallenges, x=>x.challenge.level)
		var levelNodes = Object.keys(levels)
								.map((level, index) => ({
									name: index,
									parent: index ? index-1 : null,
									children: levels[level]
									.map(userChallenge=>({
										name: userChallenge.challenge.title,
										parent: index,
										children: [],
										show: userChallenge.complete,
										imgSize: 65,
										imgType: "leaf",
										userChallenge
									}))
								}))
		// console.log("Level Nodes: ", levelNodes)

var data = userChallenges

// *********** Convert flat data into a nice tree ***************
// create a name: node map
var dataMap = data.reduce(function(map, node) {
	map[node.name] = node;
	return map;
}, {});

// create the tree array
var treeData = [];
data.forEach(function(node) {
	// add to parent
	var parent = dataMap[node.parent];
	if (parent) {
		// create child array if it doesn't exist
		(parent.children || (parent.children = []))
			// add node to child array
			.push(node);
	} else {
		// parent is null or missing
		treeData.push(node);
	}
});
console.log(treeData)




		var root = treeData
		// var root = {
		// "name": "0",
		// "parent": "null",
		// "children": [{
		// 	//level one center
		// 	"name:": "1",
		// 	"parent": "0",
		// 	"children": [{
		// 		"parent": "1",
		// 		"name": "2",
		// 		"text": "",
		// 		"children": [{
		// 			"name": "3",
		// 			"parent": "2",
		// 			"children": [{
		// 				"parent": "3",
		// 				"text": "",
		// 				"imgSize": "75",
		// 				"imgType": "flower",
		// 			}],
		// 			"text": "",
		// 			"imgSize": "0",
		// 			"imgType": "leaf"
		// 		}],
		// 		"imgSize": "0"
		// 	}],
		// 	"text": "Welcome to Javascript!",
		// 	"imgSize": "65",
		// 	"imgType": "leaf",
		// 	"show": "true"
		// }],
		// "text": "",
		// "imgSize": "200",
		// "imgType": "grass",
		// "show": "true"
		// }

		function makeNode(challengeData, level, size) {
			var returnObj = {}
			returnObj.parent = level,
			returnObj.text = challengeData.code;
			returnObj.imgSize = size;
			returnObj.imgType = "leaf",
			returnObj.show = challengeData.complete;
			return returnObj
		}

		// for (var x = 0; x < userChallenges.length; x++) {
		// 	if (x < 2) {
		// 		levelOne.push(makeNode(userChallenges[x].data, "1", 50))
		// 		if (x === 1)
		// 			levelOne.push(firstStem)
		// 		if (x === userChallenges.length - 1) {
		// 			blossomNode.parent = "1"
		// 			levelOne.push(blossomNode);
		// 			break
		// 		}
		// 	} else if (x >= 2 && x < 4) {
		// 		levelTwo.push(makeNode(userChallenges[x].data, "2", 50))
		// 		if (x === 3)
		// 			levelTwo.push(secondStem)
		// 		if (x === userChallenges.length - 1) {
		// 			blossomNode.parent = "1"
		// 			levelTwo.push(blossomNode);
		// 			break
		// 		}
		// 	} else if (x >= 4) {
		// 		levelThree.push(makeNode(userChallenges[x].data, 3, 35))
		// 		if (x === 4)
		// 			levelThree.push(thirdStem)
		// 		if (x === userChallenges.length - 1) {
		// 			blossomNode.parent = "1"
		// 			levelOne.push(blossomNode);
		// 			break
		// 		}
		// 	}

		// 	if(x===5){
		// 		blossomNode.show=true;
		// 	}
		// }
		// initial.children = levelOne;
		// if (levelTwo.length > 0)
		// 	firstStem.children = levelTwo
		// if (levelThree.length > 0)
		// 	secondStem.children = levelThree
		// if (levelFour.length > 0)
		// 	thirdStem.children = levelFour

		// root.children[0] = initial
		// var challengeJson = angular.toJson(userChallenges)

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
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

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
				.attr('xlink:href', function(d) {
					if (d) {
						if (d.imgType === "leaf")
							return '../../images/small_leaf.png'
						else if(d.imgType==="grass")
							return '.../../images/grass.png'
						else
							return '../../images/pink-flower-th.png'
					}
				})
				.attr("height", function(d) {
					if (d.show)
						return 30
					else
						return 0;
				})
				.attr("width", function(d) {
					if (d.show)
						return 30
					else
						return 0;
				})
				.attr("x", o.x)
				.attr("y", o.y)
				// .attr("transform", function(d) {
				// 	var x = -d.imgSize / 2
				// 	var y = -d.imgSize / 2
				// 	return "translate(" + x + ", " + y + ")"
				// })
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


app.directive('plantDirective', function(PlantFactory, AuthService) {
	return {
		restrict: 'E',
		scope: {
			path: '='
		},
		link: function(scope, e, a) {
			AuthService.getLoggedInUser()
				.then(function(user) {
					if (!user) {return false; }
					PlantFactory.getUserPath(user.id, scope.path)
						.then(function(plantData) {
							PlantFactory.buildTree(plantData, scope.path)
						})
				})

			// console.log("HERE'S PLANT FACTORY: ", PlantFactory.buildTree())
		},
		templateUrl: 'js/plant/plant.html',
	}
})
