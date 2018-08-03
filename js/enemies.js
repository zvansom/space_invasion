function spawnEnemy(){
  var enemy = enemies.getFirstExists(false);
  enemy.reset(GAME_WIDTH - 10, game.rnd.integerInRange(50, GAME_HEIGHT - 50));
  enemy.body.velocity.x = -250;
}

function hurtPlayer(player, enemy) {
  boom.play();
  var explosion = explosions.getFirstExists(false);
  explosion.reset(player.body.x, player.body.y);
  explosion.play('smallboom', 50, false, true);

  enemy.kill();
  player.life -= 25;
  hpText.text = 'Life: ' + player.life.toString();

  if(player.life <= 0) {
    player.kill();
    // TODO: Game over function
  }
  else if(player.life <= 50) {
    player.tint = '0xff0000';
  }
}
