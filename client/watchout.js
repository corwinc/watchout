// start slingin' some d3 here.

var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 30
};

var gameBoard = d3.select('.board')
  .append('svg:svg')
    .attr('width', gameSettings.width)
    .attr('height', gameSettings.height);
