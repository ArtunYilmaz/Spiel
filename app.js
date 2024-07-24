
const app = new PIXI.Application();
const Shiplist = [];

document.body.appendChild(app.view);

let Ship1 = []
let laser = []

const rocket = PIXI.Sprite.from("assets/milenium falke.png");
rocket.x = 400
rocket.y = 520
rocket.scale.x = 0.075;
rocket.scale.y = 0.075;
app.stage.addChild(rocket);

gameInterval(function() {
const Ship1 = PIXI.Sprite.from("assets/schiff "+random(1,2,3) +".png");
Ship1.x = random(0, 700)
Ship1.y = -50
Ship1.scale.x = 0.25;
Ship1.scale.y = 0.25;
app.stage.addChild(Ship1);
Shiplist.push(Ship1);
flyDown(Ship1, 1);

waitForCollision(Ship1, rocket).then(function(){
    app.stage.removeChild(rocket)
    stopGame()
});
}, 500);

function leftKeyPressed(){
    rocket.x = rocket.x -5
}
function rightKeyPressed(){
    rocket.x = rocket.x +5
}
function upKeyPressed(){
    rocket.y = rocket.y -5
}
function downKeyPressed(){
    rocket.y = rocket.y +5
}
function spaceKeyPressed(){
    const laser = PIXI.Sprite.from("assets/laser.png");
laser.x = rocket.x - 19
laser.y = rocket.y - 35
laser.scale.x = 0.1;
laser.scale.y = 0.1;
flyUp(laser);
app.stage.addChild(laser);

waitForCollision(laser, Shiplist).then(function([Ship1,laser]){
    app.stage.removeChild(laser)
    app.stage.removeChild(Ship1)
    
});
}
function checkforCollision() {
    Ship1.forEach(function(Ship) {

        
        if (rocket.x + rocket.width > Ship.x &&
            rocket.y + rocket.height > Ship.y &&
            rocket.x < Ship.x &&
            rocket.y < Ship.y + Ship.height
        ) {
            rocket.img.src = "assets/boom.png";
            console.log('Collion!!!');
            Ship1 = Ship1.filter(u => u != Ship);
        }

        
        laser.forEach(function(lasers) {
            
            if (lasers.x + lasers.width > Ship.x &&
                lasers.y + lasers.height > Ship.y &&
                lasers.x < Ship.x &&
                lasers.y < Ship.y + Ship.height
            ) {
                Ship.hit = true;
                Ship.img.src = 'assets/boom.png';
                console.log('Collion!!!');

            }

        });

    });
}