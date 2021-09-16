let player;
let noManaError = "You Don't Have Mana to Use This Skill";
let currentMonsterHealth;
let currentPlayerHealth;
let currentPlayerMana;
let roundCounter;
let currentRound = 1;
let buffArr = [];
player = assassin;
function start() {
  currentMonsterHealth = monster.maxLife;
  currentPlayerHealth = player.maxLife;
  currentPlayerMana = player.maxMana;
  adjustHealthBars(monster.maxLife, player.maxLife, player.maxMana);
}
start();
function attackMonster(type) {
  const damage = calDamage(player, type);
  dealMonsterDamage(damage);
  currentMonsterHealth -= damage;
  roundEnd();
}
function roundEnd() {
  const damage = calDamage(monster, "normalAttack");
  dealPlayerDamage(damage);
  currentPlayerHealth -= damage;
  if (currentPlayerMana + 10 >= player.maxMana) {
    currentPlayerMana = player.maxMana;
  } else {
    currentPlayerMana += 10;
  }
  manaUpdate();
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw!");
  }
  console.log("current round", currentRound);
  currentRound++;
  buffCheck();
}
function buffCheck() {
  buffArr.forEach((buff) => {
    if (buff.startRound == currentRound) {
      player.attackBouns += buff.attack;
      console.log("buff applied", currentRound, buff.startRound);
    }
    if (buff.endRound < currentRound && !buff.ended) {
      player.attackBouns -= buff.attack;
      buff.ended = true;
      console.log("buff removed");
    }
  });
}

function dealMonsterDamage(damage) {
  monsterHealthBar.value = +monsterHealthBar.value - damage;
}
function dealPlayerDamage(damage) {
  playerHealthBar.value = +playerHealthBar.value - damage;
}
function manaUpdate() {
  playerManaBar.value = currentPlayerMana;
}
function calDamage(dealer, attackType) {
  let beforeCrit =
    (Math.random() * (dealer.maxAttack - dealer.minAttack) + dealer.minAttack) *
    (dealer.attack + dealer.attackBouns);
  console.log(beforeCrit, dealer.name);
  let afterCrit = calCrit(dealer, beforeCrit);
  let afterTypeMultiplayer;
  if (attackType === "normalAttack") {
    afterTypeMultiplayer = afterCrit;
    console.log(afterTypeMultiplayer, dealer.name);
    return afterTypeMultiplayer;
  } else if (attackType === "chargeAttack") {
    afterTypeMultiplayer = afterCrit * dealer.chargeMultiplayer;
    return afterTypeMultiplayer;
  }
}

function calCrit(dealer, damage) {
  let con = Math.random() <= dealer.critChance;
  console.log(con);
  if (con) {
    return damage * dealer.critDamage;
  } else {
    return damage;
  }
}

function classSelect(playerClass) {
  if (username.value) {
    player = playerClass;
    start();
    inputSec.style.display = "none";
    healtSec.style.display = "block";
    controlSec.style.display = "flex";
    player.name = username.value;
    skillBtn.innerHTML = playerClass.skillName;
  } else alert("Please Enter Your Name");
}

function attackHandler() {
  attackMonster("normalAttack");
}

function chargeAttackHandler() {
  attackMonster("chargeAttack");
}

function skillHandler() {
  player.skill();
}

function warriorHandler() {
  classSelect(warrior);
}
function mageHandler() {
  classSelect(mage);
}
function assassinHandler() {
  classSelect(assassin);
}
attackBtn.addEventListener("click", attackHandler);
chargeAttackBtn.addEventListener("click", chargeAttackHandler);
skillBtn.addEventListener("click", skillHandler);
warriorBtn.addEventListener("click", warriorHandler);
mageBtn.addEventListener("click", mageHandler);
assassinBtn.addEventListener("click", assassinHandler);
