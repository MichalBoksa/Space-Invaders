
class InvadersGroup extends GameObject
{

    constructor(){
        super();
        this.displayInvaders();
        this.movingDirection = 1; // 1 -right 0- left
        this.shootLaserTimer = 150;
    }

    updateState()
    {
        if(isGameLost != 1){
        if (this.movingDirection === 1){
            invadersArray.forEach(invaderElement => {
                if (invaderElement.getX() >= canvas.width - invaderElement.getWidth() / 2){
                    invadersArray.forEach(element => {
                        element.setY(element.getY() + 5);
                    });
                    this.movingDirection = 0;
                    return;
                }
                invaderElement.setX(invaderElement.getX() + 0.4);
            });
        }

        else{
            invadersArray.forEach(invaderElement => {
                if (invaderElement.getX() <= 0) {
                    invadersArray.forEach(element => {
                        element.setY(element.getY() + 5);
                    });
                    this.movingDirection = 1;
                    return;
                }
                invaderElement.setX(invaderElement.getX() - 0.4);
            });
        }
    }
    }

    render()
    {
       if(isGameLost != 1){
        this.updateState();
        this.shootLaser();
       }   
       invadersArray.forEach(invaderElement => {

            if (invaderElement.getIsAlive() )
                ctx.drawImage(invaderElement.getImage(), invaderElement.getX(),invaderElement.getY(), invaderElement.getWidth(), invaderElement.getHeight()); 
        });
    
    }

  

    displayInvaders() {
        LevelsInvaderArray.forEach((invaderLevel, invaderLevelIndex) => {
            invadersArray.push(new Invader(invaderLevel, (invaderLevelIndex * 40) % 280, 70 + 30 * Math.floor(invaderLevelIndex / 7),25));
            invadersArray[invaderLevelIndex].start();
        });
        temp = 0;
    }

    shootLaser(){
        if (invadersArray.length > 0) {
        let invaderIndex = -1;
        this.shootLaserTimer--;
        if (this.shootLaserTimer === 0){
            do{
                invaderIndex = Math.floor(Math.random() * invadersArray.length);
            }//TODO CHECK CONDITION
            while(!invadersArray[invaderIndex].getIsAlive());

            invadersLasers[numberOfInvaderLasersFired] = new Laser(invaderLaserImage,invadersArray[invaderIndex].getCentreX(),invadersArray[invaderIndex].getY(),false);
            invadersLasers[numberOfInvaderLasersFired].start();
            numberOfInvaderLasersFired++;
            if( this.shootLaserTimer < 180 ){
                this.shootLaserTimer = 180;
            }else {
                this.shootLaserTimer = 350 - level;
            } 
        }
    }
}

    stopInvaders(){
        invadersArray.forEach(invaderElement => {
          invaderElement.stop();
    });
}

RandomLevelInvader(){
    do{
    let num=Math.random();
    if(level != 1 && num < 0.05 + level/50 ) LevelsInvaderArray.push(3);  
    else if(level != 1 && num < 0.05 + level / 25) LevelsInvaderArray.push(2); 
    else LevelsInvaderArray.push(1); 
    }
    while(LevelsInvaderArray.length < 35);
  }
}