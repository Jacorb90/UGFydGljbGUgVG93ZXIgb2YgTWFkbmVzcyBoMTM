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
        trophyDesc(b) { return "+"+format(getTrophyEff(001, b))+" SPD" },
        trophyEff(x) { return x.div(10).plus(1).log10().sqrt() },
        sacEff(x) { return x.div(1e6).cbrt().div(2) },
        sacReq: D(5e5),
        stackType: "add"
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
        trophyDesc(b) { return "+"+format(getTrophyEff(002, b).sub(1).times(100))+"% DMG" },
        trophyEff(x) { return x.div(10).plus(1).cbrt() },
        sacEff(x) { return x.div(1e6).plus(1).log(100).plus(1) },
        sacReq: D(1e6),
        stackType: "mult"
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
        trophyDesc(b) { return "Heals "+format(getTrophyEff(003, b))+" HP per kill" },
        trophyEff(x) { return x.plus(1).log2().times(5).times(x.div(1e4).plus(1).cbrt()) },
        sacEff(x) { return x.plus(1).log2().times(5).times(x.div(1e4).plus(1).cbrt()).times(1e4).sqrt() },
        sacReq: D(2e6),
        stackType: "add"
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
        trophyDesc(b) { return "Divides Enemy DMG by "+format(getTrophyEff(004, b)) },
        trophyEff(x) { return x.div(5).plus(1).log10().plus(1).sqrt() },
        sacEff(x) { return x.div(1e6).plus(1).log(3).plus(1).pow(2.75) },
        sacReq: D(4e6),
        stackType: "mult"
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
        trophyDesc(b) { return "+"+format(getTrophyEff(005, b).sub(1).times(100))+"% HP" },
        trophyEff(x) { 
            if (x.gte(1e5)) x = x.sqrt().times(Math.sqrt(1e5))
            return x.div(5).plus(1).sqrt() 
        },
        sacEff(x) { return x.div(1e11).plus(1).root(5) },
        sacReq: D(8e6),
        stackType: "mult"
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
        trophyDesc(b) { return "Divides Enemy SPD by "+format(getTrophyEff(006, b)) },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1) },
        sacEff(x) { return x.div(1e7).plus(1).log10().plus(1).sqrt() },
        sacReq: D(1.6e7),
        stackType: "mult"
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
        trophyDesc(b) { return "Heals "+format(getTrophyEff(007, b))+" HP per second" },
        trophyEff(x) { return x.plus(1).log2().div(2).times(x.div(10).plus(1).cbrt()) },
        sacEff(x) { return x.div(1e7).plus(1).log2().div(3).times(x.div(1e9).plus(1).root(4)) },
        sacReq: D(3.2e7),
        stackType: "add"
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
        trophyDesc(b) { return "Divides enemy healing by "+format(getTrophyEff(8, b)) },
        trophyEff(x) { return x.plus(1).log2().plus(1).log(4).plus(1) },
        sacEff(x) { return x.div(1e5).plus(1).log2().plus(1).log10().plus(1).sqrt() },
        sacReq: D(6.4e7),
        stackType: "mult"
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
        trophyDesc(b) { return format(getTrophyEff(9, b).times(100))+"% Critical Hit Chance (5x DMG)" },
        trophyEff(x) { return Decimal.sub(0.2, Decimal.div(0.2, x.div(5).plus(1).log10().plus(1))) },
        sacEff(x) { return Decimal.sub(0.2, Decimal.div(0.2, x.div(1e8).plus(1).log10().plus(1))) },
        sacReq: D(1.28e8),
        stackType: "add"
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
        trophyDesc(b) { return "+"+format(getTrophyEff(10, b))+" Base DMG" },
        trophyEff(x) { return x.div(25).plus(1).log10().sqrt() },
        sacEff(x) { return x.div(2.5e7).plus(1).log10().cbrt() },
        sacReq: D(2.56e8),
        stackType: "add"
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
        trophyDesc(b) { return "Enemy Stun, Heal, & Agile abilities have a " + format(getTrophyEff(11, b).times(100)) + "% chance to fail" },
        trophyEff(x) { return Decimal.sub(1, Decimal.div(1, x.div(2).plus(1).log10().plus(1))) },
        sacEff(x) { return Decimal.sub(1, Decimal.div(1, x.div(5e8).plus(1).log10().plus(1).sqrt())) },
        sacReq: D(5.12e8),
        stackType: "multAfter1"
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
        trophyDesc(b) { return "+" + format(getTrophyEff(12, b).sub(1).times(100)) + "% DMG when below 40% HP" },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1) },
        sacEff(x) { return x.div(1e9).plus(1).log10().plus(1).sqrt() },
        sacReq: D(1e9),
        stackType: "mult"
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
        trophyDesc(b) { return "Divide Enemy HP by " + format(getTrophyEff(13, b)) + ", but double Enemy SPD." },
        trophyEff(x) { return x.times(1.7).plus(1).log10().plus(1) },
        sacEff(x) { return x.times(2e9).plus(1).log10().plus(1).sqrt() },
        sacReq: D(2e9),
        stackType: "mult"
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
        trophyDesc(b) { return "+" + format(getTrophyEff(14, b).sub(1).times(100)) + "% SPD, but divide DMG by " + format(getTrophyEff(14, b).pow(2/3)) + "." },
        trophyEff(x) { return x.div(10).plus(1).log10().plus(1).pow(2) },
        sacEff(x) { return x.div(4e9).plus(1).log10().plus(1) },
        sacReq: D(4e9),
        stackType: "mult"
    },
    15: {
        id: 15,
        name: "Higgs",
        hp: D(999999),
        xp: D("2e6"),
        dmg: D(500),
        spd: D(1.5),
        img: "images/higgs.png",
        special: ["mutator", "strengthen"],
        trophyDesc(b) { return "+" + formatSmall(getTrophyEff(15, b).sub(1).times(100)) + "% XP & Trophy gain" },
        trophyEff(x) { return x.plus(1).log(4).plus(1) },
        sacEff(x) { return x.div(8e9).plus(1).log(7).plus(1).sqrt() },
        sacReq: D(8e9),
        stackType: "mult"
    },
    16: {
        id: 16,
        name: "W Boson",
        hp: D("1e14"),
        xp: D("3e14"),
        dmg: D("1.4e9"),
        spd: D(20),
        img: "images/w_boson.png",
        special: ["weaken", "extremist"],
        trophyDesc(b) { return "÷" + format(getTrophyEff(16, b)) + " Enemy DMG, but increase Enemy DMG by 10% whenever the enemy attacks." },
        trophyEff(x) { return x.div(2).plus(1).cbrt() },
        sacEff(x) { return x.div("2e10").plus(1).root(4) },
        sacReq: D("1.6e10"),
        stackType: "mult"
    },
    17: {
        id: 17,
        name: "Z Boson",
        hp: D("4e14"),
        xp: D("1e15"),
        dmg: D("1.2e9"),
        spd: D(20),
        img: "images/z_boson.png",
        special: ["neutrality"],
        trophyDesc(b) { return "+" + format(getTrophyEff(17, b).sub(1).times(100)) + "% HP per Level (total: " + format(getTrophyEff(17, b).sub(1).times(tmp.lvl).plus(1).max(1)) + "x), but halve DMG." },
        trophyEff(x) { return x.times(1.4).plus(1).root(100) },
        sacEff(x) { return x.div("5e10").plus(1).root(1e3) },
        sacReq: D("3.2e10"),
        stackType: "mult"
    },

    // [PLACEHOLDER ENEMY; for testing mutations]
    18: {
        id: 18,
        name: "Up Quark α",
        hp: D("1e17"),
        xp: D("2e17"),
        dmg: D("1e9"),
        spd: D(40),
        img: "images/up_quark.png",
        special: ["agile", "strengthen"],
        mutates: 001, // id of mutated
        filter: "hue-rotate(90deg)", // filters enemy img & name text, only for mutations
        nameColor: "#CD9DFF", // sets name text initial color (before filters), only for mutations
        trophyMult: D("2e16") // multiplier to trophy gain, only for mutations
    }
}

