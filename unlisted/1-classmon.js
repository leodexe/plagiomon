const moncontainer = document.getElementById("mon-container");
let plagiodex = [];

class Plagiomon {
    constructor(name, id, ability, level, type1, type2, basehp, pyatk, pydef, spatk, spdef, speed, x = 10, y = 10, netid = null) {
        this.name = name;
        this.id = id;
        this.netid = netid;
        this._idname = "_" + id + name;
        this.ability = ability;
        this.img = new Image();
        this.img.src = "./mons/" + this.name + "something.png";
        this.level = level;
        this.type1 = type1;
        this.type2 = type2;
        this.basehp = basehp;
        this.pyatk = pyatk;
        this.pydef = pydef;
        this.spatk = spatk;
        this.spdef = spdef;
        this.speed = speed;
        this.maxhp = basehp * level + ((-level/10) + 10) * 50;
        this.maxpyatk = pyatk * level + (((-level/10) + 10)/2);
        this.maxpydef = pydef * level + (((-level/10) + 10)/2);
        this.maxspatk = spatk * level + (((-level/10) + 10)/2);
        this.maxspdef = spdef * level + (((-level/10) + 10)/2);
        this.maxspeed = speed * level + (((-level/10) + 10)/2);
        this.moveset = [];
        this.struggle = {
            moveid: "moveStruggle",
            name: "Struggle",
            category: "Physical",
            contact: true,
            critrate: "standard",
            power: 50,
            accuracy: "-",
            type: "Normal",
            stab: false,
            priority: 0,
            setpp: 1,
            minpp: 1,
            maxpp: 1,
            effect: "RecoilStruggle",
            recoil: Math.round(this.maxhp/4),
            target: "single",
            description: "You are not supposed to be reading this."
        };
        this.x = x;
        this.moved = false;
        this.previousX = 0;
        this.previousY = 0;
        this.y = y;
        this.width = 80;
        this.height = 60;
        this.xA = 0;
        this.yA = 0;
        this.defeated = false;
    }
}

//plagiodex[0] = new Plagiomon("Omnimon", 0, 255, "", "", 7.14, 6.69, 6.69, 6.69, 6.69, 6.69);
//plagiodex[7] = new Plagiomon("Escuero", 7, 60, "Water", "", 2.92, 2.14, 2.51, 2.18, 2.49, 2.03);
//plagiodex[150] = new Plagiomon("MiauDos", 150, 70, "Psychic", "", 4.16, 3.5, 3.06, 4.47, 3.06, 3.94);
//plagiodex[448] = new Plagiomon("Perrito", 448, 70, "Fighting", "Steel", 3.44, 3.5, 2.62, 3.61, 2.62, 3.06);
// plagiodex[658] = new Plagiomon("Pochoclo", "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77);

//#003 Maceta
//let maceta = plagiodex.push(new Plagiomon("Maceta", 2, 55, "Grass", "Poison", 3.24, 2.45, 2.47, 2.84, 2.84, 2.4));
let Maceta = plagiodex[3] = new Plagiomon("Maceta", 3, "Overgrow", 50, "Grass", "Poison", 3.64, 2.89, 2.91, 3.28, 3.28, 2.84);
Maceta.moveset = [
    {
        moveid: 0,
        name: "Giga Drain",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 100,
        type: "Grass",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "drain",
        recoil: 0,
        target: "single",
        description: "Half of the HP drained from the target is added to the user's HP.",
    },
    {
        moveid: 1,
        name: "Sludge Bomb",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Poison",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "poison",
        recoil: 0,
        target: "single",
        description: "Has a 30% chance of poisoning the target.",
    },
    {
        moveid: 2,
        name: "Leech Seed",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 90,
        type: "Grass",
        stab: false,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "sap",
        recoil: 0,
        target: "single",
        description: "Plants a seed on the target Pokémon. Drains ⅛ of the target's HP for the attacker every turn.",
    },
    {
        moveid: 3,
        name: "Protect",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Normal",
        stab: false,
        priority: 4,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "protect",
        recoil: 0,
        target: "self",
        description: "Protects the user from all attacks. Its chance of failing rises if it is used in succession.",
    },
];
console.log(Maceta.moveset);

