function trophySacUnl(id) {
    return player.bestStage.gte(50 + Math.pow(Number(id), 2));
}

function trophySacReq(id) {
    return ENEMY_DATA[id].sacReq ?? D(5e5);
}

function trophySacRatio() {
    return D(0.5);
}

function canTrophySac(id) {
    return trophySacUnl() && player.bestiary[id] !== undefined && player.bestiary[id].gte(trophySacReq(id));
}

function trophySac(id) {
    if (!canTrophySac(id)) return;

    player.trophySac[id] = tmp.trophySacRatio.times(player.bestiary[id].div(2)).plus(player.trophySac[id] ?? 0);
    player.bestiary[id] = player.bestiary[id].div(2);

    updateTrophyEffs();
    resetStage();
}