function toggleTrophy(id) {
    if ((tmp.bestiaryChosen<tmp.bestiaryLimit)||player.bestiaryChosen[id]) player.bestiaryChosen[id] = !player.bestiaryChosen[id]
    tmp.bestiaryChosen = Object.values(player.bestiaryChosen).filter(x => x).length;
    updateTrophyEffs();
    resetStage();
}

function fuseEffects(e1, e2, type) {
    if (type == "add") return e1.plus(e2);
    if (type == "mult") return e1.times(e2);
    if (type == "multAfter1") return e1.plus(1).times(e2.plus(1)).sub(1);
    return e1;
}

function getTrophyEff(id, b = 2) { 
    if (b == 0) return ENEMY_DATA[id]?.trophyEff?.(player.bestiary[id]||D(0));
    if (b == 1) return ENEMY_DATA[id]?.sacEff?.(player.trophySac[id]||D(0));

    return fuseEffects(tmp.trophyEff[id], tmp.sacTrophyEff[id], ENEMY_DATA[id].stackType)
};

function getTrophyGenUpgCost(id) {
    return Decimal.pow(Number(id)+6, player.bestiaryGenUpgs[id]||0);
}

function getTrophyGen(id) {
    if (Decimal.lte(player.bestiaryGenUpgs[id]||0, 0)) return D(0);
    return Decimal.pow(Number(id)+6, Decimal.sub(player.bestiaryGenUpgs[id]||0, 1)).div(2.5).max(player.bestiaryGenUpgs[id]||0).max(0);
}

function buyTrophyGenUpg(id) {
    if (player.bestiary[id]===undefined) return;
    let cost = getTrophyGenUpgCost(id);
    if (Decimal.lt(player.bestiary[Number(id)+6]||0, cost)) return;
    player.bestiary[Number(id)+6] = Decimal.sub(player.bestiary[Number(id)+6]||0, cost);
    player.bestiaryGenUpgs[id] = Decimal.add(player.bestiaryGenUpgs[id]||0, 1);
}