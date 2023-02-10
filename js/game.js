var player;
var tmp = {};
var intervals = {};
var version = 1.0;
var gameID = "particleTower";
var tab = "Main";
var allTabs = ["Options", "Main", "Trophies"];
var tabUnlocks = {
	Options() { return true },
	Main() { return true },
	Trophies() { return Object.keys(player.bestiary).length>=1 },
}

function loadGame() {
	let get = localStorage.getItem(gameID)
	if (get) player = JSON.parse(atob(get));
	else player = getStartPlayer();
	
	fixPlayer();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	loadVue();
	
	intervals.game = setInterval(function() { gameLoop(0.05 /* NaNCheck(Math.max((new Date().getTime() - player.currTime)/1000, 0)) */) }, 50)
	intervals.save = setInterval(function() { if (player.autosave) save(); }, 2500)
}

function save() {
	localStorage.setItem(gameID, btoa(JSON.stringify(player)));
}

function importSave() {
	let data = prompt("Paste save data: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(atob(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("Import failed!");
		console.error(e);
		return;
	}
}

function exportSave() {
	let str = btoa(JSON.stringify(player))
	
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
    el.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.body.removeChild(el);
}

function toggleAutosave() {
	player.autosave = !player.autosave;
}

function hardReset() {
	if (!confirm("Are you sure you want to reset everything???")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}

function playerAtk(bulk) {
	const isCrit = Decimal.lt(Math.random(), tmp.critChance.root(bulk));
	let eDmg = tmp.dmg.times(bulk).times(isCrit ? tmp.critMult.max(1).sub(1).div(bulk).plus(1) : 1);
	if (tmp.enemyData.special.includes("shield") && eDmg.lt(tmp.enemyTotalHP.div(10)) && !isCrit) eDmg = D(0);
	
	player.damageDealt = player.damageDealt.plus(eDmg);
	player.attackCooldown = D(0);

	if (tmp.enemyData.special.includes("counter") && Math.random() < 1 - Math.pow(0.6, bulk.toNumber())) enemyAtk(bulk.sub(1).div(5).floor().times(5).plus(1));
}

function enemyAtk(bulk) {
	player.damageTaken = player.damageTaken.plus(adjustEnemyDMG(tmp.enemyRealDMG).times(bulk));
	player.enemyAttackCooldown = D(0);
	attemptEnemyHeal(bulk);
}

function attemptEnemyHeal(bulk) {
	if (tmp.enemyData.special.includes("heal") && (Math.random() < (1 - getTrophyEff(11).toNumber()))) {
		player.damageDealt = player.damageDealt.sub(adjustEnemyDMG(tmp.enemyRealDMG).times(bulk).div(getTrophyEff(8))).max(0)
	}
}

function gameLoop(diff) {
	player.currTime = new Date().getTime();
	
	updateTemp();
	if (player.enemyAttackCooldown.gte(Decimal.div(1, adjustEnemySPD(tmp.enemyData.spd)))) {
		let bulk = player.enemyAttackCooldown.times(adjustEnemySPD(tmp.enemyData.spd)).floor();
		enemyAtk(bulk)
	}
	let cooldownD = D(diff);
	if (tmp.enemyData.special.includes("agile") && (Math.random() < (1 - getTrophyEff(11).toNumber()))) cooldownD = cooldownD.times(player.damageDealt.div(tmp.enemyTotalHP).times(2).plus(1));
	player.enemyAttackCooldown = player.enemyAttackCooldown.plus(cooldownD);
	
	if (player.damageTaken.gte(tmp.hp)) {
		player.attackCooldown = D(0);
		player.damageDealt = D(0);
		player.damageTaken = D(0);
		player.enemyAttackCooldown = D(0);
		player.enemiesDefeated = D(0);
	} else {
		player.damageTaken = player.damageTaken.sub(getTrophyEff(007).times(diff)).max(0);
	
		if (player.attackCooldown.gte(Decimal.div(1, tmp.spd))) {
			let bulk = player.attackCooldown.times(tmp.spd).floor();
			playerAtk(bulk)
		} 
		if (!(tmp.enemyData.special.includes("stun") && Math.random()<(.5 * (1 - getTrophyEff(11).toNumber())))) player.attackCooldown = player.attackCooldown.plus(diff);
		
		if (player.damageDealt.gte(tmp.enemyTotalHP)) {
			player.xp = player.xp.plus(tmp.enemyData.xp.times(tmp.stageData.mag).times(tmp.xpMult));
			player.damageDealt = D(0);
			player.enemyAttackCooldown = D(0);
			player.enemiesDefeated = player.enemiesDefeated.plus(1);
			player.damageTaken = player.damageTaken.sub(getTrophyEff(003)).max(0);
			if (tmp.enemyData.trophyEff !== undefined) player.bestiary[tmp.enemyData.id] = Decimal.add(player.bestiary[tmp.enemyData.id]||0, tmp.trophyMult.times(tmp.stageData.mag));
			if (player.enemiesDefeated.gte(tmp.enemiesInStage) && player.stage.eq(player.bestStage)) {
				player.bestStage = player.bestStage.plus(1);
			}
		}
	}

	for (let key in player.bestiaryGenUpgs) if (player.bestiary[key]) player.bestiary[key] = player.bestiary[key].plus(getTrophyGen(key).times(diff));
	
	player.timePlayed += diff;
}