let direction = {x:0,y:0};

const eatAudio = new Audio('./Assets/FoodSwallow.mp3');
const moveAudio = new Audio('./Assets/move.mp3');
const gameOverAudio = new Audio('./Assets/GameOver.mp3');

let board = document.querySelector('.board');
let hiscoreBox = document.querySelector('.high-score');
let scoreBox = document.querySelector('.score');





let speed = 5;
let lastRenderTime = 0;
let score = 0;

let snake = [
    {x:13,y:15}
]
let food = {x:10,y:12};





function game(currentTime){
    // Callin requestAnimationFrame Again to make a game loop
    window.requestAnimationFrame(game);
    if ((currentTime-lastRenderTime)/1000 < 1/speed){
        return
    }
   lastRenderTime = currentTime;
    mainGameEngine();
    



}

function snakeCollide(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true
        }
    }
    if(snake[0].x > 16 || snake[0].x < 0 || snake[0].y > 16 || snake[0].y < 0){
            return true
        }
        
    return false
}

function mainGameEngine(){
    if(snakeCollide(snake)){
        gameOverAudio.play();
        direction = {x:0,y:0};
        alert("Game Over press any key to play again");
        snake=[{x:12,y:14}];
        score = 0;
        scoreBox.innerHTML = 'Score : ' + score;
    }

    if(snake[0].x == food.x && snake[0].y == food.y){
        eatAudio.play();
        
        score += 1;
        if (score > HiScore){
            HiScoreValue = score;
            localStorage.setItem('score',JSON.stringify(HiScoreValue));
            hiscoreBox.innerHTML = "High-Score : " +HiScoreValue;
        }
        scoreBox.innerHTML = 'Score : ' + score;
        
        snake.unshift({x : snake[0].x + direction.x , y : snake[0].y + direction.y});
        let a = 1;
        let b = 16;

        food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
    }


    for (let i = snake.length-2; i >= 0; i--) {
        snake[i+1] = {...snake[i]};
    }

    snake[0].x += direction.x;
    snake[0].y += direction.y;





    board.innerHTML = "";

    //Displaying snake
    snake.forEach((el,i)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
        snakeElement.classList.add(i===0?'head':'snake-body')
        board.appendChild(snakeElement);



    })
    //Displaying Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}





let HiScore = localStorage.getItem("score");
if(HiScore === null){
    HiScoreValue = 0;
    localStorage.setItem('score',JSON.stringify(HiScoreValue));

}else{
    HiScoreValue = JSON.parse(HiScore);
    hiscoreBox.innerHTML = 'High-Score : ' + HiScore;

}



window.requestAnimationFrame(game);

window.addEventListener('keydown',(e)=>{
    let container = document.querySelector('.container');

    direction = {x:0,y:1}; // Start The game
    moveAudio.play();
    switch (e.key) {
        case 'ArrowUp':
            direction.x = 0;
            direction.y = -1;
            container.style.setProperty('--rotation',180);
            container.style.setProperty('--body-rotation',180);

            

            
            
            break;
        case 'ArrowDown':
            direction.x = 0;
            direction.y = 1;
            container.style.setProperty('--rotation',0);
            container.style.setProperty('--body-rotation',180);

            break;
        case 'ArrowLeft':
            direction.x = -1;
            direction.y = 0;
            container.style.setProperty('--rotation',90);
            container.style.setProperty('--body-rotation',90);
            


            break;
        case 'ArrowRight':
            direction.x = 1;
            direction.y = 0;
            container.style.setProperty('--rotation',270);
            container.style.setProperty('--body-rotation',90);



            break;
    
        default:
            break;
    }

})