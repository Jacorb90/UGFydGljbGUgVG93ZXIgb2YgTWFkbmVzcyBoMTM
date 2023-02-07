function getLevelReqData() {
	return {base: D(5), exp: D(1.02)}
}

function getLevel(xp) {
	let data = getLevelReqData();
	return xp.max(1).log(data.base).root(data.exp).plus(1).floor();
}

function getLevelReq(lvl) {
	let data = getLevelReqData();
	return Decimal.pow(data.base, lvl.sub(1).pow(data.exp)).ceil();
}

function prevStage() {
	player.stage = player.stage.sub(1).max(1);
	player.enemiesDefeated = D(0);
	player.damageDealt = D(0);
	player.attackCooldown = D(0);
	player.damageTaken = D(0);
	player.enemyAttackCooldown = D(0);
}

function nextStage() {
	player.stage = player.stage.plus(1).min(player.bestStage);
	player.enemiesDefeated = D(0);
	player.damageDealt = D(0);
	player.attackCooldown = D(0);
	player.damageTaken = D(0);
	player.enemyAttackCooldown = D(0);
}

function getEnemyData(stage) {
	let totalStages = Object.keys(STAGE_DATA).length;
	let activeStage = stage.sub(stage.sub(1).div(totalStages).floor().times(totalStages)).toNumber();

	let data = STAGE_DATA[activeStage];
	let rank = D(stage.gt(totalStages) ? 15 : 0).plus(Object.keys(STAGE_RANK_DATA).includes(activeStage.toString()) ? STAGE_RANK_DATA[activeStage][player.enemiesDefeated.toNumber()%data.length] : 1);

	let mag = Decimal.pow(2.5, rank.sub(1));
	return {data: data, rank, mag};
}

function getHP() { 
	let hp = Decimal.pow(1.5, tmp.lvl.sub(1).root(1.5)).plus(tmp.lvl.sub(2).max(0)).times(10).floor();
	if (player.bestiaryChosen[005]) hp = hp.times(getTrophyEff(005));
	return hp;
}

function getDMG() { 
	let dmg = tmp.lvl.sub(2).max(0).plus(1);
	if (player.bestiaryChosen[10]) dmg = dmg.plus(getTrophyEff(10));

	dmg = Decimal.pow(2, tmp.lvl.sub(1).sqrt()).times(dmg);

	if (player.bestiaryChosen[002]) dmg = dmg.times(getTrophyEff(002));
	if (player.bestiaryChosen[12] && player.damageTaken.gte(tmp.hp.times(0.6))) dmg = dmg.times(getTrophyEff(12));

	if (tmp.enemyData) if (tmp.enemyData.special.includes("weaken")) dmg = dmg.div(player.damageTaken.plus(1).log10().plus(1));
	return dmg;
}

function getSPD() { 
	let spd = tmp.lvl.plus(1).div(2);
	if (player.bestiaryChosen[001]) spd = spd.plus(getTrophyEff(001));
	return spd;
}

function adjustEnemyDMG(dmg) {
	if (tmp.enemyData.special.includes("mutator")) return dmg;

	if (player.bestiaryChosen[004]) dmg = dmg.div(getTrophyEff(004));
	return dmg;
}

function adjustEnemySPD(spd) {
	if (tmp.enemyData.special.includes("mutator")) return spd;

	if (player.bestiaryChosen[006]) spd = spd.div(getTrophyEff(006));
	return spd;
}