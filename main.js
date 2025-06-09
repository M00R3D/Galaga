// guia de animaciones del jefe, 0-4 caminando,  4-11 mordiendo  11-16 parpadeando

let nave;
let imgNave, imgNave2;
let c = 6;
let frameNave = 0;
let proyectilImgs = [];
let proyectiles = [];
let enemigos = [];
let enemigosResistentes = [];
let somoslosjefes = [];
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
let estrellas = [];
let numEstrellas = 200;
let enTransicion = false;
let tiempoTransicion = 0;
let duracionTransicion = 120;
let enemigosAtacando = [];
let indiceAtaque = 0;
let tiempoUltimoAtaque = 0;
let intervaloAtaque = 600;
let explosiones = [];
let naveDesaparecida = false;
let tiempoRespawn = 0;
let proyectilesEnemigo = [];
let tiempoUltimoDisparo = 0;
let cooldownDisparo = 400;
let menuActivo = true;
let gruposdinamita = [];
let time = 0;
let selecMenu=0;
let enemigoBImgs = [];

async function setup() {
    createCanvas(1240, 760);
    
    let jefeImgs = [];
    imgNave = await loadImageAsync('recursos/nave1.png');
    imgNave2 = await loadImageAsync('recursos/nave2.png');
    proyectilImgs[0] = await loadImageAsync('recursos/proyectil1.png');
    proyectilImgs[1] = await loadImageAsync('recursos/proyectil2.png');
    proyectilImgs[2] = await loadImageAsync('recursos/proyectil3.png');
    enemigoImgs[0] = await loadImageAsync('recursos/enemigo1.png');
    enemigoImgs[1] = await loadImageAsync('recursos/enemigo2.png');
    enemigoImgs[2] = await loadImageAsync('recursos/enemigo3.png');
    enemigoBImgs[0] = await loadImageAsync('recursos/enemigoB.png');
    enemigoBImgs[1] = await loadImageAsync('recursos/enemigoB1.png');
    enemigoBImgs[2] = await loadImageAsync('recursos/enemigoB2.png');
    jefeImgs[0] = await loadImageAsync('recursos/jefe00.png');
    jefeImgs[1] = await loadImageAsync('recursos/jefe01.png');
    jefeImgs[2] = await loadImageAsync('recursos/jefe02.png');
    jefeImgs[3] = await loadImageAsync('recursos/jefe03.png');
    jefeImgs[4] = await loadImageAsync('recursos/jefe04.png');
    jefeImgs[5] = await loadImageAsync('recursos/jefe05.png');
    jefeImgs[6] = await loadImageAsync('recursos/jefe06.png');
    jefeImgs[7] = await loadImageAsync('recursos/jefe07.png');
    jefeImgs[8] = await loadImageAsync('recursos/jefe08.png');
    jefeImgs[9] = await loadImageAsync('recursos/jefe09.png');
    jefeImgs[10] = await loadImageAsync('recursos/jefe10.png');
    jefeImgs[11] = await loadImageAsync('recursos/jefe11.png');
    jefeImgs[12] = await loadImageAsync('recursos/jefe12.png');
    jefeImgs[13] = await loadImageAsync('recursos/jefe13.png');
    jefeImgs[14] = await loadImageAsync('recursos/jefe14.png');
    jefeImgs[15] = await loadImageAsync('recursos/jefe15.png');
    jefeImgs[16] = await loadImageAsync('recursos/jefe16.png');

    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
    generarFormacion();
    generarFormacionDinamita()
    //enemigosResistentes.push(new EnemigoResistente(100, 50, 50, 50, enemigoBImgs));
    somoslosjefes.push(new Jefe(300, 50, 150, 150, jefeImgs));
    tiempoParaAtaque = 100;
    for (let i = 0; i < numEstrellas; i++) {
        estrellas.push({
            x: random(width),
            y: random(height),
            r: random(1, 3),
            velocidad: random(0.5, 2)
        });
    }
}

