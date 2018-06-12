import { IInnovation } from "interfaces/innovations";

// tslint:disable:object-literal-sort-keys

const innovations: IInnovation[] = [
    { id: 0, name: `Advanced Combat: Flanking`, consequence_of: 19, description: `The survivors have learned how to flank opponents in combat for an advantage. Whenever two survivors are directly opposite the monster, and also directly adjacent to the monster, then they both gain +1 accuracy and +1 strength for their attacks.` },
    { id: 1, name: `Advanced Combat: Shield Wall`, consequence_of: 19, description: `If two survivors are on the same facing of the monster, and both survivors have shields, then any time the monster attempts to pass over them (collide), the survivors blocking the monster roll 1d10. If each of their rolls is equal or less than their respective strengths, they prevent the monster from passing over them.` },
    {
        id: 2, name: `Albedo`, consequence_of: 36, description: `** Make elixir - once this lantern year, roll 1d10.
    1 - 2 Elixir of forgetfulness. Returning survivors lose 1 level of weapon proficiency as well as one disorder.
    3 - 9 Elixir of concentration. Spend 4 organs to gain 1 Gorm Brain gorm resource.
    10+ Elixir of restoration. Returning survivors change 1 negative modifier of their choice to 0.`},
    {
        id: 3, name: `Altar`, consequence_of: 54, description: `Item Sacrifice (no endeavor cost) - Sacrifice (destroy and remove the resources from settlement storage) 3 resources of any type - then roll 1d10:
    1 Gain +1 on all rolls made on events during this settlement phase.
    2 Gain +1 on all rolls made on events on the coming Hunt Phase.
    3 - 5 Gain +2 on all rolls made on events during this settlement phase.
    6 - 8 Gain +2 on all rolls made on events on the coming Hunt Phase.
    9 - 10 Gain +2 to all rolls of events during this settlement phase as well as those made on the coming Hunt Phase.`},
    {
        id: 4, name: `Ammonia`, consequence_of: 31, survival_depart: 1, description: `A pungent, bilious substance ideal for crafting leather and treating wounds.
    Departing survivors gain +1 survival.`},
    {
        id: 5, name: `Arena`, consequence_of: 35, description: `* Spar - spend 1 iron and roll 1d10:
    1 You are eviscerated. The injury causes you to lose all survival, and you leave for the next hunt with 0 survival unless you skip hunting for a lantern year..
    2 - 4 Painful knockdown. Gain a Scar, +1 permanent strength, and skip the next hunt event. If you already have a scar, the wound reopens. You bleed out and die.
    5 - 9 Gain +1 permanent accuracy.
    10+ Gain the Frozen Star fighting art.`},
    {
        id: 6, name: `Ars Moriendi`, consequence_of: 34, survival_limit: 1, survival_depart: 1, insanity_depart: 1, description: `The survivors build a sculpture of faces of the dead to look upon the living. It is unsettling, and changes on its own at the whim of the dead.
    * Nominate a dead survivor, and a living survivor to touch the sculpture and roll 1d10
    1 - 2 The soul is ripped out of the living survivor, and they become part of the sculpture. They are dead.
    3 - 4 The experience of the dead aids the living. Replace the living survivor's weapon proficiencies with those of the dead. Add 1 fighting art of your choice from the dead survivor to the living. Also add 1 disability of the dead survivor to the living.
    5 - 6 Gain 2 fighting arts of your choice from the dead survivor and add it to the living, as well as the best weapon proficiency. Add 1 disability of the dead to the living.
    7 - 10 The souls exchange places. Replace all weapon proficiencies, fighting arts, and disabilities of the living with those of the dead survivor. They are the formerly dead survivor in mind and spirit.`},
    { id: 7, name: `Backpack`, consequence_of: 24, description: `Settlement may craft backpacks at a cost of 3 hide, pelts, or leather per pack. A backpack expands the gear grid for one survivor from 3x3 grids to 4x3 grids (4 columns by 3 rows). The backpack takes no gear grid space itself.` },
    { id: 8, name: `Backpack Expanded`, consequence_of: 7, description: `Existing backpacks may be upgraded at a cost of 1 hide, pelt, or leather (per pack upgraded). Add one grid space on a fourth row of that backpack.` },
    { id: 9, name: `Bandolier`, consequence_of: 24, description: `The survivors may now make throwing bandoliers. These take no gear slots themselves, and may hold up to three gear items intended for throwing, consumption, healing, or non-attack/non-armor on them. They require 1 hide, pelt, or leather to make each bandolier. The bandolier takes no gear grid space itself.` },
    {
        id: 10, name: `Bed`, consequence_of: 29, survival_limit: 1, description: `* Rest - roll 1d10
    1 - 3 Nightmares. Gain +1 insanity.
    4+ You cannot endeavor again this settlement phase. Skip the next hunt. You may remove one of the following:
    -- All Broken Arm severe injuries
    -- All Broken Hip severe injuries
    -- Ruptured Muscle severe injury`},
    {
        id: 11, name: `Black Mask`, consequence_of: 18, description: `* Visit the Retinue to perform story event Strange Caravan (Lion Knight).
    ** Face the Monster - roll 1d10:
    1 - 5 It senses your hostile intent. Your hunting team must begin a showdown versus the Lion Knight immediately, or it skins you instantly. Gain 1 skull basic resource.
    6 - 9 The statue backhands you, and you react in fright. You lose all survival, and must skip the hunt for the next lantern year..
    10+ Its unfeeling gaze leaves you breathless. You awake hours later and gain the Legendary Lungs fighting art.`},
    {
        id: 12, name: `Bloodletting`, consequence_of: 4, description: `* Breathing a Vein - spend 1 resource and roll 1d10:
    1 - 3 Gain +1 understanding. Lose all survival. You cannot gain survival this settlement phase for any reason.
    4 - 7 Syncope. Gain +3 insanity.
    8+ Cured! Gain +6 insanity. You may remove one of the following:
    -- 1 disorder of your choice.
    -- Warped Pelvis severe waist injury
    -- Intestinal Prolaps severe waist injury.`},
    {
        id: 13, name: `Bloodline`, consequence_of: 29, description: `Newborn survivors inherit the following from their parents:
    -- The Oracle's Eye, Iridescent Hide, or Pristine (combat glossary terms) ability. Choose only one.
    -- One surname.
    -- Half of one parent's weapon proficiency levels (rounded UP).`},
    {
        id: 14, name: `Citrinitas`, consequence_of: 2, survival_limit: 1, description: `*** Try to Heal - once this lantern year, roll 1d10:
    1 - 2 Elixir of heavy metals. Returning survivors suffer -1 permanent evasion.
    3 - 10 Elixir of wholeness. Returning survivors may remove 1 broken (anything) severe injury.`},
    { id: 15, name: `Clan of Death`, consequence_of: 22, description: `The enduring strength of your clan passes through generations. All newborn survivors gain +1 accuracy, +1 strength, and +1 evasion.` },
    {
        id: 16, name: `Cooking`, consequence_of: 32, survival_limit: 1, description: `* Culinary Inspiration - roll 1d10:
    1 - 2 Uninspired
    3+ Perform Cooking event.`},
    {
        id: 17, name: `Crimson Candy`, consequence_of: 33, description: `At the start of each showdown, each survivor gains the Manhunter's level in survival.
    * Crimson Cannibalism - roll 1d10:
    1 The Shakes! -1 permanent accuracy.
    2 - 6 Sugar Crash. Skip the next hunt.
    7+ The crimson treat burns your ribs and your sinuses, healing Intracranial Hemmorhage and Gaping Chest Wound.`},
    {
        id: 18, name: `Dark Water Research`, consequence_of: 55, insanity_depart: 2, description: `* Light-Forging story event.
    * Research Spend 2 (of any type) resources and 2 Dark Water resources to increase the level of Dark Water Research by 1, to a maximum of 3. (Update your settlement record sheet.)`},
    {
        id: 19, name: `Drums`, consequence_of: 31, description: `* Bone Beats - roll 1d10:
    1 - 4 Lone Drummer. Gain +1 insanity.
    5 - 8 Rhythmic trance. Gain +1 survival.
    9+ Remove one disorder from any survivor. Departing survivors gain +1 survival.`},
    {
        id: 20, name: `Empire`, consequence_of: 13, description: `Newborn survivors are born with +1 permanent strength and the Pristine ability.
    Pristine: When you suffer a dismembered severe injury, ignore it and gain 1 bleeding token instead.`},
    {
        id: 21, name: `Face Painting`, consequence_of: 37, description: `* Battle Paint - roll 1d10:
    1 - 3 Laughing stock. Lose 1 survival.
    4+ Death Paint Ceremony. Departing survivors gain +2 survival and +1 insanity.

    * Founder's eye - roll 1d10:
    1 - 3 An accidental mess. Nothing happens.
    4+ Gain +1 to any rolls on the Intimacy story event this settlement phase.`},
    {
        id: 22, name: `Family`, consequence_of: 29, survival_depart: 1, description: `Survivors nominated for Intimacy may give themselves a surname if they do not have one.
    A newborn survivor inherits the surname of one parent, their weapon type and half (rounded down) of their weapon proficiency levels. Also gain +1 in the stat matching the highest positive permanent stat of each parent.`},
    {
        id: 23, name: `Filleting Table`, description: `Once per settlement phase, if the returning survivors are victorious, gain 1 random basic resource.
    * Advanced Cutting - roll 1d10:
    1 - 5 You mess up big time! Suffer the dismembered arm severe injury.
    6+ Gain the Trick Attack fighting art.`},
    { id: 24, name: `Final Fighting Art`, survival_limit: 1, description: `Once per showdown, you may select a card from the discard pile or wound stack and place it on top of the AI deck.` },
    {
        id: 25, name: `Forbidden Dance`, consequence_of: 19, description: `* Fever Dance - roll 1d10:
    1 Clumsy. Suffer -1 permanent movement.
    2 - 9 Give up. Gain +1 insanity.
    10+ Forbidden Step. Spend 7 resources and gain +1 permanent evasion.`},
    {
        id: 26, name: `Guidepost`, survival_depart: 1, description: `The soft glow of its light fills the survivors with a sense of security. Departing survivors gain +1 survival.
    * A survivor may attempt to pull the weapon free from the ground. Roll 1d10 and add their strength. If the result is 12+, gain the Lantern Halberd gear and lose this innovation (archive it).`},
    { id: 27, name: `Hands of the Sun`, consequence_of: 30, description: `The settlement embraces their protective feelings. All survivors gain the Overcharge survival action. Overcharge: If you have any +1 strength tokens, you may spend 1 survival and remove them all to give your next attack this round Devastating 1. Limit 1x/round.` },
    {
        id: 28, name: `Heart Flute`, consequence_of: 25, description: `May only be used once per settlement phase.
    * Devil's Melody - roll 1d10:
    1 Sharp note. The nightmarish tone deafens the survivor. They are permanently deaf.
    2 - 5 Flat note. Add a Nemesis Encounter to the next timeline year.
    6+ Select any Nemesis monster. Special encounter them now. You may choose their monster level. After the showdown, resume the settlement phase. Do not gain endeavors, draw a settlement event card, or advance a lantern year.`},
    { id: 29, name: `Hovel`, consequence_of: 31, survival_limit: 1, survival_depart: 1, description: `The settlement accepts this nightmarish landscape as their home.` },
    {
        id: 30, name: `Inner Lantern`, consequence_of: 31, description: `The settlement finds the light within. All survivors gain the Surge survival action.
    Surge: Once per round, spend 1 survival to gain an additional action and use it immediately.`},
    {
        id: 31, name: `Language`, survival_limit: 1, description: `All survivors gain the Encourage survival action.
    Encourage: Once per round, if standing, spend 1 survival to call out to a non-deaf survivor. They stand if knocked down.`},
    { id: 32, name: `Lantern Oven`, consequence_of: 4, survival_depart: 1, description: `Heat By agitating lanterns, a source of Heat becomes available to the settlement.` },
    {
        id: 33, name: `Legless Ball`, consequence_of: 18, insanity_depart: 2, description: `Spend only 1 * here per settlement phase.
    * Milk one web silk from the Legless ball and add it to storage
    * Finish It Off A survivor with 10+ insanity may put the Spidicules out of its misery. Gain the Grinning Visage shield and lose this innovation (archive this card).`},
    {
        id: 34, name: `Momento Mori`, consequence_of: 40, description: `May be used once per settlement phase.
    * Nominate a survivor that died in the last showdown and roll 1d10
    1 Nothing happens
    2 - 3 Gain the insanity of the dead survivor
    4 - 8 Painful memories. Gain the courage and the understanding of the dead survivor
    9 - 10 Profound memories. Gain the hunt experience of the dead survivor.`},
    {
        id: 35, name: `Nightmare Training`, consequence_of: 60, description: `* Train - lose 3 survival and roll 1d10:
    1 Accident. Spend 1 survival or die.
    2 - 7 You may spend 1 survival and roll again
    8 - 9 Gain +1 weapon proficiency level
    10+ Gain +1 permanent accuracy OR strength.`},
    {
        id: 36, name: `Nigredo`, consequence_of: 30, survival_limit: 1, description: `* Gormchymy Stuff! - roll 1d10:
    1 - 2 Elixir of disintegration. Archive 1 bone resource.
    3 - 10 Elixir of reshaping. Spend 3 bone to gain 1 Dense Bone gorm resource.`},
    {
        id: 37, name: `Paint`, consequence_of: 31, description: `The settlement swells with creative energy. All survivors gain the Dash survival action.
    Dash: Once per round, spend 1 survival to gain a movement and use it immediately.`},
    {
        id: 38, name: `Partnership`, consequence_of: 29, description: `** Nominate two survivors. They pair off, and each gains the Partner ability. A survivor may be nominated for Partnership once per lifetime.
    Partner - ""(Partner's Name)"": when you both depart, gain +2 survival. While adjacent to your partner, gain +1 strength. Partners may only nominate each other for the Intimacy story event. When a partner dies, the remaining partner gains a random disorder and loses this ability.`},
    {
        id: 39, name: `Petal Spiral`, consequence_of: 25, description: `* Trace Petals - roll 1d10:
    1 - 3 Lose 1 Flower Resource. If you do, gain the Flower Addiction disorder and roll again. Otherwise, nothing happens.
    4 - 5 Gain +2 survival and +1 understanding.
    6+ Gain +1 sword proficiency level.`},
    { id: 40, name: `Pictograph`, consequence_of: 37, description: `Crudely-drawn pictures guide the survivors' way home. Anytime during the hunt or showdown phase, a survivor may perform the Run Away story event.` },
    {
        id: 41, name: `Pottery`, consequence_of: 51, survival_limit: 1, description: `If the settlement loses all its resources, you may select up to two resources and keep them.
    * Build Barber Surgeon location for 3 organs and 1 scrap.
    * Fermentation: Spen 1 organ basic resource and gain 1 Love Juice basic resource. Limit, 1x/LY.
    * Ret: Spend 1 herb resource and gain 1 hide basic resource. Limit 1x/LY.`},
    {
        id: 42, name: `Records`, consequence_of: 58, description: `** Knowledge - roll 1d10:
    1 Move Nemesis Encounter - Watcher one year forward (e.g. closer) on the timeline. If the event is moved to this year, trigger it now.
    2 Record-keeping duty. Skip the next hunt.
    3 - 5 You learn nothing. NOTHING!
    6 - 9 Gain any fighting art a survivor currently has.
    10+ Set your hunt XP to 0. You may gain the benefits of the Age story event again.`},
    {
        id: 43, name: `Round Stone Training`, consequence_of: 35, description: `* Train - spend 1 resource and roll 1d10:
    1 Gain the Motion Sickness disorder.
    2 Gain the Crossarm Block fighting art.
    3 - 8 Gain the Tumble fighting art.
    9+ You have a serene moment. Gain +3 insanity and either the Carapace of Will or Propulsion Drive fighting art.`},
    {
        id: 44, name: `Rubedo`, consequence_of: 14, description: `**** Shoot Self in Head Once this lantern year, roll 1d10:
    1 - 2 Elixir of gore. Returning survivors gain the Hemophobia disorder.
    3 - 8 Elixir of fever. Returning survivors gain +1 courage and must skip the next hunt.
    9+ Elixir of mirrors. Returning survivors invert any negative attribute modifiers to positive.`},
    {
        id: 45, name: `Sacred Pool`, consequence_of: 30, description: `Level 1:
    * Sacred Water Once/settlement phase, the settlement drinks the oil that builds up on the surface of the pool. Perform Intimacy.
    ** Purification Ceremony Only 1/lifetime/survivor. Your body is infused with sacred water and Purified. You cannot depart this year. Gain the Protective disorder and roll 1d10: On 8+ gain +1 permanent attribute of your choice, otherwise gain +1 permanent strength or accuracy.Level 2:
    Craft Sun Vestments and Sunring bow.Level 3:
    Craft Apostle Crown and Prism Mace.* Sun Sealing Requires Sauna Shrine innovation. You sit for a year in the boiling darkness of the shrine. Gain the Hellfire fighting art. You cannot depart this year.`},
    {
        id: 46, name: `Sacrifice`, consequence_of: 54, description: `Death Ritual - roll 1d10:
    1 Pointless deaths. -2 population.
    2 - 3 Screamer. -1 population. Departing survivors gain +3 insanity.
    4 - 5 Inhuman. -1 population. Departing survivors lose all insanity.
    6+ Move Nemesis Encounter - Watcher one year back (e.g. further away) on the timeline. -1 population. May be gained once per settlement phase.
    Sacrifice Sacrifice one survivor from the settlement (-1 population) to add +2 to all endeavor and story event rolls made during this settlement phase.`},
    { id: 47, name: `Saga`, consequence_of: 56, description: `A telling of the settlement's survival, set to a soft rhythmic beating of drums. All newborn survivors gain +2 hunt XP (roll on Age event), and +2 survival from knowing the epic.` },
    {
        id: 48, name: `Sauna Shrine`, consequence_of: 27, description: `When survivors depart for a Nemesis encounter or special showdown, they gain +10 survival.
    * Tribute - spend 1 organ and roll 1d10:
    1 - 4 Departing survivors gain +2 insanity.
    5+ Departing survivors promise they will return. They gain +2 strength tokens and add 1 armor to all hit locations.`},
    {
        id: 49, name: `Scarification`, consequence_of: 30, description: `* Initiation - once per lifetime, gain +1 courage and roll the hit location die.
    Head: Suffer the blinded severe head injury
    Chest: Gain the Tough fighting art.
    Waist: Suffer destroyed genitals severe injury.
    Hands: Gambler's scar. Gain +1 permanent luck.
    Feet: Roll 1d10, on a result of 6+ you lose some toes (-1 permanent movement).`},
    {
        id: 50, name: `Scrap Smelting`, consequence_of: 32, description: `* Purification - roll 1d10:
    1 - 2 Nothing happens.
    3 - 9 Spend 3 scrap and add 1 iron to storage
    10+ Spend 3 scrap and add 1 iron to storage (or 6/2, or 9/3, etc.).
    * Build Blacksmith location for 6 bone and 3 scrap.`},
    {
        id: 51, name: `Sculpture`, consequence_of: 37, survival_limit: 1, description: `Silhouettes of sculptures cast strange, comforting shadows on the outskirts of your settlement.
    * You create a statue, infusing it with part of your essence. You cannot depart this year. Choose one of your fighting arts. You lose it, but any other survivors may spend * after this to learn from your work and gain the fighting art you lost.`},
    {
        id: 52, name: `Settlement Watch`, consequence_of: 30, description: `Departing survivors gain +2 survivoal when they depart for a Nemesis Encounter or a special Showdown.
    * New Recruits - roll 1d10:
    1 - 7 If you have no fighting arts, gain a random fighting art.
    8+ If you have 0 or less strength, gain +1 permanent strength. (Limit once per survivor.)`},
    {
        id: 53, name: `Shadow Dancing`, consequence_of: 29, description: `You may only endeavor here if a survivor died during the last hunt or showdown.
    * Final Dance - once per year, roll 1d10:
    1 - 5 You dance with your shadow. Gain +3 insanity and a random fighting art.
    6+ The shadows are in your mind! You realize how easy it is to dupe someone and gain the Sneak Attack fighting art.`},
    {
        id: 54, name: `Shrine`, consequence_of: 30, description: `May be used once per settlement phase.
    * Armor Ritual - roll 1d10:
    1 - 3 Departing survivors gain +1 insanity.
    4+ Final adjustments. Departing survivors add 1 armor to all hit locations.`},
    {
        id: 55, name: `Silk Refining`, consequence_of: 30, survival_limit: 1, description: `* Perform Silk Surgery story event
    * Convert 1 silk resource into 1 hide basic resource.
    * Build Silk Mill location out of 2 silk, 1 bone, and 1 organ.`},
    { id: 56, name: `Song of the Brave`, consequence_of: 19, description: `The survivors celebrate life by lifting their voices into the darkness. All non-deaf survivors add +1 to their roll results on the Overwhelming Darkness event.` },
    {
        id: 57, name: `Stoic Statue`, consequence_of: 33, description: `* Worship the Monster You (this survivor) may not depart or endeavor again this settlement phase.
    1 - 6 Empty your mind. Gain +1 understanding.
    7 - 10 Your faith is inspiring. Departing survivors gain +1 survival. If this result is gained more than once in a settlement phase, they instead gain +10 survival.`},
    {
        id: 58, name: `Storytelling`, consequence_of: 60, survival_limit: 1, description: `** Tale as Old as Time - roll 1d10:
    1 - 3 Spend 3 resources, gain +1 understanding.
    4 - 7 Gain +2 survival and +2 insanity.
    8+ Perform White Speaker story event.`},
    {
        id: 59, name: `Subterranean Agriculture`, consequence_of: 30, description: `* If Black Harvest is not on the timeline, add story event Underground Sow (DBK).
    * If Black Harvest is on the timeline, you may spend 1 Preserved Caustic Dung to increase its rank by 1 to a maximum rank of 3, once per settlement phase.`},
    { id: 60, name: `Symposium`, consequence_of: 31, survival_limit: 1, description: `When a survivor innovates, draw an additional 2 Innovation Cards to choose from.` },
    { id: 61, name: `Ultimate Weapon`, survival_limit: 1, description: `When you defeat a monster, gain 1 monster resource of your choice from its resource deck.` },
    {
        id: 62, name: `War Room`, consequence_of: 30, survival_limit: 1, description: `A dangerous room of plans and tools. Quarries cannot move off the hunt board. If the survivors would move backward on the hunt board, roll 1d10. On a 4+, they don't.
    * Plan The hunt team makes a plan. The group may reroll one Hunt Event table result this lantern year. They must reroll before performing the event.`},
    {
        id: 63, name: `White Mask`, consequence_of: 33, description: `* Visit the Retinue to perform story event Strange Caravan (Lion Knight).
    * Leave the monster an offering - spend 1 resource and roll 1d10:
    1 - 6 You feel satisfied. Gain +2 survival.
    7 - 9 You stand strongly beside it. Departing survivors gain +1 strength token.
    10+ You touch its heartless chest and feel emptiness as the cold surface sears your hand. Gain the Red Fist fighting art.
    Note: If you gain this, you lose the Black Mask innovation, and vice versa.`},
];

export default innovations;
