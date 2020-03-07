import { expect } from 'chai'
import initialState from '../../src/initialstate'
import reducer from '../../src/reducers'
import { updateGear } from '../../src/actions/gearActions'
import { addToHunt } from '../../src/actions/huntActions'
import { IGearGrid } from '../../src/interfaces/gear'
import { Item } from '../../src/interfaces/ItemEnums'
import { DefenseStats } from '../../src/interfaces/survivor/stats'

describe('The survivor reducer logic', () => {
  describe('ADD_TO_HUNT', () => {
    it('should update gear stats correctly', () => {
      const firstGearGridWithCloth: IGearGrid = {
        ...initialState.settlement.geargrids[0],
        slots: initialState.settlement.geargrids[0].slots.map((slot, idx) => {
          if (idx === 0) {
            return { id: slot.id, content: Item.cloth }
          }
          return slot
        }),
      }
      // Add a Cloth item to the first gear grid
      const addClothAction = updateGear(firstGearGridWithCloth)
      const stateAfterClothAdded = reducer(initialState, addClothAction)

      // The first survivor will now have a waist defense value of one
      const firstSurvivorDefenseStatAfterCloth = stateAfterClothAdded.settlement.survivors[0].defenseStats.find(stat => stat.stat === DefenseStats.waist)
      expect(typeof firstSurvivorDefenseStatAfterCloth).not.to.equal('undefined')
      if (firstSurvivorDefenseStatAfterCloth) {
        expect(firstSurvivorDefenseStatAfterCloth.armor).to.equal(1, 'survivor 0 should have 1 waist armor')
      }

      // Now switch the first and the second survivor
      const switchAction = addToHunt(1, 0)
      const stateAfterSwitch = reducer(stateAfterClothAdded, switchAction)

      // The first grid will now be occupied by the new survivor
      expect(stateAfterSwitch.settlement.geargrids[0].survivorId).to.equal(1)
      // The second grid will now be unassigned
      expect(typeof stateAfterSwitch.settlement.geargrids[1].survivorId).to.equal('undefined')

      // The first survivor will now have a waist defense value of zero again
      const firstSurvivorDefenseStatAfterSwitch = stateAfterSwitch.settlement.survivors[0].defenseStats.find(stat => stat.stat === DefenseStats.waist)
      expect(typeof firstSurvivorDefenseStatAfterSwitch).not.to.equal('undefined')
      if (firstSurvivorDefenseStatAfterSwitch) {
        expect(firstSurvivorDefenseStatAfterSwitch.armor).to.equal(0, 'survivor 0 should have 0 waist armor')
      }

      // The second survivor should now have a waist defense value as he/she now has the cloth
      const secondSurvivorDefenseStatAfterSwitch = stateAfterSwitch.settlement.survivors[1].defenseStats.find(stat => stat.stat === DefenseStats.waist)
      expect(typeof secondSurvivorDefenseStatAfterSwitch).not.to.equal('undefined')
      if (secondSurvivorDefenseStatAfterSwitch) {
        expect(secondSurvivorDefenseStatAfterSwitch.armor).to.equal(1, 'survivor 1 should have 1 waist armor')
      }
    })
  })
})
