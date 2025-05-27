let nave;
let imgNave;


function setup()
{
    createCanvas(1240, 760);
    loadImage('recursos/nave.png', function(img) {
    imgNave = img;
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
  }, 
 
  function() {
    console.error('Error: No se pudo cargar la imagen.');
  });
}


function draw() 
{
    background(5, 0, 14);
    if (nave) {
        nave.mover();
        nave.mostrar();
    }
    
}

class Nave 
{
    constructor(x, y, w, h, img) 
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.img = img;
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
            image(this.img, this.x, this.y, this.w, this.h);
        }
}