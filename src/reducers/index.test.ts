import { expect } from "chai";
import "mocha";
import { addToHunt } from "../actions";
import { setName } from "../actions/settlementActions";
import { killSurvivor } from "../actions/survivorActions";
import initialState from "../initialstate";
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
        const survivor = state.survivors[0];
        survivor.hunting = true;
        survivor.alive = true;
        const killAction = killSurvivor(survivor.id);
        const result = reducer(state, killAction);
        expect(result.survivors[0].hunting).to.equal(false);
        expect(result.survivors[0].alive).to.equal(false);
    });

    it("should not allow more than four survivors in a hunt", () => {
        const state = clone(initialState);
        state.survivors = state.survivors.map((x) => {
            x.alive = true;
            return x;
        });
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
