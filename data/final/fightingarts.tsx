import { IFightingArt } from "interfaces";

const fightingArts: IFightingArt[] = [
    {
        description: "The first time you wound the monster each attack, gain +1 survival and +1 insanity. Ignore the effects of the Fear of the Dark and Prey disorders.",
        id: 0,
        name: "Abyssal Sadist",
    },
    {
        description: "You may wear up to 3 Satchel gear cards. When you depart, if you are not wearing any armor, for each green affinity you have, gain +1 strength token and add 1 to all hit locations. Spend an action and a Flower or Fresh Acanthus resource to heal a permanent injury you or an adjacent survivor suffered this showdown.",
        id: 1,
        name: "Acanthus Doctor",
    },
    {
        description: "When you gain Hunt XP, you may decide not to gain it. When you depart, you may rotate up to 3 gear cards in your gear grid. This changes the location of their affinities and arrows. Otherwise, the gear functions normally.",
        id: 2,
        name: "Ageless Apprentice",
    },
    {
        description: "If you would gain a negative attribute token, gain a positive token of that type instead.",
        id: 3,
        name: "Altered Destiny",
    },
    {
        description: "All melee weapons in your gear grid gain paired. Ambidextrous cannot be used if there are any shields, two-handed, or heavy gear in your gear grid.",
        id: 4,
        name: "Ambidextrous",
    },
    {
        description: "Add Bard as a \"Weapon Proficiency.\" Each showdown played gains 1 point in it. Add this number to rolls with any instrument. At Bardic Mastery (8+ points), each time a bard plays they also have a 50% chance of removing a Trait card, in addition to other instrument effects.",
        id: 5,
        name: "Bard",
    },
    {
        description: "1x/showdown, you may spend an action to shove an adjacent obstacle terrain. If you do, move the terrain ahead of you until you finish moving. If you pass over a monster, it takes 1 wound. Survivors are pushed out of the way to the side. You are knocked down at the end of your move.",
        id: 6,
        name: "Beetle Strength",
    },
    {
        description: "Once per showdown, you may spend an action to suffer bash and the frenzy brain trauma.",
        id: 7,
        name: "Berserker",
    },
    {
        description: "When you suffer a brain trauma, instead gain a bleeding token.",
        id: 8,
        name: "Blotted Out",
    },
    {
        description: "When you are instructed to skip the next hunt event, ignore it. The \"skip next hunt event\" box on your survivor sheet cannot be filled in.",
        id: 9,
        name: "Burning Ambition",
    },
    {
        description: "If you have 0 survival at the start of your act, gain 1 survival.",
        id: 10,
        name: "Burning Focus",
    },
    {
        description: "Once per showdown, you may call forth shadowy tentacles to hold the monster in place. From now until your next action, the monster is held in place. Ignore all monster movement on attacks, reactions, traps, and survivor attacks until your next act.",
        id: 11,
        name: "Call Shadow Tentacles",
    },
    {
        description: "At the start of the showdown, gain the Steadfast survivor status card. When you are attacked, if you have 2+ steadfast tokens, ignore a hit and remove all your steadfast tokens.",
        id: 12,
        name: "Carapace of Will",
    },
    {
        description: "At the start of the showdown, gain the Path of Gloom survivor status card. There is a deadly, otherworldly presence about you. Other survivors cannot voluntarily end their movement adjacent to you.",
        id: 13,
        name: "Clarity of Darkness",
    },
    {
        description: "While you have 3 or more blood tokens, gain +1 strength and +1 accuracy.",
        id: 14,
        name: "Clutch Fighter",
    },
    {
        description: "On a perfect hit, make 1 additional attack roll.",
        id: 15,
        name: "Combo Master",
    },
    {
        description: "At the start of the showdown, secretly write down on a scrap of paper which survivors will live and who will deal the killing blow. During the aftermath, if your predictions were correct, raise the settlement's Survival Limit by 1.",
        id: 16,
        name: "Courtly Screenwriter",
    },
    {
        description: "On a Perfect hit, gain +1 insanity.",
        id: 17,
        name: "Crazed",
    },
    {
        description: "Whenever you are hit, after hit locations are rolled, you may change 1 result to the arms hit location.",
        id: 18,
        name: "Crossarm Block",
    },
    {
        description: "Gain +1 accuracy when attacking with Fist &amp; Tooth. When you wound a monster, it gains -1 toughness until the end of your attack. You cannot use this if you are male.",
        id: 19,
        name: "Death Touch",
    },
    {
        description: "When a survivor adjacent to you is knocked down, you may spend 1 survival. If you do, they stand again and gain +1 survival from your words of encouragement. You cannot use this if you have a broken jaw.",
        id: 20,
        name: "Defender",
    },
    {
        description: "During your act, once per round, you may spend an action to gain an additional move.",
        id: 21,
        name: "Double Dash",
    },
    {
        description: "Gain +1 accuracy and +1 strength for each permanent injury you have. You may always depart, even when retired.",
        id: 22,
        name: "Eternal Will",
    },
    {
        description: "You may dodge 1 additional time per round.",
        id: 23,
        name: "Extra Sense",
    },
    {
        description: "Ignore Parry when attempting to wound hit locations. (Attempt to wound these locations normally.) When a monster attacks you, roll 1d10. On a 6+, ignore 1 hit. Limit 1x/round.",
        id: 24,
        name: "Fencing",
    },
    {
        description: "Once per showdown, you may select a card from the discard pile or wound stack and place it on top of the AI deck. Settlement receives +1 survival limit if this fighting art was not previously known.",
        id: 25,
        name: "Final Fighting Art",
    },
    {
        description: "Once per round, you may spend 1 survival to freeze a monster's brain. They gain -2 accuracy until the end of the round. Once per round, you may spend 1 survival to freeze a survivor's brain, killing them instantly. They die.",
        id: 26,
        name: "Frozen Star",
    },
    {
        description: "-(Understanding/3 round up) Insanity every time insanity should be gained. -(Understanding/3 round up) Brain Damage every time Brain Damage should be taken. Eliminates all disorders, cannot gain disorders.",
        id: 27,
        name: "Hardened",
    },
    {
        description: "Gain +3 movement. Whenever you are knocked down, gain -1 movement token. If you have the Tiny Arachnophobia disorder, you are too scared of spiders to imitate them and you cannot use this fighting art.",
        id: 28,
        name: "Harvestman",
    },
    {
        description: "When you become doomed or gain the priority target token, you may choose to gain +1 survival or +1 strength token.",
        id: 29,
        name: "Headliner",
    },
    {
        description: "You cannot lose or remove this fighting art. Gain +1 strength for each full red affinity you have. You cannot be nominated for Intimacy. You ignore Extreme Heat. At the start of your act, lose 1 survival.",
        id: 30,
        name: "Hellfire",
    },
    {
        description: "If you are standing adjacent to the monster and have 3+ survival, you may spend 3 survival for one automatic hit that inflicts a critical wound.",
        id: 31,
        name: "Heroic",
    },
    {
        description: "You stand firm in the face of any force. You may not be knocked down and may ignore knockback.",
        id: 32,
        name: "Immovable Object",
    },
    {
        description: "You have the first action in every showdown (including going ahead of the monster).",
        id: 33,
        name: "Impatient Fighter",
    },
    {
        description: "Your skin becomes hard as metal. Gain 1 armor on all body locations. It self-repairs after each showdown.",
        id: 34,
        name: "Iron Skin",
    },
    {
        description: "Gain +2 accuracy, +2 strength, +2 evasion. You may dodge any number of times in a round.",
        id: 35,
        name: "King of a Thousand Battles",
    },
    {
        description: "Whenever you attack. You may discard any number of Battle Pressure hit locations drawn and draw an equal number of new hit locations. Whenever you attack, after drawing hit locations, but before rolling to wound, you may choose one hit location drawn and discard it to draw a new hit location. Traps will cancel these effects.",
        id: 36,
        name: "King's Step",
    },
    {
        description: "While you are the only survivor on the showdown board. You may not gain bleeding tokens or be knocked down.",
        id: 37,
        name: "Last Man Standing",
    },
    {
        description: "Whenever you encourage a survivor, they gain +1 speed token until the end of the round.",
        id: 38,
        name: "Leader",
    },
    {
        description: "Once per attack, for each successful hit make an additional attack roll.",
        id: 39,
        name: "Legendary Lungs",
    },
    {
        description: "Once per showdown, you may spend an action to give ourself a seizure. You suffer a random brain trauma and are knocked down.",
        id: 40,
        name: "Lure Epilepsy",
    },
    {
        description: "Gain +1 strength when attacking from adjacent spaces outside the monster's facing and blind spot.",
        id: 41,
        name: "Mammoth Hunting",
    },
    {
        description: "On a Perfect Hit, gain +2 strength until the end of the attack.",
        id: 42,
        name: "Mighty Strike",
    },
    {
        description: "Your Fist &amp; Tooth attacks gain +1accuracy, +1 strength and savage.",
        id: 43,
        name: "Monster Claw Style",
    },
    {
        description: "Gain one action per round. This action must not be a weapon attack or movement. It allows the use of gear or combat actions that are not weapon attacks.",
        id: 44,
        name: "Multitasker",
    },
    {
        description: "When you depart, gain +1 armor to all hit locations for each gear card in your grid with the \"symbol\" keyword. If you would roll on the severe injury table, roll on the Worm Trauma table on the other side of the Necromancer card instead (from Lion God cards).",
        id: 45,
        name: "Necromancer",
    },
    {
        description: "Once per showdown, you may spend an action to have all non-deaf survivors gain +2 insanity. When you die, you encourage all survivors with your last words.",
        id: 46,
        name: "Orator of Death",
    },
    {
        description: "During the Hunt and Settlement phases, whenever you roll on a table, you may add +1 to the roll result. Does not include rolls may during a nemesis showdown (or any showdown).",
        id: 47,
        name: "Otherworldly Luck",
    },
    {
        description: "The first time you gain a resource during a showdown, you may feed it to your phantom friend. If you do, archive the resource and gain +1 evasion token. Lose this token if you are deaf or become deaf.",
        id: 48,
        name: "Phantom Friend",
    },
    {
        description: "At the start of a showdown, gain the Momentum survivor status card. When you attack, if you have 5+ momentum tokens, remove them all and roll 1d10. Gain that amount of luck and strength when attempting to wound the first selected hit location for this attack.",
        id: 49,
        name: "Propulsion Drive",
    },
    {
        description: "Your comrades make you strong enough to exceed the limits of death itself. During the showdown, if you would gain a lethal number of bleeding tokens while there are any other standing survivors, roll 1d10. On a 6+, you live but are knocked down. You will not bleed to death until you gain another bleeding token.",
        id: 50,
        name: "Purpose",
    },
    {
        description: "At the start of each showdown, each survivor gains +1 strength token. Survivors may spend +1 strength tokens in place of survival.",
        id: 51,
        name: "Red Fist",
    },
    {
        description: "Gain +1 evasion token the first time you critically wound during a showdown. Rhythm Chaser cannot be used if there are any shields or heavy gear in your grid.",
        id: 52,
        name: "Rhythm Chaser",
    },
    {
        description: "Whenever a survivor dies during the showdown, roll 1d10. On a 7+ you gain a skull basic resource.",
        id: 53,
        name: "Ruthless",
    },
    {
        description: "Whenever a random hunt event roll matches (a 1d10 roll) matches the number of the hunt event card square, the event revealer gains +1 understanding and +1 courage.",
        id: 54,
        name: "Seasoned Hunter",
    },
    {
        description: "Gain 1 rank, or 0 if this is the first time gaining it. Rank 0 (no bonuses). Rank 1: You may spend an action while adjacent to another survivor to add 2 armor to one of their hit locations. Rank 2: While all of the armor in your grid is silk and all jewelry is amber, gain +2 evasion. Rank 3: During the aftermath, roll 1d10 for each other survivor that died during the showdown. On a 7+, you revive them.",
        id: 55,
        name: "Silk Surgeon",
    },
    {
        description: "When you attack a monster from its blind spot, you gain +4 strength for that attack.",
        id: 56,
        name: "Sneak Attack",
    },
    {
        description: "During the showdown setup, after placing terrain, you may add a Giant Stone Face or a Toppled Pillar terrain card to the showdown board.",
        id: 57,
        name: "Strategist",
    },
    {
        description: "Your body mysteriously absorbs light. At the start of each showdown, gain survival up to the settlement's Survival Limit. If you have any +1 Strength tokens, you may spend them all to perform the Surge survival action.",
        id: 58,
        name: "Sun Eater",
    },
    {
        description: "You no longer cast a shadow and you never hesitate, ignore First Strike. On a Perfect Hit, your first wound attempt of the attack automatically succeeds and inflicts a critical wound (if available). If you die during the showdown, place a Shade Minion in the space you occupied.",
        id: 59,
        name: "Suppressed Shadow",
    },
    {
        description: "At the start of each showdown, gain survival up to your settlements survival limit if you have a sword in your gear grid.",
        id: 60,
        name: "Swordsmans Promise",
    },
    {
        description: "When your wound attempt on a hit location is a failure, you may put that hit location back on top of the deck instead of the discard pile. Limit, once per round.",
        id: 61,
        name: "Tenacious",
    },
    {
        description: "Whenever you gain survival during the showdown phase, gain 1 additional survival.",
        id: 62,
        name: "Thrill Seeker",
    },
    {
        description: "Your attack roll is a perfect hit on a result of 9 or 10.",
        id: 63,
        name: "Timeless Eye",
    },
    {
        description: "When rolling on a severe injuw table, unless you roll a 1, add +1 to the result. This does not include brain trauma.",
        id: 64,
        name: "Tough",
    },
    {
        description: "The hunting party may start the hunt phase 1 space closer to the monster. At the start of the showdown, all survivors gain +1 survival and up to +1 insanity (their option).",
        id: 65,
        name: "Trailblazer",
    },
    {
        description: "When you gain a bleeding token, gain +1 survival and +1 insanity, ignore the effects of the Aichmophobia and Apathetic disorders.",
        id: 66,
        name: "Transcended Masochist",
    },
    {
        description: "If you draw a Trap hit location, instead of being the first hit location resolved, place half (rounded up) of the hit locations drawn before the Trap, with the rest behind it. (E.g. resolve fully half of the hit locations before resolving the trap.)",
        id: 67,
        name: "Trapfinder",
    },
    {
        description: "Once per showdown, when you wound a monster from its blind spot, a survivor adjacent to you may gain the priority target token.",
        id: 68,
        name: "Trick Attack",
    },
    {
        description: "All swords in your gear grid gain Deadly. Gain +3 luck when attacking with a sword if you have the Ghostly Beauty and Narcissistic disorders.",
        id: 69,
        name: "True Blade",
    },
    {
        description: "When something would collide with you, roll 1d10. On a result of 6+, you successfully tumble out of harm’s way. Instead, place your survivor standing on the closest free space outside of the collision path.",
        id: 70,
        name: "Tumble",
    },
    {
        description: "It takes 7 bleeding tokens to kill you.",
        id: 71,
        name: "Unconscious Fighter",
    },
    {
        description: "If all of your attack rolls in an attack miss, you may spend 1 survival to re-roll all attack rolls.",
        id: 72,
        name: "Unrelenting",
    },
    {
        description: "When a survivor dies during the showdown, gain +4 survival and +2 strength token.",
        id: 73,
        name: "Vengeance",
    },
    {
        description: "When you suffer a severe injury at a hit location, you may archive a gear worn at that location to ignore it and gain +1 survival.",
        id: 74,
        name: "Wardrobe Expert",
    },
    {
        description: "If you have a whip and the monster is within 3 squares of you, you may choose to pull them to you. The monster's base will now touch yours. This is a free action once per round.",
        id: 75,
        name: "Whipmaster",
    },
    {
        description: "You may use 2H weapons one-handed. Cumbersome weapons are no longer cumbersome to you.",
        id: 76,
        name: "Wielder of Giants",
    },
    {
        description: "Gain +1 strength when attacking a monster from its blind spot. Whenever you attack a monster, you are always considered to be in its blind spot.",
        id: 77,
        name: "Zero Presence",
    },
];

export default fightingArts;
