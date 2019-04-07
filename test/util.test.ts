import { expect } from 'chai'
import 'mocha'
import initialState from 'src/initialstate'
import { capitalize, clone } from 'src/util'
import uuid from 'uuid/v4'

describe('capitalize', () => {
  it('should capitalize a string correctly', () => {
    expect(capitalize('magentalachs')).to.equal('Magentalachs')
    expect(capitalize('mAGENTALACHS')).to.equal('MAGENTALACHS')
    expect(capitalize('Magentalachs')).to.equal('Magentalachs')
  })
  it('should deal with empty strings', () => {
    expect(capitalize('')).to.equal('')
  })
  it('should deal with strings that contain only one character', () => {
    expect(capitalize('a')).to.equal('A')
    expect(capitalize('A')).to.equal('A')
  })
})

describe('clone', () => {
  it('should create a copy of an object', () => {
    const cloned = clone(initialState).settlement
    expect(cloned.id).to.equal(initialState.settlement.id)
    expect(cloned.name).to.equal(initialState.settlement.name)
  })
  it('should not create a reference to an object', () => {
    const initial = {
      id: uuid(),
    }
    const cloned = clone(initial)
    cloned.id = uuid()
    expect(cloned.id).to.not.equal(initial.id)
    initial.id = uuid()
    expect(initial.id).to.not.equal(cloned.id)
  })
})
