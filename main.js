var player1Name="" , player2Name="", turn = "";
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
var hasWinner = 0, moveCount=0;

function gameBoardMsg(x){
	return $("#gameBoard").text(x);
}

function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		turn = player1Name;
		gameBoardMsg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		gameBoardMsg(player2Name+"'s turn now!");
	}
}

function init(){
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		gameBoardMsg("");
		$(".col").map(function() {
    		$(this).text("");
		}).get();
		hasWinner = 0;
		moveCount=0;
}

$("#startButton").click(function (){

	if(hasWinner==1){
		init();
	}

	player1Name = $("#playerName1").val();
	player2Name = $("#playerName2").val();

	if(player1Name=="" || player2Name==""){
		alert("Please set both player's names.");
		return;
	}

	setTurn();


	

});

$(".col").click(function (){

	if(player1Name=="" || player2Name==""){
		alert("Please set both player's names.");
		return;
	}

	var row = $(this).parent().index();
	var col = $(this).index();

	if(grid[row][col]!==0){
		alert("This position is taken. Please try other position.");
		return;
	}
	if(hasWinner==1){
		alert("Please click play another round");
		return;
	}

	if(turn==player1Name){
		moveCount++;
		$(this).text("O");
		grid[row][col] = 1;
		var ifWon = winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				gameBoardMsg("Match Drawn!");
				moveCount=0;
				$("#startButton").text("Play another round");
				hasWinner=1;
				return;
			}else{
				turn = player2Name;
				gameBoardMsg(player2Name+"'s turn now!");
			}
			return;	
		}
		else{
			return;
		}
		
	}
	else if(turn==player2Name){
		moveCount++;
		$(this).text("X");
		grid[row][col] = 2;
		var ifWon = winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				gameBoardMsg("Match Drawn!");
				moveCount=0;
				$("#startButton").text("Play again");
				hasWinner=1;
				return;
			}else{
				turn = player1Name;
				gameBoardMsg(player1Name+"'s turn now!");
			}
			return;	
		}
		else{
			return;
		}
		
	}

});

function winnerCheck(n,playerName){
	if(

		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
		(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
		(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
		(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
		(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


		){
		gameBoardMsg(playerName+" won the game!");
		hasWinner = 1;
		moveCount=0;
		$("#startButton").text("Play again");
		return true;
	}
	return false;
}