function draw() {
    background(5, 0, 14);
    fondoEstrellado();

    if (menuActivo) {
    // background(5, 0, 14);
    fondoEstrellado();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(102);
    let floatY = height / 2 + sin(time) * 20;
    let r = 128 + 127 * sin(time * 0.8);
    let g = 128 + 127 * sin(time * 0.9 + PI / 3);
    let b = 128 + 127 * sin(time * 1.1 + PI / 5);
    fill(r, g, b, 200);
    // text("Texto flotante", width / 2, floatY);
    text("GALAGA ", width/2,  floatY -50);
    textSize(32);
    time += 0.07;
    if(selecMenu==0){fill(r, g, b, 200);}else{fill(255);}
    text("Presiona P para empezar", width/2, height/2 + 50);
    if(selecMenu==0){fill(r, g, b, 200);}else{fill(255);}
    textSize(32);
    if(selecMenu==1){fill(r, g, b, 200);}else{fill(255);}
    text("puntuaciones", width/2, height/2 + 80);
    if(selecMenu==2){fill(r, g, b, 200);}else{fill(255);}
    textSize(32);
    text("Salir", width/2, height/2 + 110);
    textSize(12);
    fill(255);
    text("Hecho por Job Moore Garay e Isaias salgado castillo", width/2, height/2 +300);
    return;
    }
    if (enTransicion) {
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("Nivel " + nivel, width / 2, height / 2);
        tiempoTransicion--;
        if (tiempoTransicion <= 0) {
            enTransicion = false;
            formacionCompletada = false;
            ataqueIniciado = false;
            enemigosAtacando = [];
            tiempoParaAtaque = 100;
            generarFormacion();
        }
        return;
    }

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

    if (!naveDesaparecida && nave) {
        nave.mover();
        nave.mostrar();

        if (keyIsDown(' ') && nave && !naveDesaparecida)
        {
            let ahora = millis();
            if (ahora - tiempoUltimoDisparo >= cooldownDisparo) 
                {
                let nuevo = new Proyectil(nave.x + nave.w / 2 - 10, nave.y);
                proyectiles.push(nuevo);
                tiempoUltimoDisparo = ahora;
                }
        }


        
    } else if (millis() > tiempoRespawn && vidas > 0) {
        naveDesaparecida = false;
        nave = new Nave(-100, height - 100, 60, 64, imgNave);
    }

    if (c > 0) c--;
    else {
        c = 6;
        frameNave = 1 - frameNave;
        if (nave) nave.img = frameNave === 0 ? imgNave : imgNave2;
    }

    if (cEnemigo > 0) cEnemigo--;
    else {
        cEnemigo = 6;
        frameEnemigo = (frameEnemigo + 1) % enemigoImgs.length;
    }

    for (let i = proyectiles.length - 1; i >= 0; i--) {
        proyectiles[i].mover();
        proyectiles[i].mostrar();
        if (proyectiles[i].y <= 0) proyectiles.splice(i, 1);
    }
    for (let i = enemigosResistentes.length - 1; i >= 0; i--) {
    let er = enemigosResistentes[i];
    er.mover();
    er.mostrar();
        for (let j = proyectiles.length - 1; j >= 0; j--) {
            if (er.colisionaConProyectil(proyectiles[j])) {
                proyectiles.splice(j, 1);
                er.health--;
                if (er.health <= 0) {
                    crearExplosion(er.x + er.w/2, er.y + er.h/2);
                    enemigosResistentes.splice(i, 1);
                    puntaje += 2;
                }
                break;
            }
        }
    }

    if(somoslosjefes!=[]){
        for (let i = somoslosjefes.length - 1; i >= 0; i--) {
        let er = somoslosjefes[i];
        er.mover();
        er.mostrar();
            for (let j = proyectiles.length - 1; j >= 0; j--) {
                if (er.colisionaConProyectil(proyectiles[j]) && nivel===3) {
                    proyectiles.splice(j, 1);
                    er.health--;
                    if (er.health <= 0) {
                        crearExplosion(er.x + er.w/2, er.y + er.h/2);
                        somoslosjefes.splice(i, 1);
                        puntaje += 2;
                    }
                    break;
                }
            }
        }
    }
    if (!formacionCompletada) {
        let completos = enemigos.every(e => e.y >= e.yObjetivo);
        if (completos) {
            formacionCompletada = true;
            tiempoAtaque = millis();
        }
    } else {
        if (!ataqueIniciado && millis() > tiempoParaAtaque) {
            ataqueIniciado = true;
            enemigosAtacando = shuffle(enemigos.slice());
            indiceAtaque = 0;
            tiempoUltimoAtaque = millis();
        }
        if (ataqueIniciado && millis() - tiempoUltimoAtaque >= intervaloAtaque) {
            if (indiceAtaque < enemigosAtacando.length) {
                let enemigo = enemigosAtacando[indiceAtaque];
                let maxY = Math.max(...enemigos.map(e => e.yObjetivo));
                if (enemigo.yObjetivo === maxY) {
                    enemigo.atacando = true;
                    let dx = nave.x + nave.w / 2 - enemigo.x;
                    let dy = nave.y + nave.h / 2 - enemigo.y;
                    let ang = atan2(dy, dx);
                    enemigo.dx = cos(ang) * 4.5;
                    enemigo.dy = sin(ang) * 4.5;
                }
                indiceAtaque++;
                tiempoUltimoAtaque = millis();
                let secuencia = [10000, 8000, 6000, 4000, 2000, 1000];
                let idx = Math.min(indiceAtaque, secuencia.length - 1);
                intervaloAtaque = secuencia[idx];
            }
        }
    }

    for (let i = enemigos.length - 1; i >= 0; i--) {
        let enemigo = enemigos[i];
        if (!formacionCompletada) enemigo.moverHaciaFormacion();
        else if (enemigo.atacando) enemigo.atacar();
        else enemigo.y += 0.2;
        enemigo.mostrar();

        if (enemigo.colisionaConFondo()) {
            enemigos.splice(i, 1);
            if (!naveDesaparecida) manejarColisionConNave();
            continue;
        }


        if (!naveDesaparecida && nave && enemigo.colisionaConNave(nave)) {
            manejarColisionConNave();
            enemigos.splice(i, 1);
            continue;
        }


        for (let j = proyectiles.length - 1; j >= 0; j--) {
            if (enemigo.colisionaConProyectil(proyectiles[j])) {
                crearExplosion(enemigo.x, enemigo.y);
                enemigos.splice(i, 1);
                proyectiles.splice(j, 1);
                puntaje++;
                break;
            }
        }
    }

    if (enemigos.length === 0 && !enTransicion) {
        nivel++;
        enTransicion = true;
        tiempoTransicion = duracionTransicion;
    }

    for (let i = explosiones.length - 1; i >= 0; i--) {
        explosiones[i].actualizar();
        explosiones[i].mostrar();
        if (explosiones[i].terminada()) explosiones.splice(i, 1);
    }
     if (nivel > 1 && formacionCompletada) {
        for (let e of enemigos) {
            if (random() < 0.004) {
                proyectilesEnemigo.push(new ProyectilEnemigo(e.x, e.y + e.r));
            }
        }
         for (let gdIndex = gruposdinamita.length - 1; gdIndex >= 0; gdIndex--) {
            let grupo = gruposdinamita[gdIndex];
            grupo.mover();
            grupo.mostrar();
            for (let i = proyectiles.length - 1; i >= 0; i--) {
                let p = proyectiles[i];
                if (grupo.leader.colisionaConProyectil(p)) {
                proyectiles.splice(i, 1);
                grupo.leader.health--;
                if (grupo.leader.health <= 0) {
                    crearExplosion(grupo.leader.x + grupo.leader.w/2, grupo.leader.y + grupo.leader.h/2);
                    gruposdinamita.splice(gdIndex, 1);
                    puntaje += 2;
                }
                break;
                }
                for (let mIndex = grupo.miembros.length - 1; mIndex >= 0; mIndex--) {
                let miembro = grupo.miembros[mIndex];
                if (miembro.colisionaConProyectil(p)) {
                    proyectiles.splice(i, 1);
                    crearExplosion(miembro.x + miembro.r, miembro.y + miembro.r);
                    grupo.miembros.splice(mIndex, 1);
                    puntaje++;
                    break;
                }
                }
            }
            }
    }

    for (let i = proyectilesEnemigo.length - 1; i >= 0; i--) {
        let pe = proyectilesEnemigo[i];
        pe.mover();
        pe.mostrar();
        if (pe.y > height) {
            proyectilesEnemigo.splice(i, 1);
            continue;
        }
        if (nave && pe.colisionaConNave(nave)) 
            {
                proyectilesEnemigo.splice(i, 1);
                if (!naveDesaparecida) manejarColisionConNave();
            }

    }
}

