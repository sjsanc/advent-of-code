import Solution from "../solution";

const weapons = [
    {cost: 8, atk: 4},
    {cost: 10, atk: 5},
    {cost: 25, atk: 6},
    {cost: 40, atk: 7},
    {cost: 74, atk: 8}
]

const armour = [
    {cost: 13, def: 1},
    {cost: 31, def: 2},
    {cost: 53, def: 3},
    {cost: 75, def: 4},
    {cost: 102, def: 5}
]

const rings = [
    {cost: 25, atk: 1},
    {cost: 50, atk: 2},
    {cost: 100, atk: 3},
    {cost: 20, def: 1},
    {cost: 40, def: 2},
    {cost: 80, def: 3}
] 

class Day21 extends Solution {
    constructor() {
        super(__dirname);
    }

    combinations() {
        let perms = []

        const ringCombinations: any = [];
        for (let i = 0; i < rings.length; i++) {
            ringCombinations.push([rings[i]])
            for (let j = i + 1; j < rings.length; j++) {
                ringCombinations.push([rings[i], rings[j]])
            }
        }

        for (const wep of weapons) {
            // no armour, no rings
            perms.push([wep]) 

            // no armour, rings
            for (const c of ringCombinations) {
                perms.push([wep, ...c])
            }

            // armour
            for (const arm of armour) {
                perms.push([wep, arm])
                for (const c of ringCombinations) {
                    perms.push([wep, arm, ...c])
                }   
            }
        }
        
        perms = perms.map(p => 
            p.reduce((acc, x) => 
                ({ cost: acc.cost + x.cost, 
                    atk: acc.atk + x.atk, 
                    def: acc.def + x.def }), 
                { cost: 0, atk: 0, def: 0 }
            )).sort((a: any,b: any) => a.cost - b.cost);

        return perms;
    }

    partOne() {
        const loadouts = this.combinations()

        const lines = this.lines.map(l => l.split(":")[1].trim())

        let lowestCost = 0;

        for (const lo of loadouts) {
            let hp = 100;

            const boss = {
                hp: Number(lines[0]),
                atk: Number(lines[1]),
                def: Number(lines[2])
            }

            let turn = 0;
            while (hp > 0 && boss.hp > 0) {
                if (turn == 0) {
                    boss.hp -= Math.abs(lo.atk - boss.def)
                    turn = 1
                } else {
                    hp -= Math.abs(boss.atk - lo.def)
                    turn = 0
                }
            }

            if (hp > boss.hp) {
                if (lo.cost < lowestCost || lowestCost == 0) {
                    lowestCost = lo.cost
                } 
            }
        }

        return lowestCost
    }

    partTwo() {
        const loadouts = this.combinations()

        const lines = this.lines.map(l => l.split(":")[1].trim())

        let losingCost = 0;

        for (const lo of loadouts) {
            let hp = 100;

            const boss = {
                hp: Number(lines[0]),
                atk: Number(lines[1]),
                def: Number(lines[2])
            }

            let turn = 0;
            while (hp > 0 && boss.hp > 0) {
                if (turn == 0) {
                    boss.hp -= Math.abs(lo.atk - boss.def)
                    turn = 1
                } else {
                    hp -= Math.abs(boss.atk - lo.def)
                    turn = 0
                }
            }

           if (hp < boss.hp) {
                if (lo.cost > losingCost || losingCost == 0) {
                    losingCost = lo.cost
                }
            }
        }

        return losingCost
    }
}

export default new Day21();
