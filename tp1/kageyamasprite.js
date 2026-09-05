let fondo;

let correr = [];
let trueno = [];
let berry = [];

let estado = "correr";

let frameCorrer = 0;
let frameTrueno = 0;
let frameBerry = 0;

let tiempoAnterior = 0;
let tiempoEstado = 0;

let velocidadCorrer = 110;
let velocidadTrueno = 420;
let velocidadBerry = 750;

let xNami = -180;
let yNami = 310;

let velocidadMovimiento = 4;

let vuelta = 1;

let flash = 0;

function preload() {
  fondo = loadImage("data/cancha0.jpg");

  for (let i = 0; i < 5; i++) {
    correr[i] = loadImage("data/namicorre" + i + ".png");
  }

  for (let i = 0; i < 5; i++) {
    trueno[i] = loadImage("data/namitrueno" + i + ".png");
  }

  for (let i = 0; i < 4; i++) {
    berry[i] = loadImage("data/namiberry" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  tiempoAnterior = millis();
}

function draw() {
  dibujarFondoAdaptado(fondo);

  if (estado == "correr") {
    xNami = xNami + velocidadMovimiento;

    if (millis() - tiempoAnterior > velocidadCorrer) {
      frameCorrer = frameCorrer + 1;

      if (frameCorrer >= correr.length) {
        frameCorrer = 0;
      }

      tiempoAnterior = millis();
    }

    dibujarAnimacion(correr, frameCorrer, xNami, yNami, 180, 220);

    if (vuelta == 1 && xNami > width) {
      xNami = -180;
      vuelta = 2;
      frameCorrer = 0;
      tiempoAnterior = millis();
    }

    else if (vuelta == 2 && xNami >= 300) {
      xNami = 300;
      frameTrueno = 0;
      estado = "trueno";
      tiempoAnterior = millis();
    }
  }

  else if (estado == "trueno") {
    dibujarAnimacion(trueno, frameTrueno, xNami, yNami, 230, 250);

    if (millis() - tiempoAnterior > velocidadTrueno) {
      if (terminoAnimacion(frameTrueno, trueno.length) == false) {
        frameTrueno = frameTrueno + 1;
        tiempoAnterior = millis();
      }

      else {
        estado = "mantenerTrueno";
        tiempoEstado = millis();
      }
    }
  }

  else if (estado == "mantenerTrueno") {
    dibujarAnimacion(trueno, trueno.length - 1, xNami, yNami, 230, 250);

    if (millis() - tiempoEstado > 700) {
      flash = 255;
      estado = "flash";
      tiempoEstado = millis();
    }
  }

  else if (estado == "flash") {
    fill(255, flash);
    noStroke();
    rect(0, 0, width, height);

    flash = flash - 12;

    if (millis() - tiempoEstado > 400) {
      estado = "pausa";
      tiempoEstado = millis();
    }
  }

  else if (estado == "pausa") {
    if (millis() - tiempoEstado > 500) {
      frameBerry = 0;
      estado = "berry";
      tiempoAnterior = millis();
    }
  }

  else if (estado == "berry") {
    dibujarAnimacion(berry, frameBerry, 225, 100, 350, 420);

    if (millis() - tiempoAnterior > velocidadBerry) {
      if (terminoAnimacion(frameBerry, berry.length) == false) {
        frameBerry = frameBerry + 1;
        tiempoAnterior = millis();
      }

      else {
        estado = "final";
        tiempoEstado = millis();
      }
    }
  }

  else if (estado == "final") {
    dibujarAnimacion(berry, berry.length - 1, 225, 100, 350, 420);

    if (millis() - tiempoEstado > 700) {
      dibujarReiniciar();
    }
  }
}

function dibujarFondoAdaptado(img) {
  let escala = max(width / img.width, height / img.height);

  let nuevoAncho = img.width * escala;
  let nuevoAlto = img.height * escala;

  let x = (width - nuevoAncho) / 2;
  let y = (height - nuevoAlto) / 2;

  image(img, x, y, nuevoAncho, nuevoAlto);
}

function dibujarAnimacion(animacion, frame, x, y, ancho, alto) {
  image(animacion[frame], x, y, ancho, alto);
}

function terminoAnimacion(frame, cantidadFrames) {
  if (frame >= cantidadFrames - 1) {
    return true;
  } else {
    return false;
  }
}

function dibujarReiniciar() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  textStyle(BOLD);
  text("PRESIONA R PARA REINICIAR", width / 2, 555);
  textStyle(NORMAL);
}

function keyPressed() {
  if (key == "r" || key == "R") {
    estado = "correr";

    frameCorrer = 0;
    frameTrueno = 0;
    frameBerry = 0;

    xNami = -180;

    vuelta = 1;

    flash = 0;

    tiempoAnterior = millis();
    tiempoEstado = millis();
  }
}
