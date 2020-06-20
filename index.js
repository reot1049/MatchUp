var nums = [];
var placement = [];
var match = [];
let tempIndex = -1;
let temp1 = -1;
let temp2 = -1;
let savedIndex = -1;
let count = 0;
var board = document.querySelector(".container");
start();

function start() {
    let difficulty = prompt("What difficulty do you want? choose Easy, Medium, or Hard.");
    if(difficulty.toLowerCase() === "easy")
    {
        createBoard(2);
    }
    else if(difficulty.toLowerCase() === "medium")
    {
        createBoard(4);
    }
    else if(difficulty.toLowerCase() === "hard")
    {
        createBoard(6);
    }
}

function createBoard(size) {
    initNums(size * size / 2);
    initPlacement(size);
    randomPlacement(size);
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            let newCell = document.createElement("button");
            newCell.style.backgroundColor = "gray";
            newCell.style.height = (800 - size * 2) / size + "px";
            newCell.style.width = (800 - size * 2) / size + "px";
            newCell.style.border = "1px solid black";
            newCell.style.alignItems = "center";
            newCell.style.lineHeight = (800 - size * 2) / size + "px";
            newCell.style.fontSize = 24 + "px";
            board.appendChild(newCell).className = "cell" + (i * size + j);
            tempIndex = i * size + j;
            document.getElementsByClassName("cell" + (i * size + j))[0].setAttribute('onclick', 'play(' + size + ',' + (i * size + j) + ')');
        }
    }
}

function initNums(size) {
    for(let i = 0; i < (size * size / 2); i++)
    {
        nums[i] = [i, 0];
        console.log(nums[i][1]);
    }
}

function initPlacement(size) {
    if(size == 2)
    {
        placement = [[-1, -1], [-1, -1]];
        match = [[-1, -1], [-1, -1]];
    }
    else if(size == 4)
    {
        placement = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
        match = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
    }
    else if(size == 6)
    {
        placement = [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]];
        match = [[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1]];
    }
}

function randomPlacement(size) {
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            var rand = Math.floor(Math.random() * (size * size));
            var rand2 = Math.floor(Math.random() * (size * size / 2));
            while(placement[Math.floor(rand / size)][rand % size] != -1)
            {
                rand = Math.floor(Math.random() * (size * size));
            }
            while(nums[rand2][1] == 2)
            {
                rand2 = Math.floor(Math.random() * (size * size / 2));
            }
            placement[Math.floor(rand / size)][rand % size] = rand2;
            nums[rand2][1]++;
        }
    }
}

function play(size, index) {
    console.log("turn");
    console.log("temp1 = " + temp1);
    if(temp1 == -1)
    {
        console.log("replacing temp1");
        temp1 = placement[Math.floor(index / size)][index % size];
        savedIndex = index;
        document.getElementsByClassName("cell" + index)[0].innerHTML = temp1;
    }
    else
    {
        temp2 = placement[Math.floor(index / size)][index % size];
        document.getElementsByClassName("cell" + index)[0].innerHTML = temp2;
        setTimeout( function(){check(index, size)}, 500);
    }
}

function check(currentIndex, size) {
    if(temp1 == temp2)
    {
        if(currentIndex != savedIndex)
        {
            console.log("you found a match");    
            count++;
            match[Math.floor(temp1 / size)][temp1 % size] = 1;
            match[Math.floor(temp2 / size)][temp2 % size] = 1;
        }
        else if(match[Math.floor(temp1 / size)][temp1 % size] == -1)
        {
            document.getElementsByClassName("cell" + savedIndex)[0].innerHTML = "";
        }
    }
    else if((match[Math.floor(temp1 / size)][temp1 % size] == -1) && (match[Math.floor(temp2 / size)][temp2 % size] == -1))
    {
        console.log("Try again");
        document.getElementsByClassName("cell" + savedIndex)[0].innerHTML = "";
        document.getElementsByClassName("cell" + currentIndex)[0].innerHTML = "";
    }
    else if(match[Math.floor(temp1 / size)][temp1 % size] == -1)
    {
        document.getElementsByClassName("cell" + savedIndex)[0].innerHTML = "";
    }
    else if(match[Math.floor(temp2 / size)][temp2 % size] == -1)
    {
        document.getElementsByClassName("cell" + currentIndex)[0].innerHTML = "";
    }

    if(count == size * size / 2)
    {
        alert("You did it!");
    }
    temp1 = -1;
    temp2 = -1;
    savedIndex = -1;
}