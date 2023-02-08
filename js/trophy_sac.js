function trophySacUnl(id) {
    return player.bestStage.gte(50 + Math.pow(Number(id), 2));
}

function trophySacReq() {
    return D(5e5);
}

function trophySacRatio() {
    return D(0.5);
}

function canTrophySac(id) {
    return trophySacUnl() && player.bestiary[id] !== undefined && player.bestiary[id].gte(trophySacReq());
}

function trophySac(id) {
    if (!canTrophySac(id)) return;

    player.trophySac[id] = trophySacRatio().times(player.bestiary[id].div(2)).plus(player.trophySac[id] ?? 0);
    player.bestiary[id] = player.bestiary[id].div(2);
}