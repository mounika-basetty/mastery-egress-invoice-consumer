import {start, stop} from '../../src/processor'

const {describe, it} = intern.getPlugin('interface.bdd')
const {expect} = intern.getPlugin('chai')

describe('processor module', () => {
    it('should export expected object keys', () => {
        expect(start).to.not.be.undefined
        expect(stop).to.not.be.undefined
    })
})
