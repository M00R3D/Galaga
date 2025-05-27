let nave;
let imgNave, imgNave2;
let c = 6;
let frameNave = 0;

async function setup() {
    createCanvas(1240, 760);
    imgNave = await loadImageAsync('recursos/nave1.png');
    imgNave2 = await loadImageAsync('recursos/nave2.png');
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
}

function draw() {
    background(5, 0, 14);

    if (nave) {
        nave.mover();
        nave.mostrar();
    }

  // Animación 
    if (c > 0) {
        c--;
    } else {
        c = 6;
    if (frameNave === 0) {
        frameNave = 1;
        nave.img = imgNave2;
    } else {
        frameNave = 0;
        nave.img = imgNave;
    }
    }
}

class Nave {
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
        if (keyIsDown('a') && keyIsDown('d')) {return;}

        if (keyIsDown('a')) {this.x -= 5;}
        else if (keyIsDown('d')) {this.x += 5;}

        this.x = constrain(this.x, 0, width - this.w);
    }

    mostrar() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}






function loadImageAsync(path) {
    return new Promise((resolve, reject) => {
        loadImage(path, resolve, reject);
    });
}
