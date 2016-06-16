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

// Input: number
// Output: 2D Array Solution
// Edge Cases: 

window.findNQueensSolution = function(n) {
  if (n === 0) {
    return {n: 0};
  } else if (n === 2) {
    return {n: 2};
  } else if (n === 3) {
    return {n: 3};
  } else {
    var numSolutions = findAllQueenSolutions(n).length;
    var solutions = findAllQueenSolutions(n);
    var randIndex = Math.floor(Math.random() * numSolutions);

    return solutions[0].rows();
  }

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
  
  // Instantiate an array of n length;
  var arr = [];

  for (var i = 0; i < n; i++) {
    arr.push(i);
  }

  var permutations = permute(arr, arr.length);

  // filter the perm array by arrays that pass our truth test.
  // return arrays that contain numbers differences greater than or equal to 2 only.

  var flattened = _.filter(permutations, function(array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (Math.abs(array[i] - array[i + 1]) < 2) {
        return false;
      }
    } 
    return true;
  });

  // pass flattened array of arrays into helper function that creates boards based on position
  // in flattened array

  var generateBoard = function(arrayOfArrays) { //returns array of boards
    return _.map(arrayOfArrays, function(array) {
      var board = new Board({n: n});
      
      for (var i = 0; i < array.length; i++) {
        board.togglePiece(i, array[i]);
      } 
      return board;
    });
  };

  var possibleBoards = generateBoard(flattened);

  return _.filter(possibleBoards, function(board) {
    return board.hasAnyQueensConflicts() === false;
  });

};


window.swap = function(array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
  return array;
};


window.permute = function(collection, n) {

  var result = [];
  
  if (n === 1) {
    var newArr = collection.slice(0);
    result.push(newArr);
   
  } else {
    for (var i = 1; i <= n; i++) {
      
      result = result.concat(permute(collection, n - 1));
      if (n % 2) {
        var j = 1;  
      } else {
        j = i;  
      }
      swap(collection, j - 1, n - 1);

    }
  }
  return result;

};
