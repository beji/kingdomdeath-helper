import { expect } from "chai";
import "mocha";
import { addToHunt, removeFromHunt } from "../actions";
import { setName } from "../actions/settlementActions";
import { killSurvivor, updateSurvivor } from "../actions/survivorActions";
import initialState, { newSurvivor } from "../initialstate";
import { DefenseStats, IDefenseStat, ISettlement, ISurvivor } from "../interfaces";
import reducer from "../reducers";
import { clone } from "../util";

describe("The reducer", () => {

    it("should return the initial state if given no state", () => {
        const state = clone(initialState);
        const dummyAction = setName("test");
        const result = reducer(undefined, dummyAction);
        expect(result.name).to.equal(state.name);
        expect(result.id).to.equal(state.id);
    });

    describe("AddToHuntAction", () => {
        it("should add survivors to the hunt if there is a slot left", () => {
            const state = {
                ...initialState,
                survivors: initialState.survivors.map((survivor) => {
                    return {
                        ...survivor,
                        hunting: false,
                    };
                }),
            };
            const initialHunting = state.survivors.filter((survivor) => survivor.hunting).length;
            expect(initialHunting).to.equal(0);

            const stateWithHunter = {
                ...state,
                survivors: state.survivors.map((survivor, idx) => {
                    if (idx === 0) {
                        return {
                            ...survivor,
                            hunting: true,
                        };
                    }
                    return survivor;
                }),
            };
            const firstSurvivor = stateWithHunter.survivors[0];
            const action = addToHunt(firstSurvivor.id, 0);
            const finalState = reducer(stateWithHunter, action);
            const finallyHunting = finalState.survivors.filter((survivor) => survivor.hunting).length;
            expect(finallyHunting).to.equal(1);
        });

        it("should not allow more than four survivors in a hunt", () => {
            const state: ISettlement = {
                ...initialState,
                survivors: initialState.survivors.map((x) => {
                    return {
                        ...x,
                        alive: true,
                    };
                }),
            };
            const notHunting = state.survivors.filter((x) => !x.hunting).map((x) => {
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

            const huntingAfter = result.survivors.filter((x) => x.hunting).length;
            expect(huntingAfter).to.equal(4);
        });

        it("should not allow a survivor to take multiple hunt spots", () => {
            const state = clone(initialState);
            const survivorToTest = state.survivors[3];
            expect(state.geargrids[0].survivorId, "before test: first grid is not assigned to the survivor").to.not.equal(survivorToTest.id);
            expect(state.geargrids[3].survivorId, "before test: last grid is assigned to the suvivor").to.equal(survivorToTest.id);

            const result = reducer(state, addToHunt(survivorToTest.id, 0));

            expect(result.geargrids[0].survivorId, "after test: first grid is assigned to the survivor").to.equal(survivorToTest.id);
            expect(result.geargrids[3].survivorId, "after test: last grid is not assigned to the suvivor").to.not.equal(survivorToTest.id);
        });
    });

    describe("RemoveFromHuntAction", () => {
        it("should remove a hunter from the hunt", () => {
            const state = clone(initialState);
            const firstHunting = state.survivors.find((survivor) => survivor.hunting) as ISurvivor;
            const action = removeFromHunt(firstHunting.id);
            const finalState = reducer(state, action);
            const firstHunterAfter = finalState.survivors.find((survivor) => survivor.id === firstHunting.id) as ISurvivor;
            expect(firstHunterAfter.hunting).to.equal(false);
        });
    });

    describe("KillSurvivorAction", () => {
        it("should remove a dead survivor from the hunt", () => {
            const state = clone(initialState);

            const survivor = {
                ...state.survivors[0],
                alive: true,
                hunting: true,
            };

            const killAction = killSurvivor(survivor.id);
            const result = reducer(state, killAction);
            expect(result.survivors[0].hunting).to.equal(false);
            expect(result.survivors[0].alive).to.equal(false);
        });
    });

    describe("UpdateSurvivorAction", () => {
        it("should give one free survival on the first rename", () => {
            const survivor = newSurvivor();
            const state = { ...initialState, survivors: [survivor] };

            const initialSurvival = state.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;

            expect(initialSurvival.armor).to.equal(0);
            const update = {
                ...survivor,
                name: "New Name",
            };
            const result = reducer(state, updateSurvivor(update));

            const resultSurvival = result.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(resultSurvival.armor).to.equal(1);
        });

        it("should give not give free survival on renames that are not the first", () => {
            const survivor = {
                ...newSurvivor(),
                name: "Rudolf",
            };
            const state = { ...initialState, survivors: [survivor] };
            const initialSurvival = state.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(initialSurvival.armor).to.equal(0);
            const update = {
                ...survivor,
                name: "New Name",
            };
            const result = reducer(state, updateSurvivor(update));
            const resultSurvival = result.survivors[0].defenseStats.find((stat) => stat.stat === DefenseStats.survival) as IDefenseStat;
            expect(resultSurvival.armor).to.equal(0);
        });
    });
});
