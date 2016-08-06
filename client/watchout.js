// start slingin' some d3 here.

// Settings
var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 30,
  r: 10
};

// Define the game board
var gameBoard = d3.select('.board')
  .append('svg')
    .attr('width', gameSettings.width)
    .attr('height', gameSettings.height);

// Generate n enemies
var enemies = _.range(0, gameSettings.nEnemies).map(function(id) {
  return {
    'id': id,
    'x': Math.random() * gameSettings.height,
    'y': Math.random() * gameSettings.width
  };
});

gameBoard.selectAll('.enemy')
  .data(enemies, function(d) { return d.id; })
  .enter().append('circle')
    .attr('cx', function(d, i) { return d.x; })
    .attr('cy', function(d, i) { return d.y; })
    .attr('r', gameSettings.r)
    .attr('class', 'enemy')
    .attr('fill', 'aqua');