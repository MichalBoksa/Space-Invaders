

class Invader extends GameObject
{
    constructor(level, x, y, width)
    {
        super(null);
        this.level = level;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 20;
        this.isAlive = true;

        this.InvaderImage = new Image();
        if (this.level === 1){
        this.InvaderImage.src = "images/invader.png";
        this.lives = 1;
        }

       else if (this.level === 2){
            this.InvaderImage.src = "images/invader2.png";
            this.lives = 2;
            }

        else if (this.level === 3){
             this.InvaderImage.src = "images/invader3.png";
             this.lives = 3;
          }
    }

    render()
    {
        ctx.drawImage(this.InvaderImage, this.x, this.y, this.width, this.height);
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    getWidth()
    {
        return this.width;
    }

    getHeight(){
        return this.height
    }

    setX(newX)
    {
        this.x = newX;
    }

    setY(newY)
    {
        this.y = newY;
    }

    setWidth(newWidth)
    {
        this.width = newWidth;
    }
    
    getMinimumSize()
    {
        return this.minimumSize;
    }

    getImage()
    {
        return this.InvaderImage;
    }

    getIsAlive()
    {
        return this.isAlive;
    }

    setIsAlive(newIsAlive)
    {
        this.isAlive = newIsAlive;
    }

    getLives()
    {
        return this.lives;
    }

    getLevel()
    {
        return this.level;
    }

    setLives(lives)
    {
        this.lives = lives;
    }

    getCentreX()
    {
        return this.x + this.width / 2;
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    return false; 
                }
            }

            if (pointY > this.y)
            {
                if ((pointY - this.y) > this.height)
                {
                    return false; 
                }
            }
        }
        else 
        {
            return false;
        }
        return true;
    }
}