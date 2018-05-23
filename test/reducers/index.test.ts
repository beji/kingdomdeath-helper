import { expect } from "chai";
import { IState } from "interfaces";
import "mocha";
import { addToHunt, importSettlement, removeFromHunt, setPlayerName } from "../../src/actions";
import { setName, updateSurvivalLimit } from "../../src/actions/settlementActions";
import { createSurvivor, killSurvivor, updateSurvivor, updateSurvivorName } from "../../src/actions/survivorActions";
import initialState, { DEFAULT_SURVIVOR_NAME, newSurvivor } from "../../src/initialstate";
import { DefenseStats, IDefenseStat, ISurvivor } from "../../src/interfaces";
import reducer from "../../src/reducers";
import { clone, getNewSurvivorID } from "../../src/util";

const testInterfaceUnchanged = (oldState: IState, newState: IState) => expect(JSON.stringify(oldState.interface), "the interface state did not change").to.equal(JSON.stringify(newState.interface));

describe("The reducer", () => {

    it("should return the initial state if given no state", () => {
        const state = clone(initialState);
        const dummyAction = setName("test");
        const result = reducer(undefined, dummyAction);
        expect(result.settlement.name).to.equal(state.settlement.name);
        expect(result.settlement.id).to.equal(state.settlement.id);
        testInterfaceUnchanged(state, result);
    });

    describe("AddToHuntAction", () => {
        it("should add survivors to the hunt if there is a slot left", () => {
            const state: IState = {
                ...initialState,
                settlement: {
                    ...initialState.settlement,
                    survivors: initialState.settlement.survivors.map((survivor) => {
                        return {
                            ...survivor,
                            hunting: false,
                        };
                    }),
                },
            };
            const initialHunting = state.settlement.survivors.filter((survivor) => survivor.hunting).length;
            expect(initialHunting, "nobody is hunting").to.equal(0);

            const stateWithHunter = {
                ...state,
                settlement: {
                    ...state.settlement,
                    survivors: state.settlement.survivors.map((survivor, idx) => {
                        if (idx === 0) {
                            return {
                                ...survivor,
                                hunting: true,
                            };
                        }
                        return survivor;
                    }),
                },
            };
            const firstSurvivor = stateWithHunter.settlement.survivors[0];
            const action = addToHunt(firstSurvivor.id, 0);
            const finalState = reducer(stateWithHunter, action);
            const finallyHunting = finalState.settlement.survivors.filter((survivor) => survivor.hunting).length;
            expect(finallyHunting, "one survivor is hunting").to.equal(1);
            testInterfaceUnchanged(state, finalState);
        });

        it("should not allow more than four survivors in a hunt", () => {
            const state: IState = {
                ...initialState,
                settlement: {
                    ...initialState.settlement,
                    survivors: initialState.settlement.survivors.map((x) => {
                        return {
                            ...x,
                            alive: true,
                        };
                    }),
                },
            };
            const notHunting = state.settlement.survivors.filter((x) => !x.hunting).map((x) => {
                return {
                    gridId: x.gridId,
                    id: x.id,
                };
            });

            const result = notHunting.reduce((acc, elem) => {
                if (elem.gridId) {
                    const action = addToHunt(elem.id, parseInt(elem.gridId, 10));
                    return reducer(acc, action);
                }
                return acc;
            }, state);

            const huntingAfter = result.settlement.survivors.filter((x) => x.hunting).length;
            expect(huntingAfter, "four survivors are hunting").to.equal(4);
        });

        it("should not allow a survivor to take multiple hunt spots", () => {
            const state = clone(initialState);
            const survivorToTest = state.settlement.survivors[3];
            expect(state.settlement.geargrids[0].survivorId, "before test: first grid is not assigned to the survivor").to.not.equal(survivorToTest.id);
            expect(state.settlement.geargrids[3].survivorId, "before test: last grid is assigned to the suvivor").to.equal(survivorToTest.id);

            const result = reducer(state, addToHunt(survivorToTest.id, 0));

            expect(result.settlement.geargrids[0].survivorId, "after test: first grid is assigned to the survivor").to.equal(survivorToTest.id);
            expect(result.settlement.geargrids[3].survivorId, "after test: last grid is not assigned to the suvivor").to.not.equal(survivorToTest.id);
        });
    });

    describe("RemoveFromHuntAction", () => {
        it("should remove a hunter from the hunt", () => {
            const state = clone(initialState);
            const firstHunting = state.settlement.survivors.find((survivor) => survivor.hunting) as ISurvivor;
            const action = removeFromHunt(firstHunting.id);
            const finalState = reducer(state, action);
            const firstHunterAfter = finalState.settlement.survivors.find((survivor) => survivor.id === firstHunting.id) as ISurvivor;
            expect(firstHunterAfter.hunting, "the survivor is not hunting").to.equal(false);
            testInterfaceUnchanged(state, finalState);
        });
    });

    describe("ImportAction", () => {
        it("should simply override the current state with the new settlement data", () => {
            const state = clone(initialState);
            const newState = {
                ...state.settlement,
                id: "this is a new state!",
            };
            const result = reducer(state, importSettlement(newState));

            expect(result.settlement.id, "the id should have changed").to.equal(newState.id);
            newState.name = "I should not affect the state!";
            expect(result.settlement.name, "The new state should be a proper copy").to.not.equal(newState.name);
            testInterfaceUnchanged(state, result);
        });
    });

    describe("SetNameAction", () => {
        it("should not update the settlement name if given an empty string", () => {
            const state = clone(initialState);
            const action = setName("");
            const result = reducer(state, action);
            expect(result.settlement.name).to.not.equal("");
            testInterfaceUnchanged(state, result);
        });
        it("should update the name of the settlement", () => {
            const state = clone(initialState);
            const action = setName("everybody-survives-town");
            const result = reducer(state, action);
            expect(result.settlement.name).to.equal("everybody-survives-town");
        });
    });

    describe("KillSurvivorAction", () => {
        it("should remove a dead survivor from the hunt", () => {
            const state = clone(initialState);

            const survivor = {
                ...state.settlement.survivors[0],
                alive: true,
                hunting: true,
            };

            const killAction = killSurvivor(survivor.id);
            const result = reducer(state, killAction);
            expect(result.settlement.survivors[0].hunting, "the dead survivor is not hunting").to.equal(false);
            expect(result.settlement.survivors[0].alive, "the dead survivor is not alive").to.equal(false);
            testInterfaceUnchanged(state, result);
        });
    });

    describe("CreateSurvivorAction", () => {
        it("should add a new survivor to the settlement", () => {
            const state = clone(initialState);
            const action = createSurvivor();
            const result = reducer(state, action);
            expect(result.settlement.survivors.length).to.equal(state.settlement.survivors.length + 1);
            const lastSurvivor = result.settlement.survivors[result.settlement.survivors.length - 1];
            expect(lastSurvivor.name).to.equal(DEFAULT_SURVIVOR_NAME);
            testInterfaceUnchanged(state, result);
        });
    });

    describe("UpdateSurvivorNameAction", () => {
        it("should give one free survival on the first rename", () => {
            const survivor = newSurvivor(getNewSurvivorID(initialState.settlement));
            const state: IState = {
                ...initialState,
                settlement: {
                    ...initialState.settlement,
                    survivors: [survivor],
                },
            };

            const initialSurvival = state.settlement.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;

            expect(initialSurvival.armor, "the survivor has zero survival before the rename").to.equal(0);
            const result = reducer(state, updateSurvivorName(survivor.id, "New Name"));

            const resultSurvival = result.settlement.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(resultSurvival.armor, "the survivor has one survival after the rename").to.equal(1);
            testInterfaceUnchanged(state, result);
        });

        it("should give not give free survival on renames that are not the first", () => {
            const survivor = {
                ...newSurvivor(getNewSurvivorID(initialState.settlement)),
                name: "Rudolf",
            };
            const state = {
                ...initialState,
                settlement: {
                    ...initialState.settlement,
                    survivors: [survivor],
                },
            };
            const initialSurvival = state.settlement.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(initialSurvival.armor, "the survivor has zero survival before the rename").to.equal(0);
            const result = reducer(state, updateSurvivorName(survivor.id, "New Name"));
            const resultSurvival = result.settlement.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(resultSurvival.armor, "the survivor has zero survival after the rename").to.equal(0);
            testInterfaceUnchanged(state, result);
        });
    });

    describe("SetPlayerNameAction", () => {
        it("should update the player name of a hunting slot", () => {
            const name = "horst";
            const state = clone(initialState);
            const action = setPlayerName(name, 0);
            const result = reducer(state, action);
            expect(result.settlement.geargrids[0].playername).to.equal(name);
        });

        it("should allow to set an empty name", () => {
            const name = "horst";
            const state = clone(initialState);
            const action = setPlayerName(name, 0);
            const stateWithNamedSlot = reducer(state, action);
            const emptyAction = setPlayerName("", 0);
            const result = reducer(state, emptyAction);
            expect(result.settlement.geargrids[0].playername).to.equal("");
        });
        it("should not affect the interface state", () => {
            const name = "horst";
            const state = clone(initialState);
            const action = setPlayerName(name, 0);
            const result = reducer(state, action);
            testInterfaceUnchanged(state, result);
        });
    });

    describe("UpdateSurvivalLimitAction", () => {
        it("should set a new survival limit", () => {
            const state = clone(initialState);
            const action = updateSurvivalLimit(5);
            const result = reducer(state, action);
            expect(result.settlement.survivalLimit).to.equal(5);
        });
        it("should not allow numbers <= 0", () => {
            const state = clone(initialState);
            const resultWithNegative = reducer(state, updateSurvivalLimit(-1));
            expect(resultWithNegative.settlement.survivalLimit).to.equal(state.settlement.survivalLimit);
            const resultWithNull = reducer(state, updateSurvivalLimit(0));
            expect(resultWithNull.settlement.survivalLimit).to.equal(state.settlement.survivalLimit);
        });
        it("should not affect the interface state", () => {
            const state = clone(initialState);
            const action = updateSurvivalLimit(5);
            const result = reducer(state, action);
            testInterfaceUnchanged(state, result);
        });
    });
});
