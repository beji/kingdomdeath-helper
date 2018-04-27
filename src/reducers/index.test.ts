import { expect } from "chai";
import "mocha";
import { addToHunt } from "../actions";
import { setName } from "../actions/settlementActions";
import { killSurvivor, updateSurvivor } from "../actions/survivorActions";
import initialState, { newSurvivor } from "../initialstate";
import { ISettlement } from "../interfaces";
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

    it("should give one free survival on the first rename", () => {
        const survivor = newSurvivor();
        const state = { ...initialState, survivors: [survivor] };

        expect(state.survivors[0].defenseStats.survival.armor).to.equal(0);
        const update = {
            ...survivor,
            name: "New Name",
        };
        const result = reducer(state, updateSurvivor(update));
        expect(result.survivors[0].defenseStats.survival.armor).to.equal(1);
    });

    it("should give not give free survival on renames that are not the first", () => {
        const survivor = {
            ...newSurvivor(),
            name: "Rudolf",
        };
        const state = { ...initialState, survivors: [survivor] };
        expect(state.survivors[0].defenseStats.survival.armor).to.equal(0);
        const update = {
            ...survivor,
            name: "New Name",
        };
        const result = reducer(state, updateSurvivor(update));
        expect(result.survivors[0].defenseStats.survival.armor).to.equal(0);
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
});
