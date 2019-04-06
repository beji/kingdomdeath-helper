import { DefenseStats, GearSet, IGearSet, StatType } from "../../src/interfaces";

export const set: IGearSet[] = [
    {
        bonus: {
            desc: "Add 1 armor to all hit locations. When you perform a survival action roll 1d10. On a result of 6+, gain +1 survival.",
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
        },
        id: GearSet.rawhide,
        name: "Rawhide set",
    },
    {
        bonus: {
            desc: "Add 1 armor to all hit locations. Leap: Spend 1 move and 1 activation. You leap into the air! Place your survivor on an unoccupied space exactly 5 spaces away in a straight line, then activate a melee weapon and attack with +2 accuracy and +5 strength.",
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
        },
        id: GearSet.dragon_armor,
        name: "Dragon Armor",
    },
    {
        bonus: {
            desc: "Add 1 to all hit locations. Your weapons are your claws! Gain +1 speed and +2 strength when attacking with daggers or katars.",
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
        },
        id: GearSet.white_lion,
        name: "White Lion Armor",
    },
    {
      bonus: {
          desc: "Add 1 to all hit locations. You ignore bash.",
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
      },
      id: GearSet.leather_armor,
      name: "Leather Armor",
  },
];
