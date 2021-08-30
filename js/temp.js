function updateTemp() {
	tmp.bestiaryLimit = player.bestStage.div(5).root(1.1).plus(1).floor().min(Object.keys(ENEMY_DATA).length).toNumber();
	tmp.bestiaryChosen = Object.values(player.bestiaryChosen).filter(x => x).length;
	tmp.trophyEff = {};
	for (let e in ENEMY_DATA) tmp.trophyEff[e] = ENEMY_DATA[e].trophyEff(player.bestiary[e]||D(0));

	tmp.lvl = getLevel(player.xp);
	tmp.nextLvl = getLevelReq(tmp.lvl.plus(1));
	
	tmp.hp = getHP();
	tmp.dmg = getDMG();
	tmp.spd = getSPD();
	
	tmp.stageData = getEnemyData(player.stage);
	tmp.enemiesInStage = tmp.stageData.data.length;
	tmp.enemyData = ENEMY_DATA[tmp.stageData.data[player.enemiesDefeated.toNumber()%tmp.stageData.data.length]];
	tmp.enemyTotalHP = tmp.enemyData.hp.times(tmp.stageData.mag);
}