import { IWeaponProficiency, WeaponProficiency } from '../../src/interfaces'
import { ISpecialStatSpec, CourageSpec, UnderstandingSpec } from '../../src/interfaces'

export const weaponproficiencies: ReadonlyArray<IWeaponProficiency> = [
  { id: WeaponProficiency.axe, desc: '', name: 'Axe' },
  { id: WeaponProficiency.bow, desc: '', name: 'Bow' },
  { id: WeaponProficiency.club, desc: '', name: 'Club' },
  { id: WeaponProficiency.dagger, desc: '', name: 'Dagger' },
  { id: WeaponProficiency.fist_tooth, desc: '', name: 'Fist & Tooth' },
  { id: WeaponProficiency.grand_weapon, desc: '', name: 'Grand Weapon' },
  { id: WeaponProficiency.katar, desc: '', name: 'Katar' },
  { id: WeaponProficiency.shield, desc: '', name: 'Shield' },
  { id: WeaponProficiency.spear, desc: '', name: 'Spear' },
  { id: WeaponProficiency.sword, desc: '', name: 'Sword' },
  { id: WeaponProficiency.whip, desc: '', name: 'Whip' },
]

export const courage: ReadonlyArray<ISpecialStatSpec> = [
  { id: CourageSpec.stalwart, desc: "Can't be knocked down by brain trauma or intimidate.", name: 'Stalwart' },
  { id: CourageSpec.prepared, desc: 'Add Hunt XP to your roll when determining a straggler.', name: 'Prepared' },
  { id: CourageSpec.matchmaker, desc: 'Spend 1 endeavor to trigger Intimacy story event.', name: 'Matchmaker' },
]

export const understanding: ReadonlyArray<ISpecialStatSpec> = [
  { id: UnderstandingSpec.analyze, desc: 'Look at top AI card and return it to the top of the deck.', name: 'Analyze' },
  { id: UnderstandingSpec.explore, desc: 'Add +2 to your **investigate** roll results.', name: 'Explore' },
  { id: UnderstandingSpec.tinker, desc: '+1 endeavor when a returning survivor', name: 'Tinker' },
]

export default weaponproficiencies
