import { AddToHuntAction, CreateSurvivorAction, HideLayerAction, ImportAction, KillSurvivorAction, RemoteAction, RemoveFromHuntAction, ResetHuntAction, ReviveSurvivorAction, SetNameAction, SetPlayerNameAction, ShowLayerAction, UpdateGearGridAction, UpdateGearSlotAffinityAction, UpdateSurvivalLimitAction, UpdateSurvivorAction, UpdateSurvivorFightingArtsAction, UpdateSurvivorGenderAction, UpdateSurvivorNameAction, UpdateSurvivorStatAction } from "./actions";

export type RemoteableActions = AddToHuntAction |
    RemoveFromHuntAction |
    SetNameAction |
    SetPlayerNameAction |
    UpdateSurvivalLimitAction |
    UpdateSurvivorAction |
    UpdateSurvivorStatAction |
    KillSurvivorAction |
    ReviveSurvivorAction |
    CreateSurvivorAction |
    UpdateGearGridAction |
    UpdateGearSlotAffinityAction |
    UpdateSurvivorFightingArtsAction |
    ResetHuntAction |
    UpdateSurvivorNameAction |
    UpdateSurvivorGenderAction;

type Actions = RemoteableActions |
    ImportAction |
    ShowLayerAction |
    HideLayerAction |
    RemoteAction;

export default Actions;
