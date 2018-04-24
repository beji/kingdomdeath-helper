import { expect } from "chai";
import "mocha";
import { setName } from "../actions/settlementActions";
import { killSurvivor } from "../actions/survivorActions";
import initialState from "../initialstate";
import reducer from "../reducers";
import { clone } from "../util";

describe("The reducer", () => {
    it("should return the initial state if given no state", () => {
        const dummyAction = setName("test");
        const result = reducer(undefined, dummyAction);
        expect(result.name).to.equal(initialState.name);
    });
    it("should remove a dead hunter from the hunt", () => {
        const survivor = initialState.survivors[0];
        survivor.hunting = true;
        survivor.alive = true;
        const killAction = killSurvivor(survivor.id);
        const result = reducer(initialState, killAction);
        expect(result.survivors[0].hunting).to.equal(false);
        expect(result.survivors[0].alive).to.equal(false);
    });
});
