const ABILITY_DATA = {
    "heal": {
        name: "Heal",
        desc: "Heals enemy by DMG dealt whenever this enemy attacks."
    },
    "weaken": {
        name: "Weaken",
        desc: "Weakens the player's DMG based on player HP (lower HP -> weakened more)."
    },
    "stun": {
        name: "Stun",
        desc: "Has a chance to slightly delay player attacks (effectively halving player SPD on average)."
    },
    "agile": {
        name: "Agile",
        desc: "Improves enemy SPD based on enemy HP (lower HP -> higher SPD, up to 3x)."
    },
    "mutator": {
        name: "Mutator",
        desc: "Enemy is immune to DMG/SPD reductions."
    },
    "shield": {
        name: "Shield",
        desc: "Player attacks that deal less than 10% of the enemy's total HP do nothing (unless they are critical hits)."
    },
    "counter": {
        name: "Counter",
        desc: "Enemy has a 40% chance to counterattack the player when attacked."
    }
}