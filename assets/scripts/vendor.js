const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const playerManaBar = document.getElementById('player-mana');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const chargeAttackBtn = document.getElementById('charge-attack-btn');
const skillBtn = document.getElementById('skill-btn');
const logBtn = document.getElementById('log-btn');

const healtSec = document.getElementById('health-levels');
const controlSec = document.getElementById('controls');
const inputSec = document.getElementById('user-inputs');

const username = document.getElementById('username');
const warriorBtn = document.getElementById('warrior-btn');
const mageBtn = document.getElementById('mage-btn');
const assassinBtn = document.getElementById('assassin-btn');

function adjustHealthBars(monsterMaxLife, playerMaxLife, playerMaxMana) {
  monsterHealthBar.max = monsterMaxLife;
  monsterHealthBar.value = monsterMaxLife;
  playerHealthBar.max = playerMaxLife;
  playerHealthBar.value = playerMaxLife;
  playerManaBar.max = playerMaxMana;
  playerManaBar.value = playerMaxMana;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
