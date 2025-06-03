let nave;
let imgNave, imgNave2;
let c = 6;
let frameNave = 0;
let proyectilImgs = [];
let proyectiles = [];
let enemigos = [];
let formacionCompletada = false;
let ataqueIniciado = false;
let tiempoAtaque = 0;
let tiempoParaAtaque = 0;
let enemigoImgs = [];
let frameEnemigo = 0;
let cEnemigo = 6;
let juegoTerminado = false;
let puntaje = 0;
let vidas = 3;
let nivel = 1;

async function setup() {
    createCanvas(1240, 760);
    imgNave = await loadImageAsync('recursos/nave1.png');
    imgNave2 = await loadImageAsync('recursos/nave2.png');
    proyectilImgs[0] = await loadImageAsync('recursos/proyectil1.png');
    proyectilImgs[1] = await loadImageAsync('recursos/proyectil2.png');
    proyectilImgs[2] = await loadImageAsync('recursos/proyectil3.png');
    enemigoImgs[0] = await loadImageAsync('recursos/enemigo1.png');
    enemigoImgs[1] = await loadImageAsync('recursos/enemigo2.png');
    enemigoImgs[2] = await loadImageAsync('recursos/enemigo3.png');
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
    generarFormacion();
    tiempoParaAtaque = millis() + random(5000, 30000);
}

function draw() {
    background(5, 0, 14);
    if (juegoTerminado) {
        fill(255, 0, 0);
        textSize(64);
        textAlign(CENTER, CENTER);
        text("Juego Terminado", width / 2, height / 2);
        return;
    }

    fill(255);
    textSize(32);
    textAlign(LEFT, TOP);
    text("Puntaje: " + puntaje, 20, 20);
    text("Vidas: " + vidas, 20, 60);
    text("nivel:" + nivel, 20, 100);

    if (nave) {
        nave.mover();
        nave.mostrar();
    }

    if (vidas <= 0) juegoTerminado = true;

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

    if (cEnemigo > 0) {
        cEnemigo--;
    } else {
        cEnemigo = 6;
        frameEnemigo = (frameEnemigo + 1) % enemigoImgs.length;
    }

    for (let i = proyectiles.length - 1; i >= 0; i--) {
        proyectiles[i].mover();
        proyectiles[i].mostrar();
        if (proyectiles[i].y <= 0) {
            proyectiles.splice(i, 1);
        }
    }

    if (!formacionCompletada) {
        let completos = enemigos.every(e => e.y >= e.yObjetivo);
        if (completos) {
            formacionCompletada = true;
            tiempoAtaque = millis();
        }
    } else {
        if (millis() > tiempoParaAtaque) ataqueIniciado = true;
    }

    for (let i = enemigos.length - 1; i >= 0; i--) {
        if (!formacionCompletada) enemigos[i].moverHaciaFormacion();
        else enemigos[i].moverEnAtaque(ataqueIniciado);
        enemigos[i].mostrar();

        if (enemigos[i].colisionaConFondo()) {
            enemigos.splice(i, 1);
            vidas--;
            continue;
        }

        if (nave && enemigos[i].colisionaConNave(nave)) {
            enemigos.splice(i, 1);
            vidas--;
            if (vidas <= 0) juegoTerminado = true;
            continue;
        }

        for (let j = proyectiles.length - 1; j >= 0; j--) {
            if (enemigos[i].colisionaConProyectil(proyectiles[j])) {
                enemigos.splice(i, 1);
                proyectiles.splice(j, 1);
                puntaje++;
                if (puntaje % 10 === 0) nivel++;
                break;
            }
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        let nuevo = new Proyectil(nave.x + nave.w / 2 - 10, nave.y);
        proyectiles.push(nuevo);
    }
    if ((key === 'r' || key === 'R') && juegoTerminado) reiniciarJuego();
}

function reiniciarJuego() {
    puntaje = 0;
    vidas = 3;
    enemigos = [];
    proyectiles = [];
    juegoTerminado = false;
    formacionCompletada = false;
    ataqueIniciado = false;
    tiempoParaAtaque = millis() + random(5000, 30000);
    nivel = 1;
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
    generarFormacion();
}

function generarFormacion() {
    let espaciadoX = 100;
    let espaciadoY = 80;
    let inicioX = 200;
    let inicioY = -100;
    for (let g = 0; g < 2; g++) {
        for (let fila = 0; fila < 2; fila++) {
            for (let col = 0; col < 5; col++) {
                let xObjetivo = inicioX + col * espaciadoX + g * 500;
                let yObjetivo = 100 + fila * espaciadoY;
                enemigos.push(new Enemigo(xObjetivo, inicioY - random(50), 40, xObjetivo, yObjetivo));
            }
        }
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
        if (keyIsDown('a') && keyIsDown('d')) return;
        if (keyIsDown('a')) this.x -= 7;
        else if (keyIsDown('d')) this.x += 7;
        this.x = constrain(this.x, 0, width - this.w);
    }

    mostrar() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}

class Proyectil {
    constructor(x, y) {
        this.x = x - 10;
        this.y = y;
        this.vel = 7;
        this.w = 40;
        this.h = 80;
        this.frame = 0;
        this.c = 4;
    }

    mover() {
        this.y -= this.vel;
        if (this.c > 0) this.c--;
        else {
            this.c = 4;
            this.frame = (this.frame + 1) % proyectilImgs.length;
        }
    }

    mostrar() {
        image(proyectilImgs[this.frame], this.x, this.y, this.w, this.h);
    }
}

class Enemigo {
    constructor(x, y, r, xObjetivo, yObjetivo) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.imgs = enemigoImgs;
        this.xObjetivo = xObjetivo;
        this.yObjetivo = yObjetivo;
    }

    moverHaciaFormacion() {
        this.y += 1;
        if (this.y > this.yObjetivo) this.y = this.yObjetivo;
    }

    moverEnAtaque(rapido) {
        this.y += rapido ? 2 : 0.5;
    }

    mostrar() {
        image(this.imgs[frameEnemigo], this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }

    colisionaConNave(nave) {
        let dx = this.x - (nave.x + nave.w / 2);
        let dy = this.y - (nave.y + nave.h / 2);
        return sqrt(dx * dx + dy * dy) < this.r + max(nave.w, nave.h) / 2;
    }

    colisionaConProyectil(proyectil) {
        let dx = this.x - (proyectil.x + proyectil.w / 2);
        let dy = this.y - (proyectil.y + proyectil.h / 2);
        return sqrt(dx * dx + dy * dy) < this.r + max(proyectil.w, proyectil.h) / 2;
    }

    colisionaConFondo() {
        return this.y > 760;
    }
}

function loadImageAsync(path) {
    return new Promise((resolve, reject) => {
        loadImage(path, resolve, reject);
    });
}
