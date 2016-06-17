/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // create an array board
  var board = new Board({n: n});
  var solution = board.rows();
  
  // loop through and create an array with a rook at the point (i, i)
  for (var i = 0; i < solution.length; i++) {
    board.togglePiece(i, i);
  }
  //return array board
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return n <= 1 ? 1 : n * countNRooksSolutions(n - 1);
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other


window.findNQueensSolution = function(n) {
  var b = new Board({n: n});
  var flattened = findAllQueenSolutions(n)[0];
  if (n === 2 || n === 3) {
    return b.rows();
  }
  //[1,3,0,2]
  for (var i = 0; i < n; i++) {
    var row = b.get(i); 
    b.togglePiece(i, flattened[i]);
  }
  return b.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }

  return findAllQueenSolutions(n).length;
};

// HELPER FUNCTIONS
window.findAllQueenSolutions = function(n) {
  
  // create results array
  var results = [];
  findNQueens([]);

  var findNQueens = function(current) {
    if (current.length === n) {
      results.push(current);
    } else {
      for (var i = 0; i < n; i++) {
        for (var j = 0; l = current.length, j < l; j++) {
          var prev = current[j];
          if (prev === i) { 
            break;
          } if (prev - (l - j) === i) {
            break;
          } if (prev + (l - j) === i) {
            break;
          }
        } 
        if (j === l) {
          findNQueens(current.concat([i]));
        }
      }
    }
  };
  return results;
};