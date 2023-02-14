function updateTemp() {
	tmp.bestiaryLimit = bestStageLimitSC(player.bestStage).div(5).root(1.1).plus(1).floor().min(Object.keys(ENEMY_DATA).length).toNumber();
	tmp.bestiaryChosen = Object.values(player.bestiaryChosen).filter(x => x).length;
	updateTrophyEffs();

	tmp.lvl = getLevel(player.xp);
	tmp.nextLvl = getLevelReq(tmp.lvl.plus(1));
	
	tmp.hp = getHP();
	tmp.dmg = getDMG();
	tmp.spd = getSPD();
	
	tmp.stageData = getEnemyData(player.stage);
	tmp.enemiesInStage = tmp.stageData.data.length;
	tmp.enemyData = ENEMY_DATA[tmp.stageData.data[player.enemiesDefeated.toNumber()%tmp.stageData.data.length][0]];
	tmp.enemyTotalHP = adjustEnemyHP(tmp.enemyData.hp.times(tmp.stageData.mag));
	tmp.enemyRealDMG = tmp.enemyData.dmg.times(tmp.stageData.mag);

	tmp.enemyBlock = getEnemyBlock();

	tmp.critChance = getTrophyEff(9);
	tmp.critMult = D(5);

	tmp.xpMult = getXPMult();
	tmp.trophyMult = getTrophyMult();
}

function getEnemyBlock() {
	let block = 1;

	if (tmp.enemyData.special.includes("extremist")) block *= 2 - player.enemyAttacks.div(25).min(1).toNumber();
	if (tmp.enemyData.special.includes("neutrality")) block *= 1 + player.enemyAttacks.div(25).min(1).toNumber();

	return Math.min(block - 1, 1);
}

function bestStageLimitSC(n) {
	if (n.lte(25)) return n;
	return n.pow(0.75).times(Math.sqrt(5))
}

function updateTrophyEffs() {
	tmp.trophyEff = {};
	tmp.sacTrophyEff = {};
	for (let e in ENEMY_DATA) {
		tmp.trophyEff[e] = ENEMY_DATA[e].trophyEff !== undefined
			? ENEMY_DATA[e].trophyEff(player.bestiaryChosen[e] ? (player.bestiary[e]||D(0)) : D(0)) 
			: D(0);
		tmp.sacTrophyEff[e] = ENEMY_DATA[e].sacEff !== undefined
			? ENEMY_DATA[e].sacEff(trophySacUnl(e) && !player.trophySacDisabled[e] ? (player.trophySac[e]||D(0)) : D(0)) 
			: D(0);
	}
}