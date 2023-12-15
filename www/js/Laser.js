/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Laser extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, centreX, y, isSpaceShipLaser)
    {
        super(5); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
        this.width = 7;
        this.height = 12;
        this.centreX = centreX;
        this.y = y;
        this.isSpaceShipLaser = isSpaceShipLaser;
        if (this.isSpaceShipLaser)
        this.centreY = canvas.height - this.height - 25;
        else
            this.centreY = this.y + 10;

    }

    updateState(){
            if (this.isSpaceShipLaser)
                this.centreY--;
            else
            this.centreY++;
    }

    render()
    {
        ctx.drawImage(this.image, this.centreX - this.width / 2, this.centreY - this.width / 2, this.width, this.height);
        
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCentreY()
    {
        return this.centreY;
    }
}