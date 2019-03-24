import { expect } from "chai";
import { updateGearSlotAffinity, updateGearSlotSet, updateGear } from "../../src/actions";
import items from "../../src/data/ItemDataHelper";
import initialState from "../../src/initialstate";
import { Affinity, BaseStats, DefenseStats, GearSet, IGearGrid, IItem, ISurvivor, Item } from "../../src/interfaces";
import reducer from "../../src/reducers";
import { clone } from "../../src/util";

// helper function to pupulate testGrid with items
const addItemToGrid = (grid: IGearGrid, itemId: Item, slotId: number): IGearGrid => {
  return {
    ...grid,
    slots: grid.slots.map((slot) => {
      if (slot.id === slotId) {
        return {
          ...slot,
          content: itemId,
        };
      }
      return slot;
    }),
  };
};

describe("The grid reducer logic", () => {

  describe("UpdateGridAffinityAction", () => {
    // testItems
    const itemBlueBottom = items.find((item) => item.id === Item.rawhide_headband) as IItem;
    const itemBlueTopRedRight = items.find((item) => item.id === Item.rawhide_vest) as IItem;
    const itemRedLeft = items.find((item) => item.id === Item.rawhide_gloves) as IItem;
    const itemGreenLeft = items.find((item) => item.id === Item.monster_grease) as IItem;

    it("should not add affinity if cards are not adjacent", () => {
      const state = clone(initialState);
      const oneItemGrid = addItemToGrid(state.settlement.geargrids[0], itemBlueBottom.id, 0);
      const testGrid = addItemToGrid(oneItemGrid, itemBlueTopRedRight.id, 8);

      const finalState = reducer(state, updateGearSlotAffinity(testGrid));
      const finalGridAffinity = finalState.settlement.geargrids[0].affinities;
      expect(finalGridAffinity, "no affinity in grid").to.have.length(0);
    });

    it("should add affinity for adjacent cards with matching affinity", () => {
      const state = clone(initialState);
      const oneItemGrid = addItemToGrid(state.settlement.geargrids[0], itemBlueBottom.id, 0);
      const testGrid = addItemToGrid(oneItemGrid, itemBlueTopRedRight.id, 3);

      const finalState = reducer(state, updateGearSlotAffinity(testGrid));
      const finalGridAffinity = finalState.settlement.geargrids[0].affinities;
      expect(finalGridAffinity, "one blue affinity in grid").to.include(Affinity.blue);
      expect(finalGridAffinity, "no green affinity in grid").to.not.include(Affinity.green);
      expect(finalGridAffinity, "no red affinity in grid").to.not.include(Affinity.red);
    });

    it("should not add affinity for adjacent cards with non-matching affinity", () => {
      const state = clone(initialState);
      const oneItemGrid = addItemToGrid(state.settlement.geargrids[0], itemGreenLeft.id, 1);
      const testGrid = addItemToGrid(oneItemGrid, itemBlueTopRedRight.id, 0);

      const finalState = reducer(state, updateGearSlotAffinity(testGrid));
      const finalGridAffinity = finalState.settlement.geargrids[0].affinities;
      expect(finalGridAffinity, "no affinity in grid").to.have.length(0);
    });

    it("should update the survivor with affinity stats", () => {
      const state = clone(initialState);
      const oneItemGrid = addItemToGrid(state.settlement.geargrids[0], itemBlueBottom.id, 1);
      const twoItemGrid = addItemToGrid(oneItemGrid, itemBlueTopRedRight.id, 4);
      const testGrid = addItemToGrid(twoItemGrid, itemRedLeft.id, 5);

      const finalState = reducer(state, updateGearSlotAffinity(testGrid));
      const survivorId = finalState.settlement.geargrids[0].survivorId as number;
      const finalSurvivor = finalState.settlement.survivors.find((survivor) => survivor.id === survivorId) as ISurvivor;
      expect(finalSurvivor.baseStats[BaseStats.evasion].gear, "survivor has 1 evasion from gear").to.equal(1);
    });

  });

  describe("UpdateGridGearSetAction", () => {
    const testSetItems = items.filter((item) => item.set && item.set.id === GearSet.rawhide) as IItem[];
    const testItem = items.find((item) => item.id === Item.rawhide_headband) as IItem;

    it("should not add set if only one item is in grid", () => {
      const state = clone(initialState);
      const testGrid = addItemToGrid(state.settlement.geargrids[0], testItem.id, 4);

      const finalState = reducer(state, updateGearSlotSet(testGrid));
      const finalGridAffinity = finalState.settlement.geargrids[0].gearSets;
      expect(finalGridAffinity, "no gearset for grid").to.have.length(0);
    });

    it("should add set if full set is in grid", () => {
      const state = clone(initialState);
      let testGrid: IGearGrid = state.settlement.geargrids[0];
      testSetItems.map((item, index) => {
        testGrid = addItemToGrid(testGrid, item.id, index);
      });

      const finalState = reducer(state, updateGearSlotSet(testGrid));
      const finalGridSets = finalState.settlement.geargrids[0].gearSets;
      expect(finalGridSets, "rawhide set in grid").to.includes(GearSet.rawhide);
    });

    it("should update survivor stats with gearset bonus", () => {
      const state = clone(initialState);
      let testGrid: IGearGrid = state.settlement.geargrids[0];
      testSetItems.map((item, index) => {
        testGrid = addItemToGrid(testGrid, item.id, index);
      });

      const finalState = reducer(state, updateGearSlotSet(testGrid));
      const survivorId = finalState.settlement.geargrids[0].survivorId as number;
      const finalSurvivor = finalState.settlement.survivors.find((survivor) => survivor.id === survivorId) as ISurvivor;
      // Survivor has only 1 armor on each location from gearset bonus. armor from items is not added by this reducer!
      expect(finalSurvivor.defenseStats[DefenseStats.head].armor, "survivor has 1 armor on head").to.equal(1);
      expect(finalSurvivor.defenseStats[DefenseStats.body].armor, "survivor has 1 armor on body").to.equal(1);
      expect(finalSurvivor.defenseStats[DefenseStats.arms].armor, "survivor has 1 armor on arms").to.equal(1);
      expect(finalSurvivor.defenseStats[DefenseStats.waist].armor, "survivor has 1 armor on waist").to.equal(1);
      expect(finalSurvivor.defenseStats[DefenseStats.legs].armor, "survivor has 1 armor on legs").to.equal(1);
    });

  });

  describe("UpdateGearGridAction", () => {
    const head = items.find((item) => item.id === Item.rawhide_headband) as IItem;
    const body = items.find((item) => item.id === Item.rawhide_vest) as IItem;
    const arms = items.find((item) => item.id === Item.rawhide_gloves) as IItem;
    const waist = items.find((item) => item.id === Item.rawhide_pants) as IItem;
    const legs = items.find((item) => item.id === Item.rawhide_boots) as IItem;
    let testGrid = initialState.settlement.geargrids[0];
    testGrid = addItemToGrid(testGrid, head.id, 1);
    testGrid = addItemToGrid(testGrid, body.id, 4);
    testGrid = addItemToGrid(testGrid, arms.id, 5);
    testGrid = addItemToGrid(testGrid, waist.id, 7);
    testGrid = addItemToGrid(testGrid, legs.id, 8);

    it("should update suvivor stats from gear", () => {
      const state = clone(initialState);
      const finalState = reducer(state, updateGear(testGrid));
      const survivorId = finalState.settlement.geargrids[0].survivorId as number;
      const finalSurvivor = finalState.settlement.survivors.find((survivor) => survivor.id === survivorId) as ISurvivor;
      expect(finalSurvivor.defenseStats[DefenseStats.head].armor, "survivor has 2 armor on head").to.equal(2);
      expect(finalSurvivor.defenseStats[DefenseStats.body].armor, "survivor has 2 armor on body").to.equal(2);
      expect(finalSurvivor.defenseStats[DefenseStats.arms].armor, "survivor has 2 armor on arms").to.equal(2);
      expect(finalSurvivor.defenseStats[DefenseStats.waist].armor, "survivor has 2 armor on waist").to.equal(2);
      expect(finalSurvivor.defenseStats[DefenseStats.legs].armor, "survivor has 2 armor on legs").to.equal(2);
      expect(finalSurvivor.baseStats[BaseStats.evasion].gear, "survivor has 1 evasion from gear").to.equal(1);
    });

    it("should set affiniy", () => {
      const state = clone(initialState);
      const finalState = reducer(state, updateGear(testGrid));
      const finalGridAffinity = finalState.settlement.geargrids[0].affinities;
      expect(finalGridAffinity, "one blue affinity in grid").to.include(Affinity.blue);
      expect(finalGridAffinity, "no green affinity in grid").to.not.include(Affinity.green);
      expect(finalGridAffinity, "no red affinity in grid").to.include(Affinity.red);
    });

    it("should set gearset", () => {
      const state = clone(initialState);
      const finalState = reducer(state, updateGear(testGrid));
      const finalGridSets = finalState.settlement.geargrids[0].gearSets;
      expect(finalGridSets, "rawhide set in grid").to.includes(GearSet.rawhide);
    });
  });
});
