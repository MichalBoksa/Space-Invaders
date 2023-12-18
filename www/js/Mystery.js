class Mystery extends GameObject {

    constructor(x,y,width,image) {

        super(null);        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 25;
        this.image = image
        this.isAlive = false;
    }

    render() {
        if(this.isAlive && !isGameLost){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.updateState();
        }
    }

   updateState() {    
     if (this.isAlive && this.getX() <= canvas.width - this.getWidth() / 2){
        this.setX(this.getX() + 0.4);
        }
    else{
        this.isAlive = false;
        this.x = 0;     
    }
    }
    
    getWidth()
    {
        return this.width;
    }
    
    setWidth(newWidth)
    {
        this.width = newWidth;
    }

    getCentreX()
    {
        return this.x + this.width / 2;
    }

    getCentreY()
    {
        return this.y + this.height / 2;
    }

    
    getX()
    {
        return this.x ;
    }

    
    setX(newX)
    {
        this.x = newX;
    }


    getY()
    {
        return this.y ;
    }

    getIsAlive()
    {
        return this.isAlive;
    }

    setIsAlive(newIsAlive)
    {
        this.isAlive = newIsAlive;
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