let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#new-btn");
let msg= document.querySelector("#msg");
const winnerMsg = document.querySelector(".winner_msg");
let turnO = true; //playerX, playerO


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  enableBoxes();
  winnerMsg.classList.add("hide");
  
  msg.classList.remove("animate");

  // Hide fireworks
  document.getElementById("fireworks").classList.add("hide");

  // Show the board again
  document.querySelector(".game").classList.remove("hide-board");
};

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      
      box.disabled = true;
      
      // 👉 Add pop animation
      box.classList.add("clicked");
      setTimeout(() => {
        box.classList.remove("clicked");
      }, 300); // Duration should match the CSS animation
  
      checkWinner();
    });
  });
  
const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };
  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText="";
    }
  };
  
  const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, ${winner} Wins! 🎉`;
    msg.classList.add("animate");
  
    // Show fireworks
    document.getElementById("fireworks").classList.remove("hide");
  
    // Hide the board
    document.querySelector(".game").classList.add("hide-board");
    
    winnerMsg.classList.remove("hide");
    disableBoxes();
  
    // Highlight the winning boxes
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val === pos2Val && pos2Val === pos3Val && pos1Val !== "") {
        boxes[pattern[0]].classList.add("winning-box");
        boxes[pattern[1]].classList.add("winning-box");
        boxes[pattern[2]].classList.add("winning-box");
      }
    }
  };
  
  
  
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        
        showWinner(pos1Val);
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);