//#006 Kakuchin
//let kakuchin = plagiodex.push(new Plagiomon("Kakuchin", 6, 50, "Fire", "Flying", 3.6, 2.93, 2.8, 3.48, 2.95, 3.28));
let Kakuchin = plagiodex[6] = new Plagiomon("Kakuchin", 6, "Blaze", 50, "Fire", "Flying", 3.6, 2.93, 2.8, 3.48, 2.95, 3.28);
Kakuchin.moveset = [
    {
        moveid: 0,
        name: "Fire Blast",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 120,
        accuracy: 80,
        type: "Fire",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "burn",
        recoil: 0,
        target: "single",
        description: "A powerful fiery blast that has a 10% chance of burning the target.",
    },
    {
        moveid: 1,
        name: "Air Slash",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 95,
        type: "Flying",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "flinch",
        target: "single",
        description: "Has a 30% chance of causing the target to flinch.",
    },
    {
        moveid: 2,
        name: "Earthquake",
        category: "Physical",
        contact: false,
        critrate: "standard",
        power: 100,
        accuracy: 100,
        type: "Ground",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "hitDig",
        recoil: 0,
        target: "all",
        description: "Can hit a Pokémon during the semi-invulnerable turn of Dig, and if it does, it doubles the damage."
    },
    //Tentaive Focus Blast replacement
    //Tentative Hurricane replacement
    {
        moveid: 3,
        name: "Thunder Punch",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 75,
        accuracy: 100,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "paralyze",
        recoil: 0,
        target: "single",
        description: "The user attacks with an electric punch. Has a 10% chance of paralyzing the target.",
    },
    //Tentative Earthquake replacement
    //Tentative Scorching Sands replacement
];
console.log(Kakuchin.moveset);

//#009 Pochoclo
let Pochoclo = plagiodex[9] = new Plagiomon("Pochoclo", 9, "Torrent", 50, "Water", "", 3.62, 2.91, 3.28, 2.95, 3.39, 2.80);
Pochoclo.moveset = [
    {
        moveid: 0,
        name: "Hydro Pump",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 120,
        accuracy: 85,
        type: "Water",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "none",
        recoil: 0,
        target: "single",
        description: "A huge volume of water is blasted at the foe under great pressure.",
    },
    {
        moveid: 1,
        name: "Aqua Jet",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 40,
        accuracy: 100,
        type: "Water",
        stab: true,
        priority: 1,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "quickattack",
        recoil: 0,
        target: "single",
        description: "A fast Water-type attack that it is guaranteed to strike first. It has a priority of +1",
    },
    {
        moveid: 2,
        name: "Ice Beam",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Ice",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "freeze",
        recoil: 0,
        target: "single",
        description: "Has a 10% chance of freezing the target.",
    },
    {
        moveid: 3,
        name: "Mirror Coat",
        category: "Special",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 100,
        type: "Psychic",
        stab: false,
        priority: -5,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "returnDamage2x",
        recoil: 0,
        target: "single",
        description: "A retaliation move that counters any special attack, inflicting double the damage taken.",
    },
];
console.log(Pochoclo.moveset);

let Shikapu = plagiodex[25] = new Plagiomon("Shikapu", 25, "Static", 50, "Electric", "", 2.74, 2.29, 1.96, 2.18, 2.18, 3.06);
Shikapu.moveset = [
    {
        moveid: 0,
        name: "Volt Tackle",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 120,
        accuracy: 100,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "paralyze",
        recoil: 1/3,
        target: "single",
        description: "The user receives recoil damage equal to ⅓ of the damage done to the target. Also has a 10% chance of paralyzing the target.",
    },
    {
        moveid: 1,
        name: "Swagger",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 85,
        type: "Normal",
        stab: false,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "confuse100%",
        recoil: 0,
        target: "single",
        description: "The user enrages the foe into confusion. Also, it sharply raises the foe's Attack stat.",
        // moveid: 1,
        // name: "Fake Out",
        // category: "Physical",
        // contact: true,
        // critrate: "standard",
        // power: 40,
        // accuracy: 100,
        // type: "Normal",
        // stab: true,
        // priority: 3,
        // setpp: 10,
        // minpp: 10,
        // maxpp: 16,
        // effect: "flinch100%",
        // recoil: 0,
        // target: "single",
        // description: "A 1st-turn, 1st-strike move that causes flinching. Usable only on 1st turn. Has +3 Priority",
    },
    {
        moveid: 2,
        name: "Counter",
        category: "Physical",
        contact: true,
        critrate: "none",
        power: "-",
        accuracy: 100,
        type: "Fighting",
        stab: false,
        priority: -5,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "returnDamage2x",
        recoil: 0,
        target: "single",
        description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
    },
    {
        moveid: 3,
        name: "Electroweb",
        contact: false,
        category: "Special",
        critrate: "standard",
        power: 55,
        accuracy: 95,
        type: "Electric",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "lowerSpeed1x100%",
        recoil: 0,
        target: "single",
        description: "Lowers the target's Speed stat by one stage.",
    },
];
console.log(Shikapu.moveset);

