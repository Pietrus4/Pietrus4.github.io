class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = random(1, 4);
        this.speed = map(this.radius, 1, 4, 2, 0.5); //mappa il raggio, in range >= 1 e <= 4, ne setta la velocità da 2 a 0.5
    }
  
    show() {
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
  
    move() {
        this.x += this.speed; // Sposta la stella verso destra con la sua velocità proporzionale
        if (this.x > width) { // Se la stella va oltre il bordo destro
            this.x = 0; // Reimposta la posizione alla sinistra del canvas
            this.y = random(height); // Cambia casualmente l'altezza della stella
        }
    }
}  