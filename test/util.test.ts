import { expect } from "chai";
import "mocha";
import { capitalize } from "src/util";

describe("capitalize", () => {
    it("should capitalize a string correctly", () => {
        expect(capitalize("magentalachs")).to.equal("Magentalachs");
        expect(capitalize("mAGENTALACHS")).to.equal("MAGENTALACHS");
        expect(capitalize("Magentalachs")).to.equal("Magentalachs");
    });
    it("should deal with empty strings", () => {
        expect(capitalize("")).to.equal("");
    });
    it("should deal with strings that contain only one character", () => {
        expect(capitalize("a")).to.equal("A");
        expect(capitalize("A")).to.equal("A");
    });
});
