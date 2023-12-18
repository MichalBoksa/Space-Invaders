class SpaceInvadersCanvasGame extends CanvasGame
{
    constructor()
    {
        super();
    }

    collisionDetection()
    {
        if(!isGameLost){
       for (let i = 0; i < numberOfInvaderLasersFired; i++)
       {
             if (invadersLasers[i] !== undefined && spaceship.pointIsInsideBoundingRectangle(invadersLasers[i].getCentreX(), invadersLasers[i].getCentreY()))
            {
               this.stopGameObjects();
            }

            if (invadersLasers[i] !== undefined &&  invadersLasers[i].getCentreY() > canvas.height){
                invadersLasers.splice(spaceshipLasers[i], 1 );
                break;
              }
              
       }

       for (let i = 0; i < numberOfSpaceShipLasersFired; i++)
       {
       spaceshipLasers = spaceshipLasers.filter(n => n);
       if(mysterySpaceship.getIsAlive() && spaceshipLasers[i] !== undefined &&  mysterySpaceship.pointIsInsideBoundingRectangle(spaceshipLasers[i].getCentreX(), spaceshipLasers[i].getCentreY()))
       {
        spaceshipLasers.splice(spaceshipLasers[i], 1);
        numberOfSpaceShipLasersFired--;
        score += 200;
        gameObjects[SCORE].setText(score);
        mysterySpaceship.setIsAlive(false);
        mysterySpaceship.setX(0);
       }
        invadersArray.every(invaderElement => {
           if (spaceshipLasers[i] !== undefined && invaderElement.pointIsInsideBoundingRectangle(spaceshipLasers[i].getCentreX(), spaceshipLasers[i].getCentreY())){
               spaceshipLasers.splice(spaceshipLasers[i], 1 );
                numberOfSpaceShipLasersFired--;
                invaderElement.setLives(invaderElement.getLives()-1);

                if (invaderElement.getLives() === 0){
                    invadersArray.splice(invadersArray.indexOf(invaderElement), 1);
                    spaceshipLasers = spaceshipLasers.filter(n => n);
                    if ( invaderElement.getLevel() === 1){
                        score += 15;
                        gameObjects[SCORE].setText(score);
                    }

                    else if ( invaderElement.getLevel() === 2){
                        score += 25;
                        gameObjects[SCORE].setText(score);
                    }

                   else { 
                        score = score + 50;
                        gameObjects[SCORE].setText(score);
                    }    
                } 
                 return false; 
           }
          else
           return true
                   
        });
        //TODO MULTIPLE LASERS
              if (spaceshipLasers[i] !== undefined && spaceshipLasers[i].getCentreY() < 0){
                spaceshipLasers.splice(spaceshipLasers[i], 1 );
                spaceshipLasers = spaceshipLasers.filter(n => n);
                break;
              }
                
       }

      
       for (let i = 0; i < invadersArray.length ; i++)
       {
            if( invadersArray[i].getY() + 50 >= canvas.height
                 || invadersArray[i].pointIsInsideBoundingRectangle(spaceship.getX(), spaceship.getY())) {
                this.stopGameObjects();
            }
        }

        //NEXT LEVEL
        if(invadersArray.length === 0 && temp === 0 && !isGameLost ){
           
            gameObjects[WIN_LOSE_MESSAGE] = new StaticText("CONGRATS, \n TIME TO NEXT LEVEL", 50, 270, "Times Roman", 20, "red");
            gameObjects[WIN_LOSE_MESSAGE].start();
            temp = 1;
            for (let i = 0; i < spaceshipLasers.length; i++) 
            { if(spaceshipLasers[i] !== undefined)
                spaceshipLasers[i].stop();
            }
        
            for (let i = 0; i < invadersLasers.length; i++)
            { if(invadersLasers[i] !== undefined)
                invadersLasers[i].stop();
            }
            level++;
            invadersLasers = [];
            spaceshipLasers = [];
            LevelsInvaderArray = [];
            invadersArray = [];
            numberOfInvaderLasersFired = 0;
            numberOfSpaceShipLasersFired = 0;

            setTimeout(() => {
               
                gameObjects[WIN_LOSE_MESSAGE].stopAndHide();
                invadersGroup.RandomLevelInvader();
                invadersGroup.displayInvaders();   
            }, 3000);
           
           
        }
    }
    }

    render()
    {
        super.render();
         spaceship.render();
         invadersGroup.render();
        for (let i = 0; i < spaceshipLasers.length; i++)
        {
            if(spaceshipLasers[i] !== undefined)
            spaceshipLasers[i].render();
        }
        for (let i = 0; i < invadersLasers.length; i++)
        {
            if(invadersLasers[i] !== undefined)
            invadersLasers[i].render();
        }
       //  gameObjects[SCORE].render();
        
        if( this.getRandomSpawnTick() === 49 && !mysterySpaceship.getIsAlive() && !isGameLost){
          mysterySpaceship.setIsAlive(true);
          console.log("I'min")
        }
        mysterySpaceship.render();
    }


    stopGameObjects() {
        let scores = [];
        firebaseService.addScoreToDb("sdf",score);
         firebaseService.getHighScoreTable().then( scores => { 
            this.displayLeaderboard(scores); 
        });               
       
        
        for (let i = 0; i < spaceshipLasers.length; i++) 
        { if(spaceshipLasers[i] !== undefined)
            spaceshipLasers[i].stop();
        }
    
        for (let i = 0; i < invadersLasers.length; i++)
        { if(invadersLasers[i] !== undefined)
            invadersLasers[i].stop();
        }
    
        spaceshipLasers = [];
        invadersLasers = [];
        invadersArray = [];
        gameObjects[WIN_LOSE_MESSAGE] = new StaticText("YOU LOSE! Press enter to play again", 50, 270, "Times Roman", 20, "red");
        gameObjects[WIN_LOSE_MESSAGE].start();
        isGameLost = true;
        
       
        level = 1;
        LevelsInvaderArray = [
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1
            ];

    }

    startGameObjects() {
        score = 0;
        gameObjects[SCORE].setText(score);
        invadersGroup.displayInvaders();
        gameObjects[WIN_LOSE_MESSAGE].stopAndHide();
        gameObjects[LEADERBOARD].stopAndHide();
        gameObjects[SCORE1].stopAndHide();
        gameObjects[SCORE2].stopAndHide();
        gameObjects[SCORE3].stopAndHide();
        gameObjects[SCORE4].stopAndHide();
        gameObjects[SCORE5].stopAndHide();
        isGameLost = false;
    }


    displayLeaderboard(scores) {
        const startY = 210;
        const incrementY = 30;
        let currentY = startY;
        let scoreIterator = 4;
        let positionIterator = 5;
    
        gameObjects[LEADERBOARD] = new StaticText("Leaderboard", STATIC_TEXT_CENTRE, 60, "Arial", 24, "white");
        gameObjects[LEADERBOARD].start();
        console.log(scores.length);

        scores.forEach(score => {
            let scoreText = `${positionIterator}: ${score.score}`;
            gameObjects[scoreIterator]= new StaticText(scoreText, STATIC_TEXT_CENTRE, currentY, "Arial", 20, "white");
            gameObjects[scoreIterator].start();
            currentY -= incrementY;
            scoreIterator+=1;
            positionIterator-=1;
        });
    }

    submitScore(username, score) {
        firebase.firestore().collection('scores').add({
            username: username,
            score: score
        });
    
}

 getRandomSpawnTick() {
    return Math.floor(Math.random() * 1000);
}

}