//#658 Gexninja
//let gexninja = plagiodex.push(new Plagiomon("Gexninja", 658, 50, "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77));
let Gexninja = plagiodex[658] = new Plagiomon("Gexninja", 658, "Torrent", 50, "Water", "Dark", 3.48, 3.17, 2.56, 3.35, 2.65, 3.77);
Gexninja.moveset = [
    {
        moveid: 0,
        name: "Hydro Pump",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 120,
        accuracy: 85,
        type: "Water",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "none",
        recoil: 0,
        target: "all",
        description: "A huge volume of water is blasted at the foe under great pressure.",
    },
    {
        moveid: 1,
        name: "Night Slash",
        category: "Physical",
        contact: true,
        critrate: "increased",
        power: 70,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "highcrit",
        recoil: 0,
        target: "single",
        description: "The user slashes the foe the instant an opportunity arises. It has a high critical-hit ratio.",
    },
    {
        moveid: 2,
        name: "Swagger",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: 85,
        type: "Normal",
        stab: false,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "confuse100%",
        recoil: 0,
        target: "single",
        description: "The user enrages the foe into confusion. Also, it sharply raises the foe's Attack stat.",
    },
    {
        moveid: 3,
        name: "Double Team",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Normal",
        stab: false,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "raiseEvasion",
        recoil: 0,
        target: "self",
        description: "By moving rapidly, the user makes illusory copies of itself to raise its evasion by one stage.",
    },
];
console.log(Gexninja.moveset);

//#065 Shazakazam
let Shazakazam = plagiodex[65] = new Plagiomon("Shazakazam", 65, "Synchronize", 50, "Psychic", "", 3.14, 2.18, 2.07, 4.05, 3.17, 3.72);
Shazakazam.moveset = [
    {
        moveid: 0,
        name: "Psychic",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 90,
        accuracy: 100,
        type: "Psychic",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "lowerSpDef1x10%",
        recoil: 0,
        target: "single",
        description: "Has a 10% chance of lowering the target's Special Defense by one stage.",
    },
    {
        moveid: 1,
        name: "Tri Attack",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 80,
        accuracy: 100,
        type: "Normal",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "triattack",
        recoil: 0,
        target: "single",
        description: "Has a 20% chance of either paralyzing, freezing, or burning the target. Each ailment has an equal chance of being inflicted.",
    },
    {
        moveid: 2,
        name: "Focus Blast",
        category: "Special",
        contact: false,
        critrate: "standard",
        power: 120,
        accuracy: 70,
        type: "Fighting",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "lowerSpDef1x10%",
        recoil: 0,
        target: "single",
        description: "A powerful blast that has a 10% chance of lowering the target's Sp. Def. by one stage.",
    },
    {
        moveid: 3,
        name: "Reflect",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Psychic",
        stab: false,
        priority: 0,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "halfPhysicalDamage",
        recoil: 0,
        target: "self",
        description: "A wall of light that halves damage from physical attacks for five turns.",
    },
];
console.log(Shazakazam.moveset);

//#068 Cuatrobiceps
let Cuatrobiceps = plagiodex[68] = new Plagiomon("Cuatrobiceps", 68, "No Guard", 50, "Fighting", "", 3.84, 3.94, 2.84, 2.51, 2.95, 2.29);
Cuatrobiceps.moveset = [
    {
        moveid: 0,
        name: "Dynamic Punch",
        category: "Physical",
        critrate: "standard",
        contact: true,
        power: 100,
        accuracy: 50,
        type: "Fighting",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "confuse100%",
        recoil: 0,
        target: "single",
        description: "An attack that always confuses. Inaccurate unless it's used by an user with No Guard ability."
    },
    {
        moveid: 1,
        name: "Payback",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 50,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "revengeTurn",
        recoil: 0,
        target: "single",
        description: "If the user can use this attack after the foe attacks, its power is doubled.",
    },
    {
        moveid: 2,
        name: "Fire Punch",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 75,
        accuracy: 100,
        type: "Fire",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "burn",
        recoil: 0,
        target: "single",
        description: "A fiery punch that has a 10% chance of burning the target.",
    },
    {
        moveid: 3,
        name: "Stone Edge",
        category: "Physical",
        contact: false,
        critrate: "increased",
        power: 100,
        accuracy: 80,
        type: "Rock",
        stab: true,
        priority: 0,
        setpp: 5,
        minpp: 5,
        maxpp: 8,
        effect: "highCrit",
        recoil: 0,
        target: "single",
        description: "Stabs the foe with sharpened stones from below. Has a high critical-hit ratio.",
    },
];
console.log(Cuatrobiceps.moveset);

