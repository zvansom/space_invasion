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
  game.load.image('laser', '../assets/img/beam.png');
  game.load.image('missile', '../assets/img/missile.png');
  game.load.image('enemy', '../assets/img/enemy.png');

  // Load animations
  game.load.spritesheet('smallboom', '../assets/img/explosion.png', 64, 64);

  // Load audio files for later
  game.load.audio('music', '../assets/audio/Shadelike.mp3');
  game.load.audio('pewpew', ['../assets/audio/laser.ogg', '../assets/audio/laser.mp3']);
  game.load.audio('launch', '../assets/audio/Missile.mp3');
  game.load.audio('boom', ['../assets/audio/explosion.ogg', '../assets/audio/explosion.mp3']);
}

function create() {
  // Create background and make it autoScroll
  var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
  background.autoScroll(-30, 0);

  // Set up sounds
  music = game.add.audio('music');
  pewpew = game.add.audio('pewpew', 0.1);
  launch = game.add.audio('launch', 0.5);
  boom = game.add.audio('boom', 0.4);
  music.play();

  // Create the player, place in world, and give it life.
  player = game.add.sprite(100, 200, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.score = 0;
  player.life = STARTING_LIFE;

  // Create laser objects for shooting
  lasers = game.add.group();
  lasers.enableBody = true;
  lasers.physicsBodyType = Phaser.Physics.ARCADE;
  lasers.createMultiple(20, 'laser');
  lasers.setAll('outOfBoundsKill', true);
  lasers.setAll('checkWorldBounds', true);

  // Create Missile objects
  missiles = game.add.group();
  missiles.enableBody = true;
  missiles.physicsBodyType = Phaser.Physics.ARCADE;
  missiles.createMultiple(10, 'missile');
  missiles.setAll('outOfBoundsKill', true);
  missiles.setAll('checkWorldBounds', true);

  // Create enemies
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  enemies.createMultiple(50, 'enemy');
  enemies.setAll('outOfBoundsKill', true);
  enemies.setAll('checkWorldBounds', true);
  enemies.forEach(function(enemy) {
    enemy.life = ENEMY_LIFE;
  })

  // Create explosions
  explosions = game.add.group();
  explosions.createMultiple(20, 'smallboom');
  explosions.setAll('anchor.x', 0);
  explosions.setAll('anchor.y', 0);
  explosions.forEach(function(explosion){
    explosion.animations.add('smallboom');
  });

  // Add keyboard controls
  cursors = game.input.keyboard.createCursorKeys(); //arrow createCursorKeys
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

  // Add Score and HP Text to screen.
  hpText = game.add.text(GAME_WIDTH - 150, 20, 'Life: ' + player.life.toString(), {fill: '#fff'});
  scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 40, 'Score: ' + player.score.toString(), {fill: '#fff'});

  // Create enemies in a loop
  game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);
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

  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    // Fire the weapon
    fireWeapon();
  }

  if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
    // Switch the weapon
    switchWeapon();
  }

  // Define desired collisions
  game.physics.arcade.overlap(player, enemies, hurtPlayer);
  game.physics.arcade.overlap(lasers, enemies, weaponEnemy);
  game.physics.arcade.overlap(missiles, enemies, weaponEnemy);
}
