let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#resetBtn");
let newBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");
let container=document.querySelector(".container");
let h1=document.querySelector("h1")

let turnX=true //player X,player O;
let count=0;//used for draw condition


//2D array for winning Patterns (Array of array)
const winPatterns=
[
    [0,1,2],[3,4,5],[6,7,8],  //Horizontal
    [0,3,6],[1,4,7],[2,5,8],  //Vertical
    [0,4,8],[2,4,6]  //Diagonal


];

boxes.forEach ((box)=>
{
    box.addEventListener("click",()=>
        {
            
            if(turnX)
            {
                box.innerText="X";
                turnX=false;
            }
            else
            {
                box.innerText="O";
                turnX=true;
            }
            box.disabled=true;
            count++;

            

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) 
            {
            gameDraw();
            }
                
            
        });
});

const checkWinner=()=>
{
    for(let pattern of winPatterns)
    {
        
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!="")
        {
            if(pos1Val===pos2Val && pos2Val===pos3Val)
            {
                
                disableBoxes();
                showWinner(pos1Val);
                return true;
            }
        }  
    }
    return false;

}

const showWinner=(winner)=>
{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    container.classList.add("hide");
    resetBtn.classList.add("hide");
    h1.style.visibility="hidden";

}

const gameDraw=()=>
{
    msg.innerText=`Game is a Draw`;
    msgContainer.classList.remove("hide"); 
    container.classList.add("hide");
    resetBtn.classList.add("hide");
    h1.style.visibility="hidden"; 
}

const disableBoxes=()=>
{
    for(box of boxes)
    {
        box.disabled=true;
    }
}
const enableBoxes=()=>
    {
        for(box of boxes)
        {
            box.disabled=false;
            box.innerText=""; 
        }
    }
    
const resetGame=()=>
{
    turnX=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    h1.style.visibility="visible";
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);