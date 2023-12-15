class Spaceship extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(x, y, width,image)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 25;
        this.image = image;
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    changeX(changeAmount)
    {
        this.x += changeAmount;
        if(this.x >= canvas.width -this.width )
        {
            this.x = canvas.width - this.width;
        }
       
        else if(this.x <= 0)
        {
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

    getY()
    {
        return this.y ;
    }

    pointIsInsideBoundingRectangle(pointX, pointY)
    {
        if ((pointX > this.x) && (pointY > this.y))
        {
            if (pointX > this.x)
            {
                if ((pointX - this.x) > this.width)
                {
                    return false; // to the right of this gameObject
                }
            }

            if (pointY > this.y)
            {
                if ((pointY - this.y) > this.height)
                {
                    return false; // below this gameObject
                }
            }
        }
        else // above or to the left of this gameObject
        {
            return false;
        }
        return true; // inside this gameObject
    }
}