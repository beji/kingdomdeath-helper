export const enum WeaponProficiency {
  axe,
  bow,
  club,
  dagger,
  fist_tooth,
  grand_weapon,
  katar,
  shield,
  spear,
  sword,
  whip,
}

export interface IWeaponProficiency {
  readonly id: WeaponProficiency
  readonly desc: string
  readonly name: string
}
