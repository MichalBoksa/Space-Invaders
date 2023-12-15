
let backgroundImage = new Image();
backgroundImage.src = "images/background.png";

let spaceshipImage = new Image();
spaceshipImage.src = "images/spaceship.png";

let invaderImage = new Image();
invaderImage.src = "images/invader.png";

let spaceshipLaserImage = new Image();
spaceshipLaserImage.src = "images/laser.png";

let invaderLaserImage = new Image();
invaderLaserImage.src = "images/invader_laser.png";

const BACKGROUND = 0;
const WIN_LOSE_MESSAGE = 1;
const SCORE = 2;
const START_AGAIN = 3;
let temp = 0;
let level = 1;
let spaceship = null; 
let invader = null;
let invadersGroup = null;
let isGameLost = 0;  // 0 no 1 yes
let spaceshipLasers = [];
let invadersLasers = [];
let numberOfSpaceShipLasersFired = 0;
let numberOfInvaderLasersFired = 0;
let score = 0;
let LevelsInvaderArray = [
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,
    1,1,1,1,1,1,1
    ];
let invadersArray =[];


function playGame()
{

    gameObjects[BACKGROUND] = new StaticImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    gameObjects[SCORE] = new StaticText(score, canvas.width / 2 - 30, 30, "Times Roman", 30, "red");
    gameObjects[SCORE].start();
    spaceship = new Spaceship(canvas.width / 2 - 30, canvas.height - 40, 40, spaceshipImage);
    invadersGroup = new InvadersGroup();
    let game = new SpaceInvadersCanvasGame();

    game.start();
    

    document.addEventListener("keydown", function (e)
    {
        let stepSize = 10;

        if (e.keyCode === 37)  
        {
            spaceship.changeX(-stepSize);
        }
        else if (e.keyCode === 39)
        {
            spaceship.changeX(stepSize);
        }
        else if (e.keyCode === 32) 
        {
            spaceshipLasers[numberOfSpaceShipLasersFired] = new Laser(spaceshipLaserImage, spaceship.getCentreX(),0 ,true);
            spaceshipLasers[numberOfSpaceShipLasersFired].start();
            numberOfSpaceShipLasersFired++;
        }

        else if(isGameLost && e.keyCode === 13)
        {
            game.startGameObjects();
        }
    });

   
}