function keyPressed() {
    // if (key === ' ' && nave && !naveDesaparecida) {
    //     let ahora = millis();
    //     if (ahora - tiempoUltimoDisparo >= cooldownDisparo) {
    //         let nuevo = new Proyectil(nave.x + nave.w / 2 - 10, nave.y);
    //         proyectiles.push(nuevo);
    //         tiempoUltimoDisparo = ahora;
    //     }
    // }
    if (menuActivo) 
    {
        if(key === 'p' || key ==='P')
        {
            if(selecMenu==0){menuActivo = false;}
            if(selecMenu==1){menuActivo = false;}
            if(selecMenu==2){menuActivo = false;}
            // return;
        }

        if(key === 'w' || key ==='W')
        {
            if(selecMenu>0){selecMenu--;}else{selecMenu=2;}
            // return;
        }

        if(key === 's' || key ==='S')
        {
            if(selecMenu<2){selecMenu++;}else{selecMenu=0;}
            // return;
        }
    }
    if ((key === 'r' || key === 'R') && juegoTerminado) reiniciarJuego();
}
function fondoEstrellado() {
    noStroke();
    fill(255);
    for (let estrella of estrellas) {
        circle(estrella.x, estrella.y, estrella.r);
        estrella.y += estrella.velocidad;
        if (estrella.y > height) {
            estrella.y = 0;
            estrella.x = random(width);
        }
    }
}

