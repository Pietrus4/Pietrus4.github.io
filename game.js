const levelEnum = {
  MENU: 0,
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  PAUSE: 4,
  WIN: 5,
  LOST: 6,
};

let startLevel = true;

let level = levelEnum.MENU;

let asteroidImg;
let menu;
let pause;
let lost;
let win;

let song;

let stars = [];
let asteroids = [];
let numStars = 200;
let numAsteroids = 15;

let score = 0;

let timeLeftLevel2 = 30; // Tempo limite in secondi
let timeLeftLevel3 = 15;

function preload() {
  // Carica l'immagine del personaggio e dei livelli
  menu = loadImage('./img/menu.png');
  pause = loadImage('./img/pausa.png');
  lost = loadImage('./img/lost.png');
  win = loadImage('./img/win.png');
  asteroidImg = loadImage('./img/personaggio.png');

  soundFormats('mp3', 'ogg');
  song = loadSound('./suoni/backSound');
}

function setup() {
  createCanvas(1500, 700);
  song.loop();
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star(random(width), random(height)));
  }
  for (let i = 0; i < numAsteroids; i++) {
    asteroids.push(new Asteroid(random(width), random(height)));
  }
}

function draw() {
  switch (level) {
    //START MENU
    case levelEnum.MENU:
      imageMode(CORNER);
      background(menu);
      break;
  
    //PAUSE
    case levelEnum.PAUSE:
      imageMode(CORNER);
      background(pause);
      break;
    
    //WIN
    case levelEnum.WIN:
      imageMode(CORNER);
      background(win);
      break;
  
    //LOST
    case levelEnum.LOST:
      imageMode(CORNER);
      background(lost);
      break;
  
    //LEVEL 1
    case levelEnum.LEVEL_1:
      background(0);
      for (let star of stars) {
        star.show();
        star.move();
      }
      for (let asteroid of asteroids) {
        asteroid.show();
        asteroid.move();
      }
  
      // PUNTEGGIO
      textSize(20);
      textAlign(LEFT, TOP);
      text('Score: ' + score, 10, 10);
  
      if (score == numAsteroids) {
        for (let i = 0; i < numAsteroids; i++) {
          asteroids.push(new Asteroid(random(width), random(height)));
        }
        level = levelEnum.LEVEL_2;
        startLevel = !startLevel;
        score = 0;
      }
      break;
    
    //LEVEL 2
    case levelEnum.LEVEL_2:
      background(0);
      for (let star of stars) {
        star.show();
        star.move();
      }
      for (let asteroid of asteroids) {
        asteroid.show();
        asteroid.move();
      }
  
      // PUNTEGGIO
      textSize(20);
      textAlign(LEFT, TOP);
      text('Score: ' + score, 10, 10);
  
      // TEMPO
      text('Time left: ' + floor(timeLeftLevel2), 10, 40);
      timeLeftLevel2 -= 1 / frameRate();
  
      // Controlla se il tempo è scaduto e se ci sono ancora asteroidi rimasti
      if (timeLeftLevel2 <= 0 && asteroids.length > 0) {
        startLevel = !startLevel;
        score = 0;
        level = levelEnum.LOST;
      } 
      else if (timeLeftLevel2 > 0 && score == numAsteroids) {
        timeLeftLevel2 = 30;
        score = 0;
        for (let i = 0; i < numAsteroids; i++) {
          asteroids.push(new Asteroid(random(width), random(height)));
        }
        level = levelEnum.LEVEL_3;
      }
      break;
  
    //LEVEL 3
    case levelEnum.LEVEL_3:
      background(0);
      for (let star of stars) {
        star.show();
        star.move();
      }
      for (let asteroid of asteroids) {
        asteroid.show();
        asteroid.move();
      }
  
      // PUNTEGGIO
      textSize(20);
      textAlign(LEFT, TOP);
      text('Score: ' + score, 10, 10);
  
      // TEMPO
      text('Time left: ' + floor(timeLeftLevel3), 10, 40);
      timeLeftLevel3 -= 1 / frameRate();
  
      // Controlla se il tempo è scaduto e se ci sono ancora asteroidi rimasti
      if (timeLeftLevel3 <= 0 && asteroids.length > 0) {
        timeLeftLevel3 = 15;
        startLevel = !startLevel;
        score = 0;
        level = levelEnum.LOST;
      } 
      else if (timeLeftLevel3 > 0 && score == numAsteroids) {
        timeLeftLevel3 = 15; // Reimposta il tempo a -1 per evitare il cambio di livello immediato
        score = 0;
        level = levelEnum.WIN;
      }
      break;
  }  
}

function keyPressed() {
  if (key == ' ') {
    if (level == levelEnum.MENU || level == levelEnum.LOST) {
      for (let i = 0; i < numAsteroids; i++) {
        asteroids.pop();
      }
      for (let i = 0; i < numAsteroids; i++) {
        asteroids.push(new Asteroid(random(width), random(height)));
      }
      level = levelEnum.LEVEL_1;
    }

    else if (level == levelEnum.WIN || level == levelEnum.PAUSE) {
      score = 0;
      level = levelEnum.MENU;
    }
  } 

  if (keyCode === ESCAPE) {
    if (level === levelEnum.PAUSE) {
      // Se il gioco è in pausa, riprendilo
      if (levelEnum.LEVEL_1 <= previousLevel && previousLevel <= levelEnum.LEVEL_3) {
        level = previousLevel;
      }
    } 
    else {
      // Altrimenti, metti il gioco in pausa
      previousLevel = level;
      level = levelEnum.PAUSE;
    }
  }
}

function mousePressed() {
  // Controlla se il mouse è sopra un asteroide
  for (let i = 0; i < asteroids.length; i++) {
    let d = dist(mouseX, mouseY, asteroids[i].x, asteroids[i].y); //variabile che calcola e contiene la distanza fra il mouse e l'asteroide
    if (d < asteroids[i].side) {
      // Se il mouse è sopra un asteroide, rimuovilo dall'array
      asteroids.splice(i, 1);
      score++;
      break; // Esci dal ciclo for una volta che un asteroide è stato eliminato
    }
  }
}