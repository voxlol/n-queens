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
  var solution = [];
  for(var i = 0; i < n; i++){
    var row = [];
    for(var j = 0; j < n; j++){
      // If i and j are the same, fill it with 1
      if (i===j){
        row.push(1);
      }else{
        row.push(0);
      }
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  function recurse(board, rowIx){
    // base Step
    if(rowIx >= n){
      return;
    }else{
      for(var i = 0; i < n; i++){
        board.togglePiece(rowIx, i);
        if(board.hasColConflictAt(i)){
          board.togglePiece(rowIx,i)
          continue;
        }
        if(rowIx === n - 1)
          solutionCount++;
        recurse(board, rowIx+1);
        board.togglePiece(rowIx,i);
      }
    }
  }

  // Do an initial call to the recursion function
  recurse(board,0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});
  var ans;
  recurse(solution, 0);

  function recurse(board, rowIx){
    // base case
    if(rowIx >= n || ans){
      return;
    }else{
      // recursive step

      // Loop through the elements of the row
        // Toggle, Diagnol+Col Test, last row solution test, Toggle
      for(var i = 0; i < n; i++){
    if(rowIx === 2 && i === 1)
      debugger;
        board.togglePiece(rowIx, i);

        // Test Col Conflict, Minor+Major diagonal
        var test1 = board.hasColConflictAt(i)
        var test2 = board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(rowIx, i));
        var test3 = board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(rowIx, i));
        if(test1 || test2 || test3){
          board.togglePiece(rowIx, i);
          continue;
        }
        //tests are passed
        if(i === n - 1){
          ans = new Board(board.rows());
          return;
        }

        // Recurse
        recurse(board, rowIx+1)

        // Toggle off
        board.togglePiece(rowIx, i);
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // ans found makes ANS always pass the base case
  return ans === undefined ? solution.rows() : ans.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
