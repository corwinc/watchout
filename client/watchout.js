// start slingin' some d3 here.

// Settings
var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 30,
  r: 10
};

var userSettings = [{
  x: 225,
  y: 350,
  r: 5
}];

// var drag = d3.behavior.drag()
//             .on('drag', function(d, i) {
//               d.x += d3.event.dx;
//               d.y += d3.event.dy;
//               d3.select(this).attr('transform', function(d, i) {
//                 return 'translate(' + [ d.x, d.y ] + ')';
//               });
//             });

// Define the game board
var gameBoard = d3.select('.board')
  .append('svg')
    .attr('width', gameSettings.width)
    .attr('height', gameSettings.height);

gameBoard.selectAll('.player')
  .data(userSettings)
  .enter().append('circle')
    .attr('class', 'user')
    .attr('fill', 'red')
    .attr('r', function(d) { return d.r; })
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .on('mouseover', function () {
      console.log(this);
      d3.select(this).style('fill', 'blue');
    });
    // .attr('transform', 'translate(' + x + ',' + y + ')')
    // .call(drag);

var update = function() {
  // Generate n enemies
  enemyData = _.range(0, gameSettings.nEnemies).map(function(id) {
    return {
      'id': id,
      'x': Math.random() * gameSettings.width,
      'y': Math.random() * gameSettings.height
    };
  });
 
  enemies = gameBoard.selectAll('.enemy')
    .data(enemyData, function(d, i) { return d.id; });
    

  enemies.enter().append('circle')
      .attr('class', 'enemy')
      .attr('fill', 'aqua')
      .attr('r', 0)
      //.transition().duration(1000)
      .attr('cx', function(d, i) { return d.x; })
      .attr('cy', function(d, i) { return d.y; });

  enemies
      .data(enemyData)
      .attr('r', gameSettings.r)
      //.transition().duration(1000)
      .attr('cx', function(d, i) { return d.x; })
      .attr('cy', function(d, i) { return d.y; });

      
  //enemies.exit().remove();
  /*gameBoard.selectAll('.enemy')
    .transition().duration(1000)
    .attr('cx', Math.random() * gameSettings.width)
    .attr('cy', Math.random() * gameSettings.height);*/
      

};

update();
setInterval(function() {
  update();
}, 1000);

var drag = d3.behavior.drag()
            .on('drag', function(d, i) {
              d.x += d3.event.dx;
              d.y += d3.event.dy;
              d3.select(this).attr('transform', function(d, i) {
                return 'translate(' + [ d.x, d.y ] + ')';
              });
            });



// d3.select('.player').call(d3.drag().on('mousedown'));

//update();
//d3.interval(update(), 1000);
/*enemies.enter()
  .data()
  .transition().duration(1000)
    .attr('cx', function(data) { return d.x + 10; });
*/
// gameBoard.selectAll('.enemy')
//     .transition().duration(1000)
//     .attr('cx', function(d, i) { return d3.randomUniform(100)(); } )
//     .attr('cy', function(d, i) { return d3.randomUniform(100)(); } );

/*_.range(0, gameSettings.nEnemies).map(function(id) {
  return gameBoard.select(id)
    .transition().duration(1000)
    .attr('cx', function(d, i) { return d3.randomUniform(100)(); } )
    .attr('cy', function(d, i) { return d3.randomUniform(100)(); } );
});*/