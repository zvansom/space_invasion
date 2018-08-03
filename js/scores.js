function addScore(amount) {
  player.score += amount;
  scoreText.text = 'Score: ' + player.score.toString();
}

function gameOver() {
  console.log('game over');
}
