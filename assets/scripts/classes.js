let warrior = {
    name: "player",
    maxLife: 1200,
    maxMana: 80,
    attack: 10,
    attackBouns: 0,
    critChance: 0.2,
    critDamage: 1.5,
    maxAttack: 1.2,
    minAttack: 0.8,
    chargeMultiplayer: 1.5,
    skillMana: 50,
    skillName: "HEAL",
    skill: function () {
        const heal = this.attack * 25;
        if (+currentPlayerHealth + heal <= this.maxLife && currentPlayerMana >= this.skillMana) {
            playerHealthBar.value = +playerHealthBar.value + heal;
            currentPlayerHealth += heal;
            currentPlayerMana -= this.skillMana;
            manaUpdate()
        } else alert("You can't heal now!");
    }

}
let mage = {
    name: "player",
    maxLife: 800,
    maxMana: 150,
    attack: 12,
    attackBouns: 0,
    critChance: 0.2,
    critDamage: 1.5,
    maxAttack: 1.4,
    minAttack: 0.8,
    chargeMultiplayer: 1.8,
    skillMana: 90,
    skillName: "NUKE",
    skill: function () {
        if (currentPlayerMana >= this.skillMana) {
            let afterCrit = calCrit(this, ((Math.random() * (this.maxAttack - this.minAttack) + this.minAttack) * this.attack))
            let afterTypeMultiplayer = afterCrit * 2.3;
            dealMonsterDamage(afterTypeMultiplayer);
            currentMonsterHealth -= afterTypeMultiplayer;
            currentPlayerMana -= this.skillMana;
            roundEnd();
        } else {
            alert(noManaError)
        }
    }
}
let assassin = {
    name: "player",
    maxLife: 1000,
    maxMana: 60,
    attack: 10,
    attackBouns: 0,
    critChance: 0.4,
    critDamage: 1.5,
    maxAttack: 1.2,
    minAttack: 0.8,
    chargeMultiplayer: 1.5,
    skillMana: 40,
    skillName: "BUFF",
    skill: function () {
        if (currentPlayerMana >= this.skillMana) {
            let buff = {
                attack: 3,
                startRound: currentRound,
                endRound: currentRound + 1,
                ended: false,
            }
            buffArr.push(buff)
            buffCheck()
            currentPlayerMana -= this.skillMana;
            manaUpdate()
        } else {
            alert(noManaError)
        }
    }

}
let monster = {
    name: "monster",
    maxLife: 1000,
    attack: 12,
    attackBouns: 0,
    critChance: 0.2,
    critDamage: 1.5,
    maxAttack: 1.4,
    minAttack: 0.8,
    skillMultiplayer: 1.5,
}