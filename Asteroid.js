class Asteroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.side = random(30, 50);
        this.speed = random(1, 3);
        this.targetX = width; // Imposta la posizione target lungo l'asse x
        this.angle = 0; // Angolo di rotazione iniziale
    }
  
    show() {
        imageMode(CENTER);
        push(); // Salva lo stato di trasformazione corrente
        translate(this.x, this.y); // Sposta l'origine al centro dell'asteroide
        rotate(this.angle); // Ruota l'asteroide
        image(asteroidImg, 0, 0, this.side, this.side); // Disegna l'asteroide
        pop(); // Ripristina lo stato di trasformazione precedente
    }
  
    move() {
        this.x += this.speed;
        this.angle += 0.025; // Aggiorna l'angolo di rotazione
        if (this.x > width) {
            this.x = 0; // Riporta l'asteroide alla posizione iniziale
            this.y = random(height);
        }
    }
}  