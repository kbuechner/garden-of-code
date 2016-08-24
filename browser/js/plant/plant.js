app.factory('PlantFactory', function($http, $q) {
	var PlantFactory = {}

	function getData(res){
		return res.data;
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
		.then(function(res){
			return res.data
		})
		.then(function(challenges){
			var returnChallenges = [];
			for(var x=0; x<challenges.length; x++){
				returnChallenges.push($http.get('api/userChallenges/'+ userId +'/challenges/' + challenges[x].challengeId))
			}
			return $q.all(returnChallenges)				
		 })
	}
	PlantFactory.getPathLength = function(pathId){
		return $http.get('/api/paths/' + pathId + "/challenges")
		.then(function(res){
			console.log(res.data)
		})
	}

	PlantFactory.buildTree = function(userChallenges, pathLength) {
			console.log(pathLength)
			var levelOne = [];
			var levelTwo = [];
			var levelThree = [];
			var levelFour = [];

			var root = {
				name: "root",
				parent: null,
				children: [],
				text: "",
				imgSize: 0,
				imgType: "leaf",
				show: true,
			}

			var initial = {
				name: "0",
				parent: "root",
				children: [],
				text: "",
				imgSize: 65,
				imgType: "leaf",
				show: true,
			}
			var firstStem = {
				name: "1",
				parent: "0",
				text: "",
				imgSize: 50,
				imgType: "leaf",
				show: true,
			}


			var secondStem = {
				name: "2",
				parent: "1",
				children: [],
				text: "",
				imgSize: 0,
				imgType: "leaf",
				show: false,
			}
			secondStem.children=levelTwo

			var thirdStem = {
				name: "3",
				parent: "2",
				children: [],
				text: "",
				imgSize: 0,
				imgType: "leaf",
				show: false,
			}
			thirdStem.children=levelThree

			var fourthStem = {
				name: "4",
				parent: "3",
				children: [],
				text: "",
				imgSize: 0,
				imgType: "leaf",
				show: false,
			}
			fourthStem.children = levelFour;

			var blossomNode = {
				name: "blossom",
				text: "",
				imgSize: 75,
				imgType: "flower",
				show: false,
			}

		function makeNode(challengeData, level, size) {
			var returnObj = {}
			returnObj.parent = level,
			returnObj.text = challengeData.code;
			returnObj.imgSize = size;
			returnObj.imgType = "leaf",
			returnObj.show = challengeData.complete;
			return returnObj
		}
		
		for (var x = 0; x < userChallenges.length; x++) {
			if(x<2){
				levelOne.push(makeNode(userChallenges[x].data, "1", 50))
				if(x===1)
					levelOne.push(firstStem)
				if (x===userChallenges.length-1){
					blossomNode.parent = "1"
					levelOne.push(blossomNode);
					break
				}
			}
			else if(x>=2 && x<4){
				levelTwo.push(makeNode(userChallenges[x].data, "2", 50))
				if(x===4)
					levelTwo.push(secondStem)
				if (x===userChallenges.length-1){
					blossomNode.parent = "1"
					levelTwo.push(blossomNode);
					break
				}
			}
			else if(x>=4){
				levelThree.push(makeNode(userChallenges[x].data, 3, 35))
				if(x===5)
					levelThree.push(thirdStem)
				if (x===userChallenges.length-1){
					blossomNode.parent = "1"
					levelOne.push(blossomNode);
					break
				}
			}
		}
		initial.children = levelOne;
		if(levelTwo.length>0)
			firstStem.children = levelTwo
		if(levelThree.length>0)
			secondStem.children = levelThree
		if(levelFour.length>0)
			thirdStem.children= levelFour

		root.children[0]=initial
					// if (userChallenges[x].level === 1) {
			// 	console.log("hi")
			// 	levelOne.push(makeNode(userChallenges[x], 1, 65))
			// 	if (x === userChallenges.length - 1) {
			// 		blossomNode.parent = "1"
			// 		levelOne.push(blossomNode)
			// 		break;
			// 	}
			// } else if (userChallenges[x].level === 2) {
			// 	levelTwo.push(makeNode(userChallenges[x], 2, 50))

			// 	if (x === userChallenges.length - 1) {
			// 		blossomNode.parent = "2"
			// 		levelTwo.push(blossomNode)
			// 		break
			// 	}
			// } else if (userChallenges[x].level === 3) {
			// 	levelThree.children.push(makeNode(userChallenges[x], 3, 35))

			// 	if (x === userChallenges.length - 1) {
			// 		blossomNode.parent = "3"
			// 		levelThree.pushlevelOne.push(blossomNode)
			// 		break
			// 	}
			// }
			// } else if (userChallenges[x].level === 4) {
			// 	fourthStem.children.push(makeNode(userChallenges[x], 4))

			// 	if (x === userChallenges.length - 1) {
			// 		blossomNode.parent = "3"
			// 		break
			// 	}
			// }
		// console.log("LEVEL ONE: ", levelOne)
		var challengeJson = angular.toJson(userChallenges)
 
		var margin = {
			top: 40,
			right: 10,
			bottom: 40,
			left: 10
		}
			// var width = 100
			// var height = 100
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

			// var root = 		{
			// 	"name": "0",
			// 	"parent": "null",
			// 	"children": [{
			// 		"name:": "1",
			// 		"parent": "0",
			// 		"children": [{
			// 			"parent": "1",
			// 			"text": "Hello, World!",
			// 			"imgSize": "50",
			// 			"imgType": "leaf"
			// 		}, {
			// 			"parent": "1",
			// 			"text": "Variables",
			// 			"imgSize": "50",
			// 			"imgType": "leaf"
			// 		}, {

			// 			"parent": "1",
			// 			"name": "2",
			// 			"text": "",
			// 			"children": [{
			// 				"parent": "2",
			// 				"text": "Functions",
			// 				"imgSize": "35",
			// 			"imgType": "leaf"
			// 			}, {
			// 				"name": "3",
			// 				"parent": "2",
			// 				"children": [{
			// 					"parent": "3",
			// 					"text": "Booleans",
			// 					"imgSize": "75",
			// 					"imgType": "flower"
			// 				}],
			// 				"text": "",
			// 				"imgSize": "0",
			// 			"imgType": "leaf"
			// 			}, {
			// 				"parent": "2",
			// 				"text": "Returning values",
			// 				"imgSize": "35",
			// 			"imgType": "leaf"
			// 			}, {
			// 				"parent": "2",
			// 				"text": "Functions and Variables",
			// 				"imgSize": "35",
			// 			"imgType": "leaf"
			// 			}],
			// 			"imgSize": "0"
			// 		}, {
			// 			"parent": "1",
			// 			"text": "Numbers and Math",
			// 			"imgSize": "50",
			// 			"imgType": "leaf"
			// 		}],
			// 		"text": "Welcome to Javascript!",
			// 		"imgSize": "65",
			// 			"imgType": "leaf"
			// 	}],
			// 	"text": "",
			// 	"imgSize": "0",
			// 			"imgType": "leaf"
			// }


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
						if(d){
							if(d.imgType==="leaf")
								return '../../images/small_leaf.png'
							else
								return '../../images/pink-flower-th.png'
							}
					})
					.attr("height", function(d) {
						if(d.show)
							return d.imgSize
						else
							return 0;
					})
					.attr("width", function(d) {
						if(d.show)
							return d.imgSize
						else
							return 0;
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


app.directive('plantDirective', function(PlantFactory, AuthService) {
	return {
		restrict: 'E',
		scope: {
			path: '='
		},
		link: function(scope, e, a) {
			AuthService.getLoggedInUser()
			.then(function(user){
				PlantFactory.getUserPath(user.id, scope.path)
				.then(function(plantData){
					PlantFactory.buildTree(plantData, PlantFactory.getPathLength(scope.path))
				})
			})

			// console.log("HERE'S PLANT FACTORY: ", PlantFactory.buildTree())
		},
		templateUrl: 'js/plant/plant.html',
	}
})