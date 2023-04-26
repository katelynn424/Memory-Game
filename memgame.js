const gameContainer = document.getElementById("game");
const colors = [ "red", "blue", "green", "orange", "purple",
  ];
const colorsPick = [...colors, ...colors];
    // console.log(colorsPick);
const tilesCount = colorsPick.length;

// Game state variables
let revealedNum = 0;
let openTile = null;
let awaitingEndOfMove = false;

function createDivsForColors(color){
    const element = document.createElement('div');

    element.classList.add('tile');
    element.setAttribute('data-color', color);
    element.setAttribute('data-revealed', "false");

    element.addEventListener('click', function(){
        const revealed = element.getAttribute('data-revealed');

        if(awaitingEndOfMove
             || revealed === "true"
             || element === openTile
        ){
            return;
        } 
        element.style.backgroundColor = color;

        if(!openTile){
            openTile = element;

            return;
        }
        // this tile must be one that will be attempted to match

        const colorToMatch = openTile.getAttribute('data-color');

        if(colorToMatch === color){
            openTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            awaitingEndOfMove = false;
            openTile = null;
            revealedNum += 2;

            if(revealedNum === tilesCount){
                alert("Game over, congrats you win!");
            }

            return;

        }

        awaitingEndOfMove = true;
        setTimeout(function (){
            element.style.backgroundColor = null;
            openTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            openTile = null;
        }, 1000);
    });

    return element;
}

// Making tiles
for(let i = 0; i < tilesCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPick.length);
    const color = colorsPick[randomIndex];
    const tile = createDivsForColors(color);

    colorsPick.splice(randomIndex, 1);

   gameContainer.appendChild(tile);
}