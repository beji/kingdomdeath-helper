import { Affinity, AffinityTypes, BaseStats, DefenseStats, GearSet, IItem, Item, ItemType, StatType } from "../../src/interfaces";

export const armor: IItem[] = [
    {
        desc: "2-aff-red/2-aff-blue At start of your act, if insane, gain +1 speed.",
        id: 2,
        material: "endeavor, 1x pelt, 6x bone, 4x organ",
        name: "Antelope Mask",
        obtained: "Mask Maker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.unique,
            ItemType.irreplaceable,
            ItemType.accessory,
        ],
    },
    {
        affinity: {
            bottom: Affinity.blue,
            right: Affinity.red,
        },
        desc: "Armor 3 on head. At the start of your act, if you have any +1 strength tokens, reveal the next 4 monster hit locations and put them back in any order.",
        id: 3,
        material: "1x legendary horns, 1x phoenix crest",
        name: "Apostle Crown",
        obtained: "Sacred Pool",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.jewelry,
            ItemType.accessory,
        ],
    },
    {
        affinity: {
            bottom: Affinity.red,
        },
        desc: "If adjacent to the monster when you suffer a severe body injury, the monster suffers a wound. Limit, once per round.",
        id: 4,
        material: "1x stout vertebrae, 1x scrap",
        name: "Armor Spikes",
        obtained: "Gormery",
        stats: [],
        types: [
            0,
            9,
            10,
            13,
        ],
    },
    {
        desc: "Block 2: spend move to ignore 2 hits next time you are attacked (up until your next act). You cannot block more than once per attack. Shield adds +2 armor to all locations.",
        id: 5,
        material: "2x iron, 3x leather, 4x bone",
        name: "Beacon Shield",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 6,
            speed: 1,
            strength: 5,
        },
    },
    {
        desc: "The shield has a myriad of eyes on the front to confuse the opponent. If a trap hit location card is drawn during your attacks, discard it and draw another hit location card. 1x/attack. Block 1.",
        id: 6,
        material: "1x scarab shell, 1x compound eye, 1x web silk",
        name: "Beetle Eye Shield",
        obtained: "Wet Resin Crafter",
        stats: [],
        types: [
            0,
            4,
        ],
        weapon: {
            accuracy: 7,
            speed: 2,
            strength: 3,
        },
    },
    {
        desc: "Block 1. The first time you block a hit each showdown, gain the priority target token. Shield adds +1 armor to all locations.",
        id: 7,
        material: "1x kings tongue, 1x iron",
        name: "Blast Shield",
        obtained: "Dragon Armory",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            12,
            20,
            32,
        ],
        weapon: {
            accuracy: 7,
            speed: 1,
            strength: 4,
        },
    },
    {
        affinity: {
            bottom: Affinity.green,
            left: Affinity.green,
            right: Affinity.green,
        },
        desc: "3x 0.5-aff-blue = If you are the monster controller when the monster draws AI, draw 1 extra card. Select 1 to play and discard the other.",
        id: 8,
        material: "legless ball, 3x eyeballs, 2x stomach",
        name: "Blue Ring",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            8,
            11,
            ItemType.accessory,
        ],
    },
    {
        desc: "",
        id: 9,
        material: "1x hide",
        name: "Cloth",
        obtained: "Starting item",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            bottom: Affinity.blue,
        },
        desc: "Whenever you spend movement, the scales' color shift. Gain +1 evasion until your next act.",
        id: 10,
        material: "1x cycloid scales, 1x hide, 1x prismatic gills",
        name: "Cycloid Scale Hood",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            bonus: {
                desc: "+1 accuracy",
                require: [
                    {
                        color: Affinity.blue,
                        connection: AffinityTypes.card,
                    },
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.grid,
                    },
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.grid,
                    },
                ],
                stats: [
                    {
                        amount: 1,
                        stat: BaseStats.accuracy,
                        type: StatType.base,
                    },
                ],
            },
            left: Affinity.red,
            right: Affinity.red,
            top: Affinity.blue,
        },
        desc: "When you spend movement, you Shadow Walk and may move through occupied spaces without causing collision.",
        id: 11,
        material: "1x cycloid scales, 1x scrap, 1x huge sunteeth, 1x salt",
        name: "Cycloid Scale Jacket",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            left: Affinity.blue,
            top: Affinity.green,
        },
        desc: "1x 0.5-aff-blue / 1x 0.5-aff-green = Spend movement: You are not a threat until you attack. If you have the priority target token, gain 2 survival and remove it.",
        id: 12,
        material: "1x cycloid scales, 1x bone, 1x shadow tentacles",
        name: "Cycloid Scale Shoes",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            bottom: Affinity.green,
            top: Affinity.blue,
        },
        desc: "1x 0.5-aff-green / 3x 1-aff-blue = When you depart, gain survival equal to the number of blue affinities you have.",
        id: 13,
        material: "1x cycloid scales, 1x hide, 1x huge sunteeth",
        name: "Cycloid Scale Skirt",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            left: Affinity.blue,
            right: Affinity.blue,
        },
        desc: "When you Shadow Walk and attack a monster from its blind spot, your weapon gains +1 accuracy and Sharp for that attack.",
        id: 14,
        material: "1x cycloid scales, 1x bone, 1x small sunteeth, 1x salt",
        name: "Cycloid Scale Sleeves",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "If you have NO affinities, gain +4 luck and suffer -4 to all severe injury rolls.",
        id: 15,
        material: "endeavor, -1 population, 6x bone, 4x organ",
        name: "Death Mask",
        obtained: "Mask Maker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            5,
            6,
            ItemType.accessory,
        ],
    },
    {
        desc: "You are not knocked down from suffering a heavy injury.",
        id: 16,
        material: "2x veined wing, 1x organ, 1x iron",
        name: "Dragon Belt",
        obtained: "Dragon Armory",
        set: {
            id: GearSet.dragon_armor,
        },
        stats: [
            {
                amount: 4,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
        ],
    },
    {
        desc: "Gain +2 movement during your act.",
        id: 17,
        material: "1x kings claws, 1x husk, 1x organ, 1x iron",
        name: "Dragon Boots",
        obtained: "Dragon Armory",
        set: {
            id: GearSet.dragon_armor,
        },
        stats: [
            {
                amount: 4,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
        ],
    },
    {
        desc: "",
        id: 18,
        material: "1x cabled vein, 1x husk, 1x leather, 1x iron",
        name: "Dragon Gloves",
        obtained: "Dragon Armory",
        set: {
            id: GearSet.dragon_armor,
        },
        stats: [
            {
                amount: 4,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            ItemType.set,
            ItemType.metal,
        ],
    },
    {
        desc: "At the start of the showdown, you beat your chest mightily and gain survival up to the survival limit.",
        id: 19,
        material: "1x horn fragment, 1x iron, 1x hardened ribs, 1x leather",
        name: "Dragon Mantle",
        obtained: "Dragon Armory",
        set: {
            id: GearSet.dragon_armor,
        },
        stats: [
            {
                amount: 4,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
        ],
    },
    {
        desc: "Gain +1 to all severe heady injury roll results. Ignore shattered jaw severe injury result.",
        id: 20,
        material: "1x horn fragment, 2x bone, 1x husk",
        name: "Dragonskull Helm",
        obtained: "Dragon Armory",
        set: {
            id: GearSet.dragon_armor,
        },
        stats: [
            {
                amount: 4,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            10,
            12,
        ],
    },
    {
        desc: "Block 1. 1-aff-green/1-aff-blue/1-aff-red = reduce any suffered brain damage by 1, to min of 1. Shield adds +1 armor to all locations.",
        id: 21,
        material: "2x small feathers, 1x muculent droppings",
        name: "Feather Shield",
        obtained: "Plumery",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 7,
            speed: 3,
            strength: 0,
        },
    },
    {
        desc: "Block 2. Add 2 to all hit locations (as shown). While you carry this, reduce star damage from monster level by 1.",
        id: 22,
        material: "1x beacon shield, 1x underplate fungus, 1x sleeping virus flower, 1x elixir of life",
        name: "Fetorsaurus",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            ItemType.set,
            5,
            32,
        ],
        weapon: {
            accuracy: 5,
            speed: 2,
            strength: 9,
        },
    },
    {
        desc: "+1 Accuracy. 3x 1-aff-green = While you are being attacked, the monster has -1 speed.",
        id: 23,
        material: "(2x bone OR 1x skull), 1x lantern bloom",
        name: "Flower Knight Helm",
        obtained: "Sense Memory event",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            13,
        ],
    },
    {
        desc: "At the start of your act, if insane gain +1 action. During settlement phase, you may archive this item to build the mask maker location.",
        id: 24,
        material: "Either defeat lvl 3 Butcher and roll 10 or combo of lvl 1-2 and also crit wound his head",
        name: "Forsaker Mask",
        obtained: "Defeat Butcher",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            5,
            6,
            ItemType.accessory,
        ],
    },
    {
        desc: "2-aff-red/2-aff-green/2-aff-blue = at start of action, if insane then gain +1 survival.",
        id: 25,
        material: "endeavor, 1x founding stone, 6x bone, 4x organ",
        name: "God Mask",
        obtained: "Mask Maker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            5,
            6,
            ItemType.accessory,
        ],
    },
    {
        desc: "Other survivors may move through but not end movement in a space you occupy.",
        id: 26,
        material: "1x stout hide, 1x bone",
        name: "Gorment Boots",
        obtained: "Gormery",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            14,
            13,
        ],
    },
    {
        desc: "1x 0.5-aff-blue / 1x 0.5-aff-green = If your courage is higher than the monster level, ignore Intimidate actions.",
        id: 27,
        material: "1x stout hide, 1x handed skull",
        name: "Gorment Mask",
        obtained: "Gormery",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            14,
            13,
        ],
    },
    {
        desc: "2x 1-aff-green = You may Guard without spending survival (see Gorment Suit for Guard).",
        id: 28,
        material: "1x stout hide, 1x bone",
        name: "Gorment Sleeves",
        obtained: "Gormery",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            14,
            13,
        ],
    },
    {
        desc: "1x 1-aff-blue / 1x 0.5-aff-green / 1x 1-aff-green = Guard: at the end of your attack, if you are standing and have a shield, spend 1 survival to move 3 spaces directly away from monster and Block 1 for free.",
        id: 29,
        material: "3x stout hide, 1x stout kidney",
        name: "Gorment Suit",
        obtained: "Gormery",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            14,
            13,
        ],
    },
    {
        desc: "You may use the Tumble fighting art (even if you don't know it). You successfully tumble on 2+ instead of 6+.",
        id: 30,
        material: "1x iron, 1x Flower Knight Badge, 1x calcified greaves, 3x bone",
        name: "Green Boots",
        obtained: "Forbidden Dance",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            10,
            13,
            12,
        ],
    },
    {
        desc: "+1 evasion. After drawing hit locations from an attack, you may discard First Strike hit location card.",
        id: 31,
        material: "1x elytra, 1x gormite, 1x scell, 1x lantern bloom",
        name: "Green Faulds",
        obtained: "Choreia",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
            15,
        ],
    },
    {
        desc: "+2 strength. +6 luck when attempting to wound Parry locations.",
        id: 32,
        material: "1x hunter's heart, 1x iron, 1x jiggling lard",
        name: "Green Gloves",
        obtained: "Scrap Smelting, Albedo",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
        ],
    },
    {
        desc: "+1 luck. When a monster attacks you, you may elect to take a hit on the head and roll 1d10. On 6+, ignore the hit. If adjacent, monster suffers 1 wound.",
        id: 33,
        material: "1x scell, 1x beetle horn, 1x DBK Errant Badge",
        name: "Green Helm",
        obtained: "Old Master on quarry list",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            10,
            12,
        ],
    },
    {
        desc: "At the start of the showdown, draw 3 tactics cards. When you attack, the extra weight grants leverage. Your weapon gains the club keyword.",
        id: 34,
        material: "1x Lion Knights left claw, 2x iron, 3x leather, 1x scarab shell",
        name: "Green Plate",
        obtained: "Citrinitas",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            12,
            14,
        ],
    },
    {
        desc: "Block 1. When you wound with this shield, you may spend 1 survival to add 1 armor to all hit locations. Limit 1x/attack.",
        id: 35,
        material: "Spidicules, destroy Legless Ball, get shield.",
        name: "Grinning Visage",
        obtained: "Legless Ball innovation",
        stats: [],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 7,
            speed: 2,
            strength: 4,
        },
    },
    {
        desc: "Block 2. When the monster performs Unseen Agony or Meltdown, roll 1d10. On 2+ you suffer no damage. Shield adds +2 armor to all locations.",
        id: 36,
        material: "Dragon King, non-craftable",
        name: "Hazmat Shield",
        obtained: "The Tomb story event",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            20,
            32,
            12,
            13,
        ],
        weapon: {
            accuracy: 4,
            speed: 2,
            strength: 7,
        },
    },
    {
        desc: "Gain +1 strength. At the start of the showdown, if you are fighting the Lion Knight, choose your Role card.",
        id: 37,
        material: "non-craftable.",
        name: "Hideous Disguise",
        obtained: "Defeat Lion Knight",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            ItemType.mask,
            ItemType.accessory,
        ],
    },
    {
        desc: "Block 1. Once per round, if you wound with this weapon, Block 1 for free. Shield adds +0 armor to all locations.",
        id: 38,
        material: "1x mammoth hand, 2x bone",
        name: "Knuckle Shield",
        obtained: "Gormery",
        stats: [],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 7,
            speed: 3,
            strength: 1,
        },
    },
    {
        desc: "-2 movement. 2x 0.5-aff-blue/2x 0.5-aff-green = when you depart, add 3 armor to all hit locations with metal armor.",
        id: 39,
        material: "2x iron, 5x leather",
        name: "Lantern Cuirass",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "0.5-aff-green = +2 accuracy with club weapons.",
        id: 40,
        material: "2x iron, 6x leather",
        name: "Lantern Gauntlets",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "2x 0.5-aff-red/0.5-aff-blue = +2 movement",
        id: 41,
        material: "1x iron, 5x leather",
        name: "Lantern Greaves",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "0.5-aff-blue = ear plugs, you are deaf and have -1 accuracy.",
        id: 42,
        material: "1x iron, 7x bone",
        name: "Lantern Helm",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "",
        id: 43,
        material: "1x iron, 5x organ",
        name: "Lantern Mail",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 5,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
          bonus: {
            desc: "At end of your act, you may move 1 space.",
            require: [
              {
                color: Affinity.green,
                connection: AffinityTypes.card,
              },
              {
                color: Affinity.green,
                connection: AffinityTypes.card,
              },
            ],
          },
          left: Affinity.green,
          right: Affinity.green,
        },
        desc: "",
        id: 44,
        material: "1x leather, 1x hide",
        name: "Leather Boots",
        obtained: "Leather Worker",
        set: {
            id: GearSet.leather_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.leather,
        ],
    },
    {
        affinity: {
          right: Affinity.green,
        },
        desc: "When you depart, gain +2 survival.",
        id: 45,
        material: "1x leather, 1x hide",
        name: "Leather Bracers",
        obtained: "Leather Worker",
        set: {
            id: GearSet.leather_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.leather,
        ],
    },
    {
        affinity: {
          bottom: Affinity.blue,
          top: Affinity.red,
        },
        desc: "",
        id: 46,
        material: "1x leather, 1x bone",
        name: "Leather Cuirass",
        obtained: "Leather Worker",
        set: {
            id: GearSet.leather_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.leather,
        ],
    },
    {
        affinity: {
          bottom: Affinity.red,
          top: Affinity.blue,
        },
        desc: "When you depart, gain +2 insanity.",
        id: 47,
        material: "1x leather, 1x scrap",
        name: "Leather Mask",
        obtained: "Leather Worker",
        set: {
            id: GearSet.leather_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.leather,
        ],
    },
    {
        affinity: {
          bottom: Affinity.green,
        },
        desc: "",
        id: 48,
        material: "1x leather",
        name: "Leather Skirt",
        obtained: "Leather Worker",
        set: {
            id: GearSet.leather_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.leather,
        ],
    },
    {
        desc: "Accessory: May wear this in addition to armor.",
        id: 49,
        material: "1x shimmering mane",
        name: "Lion Headdress",
        obtained: "Catarium",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.item,
            ItemType.flammable,
            ItemType.accessory,
        ],
    },
    {
        affinity: {
          right: Affinity.green,
        },
        desc: "Reduce damage from every hit suffered by 1, to min of 1.",
        id: 50,
        material: "2x white fur",
        name: "Lion Skin Cloak",
        obtained: "Catarium",
        stats: [],
        types: [
          ItemType.armor,
          ItemType.fur,
          ItemType.bone,
          ItemType.heavy,
          ItemType.flammable,
        ],
    },
    {
        desc: "1-aff-red/1-aff-green = if insane, you may spend negative attribute tokens in place of survival.",
        id: 51,
        material: "endeavor, 1x skull, 6x bone, 4x organ",
        name: "Man Mask",
        obtained: "Mask Maker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            6,
            7,
        ],
    },
    {
        desc: "When you depart, gain +1 insanity.",
        id: 52,
        material: "1x iron, 1x leather, 1x tail feather, 1x organ",
        name: "Phoenix Faulds",
        obtained: "Plumery",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "When you depart, gain +1 insanity.",
        id: 53,
        material: "1x iron, 1x leather, 1x small feather, 1x bone",
        name: "Phoenix Gauntlets",
        obtained: "Plumery",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "If insane, gain +2 movement",
        id: 54,
        material: "1x iron, 1x leather, 1x small feather, 1x organ",
        name: "Phoenix Greaves",
        obtained: "Plumery",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "0.5-aff-blue/1-aff-green/1-aff-red = if insane at start of showdown, gain +1 evasion token.",
        id: 55,
        material: "1x hollow wing bone, 1x small feather, 1x bone",
        name: "Phoenix Helm",
        obtained: "Plumery",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "4x 1-aff-red = if insane, you may dodge 1 additional time per round.",
        id: 56,
        material: "endeavor, 1x small feather, 6x bone, 4x organ",
        name: "Phoenix Mask",
        obtained: "Mask Maker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            6,
            7,
        ],
    },
    {
        desc: "0.5-aff-green/0.5-aff-blue/0.5-aff-red = if insane, ignore the first hit each round and suffer 1 brain damage instead.",
        id: 57,
        material: "1x iron, 1x leather, 1x tail feather, 1x hide",
        name: "Phoenix Plackart",
        obtained: "Plumery",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "Armor - can replace Rawhide set helm. You may spend survival while Frenzied.",
        id: 58,
        material: "1x monster tooth necklace, 1x skull, 1x prismatic gills. Also found in Paul the Savior scenario.",
        name: "Pirahna Helm",
        obtained: "Skyreef Sanctuary",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "When you depart, gain +1 survival.",
        id: 59,
        material: "1x hide",
        name: "Rawhide Boots",
        obtained: "Skinnery",
        set: {
            id: GearSet.rawhide,
        },
        stats: [
            {
                amount: 1,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0, 2, 3,
        ],
    },
    {
        affinity: {
            left: Affinity.red,
        },
        desc: "When you depart, gain +1 survival.",
        id: 60,
        material: "1x hide",
        name: "Rawhide Gloves",
        obtained: "Skinnery",
        set: {
            id: GearSet.rawhide,
        },
        stats: [
            {
                amount: 1,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0, 2, 3,
        ],
    },
    {
        affinity: {
            bonus: {
                desc: "Spend action to reveal the top 2 AI cards. Place them back on top in any order.",
                require: [
                    {
                        color: Affinity.blue,
                        connection: AffinityTypes.card,
                    },
                ],
            },
            bottom: Affinity.blue,
        },
        desc: "",
        id: 61,
        material: "1x hide",
        name: "Rawhide Headband",
        obtained: "Skinnery",
        set: {
            id: GearSet.rawhide,
        },
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0, 2, 3,
        ],
    },
    {
        desc: "",
        id: 62,
        material: "1x hide",
        name: "Rawhide Pants",
        obtained: "Skinnery",
        set: {
            id: GearSet.rawhide,
        },
        stats: [
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0, 2, 3,
        ],
    },
    {
        affinity: {
            bonus: {
                desc: "+1 Evasion",
                require: [
                    {
                        color: Affinity.blue,
                        connection: AffinityTypes.card,
                    },
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.card,
                    },
                ],
                stats: [
                    {
                        amount: 1,
                        stat: BaseStats.evasion,
                        type: StatType.base,
                    },
                ],
            },
            right: Affinity.red,
            top: Affinity.blue,
        },
        desc: "",
        id: 63,
        material: "1x hide",
        name: "Rawhide Vest",
        obtained: "Skinnery",
        set: {
            id: GearSet.rawhide,
        },
        stats: [
            {
                amount: 1,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0, 2, 3,
        ],
    },
    {
        desc: "Cursed. At the Aftermath perform King's Curse story event.",
        id: 64,
        material: "non-craftable",
        name: "Regal Faulds",
        obtained: "Defeat Kings Man",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            17,
        ],
    },
    {
        desc: "Cursed. At the Aftermath perform King's Curse story event.",
        id: 65,
        material: "non-craftable",
        name: "Regal Gauntlet",
        obtained: "Defeat Kings Man",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            17,
        ],
    },
    {
        desc: "Cursed. At the Aftermath perform King's Curse story event.",
        id: 66,
        material: "non-craftable",
        name: "Regal Greaves",
        obtained: "Defeat Kings Man",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            17,
        ],
    },
    {
        desc: "Cursed. At the Aftermath perform King's Curse story event.",
        id: 67,
        material: "non-craftable",
        name: "Regal Helm",
        obtained: "Defeat Kings Man",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            17,
        ],
    },
    {
        desc: "Cursed. At the Aftermath perform King's Curse story event.",
        id: 68,
        material: "non-craftable",
        name: "Regal Plackart",
        obtained: "Defeat Kings Man",
        stats: [
            {
                amount: 4,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            17,
        ],
    },
    {
        desc: "2x 1-aff-green / 1x 0.5-aff-green = At the end of the showdown, remove any permanent injuries you suffered this showdown.",
        id: 69,
        material: "1x stomach lining, 1x jiggling lard",
        name: "Regeneration Suit",
        obtained: "Gormery",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            9,
            18,
            ItemType.accessory,
        ],
    },
    {
        affinity: {
            top: Affinity.green,
        },
        desc: "Block 1: spend action to ignore 1 hit location next time you are attacked. Lasts until your next act. Max 1 block/attack. Shield adds +1 armor to all locations.",
        id: 70,
        material: "1x leather, 1x bone, 1x hide",
        name: "Round Leather Shield",
        obtained: "Leather Worker",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 8,
            speed: 1,
            strength: 1,
        },
    },
    {
        desc: "Takes the place of the leather mask and cuirass in the leather GearSet. No special properties.",
        id: 71,
        material: "3x hide, 1x scrap",
        name: "Scout's Tunic",
        obtained: "Leather Worker",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            3,
            19,
        ],
    },
    {
        desc: "Block 1: spend action to ignore 1 hit location next time you are attacked. Lasts until your next act. Max 1 block/attack. Shield adds +1 armor to all locations.",
        id: 72,
        material: "3x bone, 2x scrap, 3x leather",
        name: "Scrap Shield",
        obtained: "Blacksmith",
        stats: [
            {
                amount: 1,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
            {
                amount: 1,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 7,
            speed: 2,
            strength: 3,
        },
    },
    {
        affinity: {
            left: Affinity.red,
            top: Affinity.green,
        },
        desc: "On Arrival add Arcanthus Plant terrain to showdown. +2 to roll result if you activate terrain",
        id: 73,
        material: "1x pelt, 1x hide",
        name: "Screaming Bracers",
        obtained: "Stone Circle",
        set: {
            id: GearSet.screaming_armor,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.fur,
        ],
    },
    {
        affinity: {
            bottom: Affinity.green,
            left: Affinity.green,
            right: Affinity.blue,
            top: Affinity.blue,
        },
        desc: "Slam: Spend move to full move forward in a straight line. If you move 4+ and stop adjacent to monster, it suffers knockback 1 and -1 toughness until end of round.",
        id: 74,
        material: "1x pelt, 1x bone",
        name: "Screaming Coat",
        obtained: "Stone Circle",
        set: {
            id: GearSet.screaming_armor,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.fur,
        ],
    },
    {
        affinity: {
          bottom: Affinity.blue,
        },
        desc: "Spend action to Scream: non-deaf insane survivors gain +1 movement until end of round. All other survivors gain +1 insanity.",
        id: 75,
        material: "1x spiral horn, 1x scrap",
        name: "Screaming Horns",
        obtained: "Stone Circle",
        set: {
            id: GearSet.screaming_armor,
        },
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.fur,
        ],
    },
    {
        affinity: {
          right: Affinity.red,
          top: Affinity.blue,
        },
        desc: "On Arrival your feet hurt, gain +3 insanity",
        id: 76,
        material: "1x pelt, 1x hide",
        name: "Screaming Leg Warmers",
        obtained: "Stone Circle",
        set: {
            id: GearSet.screaming_armor,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.fur,
        ],
    },
    {
        affinity: {
          bottom: Affinity.blue,
          right: Affinity.green,
        },
        desc: "Add +1 to severe waist injury rolls.",
        id: 77,
        material: "1x pelt",
        name: "Screaming Skirt",
        obtained: "Stone Circle",
        set: {
            id: GearSet.screaming_armor,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            ItemType.armor,
            ItemType.set,
            ItemType.fur,
        ],
    },
    {
        desc: "Reduce damage from every hit location by 2, to a minimum of 1. You may not have any heavy or metal gear in your gear grid.",
        id: 78,
        material: "5x silk, 2x hide, 1x spinnerets",
        name: "Silk Body Suit",
        obtained: "Silk Mill",
        stats: [],
        types: [
            0,
        ],
    },
    {
        desc: "2x 0.5-aff-green = +1 movement. Once per round, you may spend 1 survival to gain 2 insanity.",
        id: 79,
        material: "1x large appendage, 1x silk",
        name: "Silk Boots",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "When you depart, gain 1 survival. 2x 0.5-aff-red / 1x 0.5-aff-blue = Spend action to add 1 to all hit locations. Use 1x/showdown.",
        id: 80,
        material: "2x silk, 1x hide, 1x exoskeleton",
        name: "Silk Robes",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "When you depart, gain 1 survival. 2x 0.5-aff-green = Spend action to add 1 to all hit locations. Use once per showdown.",
        id: 81,
        material: "2x silk, 1x bone, 1x hide",
        name: "Silk Sash",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "1x 0.5-aff-green / 1x 0.5-aff-blue = Spend action to turn the monster to face away from you. Use only during the survivor's turn.",
        id: 82,
        material: "1x silken nervous system, 3x silk, 1x hide",
        name: "Silk Turban",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        desc: "",
        id: 83,
        material: "1x thick web silk, 1x silk",
        name: "Silk Wraps",
        obtained: "Silk Mill",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            bottom: Affinity.green,
        },
        desc: "When you suffer a severe head injury, the skull helm is destroyed.",
        id: 84,
        material: "2x bone -or- 1x skull",
        name: "Skull Helm",
        obtained: "Bone Smith",
        stats: [
            {
                amount: 3,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.bone,
          ItemType.fragile,
        ],
    },
    {
        desc: "Irreplaceable. -3 movement. Spend action or 1 survival to ignore a hit. Shield adds +0 armor to all locations.",
        id: 85,
        material: "non-craftable",
        name: "Steel Shield",
        obtained: "Hunt Event 100",
        stats: [],
        types: [
            0,
            5,
            32,
        ],
        weapon: {
            accuracy: 6,
            speed: 1,
            strength: 6,
        },
    },
    {
        affinity: {
            bonus: {
                desc: "+1 movement",
                require: [
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.card,
                    },
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.card,
                    },
                ],
                stats: [
                    {
                        amount: 1,
                        stat: BaseStats.movement,
                        type: StatType.base,
                    },
                ],
            },
            bottom: Affinity.red,
            right: Affinity.red,
        },
        desc: "",
        id: 86,
        material: "1x white fur, 1x hide",
        name: "White Lion Boots",
        obtained: "Catarium",
        set: {
            id: GearSet.white_lion,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.legs,
                type: StatType.defense,
            },
        ],
        types: [
            0,
        ],
    },
    {
        affinity: {
            top: Affinity.blue,
        },
        desc: "Pounce: spend move+action to move 3 spaces in straight line. If you moved 3 spaces, activate a melee weapon with +1 strength.",
        id: 87,
        material: "1x white fur, 1x hide",
        name: "White Lion Coat",
        obtained: "Catarium",
        set: {
            id: GearSet.white_lion,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.body,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.fur,
          ItemType.heavy,
        ],
    },
    {
        desc: "When you Pounce, gain +1 accuracy for your next attack (all rolls).",
        id: 88,
        material: "1x white fur, 1x bone",
        name: "White Lion Gauntlets",
        obtained: "Catarium",
        set: {
            id: GearSet.white_lion,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.arms,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.fur,
          ItemType.heavy,
        ],
    },
    {
        affinity: {
            bonus: {
                desc: "Spend action and 1 survival to Roar: Non-deaf insane survivors gain +2 strength until end of round. All other survivors gain +1 insanity.",
                require: [
                    {
                        color: Affinity.red,
                        connection: AffinityTypes.card,
                    },
                    {
                        color: Affinity.blue,
                        connection: AffinityTypes.grid,
                    },
                ],
            },
            bottom: Affinity.blue,
        },
        desc: "",
        id: 89,
        material: "1x white fur, 1x great cat bone",
        name: "White Lion Helm",
        obtained: "Catarium",
        set: {
            id: GearSet.white_lion,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.fur,
          ItemType.heavy,
        ],
    },
    {
        affinity: {
            bonus: {
                desc: "Spend action to lose all your survival and gain that many +1 strength tokens.",
                require: [
                    {
                        color: Affinity.green,
                        connection: AffinityTypes.grid,
                    },
                    {
                        color: Affinity.green,
                        connection: AffinityTypes.grid,
                    },
                ],
            },
        },
        desc: "",
        id: 90,
        material: "endeavor, 1x shimmering mane, 6x bone, 4x organ",
        name: "White Lion Mask",
        obtained: "Mask Maker",
        set: {
            id: GearSet.white_lion,
        },
        stats: [
            {
                amount: 2,
                stat: DefenseStats.head,
                type: StatType.defense,
            },
        ],
        types: [
            5,
            6,
            ItemType.accessory,
        ],
    },
    {
        affinity: {
            left: Affinity.red,
            right: Affinity.red,
        },
        desc: "",
        id: 91,
        material: "1x white fur, 1x hide",
        name: "White Lion Skirt",
        obtained: "Catarium",
        stats: [
            {
                amount: 2,
                stat: DefenseStats.waist,
                type: StatType.defense,
            },
        ],
        types: [
          ItemType.armor,
          ItemType.set,
          ItemType.fur,
          ItemType.heavy,
        ],
    },
    {
      desc: "You love this rock more than your life.",
      id: Item.beloved_rock,
      material: "",
      name: "Beloved Rock",
      obtained: "Hunt Event",
    },
];
