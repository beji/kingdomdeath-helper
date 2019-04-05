import {
    AddInnovationAction,
    AddToHuntAction,
    CreateSurvivorAction,
    HideLayerAction,
    ImportAction,
    KillSurvivorAction,
    RemoteAction,
    RemoveFromHuntAction,
    RemoveInnovationAction,
    RemoveSurvivorAction,
    ResetHuntAction,
    ReviveSurvivorAction,
    SetNameAction,
    SetPlayerNameAction,
    ShowLayerAction,
    UpdateGearGridAction,
    UpdateGearSlotAffinityAction,
    UpdateGearSlotGearSetAction,
    UpdateSurvivalLimitAction,
    UpdateSurvivorAction,
    UpdateSurvivorDisordersAction,
    UpdateSurvivorFightingArtsAction,
    UpdateSurvivorGenderAction,
    UpdateSurvivorNameAction,
    UpdateSurvivorStatAction,
} from './actions'

export type RemoteableActions =
    | AddToHuntAction
    | RemoveFromHuntAction
    | SetNameAction
    | SetPlayerNameAction
    | UpdateSurvivalLimitAction
    | UpdateSurvivorAction
    | UpdateSurvivorStatAction
    | KillSurvivorAction
    | ReviveSurvivorAction
    | CreateSurvivorAction
    | UpdateGearGridAction
    | UpdateGearSlotAffinityAction
    | UpdateGearSlotGearSetAction
    | UpdateSurvivorFightingArtsAction
    | ResetHuntAction
    | UpdateSurvivorNameAction
    | UpdateSurvivorGenderAction
    | UpdateSurvivorDisordersAction
    | AddInnovationAction
    | RemoveInnovationAction
    | ImportAction
    | RemoveSurvivorAction

type Actions = RemoteableActions | ShowLayerAction | HideLayerAction | RemoteAction

export default Actions
