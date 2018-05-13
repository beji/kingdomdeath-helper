import { AddToHuntAction, CreateSurvivorAction, HideLayerAction, ImportAction, KillSurvivorAction, RemoveFromHuntAction, ResetHuntAction, ReviveSurvivorAction, SetNameAction, SetPlayerNameAction, ShowLayerAction, UpdateGearGridAction, UpdateGearSlotAffinityAction, UpdateSurvivalLimitAction, UpdateSurvivorAction, UpdateSurvivorFightingArtsAction, UpdateSurvivorStatAction } from "./actions";

type Actions = AddToHuntAction |
    RemoveFromHuntAction |
    ImportAction |
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
    ShowLayerAction |
    HideLayerAction;

export default Actions;
