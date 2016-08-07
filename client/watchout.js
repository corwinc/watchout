// start slingin' some d3 here.

////////////////////// SETTINGS //////////////////////////////////
var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 20,
  r: 10
};

var userSettings = [{
  x: 225,
  y: 350,
  r: 20
}];

var score = 0;
var highScore = 0;
var collisionCount = 0;


/////////////////// COLLIDE FUNCTION ////////////////////////
var collide = function() {
  var x1 = player.attr('cx');
  var y1 = player.attr('cy');
  var r1 = +player.attr('r');

  enemies.each(function() {
    var enemy = d3.select(this); // get the d3 methods

    var x2 = enemy.attr('cx');
    var y2 = enemy.attr('cy');
    var r2 = +enemy.attr('r');

    var currentDistance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    var collisionDistance = Math.pow(r1 + r2, 2);

    if (currentDistance <= collisionDistance) {
      highScore = Math.max(score, highScore);
      
      if (score > 1) {
        collisionCount++;
      }
      score = 0;
      
      player
        .attr('fill', 'blue')
        .transition().duration(500)
        .attr('fill', 'red');
    }
  });
};


/////////////////////////// DEFINE GAME BOARD ////////////////////////////////////
/// BOARD ///
var gameBoard = d3.select('.board')
  .append('svg')
    .attr('width', gameSettings.width)
    .attr('height', gameSettings.height);


/// PLAYER ///
var player = gameBoard.selectAll('.player')
  .data(userSettings);

player
  .enter().append('circle')
    .attr('class', 'player')
    .attr('fill', 'red')
    .attr('r', function(d) { return d.r; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

/// MOVE PLAYER ///
player.on('mousedown', function() {
  /// DRAG EVENT ///
  var mousemove = function () {
    player
      .attr('cx', function(d, i) { return d3.mouse(player.node())[0]; })
      .attr('cy', function(d, i) { return d3.mouse(player.node())[1]; });
  };

  var mouseup = function () {
    w.on('mousemove', null).on('mouseup', null);
  };

  var w = gameBoard
    .on('mousemove', mousemove)
    .on('mouseup', mouseup);
});


/////// CREATE DATA ///////////////
var enemyData = [];

for (var i = 0; i < gameSettings.nEnemies; i++) {
  var dataSet = {
    'id': i,
    'x': Math.random() * gameSettings.width,
    'y': Math.random() * gameSettings.height,
    'r': gameSettings.r
  };

  enemyData.push(dataSet);
}

var enemies = gameBoard.selectAll('.enemy')
  .data(enemyData);


///////////// ENTER / ADD DATA ///////////////
enemies
  .enter().append('circle')
    .attr('class', 'enemy')
    .attr('fill', 'aqua')
    .attr('r', function(d, i) { return d.r; })
    .attr('cx', function(d, i) { return d.x; })
    .attr('cy', function(d, i) { return d.y; });


/////////////////////// UPDATE /////////////////////
var update = function() {
////////////// TRANSITION //////////////
  enemies
      .transition().duration(1500)
      .attr('cx', function(d, i) { return Math.random() * gameSettings.width; })
      .attr('cy', function(d, i) { return Math.random() * gameSettings.height; })
      .each('end', function () {
        update(d3.select(this));
      });
};

update();

// Check for collisions
d3.timer(collide, 10);


///////////// SCOREBOARD ///////////////
var updateScore = function () {
  score += 1;

  d3.selectAll('.current').text('Current score: ' + score);
  d3.selectAll('.highscore').text('High score: ' + highScore);
  d3.selectAll('.collisions').text('Collisions: ' + collisionCount);
};

setInterval(updateScore, 100);