function reiniciarJuego() {
    puntaje = 0;
    vidas = 3;
    enemigos = [];
    proyectiles = [];
    juegoTerminado = false;
    formacionCompletada = false;
    ataqueIniciado = false;
    enemigosAtacando = [];
    tiempoParaAtaque = 100;
    nivel = 1;
    nave = new Nave(width / 2, height - 100, 60, 64, imgNave);
    generarFormacion();
    generarFormacionDinamita()
    somoslosjefes=[(new Jefe(300, 50, 150, 150, jefeImgs))];
}

function generarFormacionDinamita(){
    let leader = new EnemigoResistente(200, 50, 50, 50, enemigoBImgs);
    let miembros = [
    new Enemigo(leader.x - 60, leader.y + 30, 40, leader.x - 60, leader.y + 30),
    new Enemigo(leader.x + 60, leader.y + 30, 40, leader.x + 60, leader.y + 30),
    new Enemigo(leader.x,       leader.y + 60, 40, leader.x,       leader.y + 60)
  ];
  gruposdinamita.push(new GrupoDinamita(leader, miembros));
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
        if (keyIsDown('a')) this.x -= 10;
        else if (keyIsDown('d')) this.x += 10;
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
        this.vel = 20;
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
class ProyectilEnemigo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = 5;
        this.w = 20;
        this.h = 40;
    }

    mover() {
        this.y += this.vel;
    }
    mostrar() {
         fill(255, 100, 100);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    colisionaConNave(nave) {
        return (this.x < nave.x + nave.w &&
                this.x + this.w > nave.x &&
                this.y < nave.y + nave.h &&
                this.y + this.h > nave.y);
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
        this.atacando = false;
        this.dx = 0;
        this.dy = 0;
    }

    moverHaciaFormacion() {
        this.y += 1;
        if (this.y > this.yObjetivo) this.y = this.yObjetivo;
    }

    atacar() {
        this.x += this.dx;
        this.y += this.dy;
    }

    mostrar() {
        image(this.imgs[frameEnemigo], this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }

    colisionaConFondo() {
        return this.y > height;
    }

    colisionaConNave(n) {
        return this.x + this.r > n.x && this.x - this.r < n.x + n.w &&
               this.y + this.r > n.y && this.y - this.r < n.y + n.h;
    }

    colisionaConProyectil(p) {
        return this.x + this.r > p.x && this.x - this.r < p.x + p.w &&
               this.y + this.r > p.y && this.y - this.r < p.y + p.h;
    }
}
class EnemigoResistente {
    constructor(x, y, w, h, imgs) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgs = imgs;
        this.health = 2;
        this.vx = 3;
        this.vy = 1.2;
        this.cycleCount = 0;
        this.frame = 0;
        this.c = 6;
    }
    mover() {
        this.cycleCount++;
        if (this.cycleCount % 60 === 0) this.vx = -this.vx;
        this.x += this.vx;
        this.y += this.vy;
        this.x = constrain(this.x, 0, width - this.w);
        if (this.c > 0) this.c--;
        else {
            this.c = 6;
            this.frame = (this.frame + 1) % this.imgs.length;
        }
    }
    mostrar() {
        image(this.imgs[this.frame], this.x, this.y, this.w, this.h);
    }
    colisionaConProyectil(p) {
        return this.x < p.x + p.w &&
               this.x + this.w > p.x &&
               this.y < p.y + p.h &&
               this.y + this.h > p.y;
    }
}
class GrupoDinamita {
  constructor(leader, miembros) {
    this.leader = leader;
    this.miembros = miembros;
  }
  mover() {
    this.leader.mover();
    let dx = this.leader.vx;
    let dy = this.leader.vy;
    for (let m of this.miembros) {
      m.x += dx;
      m.y += dy;
    }
  }
  mostrar() {
    this.leader.mostrar();
    for (let m of this.miembros) m.mostrar();
  }
}
class Jefe {
    constructor(x, y, w, h, imgs) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgs = imgs;
        this.health = 10;
        this.vx = 3;
        this.vy = 1.2;
        this.cycleCount = 0;
        this.frame = 0;
        this.c = 6;
    }
    mover() {
        if(nivel==3)
        {
            this.cycleCount++;
            if (this.cycleCount % 60 === 0) this.vx = -this.vx;
            // this.x += this.vx;
            this.y += this.vy;
            this.x = constrain(this.x, 0, width - this.w);
            if (this.c > 0) this.c--;
            else {
                this.c = 6;
                this.frame = (this.frame + 1) % this.imgs.length;
            }
        }
    }
    mostrar() {
        if(nivel==3)
        {
            image(this.imgs[this.frame], this.x, this.y, this.w, this.h);
        }
    }
    colisionaConProyectil(p) {
        return this.x < p.x + p.w &&
               this.x + this.w > p.x &&
               this.y < p.y + p.h &&
               this.y + this.h > p.y;
    }
}

class Particula {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-3, 3);
        this.life = 60;
        this.color = color(random([255, 255, 255]), random([0, 150, 255]), 0);
    }

    actualizar() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    mostrar() {
        noStroke();
        fill(this.color);
        circle(this.x, this.y, 5);
    }

    terminada() {
        return this.life <= 0;
    }
}

class Explosion {
    constructor(x, y) {
        this.particulas = [];
        for (let i = 0; i < 20; i++) this.particulas.push(new Particula(x, y));
    }

    actualizar() {
        for (let p of this.particulas) p.actualizar();
        this.particulas = this.particulas.filter(p => !p.terminada());
    }

    mostrar() {
        for (let p of this.particulas) p.mostrar();
    }

    terminada() {
        return this.particulas.length === 0;
    }
}

function crearExplosion(x, y) {
    explosiones.push(new Explosion(x, y));
}

async function loadImageAsync(src) {
    return new Promise((res, rej) => loadImage(src, res, rej));
}


function manejarColisionConNave() {
    crearExplosion(nave.x + nave.w / 2, nave.y + nave.h / 2);
    if (!naveDesaparecida) vidas--;
    naveDesaparecida = true;
    tiempoRespawn = millis() + 2000;
    if (vidas <= 0) juegoTerminado = true;
}
