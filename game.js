let starDir = {x:0,y:0};

const eatAudio = new Audio('./Assets/FoodSwallow.mp3');
const move = new Audio('./Assets/move.mp3');
const gameOver = new Audio('./Assets/GameOver.mp3');

let speed = 2;
let lastRenderTime = 0;
let score = 0;

let snake = [
    {x:13,y:15}
]


let board = document.querySelector('.board')



function game(currentTime){
    // Callin requestAnimationFrame Again to make a game loop
    window.requestAnimationFrame(game);
    if ((currentTime-lastRenderTime)/1000 < 1/speed){
        return
    }
   lastRenderTime = currentTime;
    mainGameEngine();
    



}


function mainGameEngine(){
    board.innerHTML = "";

    //Displaying snake
    snake.forEach((el,i)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
        snakeElement.classList.add(i===0?'food':'snake-body')
        board.appendChild(snakeElement);



    })
    //Displaying Food
}




window.requestAnimationFrame(game);
