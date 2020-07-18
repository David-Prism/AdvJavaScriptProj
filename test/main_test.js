const expect = require("chai").expect;

const people = require("../data.js");

describe("The data module", () => {

    it("returns requested person", () => {
        const result = people.getItem("Peter");

        expect(result).to.deep.equal({"item exists":true});
    });

    it("fails when given an invalid person", () => {
        const result = people.getItem("fake");
        expect(result).to.deep.equal({"item exists":false});
    });

    it("adds a person to the array", () => {
        const result = people.addItem({
            first:"Jonah",
            last:"Jameson",
            age:37,
            job:"pilot"
        });
        expect(result).to.deep.equal({"added":true});
    });

    it("fails when an item is already in the array", () => {
        const result = people.addItem({
            first:"Peter",
            last:"Piper",
            age:47,
            job:"writer"
        });
        expect(result).to.deep.equal({"added":false});
    });

    it("deletes a person from the array", () => {
        const result = people.deleteItem("Sarah");
        expect(result).to.deep.equal({"removed":true});
    });

    it("fails when an item does not exist in the array,", () => {
        const result = people.deleteItem("Ophelia");
        expect(result).to.deep.equal({"removed":false});
    });
});