//#132 Tito
let Tito;
function createTito() {
    Tito = plagiodex[132] = new Plagiomon("Tito", 132, plagiomon1.ability, 60, plagiomon1.type1, plagiomon1.type2, 3, plagiomon1.pyatk, plagiomon1.pydef, plagiomon1.spatk, plagiomon1.spdef, plagiomon1.speed);

    Tito.moveset = plagiomon1.moveset;

    Tito.moveset = [
        {
            moveid: 0,
            name: plagiomon1.moveset[0].name,
            category: plagiomon1.moveset[0].category,
            contact: plagiomon1.moveset[0].contact,
            critrate: plagiomon1.moveset[0].critrate,
            power: plagiomon1.moveset[0].power,
            accuracy: plagiomon1.moveset[0].accuracy,
            type: plagiomon1.moveset[0].type,
            stab: plagiomon1.moveset[0].stab,
            priority: plagiomon1.moveset[0].priority,
            setpp: 5,
            minpp: 5,
            maxpp: 5,
            effect: plagiomon1.moveset[0].effect,
            recoil: plagiomon1.moveset[0].recoil,
            target: plagiomon1.moveset[0].target,
            description: plagiomon1.moveset[0].description,
        },
        {
            moveid: 1,
            name: plagiomon1.moveset[1].name,
            category: plagiomon1.moveset[1].category,
            contact: plagiomon1.moveset[1].contact,
            critrate: plagiomon1.moveset[1].critrate,
            power: plagiomon1.moveset[1].power,
            accuracy: plagiomon1.moveset[1].accuracy,
            type: plagiomon1.moveset[1].type,
            stab: plagiomon1.moveset[1].stab,
            priority: plagiomon1.moveset[1].priority,
            setpp: 5,
            minpp: 5,
            maxpp: 5,
            effect: plagiomon1.moveset[1].effect,
            recoil: plagiomon1.moveset[1].recoil,
            target: plagiomon1.moveset[1].target,
            description: plagiomon1.moveset[1].description,
        },
        {
            moveid: 2,
            name: plagiomon1.moveset[2].name,
            category: plagiomon1.moveset[2].category,
            contact: plagiomon1.moveset[2].contact,
            critrate: plagiomon1.moveset[2].critrate,
            power: plagiomon1.moveset[2].power,
            accuracy: plagiomon1.moveset[2].accuracy,
            type: plagiomon1.moveset[2].type,
            stab: plagiomon1.moveset[2].stab,
            priority: plagiomon1.moveset[2].priority,
            setpp: 5,
            minpp: 5,
            maxpp: 5,
            effect: plagiomon1.moveset[2].effect,
            recoil: plagiomon1.moveset[2].recoil,
            target: plagiomon1.moveset[2].target,
            description: plagiomon1.moveset[2].description,
        },
        {
            moveid: 3,
            name: plagiomon1.moveset[3].name,
            category: plagiomon1.moveset[3].category,
            contact: plagiomon1.moveset[3].contact,
            critrate: plagiomon1.moveset[3].critrate,
            power: plagiomon1.moveset[3].power,
            accuracy: plagiomon1.moveset[3].accuracy,
            type: plagiomon1.moveset[3].type,
            stab: plagiomon1.moveset[3].stab,
            priority: plagiomon1.moveset[3].priority,
            setpp: 5,
            minpp: 5,
            maxpp: 5,
            effect: plagiomon1.moveset[3].effect,
            recoil: plagiomon1.moveset[3].recoil,
            target: plagiomon1.moveset[3].target,
            description: plagiomon1.moveset[3].description,
        },
    ];
    // Tito.moveset[0].setpp = 5;
    // Tito.moveset[1].setpp = 5;
    // Tito.moveset[2].setpp = 5;
    // Tito.moveset[3].setpp = 5;
    console.log(Tito.moveset);
    // plagiomon1.moveset[0].setpp = plagiomon1.moveset[0].minpp;
    // plagiomon1.moveset[1].setpp = plagiomon1.moveset[1].minpp;
    // plagiomon1.moveset[2].setpp = plagiomon1.moveset[2].minpp;
    // plagiomon1.moveset[3].setpp = plagiomon1.moveset[3].minpp;
    console.log(plagiomon1.moveset);
}

