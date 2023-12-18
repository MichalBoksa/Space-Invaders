


let canvas = null;
let ctx = null;
let gameObjects = [];
let firebaseService = null;
document.addEventListener('deviceready', onDeviceReady, false);
window.addEventListener("load", onDeviceReady);
window.addEventListener('touchstart', process_touchstart, false);
window.addEventListener("devicemotion", handleMotionEvent,false );


function onDeviceReady()
{
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    // canvas.width = canvas.clientWidth;
    // canvas.height = canvas.clientHeight;
    canvas.width = 390;
    canvas.height = 600;

    playGame(); // Each game will include its own .js file, which will hold the game's palyGame() function
}

function handleMotionEvent (event) {
        const x = event.accelerationIncludingGravity.x;
        spaceship.changeX((canvas.width * -x) / 300 );

}


function process_touchstart() {
    spaceshipLasers[numberOfSpaceShipLasersFired] = new Laser(spaceshipLaserImage, spaceship.getCentreX(),0 ,true);
            spaceshipLasers[numberOfSpaceShipLasersFired].start();
            numberOfSpaceShipLasersFired++;    
  }

  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });




