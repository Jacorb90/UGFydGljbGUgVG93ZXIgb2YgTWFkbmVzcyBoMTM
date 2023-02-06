function getStartPlayer() {
	let p = {
		currTime: new Date().getTime(),
		timePlayed: 0,
		autosave: true,
		xp: D(0),
		damageTaken: D(0),
		stage: D(1),
		bestStage: D(1),
		damageDealt: D(0),
		enemiesDefeated: D(0),
		attackCooldown: D(0),
		enemyAttackCooldown: D(0),
		bestiary: {},
		bestiaryChosen: {},
		bestiaryGenUpgs: {},
	};
	return p;
}

function fixPlayer() {
	let start = getStartPlayer();
	fixPlayerObj(player, start);

	for (let key in player.bestiary) player.bestiary[key] = D(player.bestiary[key]);
	for (let key in player.bestiaryGenUpgs) player.bestiaryGenUpgs[key] = D(player.bestiaryGenUpgs[key]);
}

function fixPlayerObj(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) fixPlayerObj(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = D(obj[x])
	}
}