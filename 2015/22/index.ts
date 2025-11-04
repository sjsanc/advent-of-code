import Solution from "../solution";

interface Spell {
    name: string
    cost: number
    damage?: number
    heal?: number
    effect?: Effect
}

interface Unit {
    hp: number
    mana: number
    attack: number
    armour: number
    effects: EffectInstance[]
}

interface Effect {
    name: string
    duration: number
    onStart?: (target: Unit) => void
    onTurn?: (target: Unit) => void
    onEnd?: (target: Unit) => void
}

interface EffectInstance {
    effect: Effect
    remainingTurns: number
}

const EFFECTS: Record<string, Effect> = {
    shield: {
        name: "shield",
        duration: 6,
        onStart: (target) => target.armour += 7,
        onEnd: (target) => target.armour -= 7
    },
    poison: {
        name: "poison",
        duration: 6,
        onTurn: (target) => target.hp -= 3
    },
    recharge: {
        name: "recharge",
        duration: 5,
        onTurn: (target) => target.mana += 101
    }
};

const SPELLS: Spell[] = [
    { name: "magic missile", cost: 53, damage: 4 },
    { name: "drain", cost: 73, damage: 2, heal: 2 },
    { name: "shield", cost: 113, effect: EFFECTS.shield },
    { name: "poison", cost: 173, effect: EFFECTS.poison },
    { name: "recharge", cost: 229, effect: EFFECTS.recharge }
];

interface Strategy {
    spells: Spell[]
    totalDamage: number
    totalCost: number
}

const strategies = (): Strategy[] => {
    const perms: Strategy[] = []
    
    // Iterate through each spell.
    // For each Strategy, keep adding spells within the permutation, factoring in Effect times, until a total Damage is met. 
    // [MM] - [MM]

    // Effects don't stack.
    // For each spell, calculate a DPS.
    // Calculate a total Damage. Only strategies that deal sufficient damage to kill the boss will count. 
    // Calculate a total Cost for each Strategy. Apply the Strategy, and return the lowest cost that wins. 

    return perms
}

class Day22 extends Solution {
    constructor() {
        super(__dirname);
    }

    partOne() {
        const lines = this.lines.map(l => l.split(":")[1].trim())

        const player = {
            hp: 50,
            mana: 500,
            armour: 0,
            attack: 0,
            effects: [],
        }

        const boss = {
            hp: Number(lines[0]),
            mana: 0,
            armour: 0,
            attack: Number(lines[1]),
            effects: [],
        }

        let turn = 0;
        while (player.hp > 0 && boss.hp > 0) {
            if (turn == 0) {

            } else {

            }
        }

        return ""
    }

    partTwo() {
        return ""
    }
}