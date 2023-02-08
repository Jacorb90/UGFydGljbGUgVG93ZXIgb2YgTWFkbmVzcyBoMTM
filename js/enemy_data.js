const ENEMY_DATA = {
	001: {
		id: 001,
		name: "Up Quark",
		hp: D(5),
		xp: D(1),
		dmg: D(1),
		spd: D(.6),
		img: "images/up_quark.png",
		special: [],
        trophyDesc() { return "+"+format(getTrophyEff(001))+" SPD" },
        trophyEff(x) { return x.div(10).plus(1).log10().sqrt() },
	},
	002: {
		id: 002,
		name: "Down Quark",
		hp: D(15),
		xp: D(4),
		dmg: D(3),
		spd: D(.7),
		img: "images/down_quark.png",
		special: [],
        trophyDesc() { return "+"+format(getTrophyEff(002).sub(1).times(100))+"% DMG" },
        trophyEff(x) { return x.div(10).plus(1).cbrt() },
	},
    003: {
        id: 003,
        name: "Charm Quark",
        hp: D(40),
        xp: D(12),
        dmg: D(5),
        spd: D(1),
        img: "images/charm_quark.png",
        special: ["heal"],
        trophyDesc() { return "Heals "+format(getTrophyEff(003))+" HP per kill" },
        trophyEff(x) { return x.plus(1).log2().times(5).times(x.div(1e4).plus(1).cbrt()) },
    },
    004: {
        id: 004,
        name: "Strange Quark",
        hp: D(25),
        xp: D(8),
        dmg: D(4),
        spd: D(2.5),
        img: "images/strange_quark.png",
        special: ["weaken"],
        trophyDesc() { return "Divides Enemy DMG by "+format(getTrophyEff(004)) },
        trophyEff(x) { return x.div(5).plus(1).log10().plus(1).sqrt() },
    },
    005: {
        id: 005,
        name: "Top Quark",
        hp: D(100),
        xp: D(50),
        dmg: D(12),
        spd: D(.8),
        img: "images/top_quark.png",
        special: [],
        trophyDesc() { return "+"+format(getTrophyEff(005).sub(1).times(100))+"% HP" },
        trophyEff(x) { 
            if (x.gte(1e5)) x = x.sqrt().times(Math.sqrt(1e5))
            return x.div(5).plus(1).sqrt() 
        },
    },
    006: {
        id: 006,
        name: "Bottom Quark",
        hp: D(60),
        xp: D(40),
        dmg: D(10),
        spd: D(5),
        img: "images/bottom_quark.png",
        special: [],
        trophyDesc() { return "Divides Enemy SPD by "+format(getTrophyEff(006)) },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1) },
    },
    007: {
        id: 007,
        name: "Electron",
        hp: D(80),
        xp: D(100),
        dmg: D(25),
        spd: D(2),
        img: "images/electron.png",
        special: ["stun"],
        trophyDesc() { return "Heals "+format(getTrophyEff(007))+" HP per second" },
        trophyEff(x) { return x.plus(1).log2().div(2).times(x.div(100).plus(1).root(4)) },
    },
    8: {
        id: 8,
        name: "Muon",
        hp: D(500),
        xp: D(600),
        dmg: D(125),
        spd: D(.4),
        img: "images/muon.png",
        special: [],
        trophyDesc() { return "Divides enemy healing by "+format(getTrophyEff(8)) },
        trophyEff(x) { return x.plus(1).log2().plus(1).log(4).plus(1) },
    },
    9: {
        id: 9,
        name: "Tau",
        hp: D(440),
        xp: D(275),
        dmg: D(60),
        spd: D(3),
        img: "images/tau.png",
        special: ["agile"],
        trophyDesc() { return format(getTrophyEff(9).times(100))+"% Critical Hit Chance (5x DMG)" },
        trophyEff(x) { return Decimal.sub(0.2, Decimal.div(0.2, x.div(5).plus(1).log10().plus(1))) }
    },
    10: {
        id: 10,
        name: "Electron Neutrino",
        hp: D(2990),
        xp: D(3200),
        dmg: D(400),
        spd: D(2),
        img: "images/electron_neutrino.png",
        special: ["stun", "mutator"],
        trophyDesc() { return "+"+format(getTrophyEff(10))+" Base DMG" },
        trophyEff(x) { return x.div(25).plus(1).log10().sqrt() }
    },
    11: {
        id: 11,
        name: "Muon Neutrino",
        hp: D(27500),
        xp: D(24000),
        dmg: D(1000),
        spd: D(1.5),
        img: "images/muon_neutrino.png",
        special: ["shield"],
        trophyDesc() { return "Enemy Stun, Heal, & Agile abilities have a " + format(getTrophyEff(11).times(100)) + "% chance to fail" },
        trophyEff(x) { return Decimal.sub(1, Decimal.div(1, x.div(2).plus(1).log10().plus(1))) }
    },
    12: {
        id: 12,
        name: "Tau Neutrino",
        hp: D(47200),
        xp: D(42000),
        dmg: D(4000),
        spd: D(1.5),
        img: "images/tau_neutrino.png",
        special: ["agile", "counter"],
        trophyDesc() { return "+" + format(getTrophyEff(12).sub(1).times(100)) + "% DMG when below 40% HP" },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1) }
    },
    13: {
        id: 13,
        name: "Gluon",
        hp: D(122000),
        xp: D(150000),
        dmg: D(3000),
        spd: D(2),
        img: "images/gluon.png",
        special: ["heal", "mutator", "counter"],
        trophyDesc() { return "Divide Enemy HP by " + format(getTrophyEff(13)) + ", but double Enemy SPD." },
        trophyEff(x) { return x.times(1.7).plus(1).log10().plus(1) }
    },
    14: {
        id: 14,
        name: "Photon",
        hp: D(22000),
        xp: D(33000),
        dmg: D(2000),
        spd: D(8),
        img: "images/photon.png",
        special: ["weaken", "stun"],
        trophyDesc() { return "+" + format(getTrophyEff(14).sub(1).times(100)) + "% SPD, but divide DMG by " + format(getTrophyEff(14).pow(2/3).times(1.1)) + "." },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1).pow(2) }
    },
    15: {
        id: 15,
        name: "Higgs",
        hp: D(999999),
        xp: D("2e6"),
        dmg: D(500),
        spd: D(1.6),
        img: "images/higgs.png",
        special: ["mutator", "strengthen"],
        trophyDesc() { return "+" + formatSmall(getTrophyEff(15).sub(1).times(100)) + "% XP gain" },
        trophyEff(x) { return x.plus(1).root(2.5) }
    }
}

function toggleTrophy(id) {
    if ((tmp.bestiaryChosen<tmp.bestiaryLimit)||player.bestiaryChosen[id]) player.bestiaryChosen[id] = !player.bestiaryChosen[id]
    tmp.bestiaryChosen = Object.values(player.bestiaryChosen).filter(x => x).length;
}

function getTrophyEff(id) { return tmp.trophyEff[id] };

function getTrophyGenUpgCost(id) {
    return Decimal.pow(Number(id)+6, player.bestiaryGenUpgs[id]||0);
}

function getTrophyGen(id) {
    if (Decimal.lte(player.bestiaryGenUpgs[id]||0, 0)) return D(0);
    return Decimal.pow(2, Decimal.sub(player.bestiaryGenUpgs[id]||0, 1)).max(0);
}

function buyTrophyGenUpg(id) {
    if (player.bestiary[id]===undefined) return;
    let cost = getTrophyGenUpgCost(id);
    if (Decimal.lt(player.bestiary[Number(id)+6]||0, cost)) return;
    player.bestiary[Number(id)+6] = Decimal.sub(player.bestiary[Number(id)+6]||0, cost);
    player.bestiaryGenUpgs[id] = Decimal.add(player.bestiaryGenUpgs[id]||0, 1);
}