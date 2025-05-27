
function setup()
{
    class Nave {
    constructor(x, y, w, h) 
        {
            this.x = x;
            this.y = y;
        }

        mover() 
        {
            this.x += random(-2, 2);
            this.y += random(-2, 2);
        }

        mostrar() 
        {
            ellipse(this.x, this.y, 20, 20);
        }
    }
    createCanvas(1240, 760);
}


function draw() 
{
    background(5, 0, 14);
}