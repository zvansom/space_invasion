var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
  init: init,
  preload: preload,
  create: create,
  update: update
});

function init() {
}

function preload() {
  // Initialize arcade physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Load images for later use.
  game.load.image('bg', '../assets/img/cool-space-background.jpg');
  game.load.image('player', '../assets/img/ship.png');
}

function create() {
  // Create background and make it autoScroll
  var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
  background.autoScroll(-30, 0);

  // Create the player, place in world, and give it life.
  player = game.add.sprite(100, 200, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.score = 0;
  player.life = STARTING_LIFE;

  // Add keyboard controls
  cursors = game.input.keyboard.createCursorKeys(); //arrow createCursorKeys
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

  // Add Score and HP Text to screen.
  hpText = game.add.text(GAME_WIDTH - 150, 20, 'Life: ' + player.life.toString(), {fill: '#fff'});
  scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 40, 'Score: ' + player.score.toString(), {fill: '#fff'});
}

function update(){
  player.body.velocity.set(0);

  if(cursors.left.isDown) {
    player.body.velocity.x = -DEFAULT_SPEED;
  } else if(cursors.right.isDown) {
    player.body.velocity.x = DEFAULT_SPEED;
  }

  if(cursors.up.isDown) {
    player.body.velocity.y = -DEFAULT_SPEED;
  } else if(cursors.down.isDown) {
    player.body.velocity.y = DEFAULT_SPEED;
  }
}
