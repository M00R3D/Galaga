let nave;
let imgNave, imgNave2;
let c = 6;
let frameNave = 0;

let proyectilImgs = [];
let proyectiles = [];

async function setup() {
    createCanvas(1240, 760);
    imgNave = await loadImageAsync('recursos/nave1.png');
    imgNave2 = await loadImageAsync('recursos/nave2.png');
    proyectilImgs[0] = await loadImageAsync('recursos/proyectil1.png');
    proyectilImgs[1] = await loadImageAsync('recursos/proyectil2.png');
    proyectilImgs[2] = await loadImageAsync('recursos/proyectil3.png');
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
}

function draw() {
    background(5, 0, 14);

    if (nave) {
        nave.mover();
        nave.mostrar();
    }

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

    for (let i = proyectiles.length - 1; i >= 0; i--) {
        proyectiles[i].mover();
        proyectiles[i].mostrar();
        if (proyectiles[i].y <= 0) {
            proyectiles.splice(i, 1);
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        let nuevo = new Proyectil(nave.x + nave.w / 2 - 10, nave.y);
        proyectiles.push(nuevo);
    }
}

class Nave {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    mover() {
        if (keyIsDown('a') && keyIsDown('d')) { return; }
        if (keyIsDown('a')) { this.x -= 5; }
        else if (keyIsDown('d')) { this.x += 5; }
        this.x = constrain(this.x, 0, width - this.w);
    }

    mostrar() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}

class Proyectil {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = 7;
        this.w = 20;
        this.h = 40;
        this.frame = 0;
        this.c = 4;
    }

    mover() {
        this.y -= this.vel;
        if (this.c > 0) {
            this.c--;
        } else {
            this.c = 4;
            this.frame = (this.frame + 1) % proyectilImgs.length;
        }
    }

    mostrar() {
        image(proyectilImgs[this.frame], this.x, this.y, this.w, this.h);
    }
}

function loadImageAsync(path) {
    return new Promise((resolve, reject) => {
        loadImage(path, resolve, reject);
    });
}







function loadImageAsync(path) {
    return new Promise((resolve, reject) => {
        loadImage(path, resolve, reject);
    });
}
