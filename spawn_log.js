const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const usedLetters = new Set(); 
const usedCoords = []; 
let randomLetter, randomX, randomY,no=0;
let c=document.getElementById("c1");
let ctx=c.getContext('2d');
let currentX = 0; 
let currentY = 0;
var n=0;
game_end=false;
let gameStats = {
    time: 0,
    points: 0
  };
  

function gencolor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return (`rgb(${r},${g},${b}`);
    
}

function changeBackgroundColor() {
    document.body.style.transition = 'background-color 3s ease-in-out';
    document.body.style.backgroundColor = gencolor();
}

setInterval(changeBackgroundColor, 3000);

function uniqueLetter() {

    do {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomLetter = letters[randomIndex];
    } while (usedLetters.has(randomLetter));
    usedLetters.add(randomLetter);
}
function uniqueCoordinates() {
    do {
        randomX = Math.floor(Math.random() * 81) + 10;
        randomY = Math.floor(Math.random() * 81) + 10;
    } while (usedCoords.some(coords => coords[0] === randomX && coords[1] === randomY));//voodoo
    usedCoords.push([randomX, randomY]);
}
function spawnStart()
{
    
    spawnX=Math.floor(Math.random()*100)
    console.log('x',spawnX)
    spawnY=Math.floor(Math.random()*10)
    console.log('y',spawnY)
    const spawnElement = document.createElement('span');
    spawnElement.innerText = "start";
    spawnElement.style.position = 'absolute';
    spawnElement.style.left = `${spawnX}%`;
    spawnElement.style.bottom = `${spawnY}%`;
    document.body.appendChild(spawnElement);
    

}
function spawnEnd()
{
    
    spawnX2=Math.floor(Math.random()*100)
    console.log('x2',spawnX2)
    spawnY2=Math.floor((Math.random()*10)+89)
    console.log('y2',spawnY2)
    const spawnEnd = document.createElement('span');
    spawnEnd.innerText = "End";
    spawnEnd.style.position = 'absolute';
    spawnEnd.style.left = `${spawnX2}%`;
    spawnEnd.style.bottom = `${spawnY2}%`;
    document.body.appendChild(spawnEnd);

}
function spawnRandomLetter() {

    
    for(let i=0;i<20;i++)
    {
    uniqueLetter();
    uniqueCoordinates();
    

    const letterElement = document.createElement('span');
    letterElement.innerText = randomLetter;
    letterElement.style.position = 'absolute';
    letterElement.style.left = `${randomX}%`;
    letterElement.style.top = `${randomY}%`;

    document.body.appendChild(letterElement);
    }
    spawnStart();
    spawnEnd();
}
function incrementPointsInCode1() {
    const event = new Event('incrementPoints');
    document.dispatchEvent(event);
  }
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && usedLetters.size < letters.length && no === 0) {
        no += 1;
        spawnRandomLetter();
        startTimer(); 
        pointson();
    } else if (event.key === 'Enter' && usedLetters.size < letters.length && no === 1) {
        drawend();
        stopTimer();
        stopPoints();   
    }
    if(n===0)
    {
      drawstart();
      console.log(n)
      n+=1;
    } 
      if (/^[a-zA-Z\s]$/.test(event.key)&&!game_end) {
  
          draw(event.key,);
    }
});


c.width = window.innerWidth;
c.height = window.innerHeight;

function drawstart(){
const letterElements = document.querySelectorAll('span');
letterElements.forEach((element) => {
    if (element.innerText === "start") {
        currentX = element.getBoundingClientRect().left + element.offsetWidth / 2;
        currentY = element.getBoundingClientRect().top + element.offsetHeight / 2;
    }
});
}


function draw(inputLetter) {
    if (usedLetters.has(inputLetter)) {
        usedLetters.delete(inputLetter);
        const letterElements = document.querySelectorAll('span');

        letterElements.forEach((element) => {
            if (element.innerText === inputLetter) {
                const x2 = element.getBoundingClientRect().left + element.offsetWidth / 2;
                const y2 = element.getBoundingClientRect().top + element.offsetHeight / 2;

                const colors = ["#27005D", "#9400FF", "#0abdc6", "#AED2FF", "#E4F1FF", "#FFA1F5", "#45FFCA",'#C70039','#F94C10','#7091F5','#F6FA70','#F6F1E9','#FFACAC','#FFBFA9','#E384FF','#E90064','#16FF00','#FFED00'];
                const randomIndex = Math.floor(Math.random() * colors.length);                
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = colors[randomIndex];

                ctx.lineWidth = 2;
                ctx.stroke();
                //here increment points
                incrementPointsInCode1();

                currentX = x2;
                currentY = y2;
                
            }
        });
    }
}


function drawend() {
    const letterElements = document.querySelectorAll('span');
    
    let currentLetterX = currentX;
    let currentLetterY = currentY;

    letterElements.forEach((element) => {
        if (element.innerText === "End") {
            const x2 = element.getBoundingClientRect().left + element.offsetWidth / 2;
            const y2 = element.getBoundingClientRect().top + element.offsetHeight / 2;

            ctx.beginPath();
            ctx.moveTo(currentLetterX, currentLetterY);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = '#FF1E1E';
            ctx.lineWidth = 2;
            ctx.stroke();
            
        }

    });

    game_end=true;
    openPopup();

    // game end
   //openPopup();
    
}


  