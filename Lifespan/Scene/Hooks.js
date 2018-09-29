import {SKY, GROUND} from 'Enum/Scenario';
import {STAR, BOMB} from 'Enum/Element';
import {DUDE} from 'Enum/Character';
import Background from 'Settings/Asset/Background';
import Element from 'Settings/Asset/Element';
import Character from 'Settings/Asset/Character';

let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;
function preload() {
  this.load.image(SKY, Background.Sky);
  this.load.image(GROUND, Background.Platform);
  this.load.image(STAR, Element.Star);
  this.load.image(BOMB, Element.Bomb);
  this.load.spritesheet(DUDE, Character.Dude, {frameWidth: 32, frameHeight: 48});
}

function create() {
  this.add.image(400, 300, SKY);
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, GROUND).setScale(2).refreshBody();
  platforms.create(600, 400, GROUND);
  platforms.create(50, 250, GROUND);
  platforms.create(750, 220, GROUND);
  scoreText = this.add.text(16,16,'Score: 0',{fontSize:'32px',fill:'#000'});
  player = this.physics.add.sprite(100, 450, DUDE);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers(DUDE, {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{key: DUDE, frame: 4}],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers(DUDE, {start: 5, end: 8}),
    frameRate: 10,
    repeat: -1
  });
  this.physics.add.collider(player, platforms);
  player.body.setGravityY(300);
  stars = this.physics.add.group({
    key:STAR,
    repeat: 11,
    setXY:{x:12,y:0,stepX:70}
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
  });
  this.physics.add.collider(stars,platforms);
  this.physics.add.overlap(player,stars,function(player,star){
    star.disableBody(true,true);
    score+=10;
    scoreText.setText('Score: ' + score);
    },null,this);
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-500);
  }
}

export {preload, create, update};