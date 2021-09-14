const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const player = {
  name: "player",
  maxLife: 100,
  attack: 10,
  critChance: 0.2,
  critDamage: 1.5,
  maxAttack: 1.2,
  minAttack: 0.8,
  skillMultiplayer: 1.5,

}
const monster = {
  name: "monster",
  maxLife: 100,
  attack: 12,
  critChance: 0.2,
  critDamage: 1.5,
  maxAttack: 1.4,
  minAttack: 0.8,
  skillMultiplayer: 1.5,
}

let currentMonsterHealth = monster.maxLife;
let currentPlayerHealth = player.maxLife;
adjustHealthBars(monster.maxLife, player.maxLife);

function attackMonster(type) {
  let attackValue;
  const damage = calDamage(player, type)
  dealMonsterDamage(damage);
  currentMonsterHealth -= damage;
  roundEnd();
}
function roundEnd() {
  const damage = calDamage(monster, "normalAttack")
  dealPlayerDamage(damage);
  currentPlayerHealth -= damage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
  }
}
function dealMonsterDamage(damage) {
  monsterHealthBar.value = +monsterHealthBar.value - damage;
}
function dealPlayerDamage(damage) {
  playerHealthBar.value = +playerHealthBar.value - damage;
}
function calDamage(dealer, attackType) {
  let beforeCrit = (Math.random() * (dealer.maxAttack - dealer.minAttack) + dealer.minAttack) * dealer.attack;
  console.log(beforeCrit, dealer.name)
  let afterCrit = calCrit(dealer, beforeCrit)
  let afterTypeMultiplayer;
  if (attackType === "normalAttack") {
    afterTypeMultiplayer = afterCrit;
    console.log(afterTypeMultiplayer, dealer.name)
    return afterTypeMultiplayer;
  }
  else if (attackType === "skillAttack") {
    console.log("lol")
    afterTypeMultiplayer = afterCrit * dealer.skillMultiplayer;
    console.log(afterTypeMultiplayer, dealer.name)
    return afterTypeMultiplayer;
  }
}

function calCrit(dealer, damage) {
  let con = Math.random() <= dealer.critChance;
  console.log(con)
  if (con) {
    return damage * dealer.critDamage;
  } else {
    return damage;
  }
}

function attackHandler() {
  attackMonster('normalAttack');
}

function strongAttackHandler() {
  attackMonster('skillAttack');
}

attackBtn.addEventListener('click', attackHandler);
skillAttackBtn.addEventListener('click', strongAttackHandler);
