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
  //   function printBoard(board, msg){
  //   // For debugging, printing the board after every change to the board
  //   for(var i = 0; i < board.rows().length; i++){
  //     console.log(board.rows()[i]);
  //   }
  //   console.log('^'+msg+'--------------');
  // }
    // base Step
    if(rowIx >= n){
      return;
    }else{
      // recursive case
      for(var i = 0; i < n; i++){
        // Iterate through each element of the row
        // 1. Toggle the element
        // 2. Test for Column Conflicts
        // 3. Recurse if there are no conflicts
        // 4. Untoggle
        board.togglePiece(rowIx, i);
        if(board.hasColConflictAt(i)){
          // If conflict, toggle back to 0 and move to the next element
          board.togglePiece(rowIx,i)
          continue;
        }
        if(rowIx === n - 1)
          // Tests to see if we're on the last row, AND our tests are all passed
          solutionCount++;

        // Call the recursive step
        recurse(board, rowIx+1);

        // Untoggle the element before going to the next one
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
    if(rowIx === n || ans){
      return;
    }else{
      // recursive step
      for(var i = 0; i < n; i++){
        board.togglePiece(rowIx, i);

        if(!board.hasAnyQueenConflictsOn(rowIx, i)){
        // Passed the tests
          if(rowIx === n - 1){ // In the final row && passed tests after placing final piece
            ans = boardToArray(board);
            return;
          }else{
            recurse(board, rowIx+1)
          }
          if(ans) return;
        }
          // failed the tests
        board.togglePiece(rowIx, i);
      }
    }

    function boardToArray(board){
      // Just copies the board's row arrays and returns it
      var returnArr = [];
      for(var i = 0; i < board.rows().length; i ++){
        returnArr.push(board.rows()[i].slice())
      }
      return returnArr;
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // ans found makes ANS always pass the base case
  return ans === undefined ? solution.rows() : ans;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if(n === 0)
    return 1;
  var solution = new Board({n:n});
  var solutionCount = 0;
  recurse(solution, 0);


  function recurse (board, rowIx){
    // Helper Function for Debugging -- prints out the board
    // function printBoard(board, msg){
    //   if (msg === undefined) msg = "";
    //   if(debug === 0) return;
    //   // For debugging, printing the board after every change to the board
    //   for(var i = 0; i < board.rows().length; i++){
    //     console.log(board.rows()[i]);
    //   }
    //   console.log('^'+msg+'--------------');
    // }

    // Base Case
    if (rowIx === n){
      return;
    }else {
      for (var i = 0; i < n; i++){
        // Recursive case
        board.togglePiece(rowIx, i);
        if(!board.hasAnyQueenConflictsOn(rowIx, i)){
          if (rowIx === n - 1){
            solutionCount++;
          }else{
            recurse(board, rowIx + 1);
          }
        }
        board.togglePiece(rowIx, i);
      }
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