//#150 Miaudos
let Miaudos;
function createMiaudos() {
    Miaudos = plagiodex[150] = new Plagiomon("Miaudos", 150, "Pressure", 60, "Psychic", "", 4.16, 3.5, 3.06, 4.47, 3.06, 3.94);
        Miaudos.moveset = [
        {
            moveid: 0,
            name: "Psychic",
            category: "Special",
            contact: false,
            critrate: "standard",
            power: 90,
            accuracy: 100,
            type: "Psychic",
            stab: true,
            priority: 0,
            setpp: 10,
            minpp: 10,
            maxpp: 16,
            effect: "lowerSpDef1x10%",
            recoil: 0,
            target: "single",
            description: "Has a 10% chance of lowering the target's Special Defense by one stage.",
        },
        {
            moveid: 1,
            name: "Thunderbolt",
            category: "Special",
            contact: false,
            critrate: "standard",
            power: 90,
            accuracy: 100,
            type: "Electric",
            stab: true,
            priority: 0,
            setpp: 15,
            minpp: 15,
            maxpp: 24,
            effect: "paralyze",
            recoil: 0,
            target: "single",
            description: "Has a 10% chance of paralyzing the target.",
        },
        {
            moveid: 2,
            name: "Focus Blast",
            category: "Special",
            contact: false,
            critrate: "standard",
            power: 120,
            accuracy: 70,
            type: "Fighting",
            stab: true,
            priority: 0,
            setpp: 5,
            minpp: 5,
            maxpp: 8,
            effect: "lowerSpDef1x10%",
            recoil: 0,
            target: "single",
            description: "A powerful blast that has a 10% chance of lowering the target's Sp. Def. by one stage.",
        },
        {
            moveid: 3,
            name: "Signal Beam",
            category: "Special",
            contact: false,
            critrate: "standard",
            power: 75,
            accuracy: 100,
            type: "Bug",
            stab: true,
            priority: 0,
            setpp: 15,
            minpp: 15,
            maxpp: 24,
            effect: "confuse10%",
            recoil: 0,
            target: "single",
            description: "The user attacks with a sinister beam of light. Has a 10% chance of confusing the target. ",
        },
    ];
    console.log(Miaudos.moveset);
}

//#248 Rockzilla
let Rockzilla = plagiodex[248] = new Plagiomon("Rockzilla", 248, "Sand Stream", 50, "Rock", "Dark", 4.04, 4.03, 3.5, 3.17, 3.28, 2.43);
Rockzilla.moveset = [
    {
        moveid: 0,
        name: "Rock Slide",
        category: "Physical",
        contact: false,
        critrate: "standard",
        power: 75,
        accuracy: 90,
        type: "Rock",
        stab: true,
        priority: 0,
        setpp: 10,
        minpp: 10,
        maxpp: 16,
        effect: "flinch",
        recoil: 0,
        target: "adjacentFoes",
        description: "Large boulders are hurled at the foes. Has a 30% chance of causing each target to flinch.",
    },
    {
        moveid: 1,
        name: "Crunch",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 80,
        accuracy: 100,
        type: "Dark",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "lowerPyDef1x20%",
        recoil: 0,
        target: "single",
        description: "Has a 20% chance of lowering the target's Defense stat by one stage.",
    },
    {
        moveid: 2,
        name: "Double Edge",
        category: "Physical",
        contact: true,
        critrate: "standard",
        power: 120,
        accuracy: 100,
        type: "Normal",
        stab: true,
        priority: 0,
        setpp: 15,
        minpp: 15,
        maxpp: 24,
        effect: "none",
        recoil: 1/3,
        target: "single",
        description: "The user receives recoil damage equal to ⅓ of the damage done to the target.",
    },
    {
        moveid: 3,
        name: "Dragon Dance",
        category: "Status",
        contact: false,
        critrate: "none",
        power: "-",
        accuracy: "-",
        type: "Dragon",
        stab: false,
        priority: 0,
        setpp: 20,
        minpp: 20,
        maxpp: 32,
        effect: "raisePyAtk1xSpeed1x",
        recoil: 0,
        target: "self",
        description: "Raises the user's Attack stat and Speed stat by one stage each.",
    },
];
console.log(Rockzilla.moveset);

/*Blastoise Moveset:
1. Surf
2. Ice Beam
3. Mirror Coat
4. Aqua Jet
*/
/*
Alakazam tentative Moveset:
1. Psychic
2. Tri-Attack
3. Focus Blast
4. Reflect
*/

/* 
Machamp tentative Moveset:
1. Low Sweep
2. Rock Slide
3. Fire Punch
4. Thunder Punch
*/



/*Tyranitar tentative Moveset:
1. Rock Slide
2. Crunch
3. Thunder Wave
4. Giga Impact
*/

/* 
Absol tentative Moveset:
1. Double Team
2. Night Slash
3. Psycho Cut
4. Rock Tomb
*/