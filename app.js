const app = new PIXI.Application();
const Shiplist = [];

document.body.appendChild(app.view);


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

const sound = PIXI.sound.Sound.from('resources/lasersound.mp3');
sound.play();