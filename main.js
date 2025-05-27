let nave;

function setup()
{
    createCanvas(1240, 760);
    let naveX = width / 2;
    let naveY = height - 22;
    let naveW = 60;
    let naveH = 30;
    nave = new Nave(naveX, naveY, naveW, naveH);
}


function draw() 
{
    background(5, 0, 14);
    nave.mover();
    nave.mostrar();
    
}

class Nave 
{
    constructor(x, y, w, h) 
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        mover() 
        {
            if(keyIsDown('a') && keyIsDown('d')){}
            else
                {
                if (keyIsDown('a')) 
                    { // A
                        this.x -= 5;
                    } 
                else if (keyIsDown('d')) 
                    { // D
                        this.x += 5;
                    }
                }
        }

        mostrar() 
        {
            ellipse(this.x, this.y, this.w, this.h);
        }
}