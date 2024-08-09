
let canvas=document.querySelector('canvas');

let brush=canvas.getContext('2d')

let cellsize=50;

let snake=[[0,0]] // starting point of snake

// function to draw snake

let boardh=500;
let boardw=1250;
let score=0;

let gameover=false;



direction='right';


// bar bar repeat karne ke lie 

let idinterval=setInterval(function()
{

    
    
    update();
    draw();
    
},100);

document.addEventListener('keydown',function(event)
{
    if(event.key=='ArrowUp'){
        direction='up'
    }
    else if(event.key=='ArrowDown')
    {
        direction='down'
    }
    else if(event.key=='ArrowLeft')
    {
        direction='left'
    }
    else{
        direction='right'
    }
})

function draw()
{
    if(gameover==true)
    {
        clearInterval(idinterval)
        brush.fillStyle='green';
        brush.font='50px monospace'
        
        brush.fillText('Game Over !!',500,250)
      
        
        return ;
    }
    brush.clearRect(0,0,boardw,boardh);
  for(let cell of snake){
    brush.fillStyle='red';
   
    brush.fillRect(cell[0],cell[1],cellsize,cellsize);
    brush.strokeStyle='orang'
    brush.strokeRect(cell[0],cell[1],cellsize,cellsize);
  }

  // draw food
  brush.fillStyle='orange';
  brush.fillRect(food[0],food[1],cellsize,cellsize);


  // score
  brush.fillStyle='Green';
  brush.font='24px monospace'

  brush.fillText(`Score : ${score}`,20,20);

}
// food 
let food=foodgenerate();

//function to update snake



function update(){

    let  headx=snake[snake.length-1][0];
    let heady=snake[snake.length-1][1];

    // let  newx=headx+cellsize;
    // let newy=heady;

    let newx;
    let newy;

    if(direction=='right')
    {

         newx=headx+cellsize;
         newy=heady;

         if(newx==boardw ||khudkokhagaya(newx,newy))
        {
            gameover=true;
        }

        
    }
    else if(direction=='left')
    {

         newx=headx-cellsize;
        newy=heady;

        if(newx<0 || khudkokhagaya(newx,newy))
        {
            gameover=true;
        }

        
    }

    else if(direction=='down')
    {
          newx=headx;
         newy=heady+cellsize;
         if(newy==boardh || khudkokhagaya(newx,newy))
         {
            gameover=true;
         }

    }
    else{
          newx=headx;
         newy=heady-cellsize;
         if(newy<0 || khudkokhagaya(newx,newy))
         {
            gameover=true;
         }
    }

    snake.push([newx,newy]);

    if(food[0] === headx && food[1]===heady)
    {
        food=foodgenerate();
        score=score+1;
    }
    else{
    snake.shift();
    }



}

function foodgenerate(){
    return [
        Math.round ( ( Math.random() * (boardw-cellsize))/ cellsize) * cellsize,
        Math.round ( ( Math.random() * (boardh-cellsize)) / cellsize) * cellsize,
    ]
}




function khudkokhagaya(newx, newy){

    for(let item of snake){
        if(item[0]=== newx && item[1]===newy) 
        {
            return true;
        }
    }

    return false;
}





