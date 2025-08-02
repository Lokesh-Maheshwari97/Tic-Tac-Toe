let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('.reset');
let newbtn = document.querySelector('.new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnO = true;
let isGameOver = false;

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

// Step 1: Add click handler
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || isGameOver) return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// Step 2: Show winner
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    isGameOver = true;
    disableAllBoxes();
}

// Step 3: Disable all boxes
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Step 4: Enable all boxes (for reset)
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Step 5: Reset Game
const resetGame = () => {
    turnO = true;
    isGameOver = false;
    enableBoxes();
    msgContainer.classList.add('hide');
}

// Step 6: Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Optional: Check draw
    let isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        msg.innerText = `It's a Draw!`;
        msgContainer.classList.remove('hide');
        isGameOver = true;
    }
}

// Button actions
resetbtn.addEventListener('click', resetGame);
newbtn.addEventListener('click', resetGame);
 