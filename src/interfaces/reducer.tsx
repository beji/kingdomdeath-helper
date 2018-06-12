import { AddInnovationAction, AddToHuntAction, CreateSurvivorAction, HideLayerAction, ImportAction, KillSurvivorAction, RemoteAction, RemoveFromHuntAction, RemoveInnovationAction, ResetHuntAction, ReviveSurvivorAction, SetNameAction, SetPlayerNameAction, ShowLayerAction, UpdateGearGridAction, UpdateGearSlotAffinityAction, UpdateSurvivalLimitAction, UpdateSurvivorAction, UpdateSurvivorDisordersAction, UpdateSurvivorFightingArtsAction, UpdateSurvivorGenderAction, UpdateSurvivorNameAction, UpdateSurvivorStatAction } from "./actions";

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
    UpdateSurvivorGenderAction |
    UpdateSurvivorDisordersAction |
    AddInnovationAction |
    RemoveInnovationAction;

type Actions = RemoteableActions |
    ImportAction |
    ShowLayerAction |
    HideLayerAction |
    RemoteAction;

export default Actions;
