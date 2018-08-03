// Game-wide constants
var GAME_HEIGHT = 500;
var GAME_WIDTH = 800;
var DEFAULT_SPEED = 300;
var STARTING_LIFE = 150;
var ENEMY_LIFE = 100;
var WEAPONS = [
  {name: 'Laser', velocity: 450, timer: 140, offset: 20, damage: 25},
  {name: 'Missile', velocity: 275, timer: 600, offset: 20, damage: 100}
];
var SWITCH_WEAPON_TIMER = 200;

// Global Variables
var player;
var enemies;
var lasers;
var explosions;
var cursors;
var scoreText, hpText;
var music, pewpew;
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;
