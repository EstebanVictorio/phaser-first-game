import Phaser from 'phaser'
import {preload,create,update} from 'Lifespan/Scene/Hooks'

let Setup = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity:{y:300},
      debug:false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

export default Setup;