import { ISettlement } from 'interfaces'
import {
  IBaseStatLayer,
  IDefenseStatLayer,
  IDisorderListLayer,
  IFightingartListLayer,
  IGearListLayer,
  ISimpleLayer,
  ISpecialStatLayer,
  IWeaponProficiencyLayer,
} from 'interfaces/layer'

export interface IInterface {
  layer?: ISimpleLayer | IBaseStatLayer | IDefenseStatLayer | ISpecialStatLayer | IDisorderListLayer | IFightingartListLayer | IGearListLayer | IWeaponProficiencyLayer
}

export interface IState {
  settlement: ISettlement
  interface: IInterface
}
