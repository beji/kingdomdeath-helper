import { expect } from 'chai'
import 'mocha'
import { colorMagentaLachs } from 'src/components/StyledComponents'

describe('StyledComponents', () => {
  it('should describe Magentalachs correctly', () => {
    expect(colorMagentaLachs).to.equal('#A12D6A')
  })
})
